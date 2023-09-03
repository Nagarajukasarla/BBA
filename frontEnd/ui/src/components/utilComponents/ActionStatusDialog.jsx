import React, { useEffect } from 'react';
import { message } from 'antd';

export const ActionStatusDialog = ({ type, info }) => {

    const [messageApi, contextHolder] = message.useMessage();
    const responseModal = () => {
        messageApi.open({
            type: `${type}`,
            content : `${info}`,
        });
    }

    useEffect(() => {
        responseModal();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <>
            {contextHolder}
        </>
    )

}