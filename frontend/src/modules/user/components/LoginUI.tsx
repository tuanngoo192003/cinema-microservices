import {Button, Checkbox, Col, Form, FormProps, Image, Input, Layout, Row, Typography} from "antd";
import {ILoginForm} from "../models/auth.ts";
import betacinema from "../../../assets/betacinema.png";
import "../../../App.css"
import * as React from "react";
import {Content} from "antd/es/layout/layout";
import {HomeOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useAuth} from "../hooks";
const { Title } = Typography;
import { useNavigate, useLocation } from "react-router-dom";
import {useEffect, useState} from "react";
import {ACCESS_TOKEN_KEY} from "../../core/constants/storage.ts";
import Cookies from "js-cookie";
import {HOME, LOGIN, REGISTER} from "../../core/constants/redirectURI.ts";

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isUserLogin, setIsUserLogin] = useState(!!Cookies.get(ACCESS_TOKEN_KEY));

    useEffect(() => {
        const checkAuth = () => {
            setIsUserLogin(!!Cookies.get(ACCESS_TOKEN_KEY));
        };
        window.addEventListener("storage", checkAuth);
        return () => {
            window.removeEventListener("storage", checkAuth);
        };
    }, []);

    useEffect(() => {
        if (isUserLogin && location.pathname === LOGIN) {
            navigate(HOME, { replace: true });
        }
    }, [isUserLogin, location.pathname, navigate]);


    const { t } = useTranslation();
    const { handleLogin } = useAuth();
    const onFinish: FormProps<ILoginForm>['onFinish'] = (values) => {
        console.log('Success', values)
        handleLogin(values);
    }
    const onFinishFailed: FormProps<ILoginForm>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed', errorInfo)
    }
    return (
        <>
            <div style={{ position: "absolute", zIndex: 999, top: 20, right: 20 }}>
                <Link to={HOME}><HomeOutlined className="icon-default" /></Link>
            </div>
            <Layout className="app-theme" style={{ minHeight: "100vh", overflow: "hidden" }}>
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
                        <Col xs={24} md={14} className="default-center-container">
                            <div style={{ width: "100%", maxWidth: "70%", textAlign: "left" }}>
                                <Title level={3} >Absolute Cinema</Title>

                                <Form
                                    name="basic"
                                    layout="vertical"
                                    initialValues={{
                                        identifier: "golangintern@2025lab.io",
                                        password: "VTI123456",
                                        remember: true }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        label={t("labels.username")}
                                        name="identifier"
                                        rules={[{ required: true, message: t("messages.required.username") }]}
                                    >
                                        <Input className="app-input" />
                                    </Form.Item>
                                    <Form.Item
                                        label={t("labels.password")}
                                        name="password"
                                        rules={[{ required: true, message: t("messages.required.password") }]}
                                    >
                                        <Input.Password className="app-input" />
                                    </Form.Item>
                                    <Form.Item name="remember" valuePropName="checked">
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            width: "100%"
                                        }}>
                                            <Checkbox className="app-checkbox" >{t("labels.remember")}</Checkbox>
                                            <Link className="app-link" to={REGISTER} >{t("labels.register_here")}</Link>
                                        </div>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button className="app-btn" htmlType="submit" block>
                                            {t("labels.login")}
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </>
    )
};
export default LoginForm;