import React from "react"
import { useTranslation } from "react-i18next"
import { useMovieSchedule } from "../hooks"
import { ICreateMovieScheduleParam } from "../models/schedule"
import { Button, Card, DatePicker, Form, Layout, Typography } from "antd"
import { Content } from "antd/es/layout/layout"
import "../../../../App.css";
import { useNavigate } from "react-router-dom"
import { ADMIN_MOVIE_SCHEDULES } from "../../../core/constants/redirectURI"
import MovieSelectUI from "./MovieSelectUI"
import AuditoriumSelectUI from "./AuditoriumSelectUI"

const MovieScheduleCreateUI: React.FC = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { handleCreateMovieSchedule } = useMovieSchedule()
    const [form] = Form.useForm<ICreateMovieScheduleParam>();

    const backToListSchedule = () => {
        navigate(ADMIN_MOVIE_SCHEDULES)
    }

    const handleSelectMovie = (movieId: number) => {
        form.setFieldsValue({ movieId });
    }

    const handleSelectAuditorium = (auditoriumId: number) => {
        form.setFieldsValue({ auditoriumId });
    }

    const saveAsDraft = (values: ICreateMovieScheduleParam) => {
        values.scheduleStatus = "DRAFT"
        console.log("Success", values);
        handleCreateMovieSchedule(values);
    }

    const onFinish = (values: ICreateMovieScheduleParam) => {
        values.scheduleStatus = "CONFIRM"
        console.log("Success", values);
        handleCreateMovieSchedule(values);
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
                            {t('titles.movie_schedule_create')}
                        </Typography.Title>
                        <Form
                            name="basic"
                            layout="vertical"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                label={t("labels.movies")}
                                name="movie"
                                rules={[
                                    {
                                        required: true,
                                        message: t("messages.required.movie"),
                                    },
                                ]}
                            >
                                <MovieSelectUI onSelectMovie={handleSelectMovie} />
                            </Form.Item>
                            <Form.Item
                                label={t("labels.auditoriums")}
                                name="auditorium"
                                rules={[
                                    {
                                        required: true,
                                        message: t("messages.required.auditorium"),
                                    },
                                ]}
                            >
                                <AuditoriumSelectUI onSelectAuditorium={handleSelectAuditorium} />
                            </Form.Item>
                            <Form.Item
                                label={t("labels.startDate")}
                                name="start_date"
                                rules={[
                                    {
                                        required: true,
                                        message: t("messages.required.start_date"),
                                    },
                                ]}
                            >
                                <DatePicker className="app-input" />
                            </Form.Item>
                            <Form.Item
                                label={t("labels.startDate")}
                                name="start_date"
                                rules={[
                                    {
                                        required: true,
                                        message: t("messages.required.start_date"),
                                    },
                                ]}
                            >
                                <DatePicker className="app-input" />
                            </Form.Item>
                            <Form.Item>
                                <Button className="app-btn" htmlType="submit" block>
                                    {t("labels.create")}
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button className="app-btn" onClick={() => {
                                    const values = form.getFieldsValue();
                                    saveAsDraft(values);
                                }}>
                                    {t("labels.save_as_draft")}
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button className="secondary-btn" onClick={backToListSchedule}>
                                    {t("labels.back")}
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Content>
            </Layout>
        </>
    )
}

export default MovieScheduleCreateUI