import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks";
import { Button, Form, Image, Input, Layout, Card } from "antd";
import { Content } from "antd/es/layout/layout";
import "../../../App.css";
import chinatsu from "../../../assets/千夏.jpg";
import { IProfile } from "../models/user";
import { useTranslation } from "react-i18next";
import MyBookingListUI from "../../booking/components/MyBookingListUI";

const ProfileUI: React.FC = () => {
    const { t } = useTranslation();
    const { profile } = useAuth();
    const [form] = Form.useForm<IProfile>();
    const [profileInfo, setProfileInfo] = useState<IProfile | null>(null);

    useEffect(() => {
        if (profile) {
            setProfileInfo(profile);
            form.setFieldsValue(profile);
        }
    }, [profile]);

    const handleSubmit = (values: IProfile) => {
        console.log("Updated values:", values);
        // TODO: Call your update API or action here
    };

    return (
        <Layout
            className="app-theme"
            style={{
                minHeight: "90vh",
                overflow: "hidden",
                paddingBottom: "3rem",
            }}
        >
            <Content>
                <Card title={t("titles.user_profile")}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "1rem",
                        }}
                    >
                        <Image
                            src={profile?.avatar}
                            alt={chinatsu}
                            style={{
                                borderRadius: "12px",
                                height: "11rem",
                                objectFit: "contain",
                                backgroundColor: "#fff",
                            }}
                        />
                        <MyBookingListUI/>
                    </div>

                    <Form
                        layout="vertical"
                        form={form}
                        onFinish={handleSubmit}
                        initialValues={profileInfo || {}}
                    >
                        <Form.Item
                            label={t("labels.full_name")}
                            style={{ marginBottom: 0 }}
                        >
                            <Form.Item
                                name="firstName"
                                rules={[{ required: true, message: t("messages.required") }]}
                                style={{ display: "inline-block", width: "48%", marginRight: "4%" }}
                            >
                                <Input placeholder={t("labels.first_name")} />
                            </Form.Item>
                            <Form.Item
                                name="lastName"
                                rules={[{ required: true, message: t("messages.required") }]}
                                style={{ display: "inline-block", width: "48%" }}
                            >
                                <Input placeholder={t("labels.last_name")} />
                            </Form.Item>
                        </Form.Item>

                        <Form.Item
                            label={t("labels.email")}
                            name="email"
                            rules={[{ required: true, type: "email", message: t("messages.invalid_email") }]}
                        >
                            <Input placeholder="example@email.com" />
                        </Form.Item>

                        <Form.Item
                            label={t("labels.date_of_birth")}
                            name="dateOfBirth"
                        >
                            <Input disabled />
                        </Form.Item>

                        <Form.Item
                            label={t("labels.phone_number")}
                            name="phoneNumber"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item>
                            <Button className="app-btn" htmlType="submit">
                                {t("labels.buttons.save")}
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Content>
        </Layout>
    );
};

export default ProfileUI;
