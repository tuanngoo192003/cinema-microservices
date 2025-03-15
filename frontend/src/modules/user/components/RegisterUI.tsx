import * as React from "react";
import "../../../App.css"
import {Col, Form, Card, FormProps, Layout, Row, Input, DatePicker, Button} from "antd";
import {Content} from "antd/es/layout/layout";
import {ILoginForm} from "../models/auth.ts";
import {useTranslation} from "react-i18next";
import watchingmovie from "../../../assets/watchingmovie.png";
import {useNavigate} from "react-router-dom";

const onFinish: FormProps<ILoginForm>['onFinish'] = (values) => {
    console.log('Success', values)
}

const onFinishFailed: FormProps<ILoginForm>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed', errorInfo)
}

export const RegisterForm: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const backToLogin = () => {
        navigate("/login");
    };
    return (
        <>
            <div style={{ minHeight: "100vh" }}>
                <Layout className="app-theme" style={{ minHeight: "90vh", overflow: "hidden", paddingBottom: "3rem" }}>
                    <Content style={{ marginTop: "4rem"}}>
                        <Row justify="center" align="middle" >
                            <Col span={24} className="default-center-container">
                                <Card
                                    title={t("labels.register_form")}
                                    className="app-card"
                                    hoverable
                                    cover={<img alt="example" src={watchingmovie} />}
                                >
                                    <Form
                                        name="basic"
                                        layout="vertical"
                                        initialValues={{ remember: true }}
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                        autoComplete="off"
                                    >
                                        <Form.Item
                                            label={t("labels.username")}
                                            name="username"
                                            rules={[{ required: true, message: t("messages.required.username") }]}
                                        >
                                            <Input className="app-input" />
                                        </Form.Item>
                                        <Form.Item
                                            label={t("labels.email")}
                                            name="email"
                                            rules={[{ required: true, message: t("messages.required.email") }]}
                                        >
                                            <Input className="app-input" />
                                        </Form.Item>
                                        <Form.Item
                                            label={t("labels.password")}
                                            name="email"
                                            rules={[{ required: true, message: t("messages.required.password") }]}
                                        >
                                            <Input className="app-input" />
                                        </Form.Item>
                                        <Form.Item
                                            label={t("labels.first_name")}
                                            name="first_name"
                                            rules={[{ required: true, message: t("messages.required.first_name") }]}
                                        >
                                            <Input className="app-input" />
                                        </Form.Item>
                                        <Form.Item
                                            label={t("labels.last_name")}
                                            name="last_name"
                                            rules={[{ required: true, message: t("messages.required.last_name") }]}
                                        >
                                            <Input className="app-input" />
                                        </Form.Item>
                                        <Form.Item
                                            label={t("labels.phone_number")}
                                            name="phone_number"
                                            rules={[{ required: true, message: t("messages.required.phone_number") }]}
                                        >
                                            <Input className="app-input" />
                                        </Form.Item>
                                        <Form.Item
                                            label={t("labels.date_of_birth")}
                                            name="date_of_birth"
                                            rules={[{ required: true, message: t("messages.required.date_of_birth") }]}
                                        >
                                            <DatePicker className="app-input" style={{width: "100%"}}/>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button className="app-btn" htmlType="submit" block>
                                                {t("labels.register")}
                                            </Button>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button className="secondary-btn" onClick={backToLogin}>
                                                {t("labels.back_to_login")}
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Card>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </div>
        </>
    )
}