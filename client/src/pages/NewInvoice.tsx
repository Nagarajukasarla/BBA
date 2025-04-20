import {
    Button,
    Card,
    Col,
    ConfigProvider,
    message,
    Radio,
    Row,
    Space,
    Table,
    Tooltip,
    Typography,
} from "antd";
import React, { useEffect, useRef, useState } from "react";

import {
    DeleteOutlined,
    FileAddOutlined,
    MailOutlined,
    ReloadOutlined,
    SaveOutlined,
    PlusCircleOutlined,
} from "@ant-design/icons";

// import {
//     customerNameHelper,
//     getCustomerAsOptions,
// } from "../../../services/utils/common/helpers/client/customerHelpers";
// import { validate } from "../../../services/utils/common/validation/validate";

import { InvoiceData, ProductData } from "@/types/component";
import { Customer, InvoiceItem } from "@/types/model";
import { NoticeType } from "antd/es/message/interface";
import { ColumnType } from "antd/es/table";

import { InvoiceInput, InvoiceSelect } from "@/components/InvoiceFormFields";
import customerService from "@/services/api/customerService";
import productService from "@/services/api/productService";
import APIResponse from "@/classes/APIResponse";
import CustomerHelper from "@/classes/helpers/CustomerHelper";

interface ProductOption {
    value: string;
    label: string;
    customValue: ProductData; // Replace 'any' with your actual product type
}

export const NewInvoice: React.FC = () => {
    // Reference to DOM elements
    const productSearchDropdown = document.getElementById("productSearch");

    const quantityField = document.getElementById("quantityField");
    const packingTypeField = document.getElementById("packingTypeField");
    const manufacturingDateField = document.getElementById(
        "manufacturingDateField"
    );
    const expiryDateField = document.getElementById("expiryDateField");
    const sGstField = document.getElementById("sGstField");
    const cGstField = document.getElementById("cGstField");
    const iGstField = document.getElementById("iGstField");
    const discountField = document.getElementById("discountField");
    const rateField = document.getElementById("rateField");
    const mrpField = document.getElementById("mrpField");
    const quantityRef = useRef(null);
    const discountRef = useRef(null);

    // State variables
    const [invoiceData, setInvoiceData] = useState<InvoiceData>({
        invoiceNumber: "",
        customer: null,
        paymentModeValue: "",
        items: [],
    });

    const [productData, setProductData] = useState<ProductData | null>(null);
    // Store the selected customer for display purposes
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
        null
    );
    const [customersAsOptions, setCustomersAsOptions] = useState<
        Array<{ value: string; label: string; customValue: any }>
    >([]);

    const [productsAsOptions, setProductsAsOptions] = useState<ProductOption[]>(
        []
    );

    // const [productName, setProductName] = useState<string>("");
    // const [company, setCompany] = useState<Company | null>(null);
    // const [packingType, setPackingType] = useState<string>("");
    // const [quantity, setQuantity] = useState<number>(0);
    // const [manufacturingDate, setManufacturingDate] = useState<Date | null>(null);
    // const [expiryDate, setExpiryDate] = useState<Date | null>(null);
    // const [sGst, setSGst] = useState<number>(0);
    // const [cGst, setCGst] = useState<number>(0);
    // const [iGst, setIGst] = useState<number>(0);
    // const [rate, setRate] = useState<number>(0);
    // const [mrp, setMrp] = useState<number>(0);

    const [discount, setDiscount] = useState<number>(0);

    const [serialNumber, setSerialNumber] = useState(0);

    // Try to remove this if possible
    const [isInvoiceReady, setIsInvoiceReady] = useState(false);

    const [dropdownActiveState, setDropdownActiveState] = useState(false);

    // Message API
    const [messageApi, contextHolder] = message.useMessage();

    const fetchCustomers = async () => {
        try {
            // Use the CustomerService which will use MockDataService in development
            // and the real API in production
            const response = await customerService.fetchLiteCustomers();
            if (response.code === APIResponse.SUCCESS && response.data) {
                if (response.data.length === 0) {
                    showMessage("warning", "No customers exist in the system");
                    return;
                }

                const customers = response.data.map(customer => ({
                    id: customer.id,
                    customerNumber: customer.number,
                    customerName: customer.name,
                    addressDto: { city: customer.address },
                }));
                setCustomersAsOptions(
                    CustomerHelper.getCustomerAsOptions({
                        customers,
                        addAllOption: false,
                    })
                );
            }
        } catch (error) {
            console.error("Error fetching customers:", error);
            showMessage("error", "Failed to load customers");
        }
    };

    const fetchSelectedCustomer = async (value: number) => {
        try {
            const response = await customerService.fetchCustomerById(value);
            if (response.code === APIResponse.SUCCESS && response.data) {
                setSelectedCustomer(response.data);
            }
        } catch (error) {
            console.error("Error fetching customer:", error);
        }
    };

    useEffect(() => {
        setInvoiceData({
            ...invoiceData,
            customer: selectedCustomer, // Currently we are storing the entire customer object in furture we can store only the id
        });
    }, [selectedCustomer]);

    const fetchProducts = async () => {
        try {
            const response = await productService.fetchProducts();
            if (response.code === APIResponse.SUCCESS && response.data) {
                if (response.data.length === 0) {
                    showMessage("warning", "No products exist in the system");
                    return [];
                }

                setProductsAsOptions(getProductsAsOptions(response.data));
                return response.data;
            } else {
                showMessage("warning", "Failed to fetch products");
                return [];
            }
        } catch (error) {
            console.log("Error occurred: " + error);
            showMessage("error", "Error loading products");
            return [];
        }
    };

    const productNameHelper = (product: any) => {
        if (!product) {
            return "";
        }
        // Format the expiry date to show month and year
        const expiryDate = product.expiryDate
            ? new Date(product.expiryDate)
            : null;
        const expiryDateStr = expiryDate
            ? `${expiryDate.getMonth() + 1}/${expiryDate.getFullYear()}`
            : "";

        return `${product.name} - ${expiryDateStr}`;
    };

    const getProductsAsOptions = (products: any[]) => {
        return products.map(product => ({
            value: product.id.toString(),
            label: productNameHelper(product),
            customValue: product,
        }));
    };

    // To delete item from invoice
    // const deleteItem = (product) => {
    //     const updatedItems = invoiceData?.filter(
    //         (item) => item?.serialNumber !== product?.serialNumber
    //     );
    //     setInvoiceData([...updatedItems]);
    // };

    // Payment modes
    const paymentModes = [
        {
            value: "cash",
            label: "Cash",
            key: "1",
        },
        {
            value: "credit",
            label: "Credit",
            key: "2",
        },
        {
            value: "digital",
            label: "Digital",
            key: "3",
        },
    ];

    // Invoice columns
    const invoiceItemsColumns: ColumnType<InvoiceItem>[] = [
        {
            key: "2",
            title: "PRODUCT",
            dataIndex: "name",
            width: "13%",
        },
        {
            key: "3",
            title: "COMPANY",
            dataIndex: "company",
            width: "10%",
        },
        {
            key: "4",
            title: "QUAN",
            dataIndex: "quantity",
            width: "6%",
        },
        {
            key: "5",
            title: "FREE",
            dataIndex: "freeQuantity",
            width: "5%",
        },
        {
            key: "6",
            title: "PACK",
            dataIndex: "packingType",
            width: "5%",
        },
        {
            key: "7",
            title: "MFD",
            dataIndex: "manufacturingDate",
            width: "5%",
        },
        {
            key: "8",
            title: "EXP",
            dataIndex: "expiryDate",
            width: "5%",
        },
        {
            key: "9",
            title: "SGST",
            dataIndex: "sGst",
            width: "5%",
        },
        {
            key: "10",
            title: "CGST",
            dataIndex: "cGst",
            width: "5%",
        },
        {
            key: "11",
            title: "IGST",
            dataIndex: "iGst",
            width: "5%",
        },
        {
            key: "12",
            title: "RATE",
            dataIndex: "rate",
            width: "7%",
        },
        {
            key: "13",
            title: "MRP",
            dataIndex: "mrp",
            width: "6%",
        },
        {
            key: "14",
            title: "DISC",
            dataIndex: "discount",
            width: "5%",
        },
        {
            key: "15",
            title: "PRICE",
            dataIndex: "price",
            width: "7%",
        },
        {
            key: "16",
            title: "ACTION",
            dataIndex: "action",
            width: "6.15%",
            render: (_, item) => (
                <Tooltip title="Delete">
                    <DeleteOutlined
                        // onClick={() => {Pass delete method with item}}
                        style={{
                            color: "red",
                            fontSize: "18px",
                            cursor: "pointer",
                        }}
                    />
                </Tooltip>
            ),
        },
    ];

    /**
     * Updates the selected product's quantity in the products array.
     */
    // const updateSelectedProduct = () => {
    //     const index = products.findIndex((item) => item.id === product.id);
    //     if (index !== -1) {
    //         products[index].quantity -= parseInt(quantity);
    //     }
    // };

    const onKeyupRateField = (event: React.KeyboardEvent) => {
        /*
            --Validate all fields--
        */
        if (event.key === "Enter") {
            onClickAddButton();
        }
    };

    /**
     * Resets the product by setting all related state variables to null or empty strings.
     */
    const resetProduct = () => {
        setProductData(null);
        setDiscount(invoiceData?.customer?.defaultDiscount ?? 0);

        // setProduct(null);
        // setCompany("");
        // setQuantity("");
        // setPackingType("");
        // setManufacturingDate("");
        // setExpiryDate("");
        // setDiscount(customer?.discount ?? "");
        // setSGst("");
        // setCGst("");
        // setIGst("");
        // setRate("");
        // setMrp("");
    };

    /**
     * An onClick event handler for adding a new item to the invoice.
     *
     * @return {void}
     */
    const onClickAddButton = () => {
        if (invoiceData?.items?.length === 0) {
            showMessage("warning", "Items are not sufficient");
            return;
        }
        invoiceData.serialNumber = serialNumber + 1;

        // Here we have validate method which is defined somewhere
        // If not you can use antd field validations which can pause click on AddButton

        // if (validate(productData)) {
        // }

        setInvoiceData({
            ...invoiceData,
            items: [...invoiceData.items, productData],
        });
        setSerialNumber(serialNumber + 1);
        resetProduct();
        productSearchDropdown?.focus();
    };

    /**
     * Resets the invoice by setting the customer to null, clearing the invoice data, resetting the serial number,
     * clearing the payment mode value, and removing the invoice from local storage.
     *
     * @param {}- No parameters
     * @return {void} No return value
     */
    const resetInvoiceData = () => {
        setInvoiceData({
            customer: null,
            paymentModeValue: "",
            items: [],
        });

        // Use useInvoiceState to handle this
        localStorage.removeItem("invoice");
    };

    const showMessage = (type: NoticeType, message: string) => {
        messageApi.open({
            type: `${type}`,
            content: `${message}`,
        });
    };

    /**
     * Asynchronously saves a new invoice if invoiceData is not empty.
     *
     * @return {Promise} a Promise that resolves to the created invoice
     */
    // const saveNewInvoice = async () => {
    //     if (invoiceData.length > 0) {
    //         let obj = getInvoiceRequestObj(
    //             customer?.customerNumber,
    //             paymentModeValue,
    //             invoiceData,
    //             generateFormattedDateString()
    //         );
    //         console.log(obj);
    //         return createInvoice(obj, TokenManager.getToken());
    //     }
    // };

    // const onPressedSaveButtonHandler = () => {
    //     saveNewInvoice().then((response) => {
    //         if (response) {
    //             showMessage("success", "Successfully Saved!");
    //             resetInvoice();
    //         } else {
    //             showMessage("error", "Failed to Save!");
    //         }
    //     });
    // };

    // const onPressedGenerateHandler = () => {
    //     saveNewInvoice().then((response) => {
    //         if (response) {
    //             showMessage("success", "Successfully Saved!");
    //             setInvoiceNumber(response);
    //             setIsInvoiceReady(true);
    //         } else {
    //             showMessage("error", "Failed to Save!");
    //         }
    //     });
    // };

    // const onPressedPrintHandler = () => {
    //     resetInvoice();
    // };

    // const onPressedEmailHandler = () => {
    //     saveNewInvoice().then((response) => {
    //         if (response) {
    //             showMessage("success", "Successfully Saved!");
    //             resetInvoice();
    //         } else {
    //             showMessage("error", "Failed to Save!");
    //         }
    //     });
    // };

    const styles1 = {
        margin: "8px 5px 8px 5px",
        // border: "1px solid black",
    };

    const checkDisability = () => {
        if (invoiceData?.items?.length < 1) {
            return true;
        }
        return false;
    };

    /**
     * Check if there are no invoices, no customer, and no payment mode value.
     *
     * @return {boolean} true if there are no invoices, no customer, and no payment mode value; false otherwise
     */
    const checkDisabilityForReset = () => {
        if (
            invoiceData?.items?.length < 1 &&
            invoiceData?.customer === null &&
            (invoiceData?.paymentModeValue === undefined ||
                invoiceData?.paymentModeValue === "")
        ) {
            return true;
        }
        return false;
    };

    useEffect(() => {
        // Initialize component by loading both customers and products
        const initializeData = async () => {
            // Fetch customers and products
            fetchCustomers();
            fetchProducts();
        };

        initializeData();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect(() => {
    //     setDiscount(customer?.discount);
    // }, [customer]);

    // useEffect(() => {
    //     setInvoiceDataToLocalStorage();
    //     //eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [invoiceData]);

    // useEffect(() => {
    //     setCompany(product?.company);
    //     setQuantity(product?.quantity);
    //     setPackingType(product?.packingType);
    //     setManufacturingDate(getMonthYearFormat(product?.manufacturingDate));
    //     setExpiryDate(getMonthYearFormat(product?.expiryDate));
    //     setSGst(product?.sGstInPercent);
    //     setCGst(product?.cGstInPercent);
    //     setIGst(product?.iGstInPercent);
    //     setRate(product?.rate);
    //     setMrp(product?.mrp);
    // }, [product]);

    // useState(() => {
    //     checkDisability();
    // }, [serialNumber]);

    // useEffect(() => {
    //     setCustomersAsOptions(getCustomerAsOptions({ customers: customers, addAllOptions: false }));
    // }, [customers]);

    return (
        <>
            {contextHolder}
            <div className="newInvoiceWrapper">
                <Col span={24}>
                    <Row style={styles1} justify="space-between" align="middle">
                        <Typography.Title
                            level={4}
                            className="customerDropdownTitle"
                            // style={{border: "1px solid black"}}
                        >
                            New Invoice
                        </Typography.Title>
                        <Row
                        // style={{ border: "1px solid black" }}
                        >
                            <Space
                                direction="horizontal"
                                style={{ marginRight: "8px" }}
                            >
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        resetInvoiceData();
                                    }}
                                    disabled={checkDisabilityForReset()}
                                    style={{
                                        cursor: checkDisabilityForReset()
                                            ? "not-allowed"
                                            : "pointer",
                                    }}
                                    icon={<ReloadOutlined />}
                                >
                                    Reset
                                </Button>
                                {/* {isInvoiceReady && (
                                    <PDFDownloadLink
                                        document={
                                            <PDFFileCreator
                                                products={invoiceData}
                                                customer={customer}
                                                invoiceNumber={`INV${invoiceNumber}`}
                                            />
                                        }
                                        fileName={`INV${invoiceNumber}`}
                                    >
                                        {({ loading }) =>
                                            loading ? (
                                                <button className="primaryButtonStyle">
                                                    Loading...
                                                </button>
                                            ) : (
                                                <button
                                                    className="primaryButtonStyle"
                                                    onClick={() => {
                                                        onPressedPrintHandler();
                                                    }}
                                                >
                                                    Print
                                                </button>
                                            )
                                        }
                                    </PDFDownloadLink>
                                )} */}
                                {!isInvoiceReady && (
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            // onPressedGenerateHandler();
                                        }}
                                        disabled={checkDisability()}
                                        style={{
                                            cursor: checkDisability()
                                                ? "not-allowed"
                                                : "pointer",
                                        }}
                                        icon={<FileAddOutlined />}
                                    >
                                        Generate Invoice
                                    </Button>
                                )}
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        // onPressedSaveButtonHandler();
                                    }}
                                    disabled={checkDisability()}
                                    style={{
                                        cursor: checkDisability()
                                            ? "not-allowed"
                                            : "pointer",
                                    }}
                                    icon={<SaveOutlined />}
                                >
                                    Save
                                </Button>
                                <Button
                                    type="primary"
                                    disabled={checkDisability()}
                                    style={{
                                        cursor: checkDisability()
                                            ? "not-allowed"
                                            : "pointer",
                                    }}
                                    icon={<MailOutlined />}
                                >
                                    Email
                                </Button>
                            </Space>
                        </Row>
                    </Row>
                    <Card styles={{ body: { margin: "0px", padding: "8px" } }}>
                        <Row>
                            <Space
                                direction="vertical"
                                style={{ textAlign: "start" }}
                            >
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            Select: {
                                                optionActiveBg:
                                                    "rgba(0, 0, 0, 0.15)",
                                            },
                                        },
                                    }}
                                >
                                    <InvoiceSelect
                                        label="Customer"
                                        width={380}
                                        value={invoiceData?.customer?.number}
                                        onSelect={(_, selectedCustomer) => {
                                            if (selectedCustomer?.customValue) {
                                                fetchSelectedCustomer(
                                                    selectedCustomer.customValue
                                                        .id
                                                );
                                            }
                                        }}
                                        placeholder="Select Customer"
                                        options={customersAsOptions}
                                        filterOption={(input, option) => {
                                            console.log("Option: ", option);
                                            return (
                                                option?.label
                                                    ?.toString()
                                                    .toLowerCase()
                                                    .includes(
                                                        input.toLowerCase()
                                                    ) ?? false
                                            );
                                        }}
                                        showSearch
                                        allowClear
                                        defaultOpen
                                        autoFocus
                                    />
                                </ConfigProvider>
                            </Space>
                            <Space
                                direction="vertical"
                                style={{
                                    textAlign: "start",
                                    marginLeft: "100px",
                                }}
                            >
                                <Typography.Text className="primary-input-field-header-style">
                                    Payment Mode
                                </Typography.Text>
                                <Radio.Group
                                    value={invoiceData?.paymentModeValue}
                                    onChange={event => {
                                        setInvoiceData({
                                            ...invoiceData,
                                            paymentModeValue:
                                                event.target.value,
                                        });
                                        productSearchDropdown?.focus();
                                    }}
                                    options={paymentModes}
                                    optionType="button"
                                    buttonStyle="solid"
                                />
                            </Space>
                        </Row>
                        <Row style={{ marginTop: "20px" }}>
                            <Space
                                direction="vertical"
                                style={{ textAlign: "start" }}
                            >
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            Select: {
                                                optionActiveBg:
                                                    "rgba(0, 0, 0, 0.15)",
                                            },
                                        },
                                    }}
                                >
                                    <InvoiceSelect
                                        label="Product"
                                        width={380}
                                        id="productSearch"
                                        value={productData?.name}
                                        onSelect={(_, selectedProduct) => {
                                            if (
                                                (
                                                    selectedProduct as ProductOption
                                                )?.customValue
                                            ) {
                                                setProductData(prev => ({
                                                    ...prev,
                                                    ...(
                                                        selectedProduct as ProductOption
                                                    ).customValue,
                                                }));
                                            }
                                        }}
                                        onClear={() => setProductData(null)}
                                        options={productsAsOptions}
                                        filterOption={(input, option) =>
                                            option?.label
                                                ?.toString()
                                                .toLowerCase()
                                                .includes(
                                                    input.toLowerCase()
                                                ) ?? false
                                        }
                                        placeholder="Select Product"
                                        showSearch
                                        allowClear
                                    />
                                </ConfigProvider>
                            </Space>
                            <Space
                                direction="vertical"
                                style={{
                                    textAlign: "start",
                                }}
                            >
                                <InvoiceInput
                                    label="Company"
                                    width="110px"
                                    value={productData?.company}
                                    onChange={event =>
                                        setProductData(prev =>
                                            prev === null
                                                ? null
                                                : {
                                                      ...prev,
                                                      company:
                                                          event.target.value,
                                                  }
                                        )
                                    }
                                    className="invoiceInputFields"
                                />
                            </Space>
                            <Space
                                direction="vertical"
                                style={{
                                    textAlign: "start",
                                }}
                            >
                                <InvoiceInput
                                    label="Quantity"
                                    value={productData?.quantity}
                                    id="quantityField"
                                    onChange={event =>
                                        setProductData(prev =>
                                            prev === null
                                                ? null
                                                : {
                                                      ...prev,
                                                      quantity: Number(
                                                          event.target.value
                                                      ),
                                                  }
                                        )
                                    }
                                    ref={quantityRef}
                                />
                            </Space>
                            <Space
                                direction="vertical"
                                style={{
                                    textAlign: "start",
                                }}
                            >
                                <InvoiceInput
                                    label="Pack"
                                    value={productData?.packingType}
                                    id="packingTypeField"
                                    onChange={event =>
                                        setProductData(prev =>
                                            prev === null
                                                ? null
                                                : {
                                                      ...prev,
                                                      packingType:
                                                          event.target.value,
                                                  }
                                        )
                                    }
                                />
                            </Space>
                            <Space
                                direction="vertical"
                                style={{
                                    textAlign: "start",
                                }}
                            >
                                <InvoiceInput
                                    label="Mf Date"
                                    value={productData?.manufacturingDate?.toString()}
                                    id="manufacturingDateField"
                                />
                            </Space>
                            <Space
                                direction="vertical"
                                style={{
                                    textAlign: "start",
                                }}
                            >
                                <InvoiceInput
                                    label="Exp Date"
                                    value={productData?.expiryDate?.toString()}
                                    id="expiryDateField"
                                />
                            </Space>
                            <Space
                                direction="vertical"
                                style={{
                                    textAlign: "start",
                                }}
                            >
                                <InvoiceInput
                                    label="SGST"
                                    value={productData?.sGst}
                                    id="sGstField"
                                    onChange={event =>
                                        setProductData(prev =>
                                            prev === null
                                                ? null
                                                : {
                                                      ...prev,
                                                      sGst: Number(
                                                          event.target.value
                                                      ),
                                                  }
                                        )
                                    }
                                />
                            </Space>
                            <Space
                                direction="vertical"
                                style={{
                                    textAlign: "start",
                                }}
                            >
                                <InvoiceInput
                                    label="CGST"
                                    value={productData?.cGst}
                                    id="cGstField"
                                    onChange={event =>
                                        setProductData(prev =>
                                            prev === null
                                                ? null
                                                : {
                                                      ...prev,
                                                      cGst: Number(
                                                          event.target.value
                                                      ),
                                                  }
                                        )
                                    }
                                />
                            </Space>
                            <Space
                                direction="vertical"
                                style={{
                                    textAlign: "start",
                                }}
                            >
                                <InvoiceInput
                                    label="IGST"
                                    value={productData?.iGst}
                                    id="iGstField"
                                    onChange={event =>
                                        setProductData(prev =>
                                            prev === null
                                                ? null
                                                : {
                                                      ...prev,
                                                      iGst: Number(
                                                          event.target.value
                                                      ),
                                                  }
                                        )
                                    }
                                />
                            </Space>
                            <Space
                                direction="vertical"
                                style={{
                                    textAlign: "start",
                                }}
                            >
                                <InvoiceInput
                                    label="Discount"
                                    value={discount}
                                    id="discountField"
                                    onChange={event =>
                                        setDiscount(Number(event.target.value))
                                    }
                                    ref={discountRef}
                                />
                            </Space>
                            <Space
                                direction="vertical"
                                style={{
                                    textAlign: "start",
                                }}
                            >
                                <InvoiceInput
                                    label="Mrp"
                                    value={productData?.mrp}
                                    id="mrpField"
                                    onChange={event =>
                                        setProductData(prev =>
                                            prev === null
                                                ? null
                                                : {
                                                      ...prev,
                                                      mrp: Number(
                                                          event.target.value
                                                      ),
                                                  }
                                        )
                                    }
                                />
                            </Space>
                            <Space
                                direction="vertical"
                                style={{
                                    textAlign: "start",
                                }}
                            >
                                <InvoiceInput
                                    label="Rate"
                                    value={productData?.rate}
                                    id="rateField"
                                    className="invoiceInputFields rateInputFields"
                                    onChange={event =>
                                        setProductData(prev =>
                                            prev === null
                                                ? null
                                                : {
                                                      ...prev,
                                                      rate: Number(
                                                          event.target.value
                                                      ),
                                                  }
                                        )
                                    }
                                    onKeyUp={onKeyupRateField}
                                />
                            </Space>
                            <Space
                                direction="vertical"
                                style={{
                                    textAlign: "start",
                                    margin: "31px 0 0 20px",
                                }}
                            >
                                <Button
                                    type="primary"
                                    id="addButton"
                                    onClick={onClickAddButton}
                                    icon={<PlusCircleOutlined />}
                                >
                                    Add
                                </Button>
                            </Space>
                        </Row>
                        <Row style={{ marginTop: "20px" }}>
                            <Table
                                bordered
                                columns={invoiceItemsColumns}
                                dataSource={invoiceData?.items}
                                scroll={{
                                    y: 270,
                                }}
                                pagination={false}
                            ></Table>
                        </Row>
                    </Card>
                </Col>
            </div>
        </>
    );
};
