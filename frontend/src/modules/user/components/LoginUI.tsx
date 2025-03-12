import {Button, Checkbox, Col, Form, FormProps, Image, Input, Layout, Row, Typography} from "antd";
import {ILoginForm} from "../models/auth.ts";
import betacinema from "../../../assets/betacinema.png";
import * as React from "react";
import {Content} from "antd/es/layout/layout";
const { Title } = Typography;

const onFinish: FormProps<ILoginForm>['onFinish'] = (values) => {
    console.log('Success', values)
}

const onFinishFailed: FormProps<ILoginForm>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed', errorInfo)
}

const LoginForm: React.FC = () => (
    <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
        <Content>
            <Row gutter={[16, 16]} justify="center" align="middle" style={{ height: "100vh" }}>
                {/* Left Column (40%) */}
                <Col xs={24} md={10} style={{ height: "100%" }}>
                    <Image
                        src={betacinema}
                        alt="Example Image"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </Col>

                {/* Right Column (60%) */}
                <Col xs={24} md={14} style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "100%", maxWidth: "70%", textAlign: "center" }}>
                        <Title level={3}>Sigma Cinema</Title>

                        <Form
                            name="basic"
                            layout="vertical"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: "Please input your username!" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: "Please input your password!" }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item name="remember" valuePropName="checked">
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" block>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Content>
    </Layout>
);
export default LoginForm;