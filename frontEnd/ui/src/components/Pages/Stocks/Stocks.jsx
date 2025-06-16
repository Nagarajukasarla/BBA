import React, { useEffect, useState } from "react";
import {
    Col,
    Row,
    Typography,
    Space,
    Button,
    Table,
    Input,
    Form,
    Popconfirm,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
    authenticate,
    getAllProducts,
} from "../../../services/api/get/authorizedGetServices";
import { getMonthYearFormat } from "../../../services/utils/common/helpers/client/dateHelpers";
import TokenManager from "../../../services/cookies/TokenManager";
import { createStyles } from "antd-style";

export const Stocks = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [products, setProducts] = useState([{}]);
    const [editable, setEditable] = useState(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const checkAuthentication = async (token) => {
        if (!(await authenticate(token))) {
            console.log("Not authenticated");
            navigate("/login");
            return false;
        }
        return true;
    };

    const fetchProducts = async () => {
        try {
            const response = await getAllProducts(TokenManager.getToken());
            if (response && response.length > 0) {
                const mappedProducts = response.map((item) => ({
                    key: item.id,
                    hsnNumber: item.hsnNumber,
                    product: item.name,
                    batchNumber: item.batchNumber,
                    company: item.company,
                    packingType: item.packingType,
                    quantity: item.quantity,
                    manufacturingDate: getMonthYearFormat(
                        item.manufacturingDate
                    ),
                    expiryDate: getMonthYearFormat(item.expiryDate),
                    sGst: item.sgstInPercent,
                    cGst: item.cgstInPercent,
                    iGst: item.igstInPercent,
                    rate: item.rate,
                    mrp: item.mrp,
                }));
                console.log(JSON.stringify(mappedProducts));
                setProducts(mappedProducts);
            } else {
                throw new Error("Data not found");
            }
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        document.title = "Stocks";
        // Check authentication also need to be awaited bcoz it is async
        // So loader need to be called.
        if (checkAuthentication(TokenManager.getToken())) {
            setLoading(true);
            fetchProducts().then(() => setLoading(false));
            getMonthYearFormat(products.at(0).manufacturingDate);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // const { styles } = useStyle();

    const refreshProducts = () => {
        fetchProducts();
        console.log("Refreshed products: " + JSON.stringify(products, null, 2));
    };

    const inputFieldStyles = {
        padding: "6px",
    };

    const addStock = () => {
        navigate("/app/stocks/add");
    };

    const columns = [
        {
            key: "productColumn",
            title: "Product",
            dataIndex: "product",
            width: 170,
            fixed: true,
            render: (_, record) => {
                if (editable === record.key) {
                    return (
                        <Form.Item
                            name="product"
                            noStyle
                            rules={[
                                {
                                    required: true,
                                    message: "Required",
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    ...inputFieldStyles,
                                }}
                            />
                        </Form.Item>
                    );
                } else {
                    return <Typography.Text>{record.product}</Typography.Text>;
                }
            },
        },
        {
            key: "hsnNumberColumn",
            title: "HSN",
            dataIndex: "hsnNumber",
            width: 110,
            render: (_, record) => {
                if (editable === record.key) {
                    return (
                        <Form.Item
                            name="hsnNumber"
                            noStyle
                            rules={[
                                {
                                    required: true,
                                    message: "Required",
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    ...inputFieldStyles,
                                }}
                            />
                        </Form.Item>
                    );
                } else {
                    return (
                        <Typography.Text>{record.hsnNumber}</Typography.Text>
                    );
                }
            },
        },
        {
            key: "batchNumberColumn",
            title: "Batch",
            dataIndex: "batchNumber",
            width: 110,
            render: (_, record) => {
                if (editable === record.key) {
                    return (
                        <Form.Item
                            name="batchNumber"
                            noStyle
                            rules={[
                                {
                                    required: true,
                                    message: "Required",
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    ...inputFieldStyles,
                                }}
                            />
                        </Form.Item>
                    );
                } else {
                    return (
                        <Typography.Text>{record.batchNumber}</Typography.Text>
                    );
                }
            },
        },
        {
            key: "companyColumn",
            title: "Company",
            dataIndex: "company",
            width: 170,
            render: (_, record) => {
                if (editable === record.key) {
                    return (
                        <Form.Item
                            name="company"
                            noStyle
                            rules={[
                                {
                                    required: true,
                                    message: "Required",
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    ...inputFieldStyles,
                                }}
                            />
                        </Form.Item>
                    );
                } else {
                    return <Typography.Text>{record.company}</Typography.Text>;
                }
            },
        },
        {
            key: "quantityColumn",
            title: "Quantity",
            dataIndex: "quantity",
            width: 90,
            render: (_, record) => {
                if (editable === record.key) {
                    return (
                        <Form.Item
                            name="quantity"
                            noStyle
                            rules={[
                                {
                                    required: true,
                                    message: "Required",
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    ...inputFieldStyles,
                                }}
                            />
                        </Form.Item>
                    );
                } else {
                    return <Typography.Text>{record.quantity}</Typography.Text>;
                }
            },
        },
        {
            key: "packingTypeColumn",
            title: "Pack",
            dataIndex: "packingType",
            width: 90,
            render: (_, record) => {
                if (editable === record.key) {
                    return (
                        <Form.Item
                            name="packingType"
                            noStyle
                            rules={[
                                {
                                    required: true,
                                    message: "Required",
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    ...inputFieldStyles,
                                }}
                            />
                        </Form.Item>
                    );
                } else {
                    return (
                        <Typography.Text>{record.packingType}</Typography.Text>
                    );
                }
            },
        },
        {
            key: "mfDateColumn",
            title: "Mf Date",
            dataIndex: "manufacturingDate",
            width: 90,
            render: (_, record) => {
                if (editable === record.key) {
                    return (
                        <Form.Item
                            name="manufacturingDate"
                            noStyle
                            rules={[
                                {
                                    required: true,
                                    message: "Required",
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    ...inputFieldStyles,
                                }}
                            />
                        </Form.Item>
                    );
                } else {
                    return (
                        <Typography.Text>
                            {record.manufacturingDate}
                        </Typography.Text>
                    );
                }
            },
        },
        {
            key: "expDateColumn",
            title: "Exp Date",
            dataIndex: "expiryDate",
            width: 90,
            render: (_, record) => {
                if (editable === record.key) {
                    return (
                        <Form.Item
                            name="expiryDate"
                            noStyle
                            rules={[
                                {
                                    required: true,
                                    message: "Required",
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    ...inputFieldStyles,
                                }}
                            />
                        </Form.Item>
                    );
                } else {
                    return (
                        <Typography.Text>{record.expiryDate}</Typography.Text>
                    );
                }
            },
        },
        {
            key: "sgstColumn",
            title: "SGST",
            dataIndex: "sGst",
            width: 70,
            render: (_, record) => {
                if (editable === record.key) {
                    return (
                        <Form.Item
                            name="sGst"
                            noStyle
                            rules={[
                                {
                                    required: true,
                                    message: "Required",
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    ...inputFieldStyles,
                                }}
                            />
                        </Form.Item>
                    );
                } else {
                    return <Typography.Text>{record.sGst}</Typography.Text>;
                }
            },
        },
        {
            key: "cgstColumn",
            title: "CGST",
            dataIndex: "cGst",
            width: 70,
            render: (_, record) => {
                if (editable === record.key) {
                    return (
                        <Form.Item
                            name="cGst"
                            noStyle
                            rules={[
                                {
                                    required: true,
                                    message: "Required",
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    ...inputFieldStyles,
                                }}
                            />
                        </Form.Item>
                    );
                } else {
                    return <Typography.Text>{record.cGst}</Typography.Text>;
                }
            },
        },
        {
            key: "igstColumn",
            title: "IGST",
            dataIndex: "iGst",
            width: 70,
            render: (_, record) => {
                if (editable === record.key) {
                    return (
                        <Form.Item
                            name="iGst"
                            noStyle
                            rules={[
                                {
                                    required: true,
                                    message: "Required",
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    ...inputFieldStyles,
                                }}
                            />
                        </Form.Item>
                    );
                } else {
                    return <Typography.Text>{record.iGst}</Typography.Text>;
                }
            },
        },
        {
            key: "rateColumn",
            title: "Rate",
            dataIndex: "rate",
            width: 120,
            render: (_, record) => {
                if (editable === record.key) {
                    return (
                        <Form.Item
                            name="rate"
                            noStyle
                            rules={[
                                {
                                    required: true,
                                    message: "Required",
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    ...inputFieldStyles,
                                }}
                            />
                        </Form.Item>
                    );
                } else {
                    return <Typography.Text>{record.rate}</Typography.Text>;
                }
            },
        },
        {
            key: "mrpColumn",
            title: "Mrp",
            dataIndex: "mrp",
            width: 120,
            render: (_, record) => {
                if (editable === record.key) {
                    return (
                        <Form.Item
                            name="mrp"
                            noStyle
                            rules={[
                                {
                                    required: true,
                                    message: "Required",
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    ...inputFieldStyles,
                                }}
                            />
                        </Form.Item>
                    );
                } else {
                    return <Typography.Text>{record.mrp}</Typography.Text>;
                }
            },
        },
        {
            key: "action",
            title: "Action",
            fixed: "right",
            width: 140,
            render: (_, record) => {
                return (
                    <>
                        {!(record.key === editable) ? (
                            <Typography.Link
                                disabled={editable}
                                onClick={() => {
                                    setEditable(record.key);
                                    // console.log("Onclick key: " + record);
                                    form.setFieldsValue({
                                        hsnNumber: record.hsnNumber,
                                        product: record.product,
                                        batchNumber: record.batchNumber,
                                        company: record.company,
                                        packingType: record.packingType,
                                        quantity: record.quantity,
                                        manufacturingDate:
                                            record.manufacturingDate,
                                        expiryDate: record.expiryDate,
                                        sGst: record.sGst,
                                        cGst: record.cGst,
                                        iGst: record.iGst,
                                        rate: record.rate,
                                        mrp: record.mrp,
                                    });
                                }}
                            >
                                Edit
                            </Typography.Link>
                        ) : (
                            <span>
                                <Typography.Link
                                    onClick={() => saveItem(record)}
                                    style={{
                                        marginInlineEnd: 8,
                                    }}
                                >
                                    Save
                                </Typography.Link>
                                <Popconfirm
                                    title="Sure to Cancel?"
                                    onConfirm={() => cancel()}
                                >
                                    <Typography.Link>Cancel</Typography.Link>
                                </Popconfirm>
                            </span>
                        )}
                    </>
                );
            },
        },
    ];

    const saveItem = (record) => {
        let touchedFields = [];
        if (form.isFieldTouched(['product'])) {
            touchedFields.push('prodcut');
        }
        if (form.isFieldTouched(['hsnNumber'])) {
            touchedFields.push('hsnNumber');
        }
        if (form.isFieldTouched(['batchNumber'])) {
            touchedFields.push('batchNumber');
        }
        if (form.isFieldTouched(['company'])) {
            touchedFields.push('company');
        }
        if (form.isFieldTouched(['quantity'])) {
            touchedFields.push('quantity');
        }
        if (form.isFieldTouched(['packingType'])) {
            touchedFields.push('packingType');
        }
        if (form.isFieldTouched(['manufacturingDate'])) {
            touchedFields.push('manufacturingDate');
        }
        if (form.isFieldTouched(['expiryDate'])) {
            touchedFields.push('expiryDate');
        }
        if (form.isFieldTouched(['sGst'])) {
            touchedFields.push('sGst');
        }
        if (form.isFieldTouched(['cGst'])) {
            touchedFields.push('cGst');
        }
        if (form.isFieldTouched(['iGst'])) {
            touchedFields.push('iGst');
        }
        if (form.isFieldTouched(['rate'])) {
            touchedFields.push('rate');
        }
        if (form.isFieldTouched(['mrp'])) {
            touchedFields.push('mrp');
        }

        if (touchedFields.length > 0) {
            let updatedFields = {
                key: record.key
            }
            for (const field of touchedFields) {
                updatedFields[field] = form.getFieldValue(field);
            }
            
            const index = products.findIndex((item) => item.key === record.key);
            const updatedProducts = [...products];

            
            // On success modification in db, item in UI should be modified as below
            updatedProducts[index] = {...products[index], ...updatedFields};
            setProducts(updatedProducts);

            console.log("Updated fields:  " + JSON.stringify(updatedFields));
        }
        else {
            console.log("Nothing is touched");
        }
        
        setEditable(null);
    }

    const cancel = () => {
        setEditable(null);
    }

    return (
        <div className="stocksWrapper">
            <Col span={24}>
                <Space direction="vertical" size={"small"}>
                    <Row
                        style={{ padding: "10px 0 0 28px" }}
                        justify={"space-between"}
                    >
                        <Typography.Title level={3}>
                            Stocks {`==> Issue #13 urgent fix for this page`}{" "}
                        </Typography.Title>
                        <Space
                            direction="horizontal"
                            size={"large"}
                            align="end"
                        >
                            <Button
                                style={{
                                    marginRight: "45px",
                                }}
                                onClick={addStock}
                                type="primary"
                                shape="round"
                                size="large"
                            >
                                Add Stock
                                <PlusCircleOutlined />
                            </Button>
                        </Space>
                    </Row>
                    <Form form={form}>
                        <Row style={{ padding: "0 10px", width: "85vw" }}>
                            {/* <Form> */}
                            <Table
                                bordered
                                columns={columns}
                                dataSource={products}
                                loading={loading}
                                scroll={{
                                    y: 450,
                                    x: "max-content",
                                }}
                            />
                        </Row>
                    </Form>
                </Space>
            </Col>
        </div>
    );
};
