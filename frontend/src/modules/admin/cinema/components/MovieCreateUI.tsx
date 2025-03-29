import { Card, Layout, Typography, Form, FormProps, Input, InputNumber, DatePicker, Select, Upload, message } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import "../../../../App.css";
import { useTranslation } from "react-i18next";
import { useMovie } from "../hooks";
import { ICreateMovieParam } from "../models/movie";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const MovieCreateUI: React.FC = () => {
    const { t } = useTranslation()
    const { handleCreateMovie } = useMovie()

    const handleImageChange = (info: any) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    // Custom function to validate image before upload
    const beforeUpload = (file: any) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error(t('messages.invalidImage')); // Customize your message
        }
        return isImage;
    };

    const onFinish: FormProps<ICreateMovieParam>["onFinish"] = (values) => {
        console.log("Success", values);
        console.log('Uploaded Image:', values.imageURL);
        handleCreateMovie(values)
    };
    const onFinishFailed: FormProps<ICreateMovieParam>["onFinishFailed"] = (
        errorInfo
    ) => {
        console.log("Failed", errorInfo);
    };

    return (
        <>
            <Layout
                style={{
                    minHeight: "90vh",
                    overflow: "hidden",
                    paddingBottom: "3rem",
                }}
            >
                <Content>
                    <Card>
                        <Typography.Title
                            style={{ textAlign: "center", marginBottom: "24px" }}
                        >
                            {t('titles.auditorium_create')}
                        </Typography.Title>
                        <Form
                            name="basic"
                            layout="vertical"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label={t('labels.image_url')}
                                name="imageURL"
                                valuePropName="fileList"
                                getValueFromEvent={(e: any) => e && e.fileList}
                                rules={[
                                    {
                                        required: true,
                                        message: t('messages.required.image_url'),
                                    },
                                ]}
                            >
                                <Upload
                                    className="app-input"
                                    name="image"
                                    action="/upload" // Your upload action URL (optional for demo)
                                    listType="picture-card"
                                    beforeUpload={beforeUpload} // Validate the file before upload
                                    onChange={handleImageChange}
                                    showUploadList={false} // Set to true if you want to show uploaded images list
                                >
                                    <div>
                                        <UploadOutlined />
                                    </div>
                                </Upload>
                            </Form.Item>
                            <Form.Item
                                label={t("labels.movie_name")}
                                name="movieName"
                                rules={[
                                    {
                                        required: true,
                                        message: t("messages.required.movie_name"),
                                    },
                                ]}
                            >
                                <Input className="app-input" />
                            </Form.Item>
                            <Form.Item
                                label={t("labels.description")}
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: t("messages.required.description"),
                                    },
                                ]}
                            >
                                <Input.TextArea className="app-input" />
                            </Form.Item>
                            <Form.Item
                                label={t("labels.duration")}
                                name="duration"
                                rules={[
                                    {
                                        required: true,
                                        message: t("messages.required.duration"),
                                    },
                                ]}
                            >
                                <InputNumber className="app-input" />
                            </Form.Item>
                            <Form.Item
                                label={t("labels.releaseDate")}
                                name="release_date"
                                rules={[
                                    {
                                        required: true,
                                        message: t("messages.required.release_date"),
                                    },
                                ]}
                            >
                                <DatePicker className="app-input" />
                            </Form.Item>
                            <Form.Item
                                label={t("labels.movieGenre")}
                                name="movie_genre"
                                rules={[
                                    {
                                        required: true,
                                        message: t("messages.required.movie_genre"),
                                    },
                                ]}
                            >
                                <Select
                                    className="app-input"
                                    mode="multiple"
                                    placeholder={t("placeholders.selectGenres")}
                                    optionLabelProp="label"
                                >
                                    <Option value="ROMCOM" label="ROMCOM">
                                        ROMCOM
                                    </Option>
                                    <Option value="ACTION" label="ACTION">
                                        ACTION
                                    </Option>
                                    <Option value="HORROR" label="HORROR">
                                        HORROR
                                    </Option>
                                    <Option value="COMEDY" label="COMEDY">
                                        COMEDY
                                    </Option>
                                    <Option value="DRAMA" label="DRAMA">
                                        DRAMA
                                    </Option>
                                </Select>
                            </Form.Item>
                        </Form>
                    </Card>
                </Content>
            </Layout>
        </>
    )
}

export default MovieCreateUI