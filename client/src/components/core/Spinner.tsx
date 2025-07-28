import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import React from "react";


const Spinner: React.FC = () => {
    return (
        <Flex justify="center" align="center" style={{ height: "100vh" }}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 54 }} spin />} />
        </Flex>
    )
}

export default Spinner;