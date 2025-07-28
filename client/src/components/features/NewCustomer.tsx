import { Form, Row } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
import CInputField from "../core/CInputField";

const NewCustomer = forwardRef((_, ref) => {

    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [gstin, setGstin] = useState<string>("");
    const [billPeriod, setBillPeriod] = useState<string>("");
    const [defaultDiscount, setDefaultDiscount] = useState<string>("");
    const [street, setStreet] = useState<string>("");
    const [area, setArea] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [town, setTown] = useState<string>("");
    const [pincode, setPincode] = useState<string>("");
    const [state, setState] = useState<string>("");

    const [form] = Form.useForm();

    useImperativeHandle(ref, () => ({
        submit: () => {
            form.submit();
        },
        reset: () => form.resetFields()
    }));
    
    const handleFinish = (values: any) => {
        console.log("Form submitted: " + JSON.stringify(values));
        form.resetFields();
    }

    return (
        <>
            {/* Don't know whether to place Form here are outside this component bcoz of it is calling Antd Modal */}
            <Form form={form} onFinish={handleFinish}>
                <Row style={{ rowGap: 12, gap: 17, padding: "20px 0" }}>
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Enter Name"
                            }
                        ]}
                    >
                        <CInputField
                            label="Name"
                            value={name}
                            width={250}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: "Enter Phone"
                            }
                        ]}
                    >
                        <CInputField
                            label="Phone"
                            value={phone}
                            width={200}
                            onChange={(event) => setPhone(event.target.value)}
                            required
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                    >
                        <CInputField
                            label="Email"
                            value={email}
                            width={200}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        name="gstin"
                        rules={[
                            {
                                required: true,
                                message: "Enter Gstin"
                            }
                        ]}
                    >
                        <CInputField
                            label="Gstin"
                            value={gstin}
                            width={200}
                            onChange={(event) => setGstin(event.target.value)}
                            required
                        />
                    </Form.Item>
                    <Form.Item
                        name="billPeriod"
                        rules={[
                            {
                                required: true,
                                message: "Enter Bill Period"
                            }
                        ]}
                    >
                        <CInputField
                            label="Bill Period"
                            value={billPeriod}
                            width={100}
                            onChange={(event) => setBillPeriod(event.target.value)}
                            required
                        />
                    </Form.Item>
                    <Form.Item
                        name="defaultDiscount"
                        rules={[
                            {
                                required: true,
                                message: "Enter Discount"
                            }
                        ]}
                    >
                        <CInputField
                            label="Default Discount"
                            value={defaultDiscount}
                            width={100}
                            onChange={(event) => setDefaultDiscount(event.target.value)}
                            required
                        />
                    </Form.Item>
                    <Form.Item
                        name="state"
                        rules={[
                            {
                                required: true,
                                message: "Select State"
                            }
                        ]}
                    >
                        <CInputField
                            label="State"
                            value={state}
                            width={200}
                            onChange={(event) => setState(event.target.value)}
                            required
                        />
                    </Form.Item>
                    <Form.Item
                        name="city"
                        rules={[
                            {
                                required: true,
                                message: "Select City"
                            }
                        ]}
                    >
                        <CInputField
                            label="City"
                            value={city}
                            width={100}
                            onChange={(event) => setCity(event.target.value)}
                            required
                        />
                    </Form.Item>
                    <Form.Item
                        name="town"
                        rules={[
                            {
                                required: true,
                                message: "Select Town/Village"
                            }
                        ]}
                    >
                        <CInputField
                            label="Town/Village"
                            value={town}
                            width={150}
                            onChange={(event) => setTown(event.target.value)}
                            required
                        />
                    </Form.Item>
                    <Form.Item
                        name="area"
                    >
                        <CInputField
                            label="Area"
                            value={area}
                            width={100}
                            onChange={(event) => setArea(event.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        name="street"
                    >
                        <CInputField
                            label="Street"
                            value={street}
                            width={150}
                            onChange={(event) => setStreet(event.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        name="pincode"
                        rules={[
                            {
                                required: true,
                                message: "Enter Pincode"
                            }
                        ]}
                    >
                        <CInputField
                            label="Pincode"
                            value={pincode}
                            width={100}
                            onChange={(event) => setPincode(event.target.value)}
                            required
                        />
                    </Form.Item>
                </Row>
            </Form>
        </>
    );
});
export default NewCustomer;