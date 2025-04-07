import React from "react";
import "../../../App.css"
import {Col, Row, Typography} from "antd";
import {Footer} from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import {FacebookOutlined, InstagramOutlined, YoutubeOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";

export const AppFooter: React.FC = () => {
    const { t } = useTranslation();
    return (
        <>
            <Footer style={{ marginTop: "10rem", background: "#403C3AFF", color: "#fff", padding: "2rem 0" }}>
                <Row justify="center" gutter={[40, 16]}>
                    {/* Brand Section */}
                    <Col xs={24} md={8} style={{ textAlign: "center" }}>
                        <Title level={3} style={{ color: "#f39c12" }}>Absolute Cinema</Title>
                        <Typography.Text style={{ color: "#ccc" }}>
                            {t('footer.footer_slogan')}
                        </Typography.Text>
                    </Col>

                    {/* Navigation Links */}
                    <Col xs={24} md={8} style={{ textAlign: "center" }}>
                        <Typography.Text style={{ display: "block", color: "#fff" }}>{t('labels.menu.about')}</Typography.Text>
                        <Typography.Text style={{ display: "block", color: "#fff" }}>{t('labels.menu.contact')}</Typography.Text>
                        <Typography.Text style={{ display: "block", color: "#fff" }}>{t('footer.privacy_policy')}</Typography.Text>
                    </Col>

                    {/* Social Media Icons */}
                    <Col xs={24} md={8} style={{ textAlign: "center" }}>
                        <Typography.Text style={{ display: "block", color: "#ccc", marginBottom: "0.5rem" }}>
                            {t('footer.follow')}
                        </Typography.Text>
                        <FacebookOutlined style={{ fontSize: "24px", margin: "0 10px", color: "#1877F2" }} />
                        <InstagramOutlined style={{ fontSize: "24px", margin: "0 10px", color: "#E1306C" }} />
                        <YoutubeOutlined style={{ fontSize: "24px", margin: "0 10px", color: "#FF0000" }} />
                    </Col>
                </Row>

                {/* Copyright */}
                <div style={{ textAlign: "center", marginTop: "2rem", borderTop: "1px solid #625b57", paddingTop: "1rem" }}>
                    <Typography.Text style={{ color: "#ccc" }}>
                        © 2025 Absolute Cinema. All rights reserved.
                    </Typography.Text>
                </div>
            </Footer>
        </>
    )
}