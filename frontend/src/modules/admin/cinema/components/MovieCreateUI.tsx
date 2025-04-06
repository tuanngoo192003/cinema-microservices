import { Card, Layout, Typography, Form, FormProps, Input, InputNumber, DatePicker, Select, Upload, message, Button } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import "../../../../App.css";
import { useTranslation } from "react-i18next";
import { useMovie } from "../hooks";
import { ICreateMovieParam } from "../models/movie";
import { UploadOutlined } from "@ant-design/icons";
import { UploadFileAPI } from "../../../core/services/upload";
import { useSnackbar } from "notistack";

const { Option } = Select;

interface ICreateMovieProps {
    movieName: string
    moviePrice: number
    imageURL: string
    description: string
    duration: number
    releaseDate: Date
    movieGenre: string[]
}

const MovieCreateUI: React.FC = () => {
    const { t } = useTranslation()
    const { handleCreateMovie } = useMovie()
    const { enqueueSnackbar } = useSnackbar();
    const [imageUrl, setImageUrl] = useState<string | null>(null);

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

    const onFinish: FormProps<ICreateMovieProps>["onFinish"] = (values) => {
        console.log("Success", values);
        const newMovie = {
            movieName: values.movieName,
            moviePrice: values.moviePrice,
            imageURL: imageUrl,
            description: values.description,
            duration: values.duration,
            releaseDate: values.releaseDate.toISOString().split('T')[0],
            movieGenre: values.movieGenre
        } as ICreateMovieParam
        handleCreateMovie(newMovie)
    };
    const onFinishFailed: FormProps<ICreateMovieProps>["onFinishFailed"] = (
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
                                        required: false,
                                    },
                                ]}
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
                                                setImageUrl(res.data.imageUrl);
                                                enqueueSnackbar(t('messages.success'), { variant: "success" });
                                            })
                                            .catch((error) => {
                                                enqueueSnackbar(error.errors["message"], { variant: "error" });
                                            });
                                    }}
                                >
                                    {imageUrl ? (
                                        <img src={imageUrl} alt="Uploaded" style={{ width: '100%' }} />
                                    ) : (
                                        <div>
                                            <UploadOutlined />
                                        </div>
                                    )}
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
                                label={t("labels.price")}
                                name="moviePrice"
                                rules={[
                                    {
                                        required: true,
                                        message: t("messages.required.movie_price"),
                                    },
                                ]}
                            >
                                <InputNumber className="app-input" />
                            </Form.Item>
                            <Form.Item
                                label={t("labels.release_date")}
                                name="releaseDate"
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
                                label={t("labels.movie_genre")}
                                name="movieGenre"
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
                            <Form.Item>
                                <Button className="app-btn" htmlType="submit" block>
                                    {t("labels.buttons.create")}
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Content>
            </Layout>
        </>
    )
}

export default MovieCreateUI