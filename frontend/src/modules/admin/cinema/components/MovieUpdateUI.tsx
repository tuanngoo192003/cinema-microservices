import { Card, Layout, Typography, Form, FormProps, Input, InputNumber, DatePicker, Select, Upload, message, Button, Modal } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import "../../../../App.css";
import { useTranslation } from "react-i18next";
import { useMovie } from "../hooks";
import { IUpdateMovieParam } from "../models/movie";
import { UploadOutlined } from "@ant-design/icons";
import { UploadFileAPI } from "../../../core/services/upload";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";

const { Option } = Select;

export interface IUpdateMovieProps {
    id: number
    movieName: string
    imageURL: string
    description: string
    duration: number
    releaseDate: Date
    movieGenre: string
    isDeleted: boolean
}

export interface MovieUpdateUIProps {
    movie?: IUpdateMovieProps;
}

const MovieUpdateUI: React.FC<MovieUpdateUIProps> = ({ movie }) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [/* modalText */, setModalText] = useState('Content of the modal');
    const { t } = useTranslation()
    const { handleUpdateMovie } = useMovie()
    const { enqueueSnackbar } = useSnackbar();
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [form] = Form.useForm();
    const [movieId, setMovieId] = useState<number>(0);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    useEffect(() => {
        if (movie) {
            setMovieId(movie.id)
            form.setFieldsValue({
                id: movie.id,
                movieName: movie.movieName,
                imageURL: movie.imageURL,
                description: movie.description,
                duration: movie.duration,
                releaseDate: dayjs(movie.releaseDate),
                movieGenre: movie.movieGenre,
                moviePrice: (movie as any).moviePrice,
            });
            setImageUrl(movie.imageURL);
        }
    }, [movie, form]);

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

    const onFinish: FormProps<IUpdateMovieProps>["onFinish"] = (values) => {
        const genre = values.movieGenre.split(";")
        const newMovie = {
            id: movieId,
            movieName: values.movieName,
            imageURL: imageUrl as unknown as string,
            description: values.description,
            duration: values.duration,
            releaseDate: values.releaseDate.toISOString().split('T')[0],
            movieGenre: genre.join(";"),
            isDeleted: false,
        } as IUpdateMovieParam
        handleUpdateMovie(newMovie)
    };
    const onFinishFailed: FormProps<IUpdateMovieProps>["onFinishFailed"] = (
        errorInfo
    ) => {
        console.log("Failed", errorInfo);
    };

    return (
        <>
            <Button className="app-btn" onClick={showModal}>
                {t("labels.view_detail")}
            </Button>
            <Modal
                title="Movie Ticket"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                style={{ minHeight: "90vh" }}
            >
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
                                {t('titles.movie_update')}
                            </Typography.Title>
                            <Form
                                form={form}
                                name="basic"
                                layout="vertical"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label={t('labels.image')}
                                    name="imageURL"
                                    rules={[{ required: false }]}
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
                                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                            <img
                                                src={imageUrl as string}
                                                alt="Uploaded"
                                                style={{
                                                    width: 80,
                                                    height: 80,
                                                    objectFit: "cover",
                                                    borderRadius: 8
                                                }}
                                            />
                                            <UploadOutlined style={{ fontSize: 24, cursor: "pointer" }} />
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
                                {/* <Form.Item
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
                                </Form.Item> */}
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
                                        {t("labels.buttons.save")}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Content>
                </Layout>
            </Modal>
        </>
    )
}

export default MovieUpdateUI