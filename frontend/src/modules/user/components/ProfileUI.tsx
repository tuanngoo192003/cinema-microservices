import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks";
import { Button, Form, Input, message, Layout, Card, Upload, DatePicker } from "antd";
import { Content } from "antd/es/layout/layout";
import "../../../App.css";
import { IProfile, IUpdateUserParam } from "../models/user";
import { useTranslation } from "react-i18next";
import MyBookingListUI from "../../booking/components/MyBookingListUI";
import { UploadFileAPI } from "../../core/services/upload";
import { UploadOutlined } from "@ant-design/icons";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";

const ProfileUI: React.FC = () => {
    const { t } = useTranslation();
    const { profile, handleUpdateProfile } = useAuth();
    const [form] = Form.useForm<IProfile>();
    const [profileInfo, setProfileInfo] = useState<IProfile | null>(null);
    const [avatar, setAvatar] = useState<string>('');
    const { enqueueSnackbar } = useSnackbar();

    const handleImageChange = (info: any) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const beforeUpload = (file: any) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error(t('messages.invalidImage'));
        }
        return isImage;
    };

    useEffect(() => {
        if (profile) {
            setProfileInfo(profile);
            form.setFieldsValue({
                id: profile.id,
                firstName: profile.firstName,
                lastName: profile.lastName,
                email: profile.email,
                dateOfBirth: dayjs(profile.dateOfBirth) as unknown as string,
                phoneNumber: profile.phoneNumber,
                role: profile.role,
                avatar: profile.avatar
            });
        }
        console.log(profile)

    }, [profile]);

    const handleSubmit = (values: IProfile) => {
        const dateOfBirth = values.dateOfBirth as unknown as Date

        const body = {
            userId: profile?.id,
            email: values.email,
            status: '',
            firstName: values.firstName,
            lastName: values.lastName,
            dateOfBirth: dateOfBirth.toISOString().split('T')[0],
            phoneNumber: values.phoneNumber,
            avatar: avatar,
            isDeleted: false,
        } as IUpdateUserParam
        handleUpdateProfile(body)
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
                        <Upload
                            className="app-input"
                            name="image"
                            listType="picture-card"
                            beforeUpload={beforeUpload} // Validate the file before upload
                            onChange={handleImageChange}
                            showUploadList={false} // Set to true if you want to show uploaded images list
                            customRequest={({ file }) => {
                                UploadFileAPI(file as File)
                                    .then((res) => {
                                        setAvatar(res.data.imageUrl);
                                        enqueueSnackbar(t('messages.success'), { variant: "success" });
                                    })
                                    .catch((error) => {
                                        enqueueSnackbar(error.errors["message"], { variant: "error" });
                                    });
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                {profile?.avatar ? (
                                    <img
                                        src={profile?.avatar}
                                        alt={avatar as string}
                                        style={{
                                            width: 80,
                                            height: 80,
                                            objectFit: "cover",
                                            borderRadius: 8
                                        }}
                                    />
                                ) : (
                                    <img
                                        src={avatar as string}
                                        alt={profile?.avatar}
                                        style={{
                                            width: 80,
                                            height: 80,
                                            objectFit: "cover",
                                            borderRadius: 8
                                        }}
                                    />
                                )}
                                <UploadOutlined style={{ fontSize: 24, cursor: "pointer" }} />
                            </div>
                        </Upload>
                        <MyBookingListUI />
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
                                key="firstName"
                                rules={[{ required: true, message: t("messages.required") }]}
                                style={{ display: "inline-block", width: "48%", marginRight: "4%" }}
                            >
                                <Input placeholder={t("labels.first_name")} />
                            </Form.Item>
                            <Form.Item
                                name="lastName"
                                key="lastName"
                                rules={[{ required: true, message: t("messages.required") }]}
                                style={{ display: "inline-block", width: "48%" }}
                            >
                                <Input placeholder={t("labels.last_name")} />
                            </Form.Item>
                        </Form.Item>

                        <Form.Item
                            label={t("labels.email")}
                            name="email"
                            key="email"
                            rules={[{ required: true, type: "email", message: t("messages.invalid_email") }]}
                        >
                            <Input placeholder="example@email.com" />
                        </Form.Item>

                        <Form.Item
                            label={t("labels.date_of_birth")}
                            name="dateOfBirth"
                            key="dateOfBirth"
                        >
                            <DatePicker className="app-input" />
                        </Form.Item>

                        <Form.Item
                            label={t("labels.phone_number")}
                            name="phoneNumber"
                            key="phoneNumber"
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
