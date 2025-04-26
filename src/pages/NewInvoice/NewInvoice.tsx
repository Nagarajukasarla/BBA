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
    EditOutlined,
    FileAddOutlined,
    MailOutlined,
    ReloadOutlined,
    SaveOutlined,
    PlusCircleOutlined,
} from "@ant-design/icons";
import { InvoiceData, ProductData, InvoiceItem as ComponentInvoiceItem } from "@/types/component";
import { Customer, Product } from "@/types/model";
import { ColumnType } from "antd/es/table";
import type { NoticeType } from 'antd/es/message/interface';

import { InvoiceInput, InvoiceSelect } from "@/components/InvoiceFormFields";
import customerService from "@/services/api/customerService";
import productService from "@/services/api/productService";
import APIResponse from "@/classes/APIResponse";
import CustomerHelper from "@/classes/helpers/CustomerHelper";
import ProductSelectionModal from "@/components/features/ProductSelectionModal";
import { handleFieldNavigation } from "@/utils/newInvoiceKeyboardEvents";

// Import from split files
import { invoiceItemsColumns, paymentModes } from './constants';
import { 
    validateCustomerSelection, 
    validatePaymentModeSelection, 
    validateProductFields 
} from './validators';
import { 
    handleProductSelect, 
    handleFinalProductSelection, 
    findSimilarProducts,
    getProductsAsOptions
} from './handlers';
import { 
    calculateAmount, 
    generateInvoiceItem 
} from './billGenerationHelpers';

interface ProductOption {
    value: string;
    label: string;
    customValue: ProductData;
}

export const NewInvoice: React.FC = () => {
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

    // Modal state
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

    const [discount, setDiscount] = useState<number>(0);

    const [serialNumber, setSerialNumber] = useState(0);

    // Try to remove this if possible
    const [isInvoiceReady, setIsInvoiceReady] = useState(false);

    const [dropdownActiveState, setDropdownActiveState] = useState(false);

    // Message API
    const [messageApi, contextHolder] = message.useMessage();

    // Show message helper
    const showMessage = (type: NoticeType, content: string) => {
        messageApi.open({
            type,
            content,
        });
    };

    // Fetch customers from API
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

    // Fetch selected customer by ID
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

    // Update invoice data when selected customer changes
    useEffect(() => {
        setInvoiceData({
            ...invoiceData,
            customer: selectedCustomer, // Currently we are storing the entire customer object in future we can store only the id
        });
    }, [selectedCustomer]);

    // Fetch products from API
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

    // Reset product data
    const resetProduct = () => {
        setProductData(null);
        setDiscount(invoiceData?.customer?.defaultDiscount ?? 0);
    };

    // Reset invoice data
    const resetInvoiceData = () => {
        setInvoiceData({
            invoiceNumber: "",
            customer: null,
            paymentModeValue: "",
            items: [],
        });

        // Clear local storage
        localStorage.removeItem("invoice");
    };

    // Check if buttons should be disabled
    const checkDisability = () => {
        if (invoiceData?.items?.length < 1) {
            return true;
        }
        return false;
    };

    // Check if reset button should be disabled
    const checkDisabilityForReset = () => {
        if (
            !invoiceData?.customer &&
            !invoiceData?.paymentModeValue &&
            (!invoiceData?.items || invoiceData?.items?.length === 0)
        ) {
            return true;
        }
        return false;
    };

    // Handle product selection with validation
    const handleProductSelectWithValidation = (selectedOption: ProductOption) => {
        if (!selectedOption?.customValue) return;
        
        // Validate customer selection first
        const customerValidation = validateCustomerSelection(invoiceData.customer);
        if (!customerValidation.isValid) {
            showMessage("warning", customerValidation.errorMessage || "");
            return;
        }
        
        // Validate payment mode selection
        const paymentValidation = validatePaymentModeSelection(invoiceData.paymentModeValue);
        if (!paymentValidation.isValid) {
            showMessage("warning", paymentValidation.errorMessage || "");
            return;
        }

        const selectedProduct = selectedOption.customValue;
        const allProducts = productsAsOptions.map(option => option.customValue);

        // Find products with the same name
        const similar = findSimilarProducts(selectedProduct.name, allProducts);

        // Always show modal, even for a single product
        if (similar.length >= 1) {
            setSimilarProducts(similar);
            setModalVisible(true);
        } else {
            // Fallback in case no similar products found (shouldn't happen)
            handleFinalProductSelectionWithState(selectedProduct);
        }
    };

    // Handle final product selection with state updates
    const handleFinalProductSelectionWithState = (product: any) => {
        // First close the modal to prevent focus issues
        setModalVisible(false);
        
        // Create a variable to track if we need to focus
        const needToFocus = !productData || productData.id !== product.id;
        
        // Then update the product data with cleared quantity
        setProductData({
            ...product,
            quantity: 0, // Clear quantity for user input
        });
        
        // Only focus if this is a new product selection
        if (needToFocus) {
            // Use a longer timeout to ensure DOM updates are complete
            setTimeout(() => {
                const quantityField = document.getElementById("quantityField");
                if (quantityField) {
                    // Focus and select the quantity field
                    (quantityField as HTMLInputElement).focus();
                    (quantityField as HTMLInputElement).select();
                    
                    // Create a more robust focus management approach
                    // Set up multiple attempts to ensure focus stays on quantity field
                    const focusAttempts = [100, 300, 600, 1000];
                    
                    focusAttempts.forEach(delay => {
                        setTimeout(() => {
                            if (document.activeElement !== quantityField) {
                                (quantityField as HTMLInputElement).focus();
                                (quantityField as HTMLInputElement).select();
                            }
                        }, delay);
                    });
                }
            }, 200);
        }
    };

    // Add button click handler with validation
    const onClickAddButton = (): void => {
        // Validate customer selection first
        const customerValidation = validateCustomerSelection(invoiceData.customer);
        if (!customerValidation.isValid) {
            showMessage("warning", customerValidation.errorMessage || "");
            return;
        }
        
        // Validate payment mode selection
        const paymentValidation = validatePaymentModeSelection(invoiceData.paymentModeValue);
        if (!paymentValidation.isValid) {
            showMessage("warning", paymentValidation.errorMessage || "");
            return;
        }
        
        // Validate product fields
        const productValidation = validateProductFields(productData);
        if (!productValidation.isValid) {
            showMessage("warning", productValidation.errorMessage || "");
            return;
        }
        
        try {
            // Generate the invoice item
            const newItem = generateInvoiceItem(
                productData as ProductData,
                discount,
                invoiceData?.items?.length
            );
            
            // Add the item to the invoice
            setInvoiceData({
                ...invoiceData,
                items: [...invoiceData.items, newItem],
            });
            
            // Reset product data and focus on product search
            resetProduct();
            
            // Focus the product search dropdown
            const productSearchDropdown = document.getElementById("productSearch");
            productSearchDropdown?.focus();
        } catch (error) {
            showMessage("error", error instanceof Error ? error.message : "Failed to generate invoice item");
        }
    };

    // Initialize component
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

    // Handle keyboard navigation for form fields
    const handleKeyUp = (
        e: React.KeyboardEvent<HTMLInputElement>,
        fieldId: string
    ) => {
        handleFieldNavigation(e, fieldId);
    };

    return (
        <>
            {contextHolder}

            {/* Product Selection Modal */}
            <ProductSelectionModal
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                onSelect={handleFinalProductSelectionWithState}
                products={similarProducts}
            />
            <div className="newInvoiceWrapper">
                <Col span={24}>
                    <Row style={{ margin: "8px 5px 8px 5px" }} justify="space-between" align="middle">
                        <Typography.Title
                            level={4}
                            className="customerDropdownTitle"
                        >
                            New Invoice
                        </Typography.Title>
                        <Row>
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
                                        // Validate customer selection first
                                        const customerValidation = validateCustomerSelection(invoiceData.customer);
                                        if (!customerValidation.isValid) {
                                            showMessage(
                                                "warning",
                                                customerValidation.errorMessage ||
                                                    ""
                                            );
                                            return;
                                        }
                                        setInvoiceData({
                                            ...invoiceData,
                                            paymentModeValue:
                                                event.target.value,
                                        });

                                        const productSearchDropdown =
                                            document.getElementById(
                                                "productSearch"
                                            );
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
                                                handleProductSelectWithValidation(
                                                    selectedProduct as ProductOption
                                                );
                                            }
                                        }}
                                        onKeyDown={e => {
                                            // Handle Enter key press on dropdown
                                            if (
                                                e.key === "Enter" &&
                                                productsAsOptions.length > 0
                                            ) {
                                                e.preventDefault();
                                                e.stopPropagation();

                                                // Find the highlighted option in the dropdown
                                                const highlightedOption =
                                                    document.querySelector(
                                                        ".ant-select-item-option-active, .ant-select-item-option-selected"
                                                    ) as HTMLElement;

                                                if (highlightedOption) {
                                                    // Get the data-value attribute which contains the product ID
                                                    const productId =
                                                        highlightedOption.getAttribute(
                                                            "data-value"
                                                        );
                                                    if (productId) {
                                                        // Find the product option with this ID
                                                        const selectedOption =
                                                            productsAsOptions.find(
                                                                option =>
                                                                    option.value ===
                                                                    productId
                                                            );

                                                        if (selectedOption) {
                                                            // Manually trigger product selection
                                                            handleProductSelectWithValidation(
                                                                selectedOption
                                                            );
                                                        }
                                                    }
                                                }
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
                                    disabled={true}
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
                                    onKeyUp={e =>
                                        handleKeyUp(e, "quantityField")
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
                                    disabled={true}
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
                                    disabled={true}
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
                                    disabled={true}
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
                                    disabled={true}
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
                                    disabled={true}
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
                                    disabled={true}
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
                                    onKeyUp={e => handleKeyUp(e, "rateField")}
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
                                    onKeyUp={e => handleKeyUp(e, "mrpField")}
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
                                    onKeyUp={e =>
                                        handleKeyUp(e, "discountField")
                                    }
                                    ref={discountRef}
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
