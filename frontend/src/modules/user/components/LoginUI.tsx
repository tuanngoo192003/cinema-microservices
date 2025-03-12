import {Button, Checkbox, Col, Form, FormProps, Image, Input, Layout, Row, Typography} from "antd";
import {ILoginForm} from "../models/auth.ts";
import * as React from "react";
import {Content, Header} from "antd/es/layout/layout";
const { Title } = Typography;

const onFinish: FormProps<ILoginForm>['onFinish'] = (values) => {
    console.log('Success', values)
}

const onFinishFailed: FormProps<ILoginForm>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed', errorInfo)
}

const LoginForm: React.FC = () => (
    <Layout style={{ minHeight: "100vh" }}>
        {/* Header */}
        <Header style={{ background: "#001529", color: "white", textAlign: "center" }}>
            <Title level={3} style={{ color: "white", margin: 0 }}>Ant Design Grid Layout</Title>
        </Header>

        {/* Main Content */}
        <Content style={{ padding: "24px" }}>
            <Row gutter={[16, 16]} justify="center" style={{ maxWidth: 1200, margin: "0 auto" }}>
                {/* Left Column (40%) */}
                <Col xs={24} md={10}>
                    <Image
                        src="https://www.vietvisiontravel.com/wp-content/uploads/2017/07/cgv-vincom-ba-trieu-cinema-hanoi.jpg"
                        alt="Example Image"
                        className="w-full h-full object-cover"
                    />
                </Col>

                {/* Right Column (60%) */}
                <Col xs={24} md={14}>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        className="w-full"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Content>
    </Layout>
);
export default LoginForm;