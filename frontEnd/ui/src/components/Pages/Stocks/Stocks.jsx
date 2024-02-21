import React, { useEffect, useState } from "react";
import { Col, Row, Typography, Space, Button, Table } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
    authenticate,
    getAllProducts,
} from "../../../services/api/get/authorizedGetServices";
import { getToken } from "../../../services/cookies/tokenUtils";
import { getYearMonthFormat } from "../../../services/utils/dateFormater";

export const Stocks = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [products, setProducts] = useState([{}]);
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
            const response = await getAllProducts(getToken());
            if (response && response.length > 0) {
                const mappedProducts = response.map((item) => ({
                    key: item.id,
                    product: item.name,
                    batchNumber: item.batchNumber,
                    company: item.company,
                    quantity: item.quantity,
                    manufacturingDate: getYearMonthFormat(item.manufacturingDate),
                    expiryDate: getYearMonthFormat(item.expiryDate),
                    sGst: item.sGstInPercent,
                    cGst: item.cGstInPercent,
                    iGst: item.iGstInPercent,
                    rate: item.rate,
                    mrp: item.mrp
                }));
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
        if (checkAuthentication(getToken())) {
            setLoading(true);
            fetchProducts().then(() => setLoading(false));
            getYearMonthFormat(products.at(0).manufacturingDate);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const refreshProducts = () => {
        fetchProducts();
        console.log("Refreshed products: " + JSON.stringify(products, null, 2));
    };


    const columns = [
        {
            key: "productColumn",
            title: "Product",
            dataIndex: "product",
            width: "7%",
        },
        {
            key: "batchNumberColumn",
            title: "Batch",
            dataIndex: "batchNumber",
            width: "5%"
        },
        {
            key: "companyColumn",
            title: "Company",
            dataIndex: "company",
            width: "7%",
        },
        {
            key: "quantityColumn",
            title: "Quantity",
            dataIndex: "quantity",
            width: "4%",
        },
        {
            key: "mfDateColumn",
            title: "Mf Date",
            dataIndex: "manufacturingDate",
            width: "4%",
        },
        {
            key: "expDateColumn",
            title: "Exp Date",
            dataIndex: "expiryDate",
            width: "4%",
        },
        {
            key: "sgstColumn",
            title: "SGST",
            dataIndex: "sGst",
            width: "4%",
        },
        {
            key: "cgstColumn",
            title: "CGST",
            dataIndex: "cGst",
            width: "4%",
        },
        {
            key: "igstColumn",
            title: "IGST",
            dataIndex: "iGst",
            width: "4%",
        },
        {
            key: "rateColumn",
            title: "Rate",
            dataIndex: "rate",
            width: "4%",
        },
        {
            key: "mrpColumn",
            title: "Mrp",
            dataIndex: "mrp",
            width: "4%",
        },
    ];

    return (
        <div className="stocksWrapper">
            <Col span={24}>
                <Space direction="vertical" size={"small"}>
                    <Row
                        style={{ padding: "10px 0 0 28px" }}
                        justify={"space-between"}
                    >
                        <Typography.Title level={3}>Stocks {`==> Issue #13 urgent fix for this page`} </Typography.Title>
                        <Space
                            direction="horizontal"
                            size={"large"}
                            align="end"
                        >
                            <Link
                                to={{
                                    pathname: "add",
                                    state: {
                                        obj: null,
                                        isEditable: false,
                                        onProductSaved: refreshProducts,
                                    },
                                }}
                                style={{ textDecoration: "none" }}
                            >
                                <Button
                                    style={{
                                        marginRight: "45px",
                                    }}
                                    // onClick={}
                                    type="primary"
                                    shape="round"
                                    size="large"
                                >
                                    Add Stock
                                    <PlusCircleOutlined />
                                </Button>
                            </Link>
                        </Space>
                    </Row>
                    <Row style={{ padding: "10px 20px 10px 8px" }}>
                        <Space
                            direction="vertical"
                            size={"large"}
                            style={{
                                textAlign: "start",
                                width: "84vw",
                            }}
                        >
                            <Outlet />
                        </Space>
                    </Row>
                    <Row style={{ padding: "0 10px", width: "85vw" }}>
                        <Table
                            bordered
                            columns={columns}
                            dataSource={products}
                            loading={loading}
                            scroll={{
                                y: 470,
                            }}
                            
                        ></Table>
                    </Row>
                </Space>
            </Col>
        </div>
    );
};
