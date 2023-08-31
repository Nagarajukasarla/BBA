import React from "react";
import { Col, Row, Typography, Space, Button, Table, Tooltip } from "antd";
import { PlusCircleOutlined, EditOutlined } from "@ant-design/icons";

export const Stocks = () => {
    const data = [
        {
            name: "Panadol Extra",
            company: "GSK",
            quanity: 100,
            manufacturingDate: "01/01/2023",
            expiryDate: "31/12/2024",
            sGst: 5,
            cGst: 5,
            iGst: 10,
            discount: 2,
            price: 1000,
        },
        {
            name: "Crocin",
            company: "Dr Reddy's",
            quanity: 200,
            manufacturingDate: "15/02/2023",
            expiryDate: "15/02/2025",
            sGst: 6,
            cGst: 6,
            iGst: 12,
            discount: 3,
            price: 2000,
        },
        {
            name: "Dolo 650",
            company: "Cipla",
            quanity: 300,
            manufacturingDate: "08/03/2023",
            expiryDate: "08/03/2026",
            sGst: 5,
            cGst: 5,
            iGst: 10,
            discount: 4,
            price: 3000,
        },
        {
            name: "Napa Extra",
            company: "Sun Pharma",
            quanity: 400,
            manufacturingDate: "15/04/2023",
            expiryDate: "15/04/2027",
            sGst: 6,
            cGst: 6,
            iGst: 12,
            discount: 5,
            price: 4000,
        },
        {
            name: "Calpol",
            company: "Reckitt Benckiser",
            quanity: 500,
            manufacturingDate: "01/03/2023",
            expiryDate: "31/03/2025",
            sGst: 5,
            cGst: 5,
            iGst: 10,
            discount: 1,
            price: 5000,
        },
        {
            name: "Dolo Cough Syrup",
            company: "Dabur",
            quanity: 600,
            manufacturingDate: "15/04/2023",
            expiryDate: "15/04/2026",
            sGst: 6,
            cGst: 6,
            iGst: 12,
            discount: 2,
            price: 6000,
        },
        {
            name: "Neosporin",
            company: "Johnson & Johnson",
            quanity: 700,
            manufacturingDate: "08/05/2023",
            expiryDate: "08/05/2027",
            sGst: 5,
            cGst: 5,
            iGst: 10,
            discount: 3,
            price: 7000,
        },
        {
            name: "Vicks Vaporub",
            company: "Procter & Gamble",
            quanity: 800,
            manufacturingDate: "15/06/2023",
            expiryDate: "15/06/2028",
            sGst: 6,
            cGst: 6,
            iGst: 12,
            discount: 4,
            price: 8000,
        },
        {
            name: "Tylenol",
            company: "McNeil Consumer Healthcare",
            quanity: 900,
            manufacturingDate: "01/07/2023",
            expiryDate: "31/07/2025",
            sGst: 5,
            cGst: 5,
            iGst: 10,
            discount: 5,
            price: 9000,
        },
        {
            name: "Clearasil",
            company: "Beiersdorf",
            quanity: 1000,
            manufacturingDate: "15/08/2023",
            expiryDate: "15/08/2026",
            sGst: 6,
            cGst: 6,
            iGst: 12,
            discount: 6,
            price: 10000,
        },
        {
            name: "Band-Aid",
            company: "Johnson & Johnson",
            quanity: 1100,
            manufacturingDate: "08/09/2023",
            expiryDate: "08/09/2027",
            sGst: 5,
            cGst: 5,
            iGst: 10,
            discount: 7,
            price: 11000,
        },
        {
            name: "Benadryl",
            company: "Johnson & Johnson",
            quanity: 1200,
            manufacturingDate: "15/10/2023",
            expiryDate: "15/10/2028",
            sGst: 6,
            cGst: 6,
            iGst: 12,
            discount: 8,
            price: 12000,
        },
        {
            name: "Advil",
            company: "Pfizer",
            quanity: 1300,
            manufacturingDate: "01/11/2023",
            expiryDate: "31/11/2025",
            sGst: 5,
            cGst: 5,
            iGst: 10,
            discount: 9,
            price: 13000,
        },
        {
            name: "Cetaphil",
            company: "Galderma",
            quanity: 1400,
            manufacturingDate: "15/12/2023",
            expiryDate: "15/12/2026",
            sGst: 6,
            cGst: 6,
            iGst: 12,
            discount: 10,
            price: 14000,
        },
        {
            name: "Listerine",
            company: "Johnson & Johnson",
            quanity: 1500,
            manufacturingDate: "08/01/2024",
            expiryDate: "08/01/2027",
            sGst: 5,
            cGst: 5,
            iGst: 10,
            discount: 11,
            price: 15000,
        },
        {
            name: "Pepto-Bismol",
            company: "Church & Dwight",
            quanity: 1600,
            manufacturingDate: "15/02/2024",
            expiryDate: "15/02/2028",
            sGst: 6,
            cGst: 6,
            iGst: 12,
            discount: 12,
            price: 16000,
        }
    ];

    const stockColumns = [
        {
            key: "1",
            title: "S.No",
            dataIndex: "id",
            width: "5%",
        },
        {
            key: "2",
            title: "Name",
            dataIndex: "name",
            width: "50%",
        },
        {
            key: "3",
            title: "Quantity",
            dataIndex: "quantity",
            width: "8%",
        },
        {
            key: "4",
            title: "Pending",
            dataIndex: "pendingAmount",
            width: "8%",
        },
        {
            key: "5",
            title: "Manufacturing Date",
            dataIndex: "manufacturingDate",
            width: "6%",
        },
        {
            key: "5",
            title: "Expiry Date",
            dataIndex: "manufacturingDate",
            width: "6%",
        },
        {
            key: "5",
            title: "SGST",
            dataIndex: "sGst",
            width: "4%",
        },
        {
            key: "5",
            title: "CGST",
            dataIndex: "cGst",
            width: "4%",
        },
        {
            key: "5",
            title: "IGST",
            dataIndex: "iGst",
            width: "4%",
        },
        {
            key: "5",
            title: "Discount",
            dataIndex: "discount",
            width: "6%",
        },
        {
            key: "5",
            title: "Price",
            dataIndex: "price",
            width: "6%",
        },
        {
            title: "Action",
            key: "action",
            render: () => (
                <>
                    <Tooltip title="Edit">
                        <EditOutlined className="editRecord" />
                    </Tooltip>
                </>
            ),
        },
    ];

    const onClickAddStock = () => {
        console.log("clicked");
    };

    return (
        <div className="stocksWrapper">
            <Col span={24}>
                <Space direction="vertical" size={"large"}>
                    <Row style={{ padding: "0 20px" }}>
                        <Typography.Title level={4}>Stocks</Typography.Title>
                    </Row>
                    <Row style={{ padding: "0 20px" }}>
                        <Space direction="horizontal" size={"large"}>
                            <Button
                                onClick={onClickAddStock}
                                type="primary"
                                shape="round"
                                size="large"
                            >
                                Add Stock
                                <PlusCircleOutlined />
                            </Button>
                        </Space>
                    </Row>
                    <Row style={{ padding: "0 20px 10px 20px" }}>
                        <Space
                            direction="vertical"
                            size={"large"}
                            style={{
                                textAlign: "start",
                                marginTop: "20px",
                                width: "80vw",
                            }}
                        >
                            <p className="customerHeader">My Customers</p>
                            <Table
                                columns={stockColumns}
                                dataSource={data}
                                pagination={false}
                            ></Table>
                        </Space>
                    </Row>
                </Space>
            </Col>
        </div>
    );
};
