import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useMovie, useMovieSchedule } from "../hooks"
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
    const { movieList } = useMovie()
    const [movieId, setMovieId] = useState<number>(0)
    const [moviePrice, setMoviePrice] = useState<number>(0)
    const [auditoriumId, setAuditoriumId] = useState<number>(0)

    const backToListSchedule = () => {
        navigate(ADMIN_MOVIE_SCHEDULES)
    }

    const handleSelectMovie = (movieId: number) => {
        setMovieId(movieId)
        const moviePrice = movieList.find(m => m.movieId == movieId)?.moviePrice
        console.log(movieList)
        setMoviePrice(moviePrice as unknown as number)
    }

    const handleSelectAuditorium = (auditoriumId: number) => {
        setAuditoriumId(auditoriumId)
    }

    const saveAsDraft = (values: ICreateMovieScheduleParam) => {
        values.scheduleStatus = "DRAFT"
        console.log("Success", values);
        handleCreateMovieSchedule(values);
    }

    const onFinish = (values: ICreateMovieScheduleParam) => {
        values.scheduleStatus = "FINAL"
        values.movieId = movieId
        values.auditoriumId = auditoriumId
        values.moviePrice = moviePrice
        console.log("Success", values);
        console.log(values)
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
                                        required: false,
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
                                        required: false,
                                    },
                                ]}
                            >
                                <AuditoriumSelectUI onSelectAuditorium={handleSelectAuditorium} />
                            </Form.Item>
                            <Form.Item
                                label={t("labels.start_date")}
                                name="startAt"
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
                                label={t("labels.end_date")}
                                name="endAt"
                                rules={[
                                    {
                                        required: true,
                                        message: t("messages.required.end_date"),
                                    },
                                ]}
                            >
                                <DatePicker className="app-input" />
                            </Form.Item>
                            <Form.Item>
                                <Button className="app-btn" htmlType="submit" block>
                                    {t("labels.buttons.create")}
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button className="app-btn">
                                    {t("labels.buttons.save_as_draft")}
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button className="secondary-btn" onClick={backToListSchedule}>
                                    {t("labels.buttons.back")}
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