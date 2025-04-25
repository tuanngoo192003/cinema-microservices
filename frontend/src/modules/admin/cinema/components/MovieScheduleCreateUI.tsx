import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useMovie, useMovieSchedule } from "../hooks"
import { ICreateMovieScheduleParam } from "../models/schedule"
import { Button, Card, DatePicker, Form, Layout, TimePicker, Typography } from "antd"
import { Content } from "antd/es/layout/layout"
import "../../../../App.css";
import { useNavigate } from "react-router-dom"
import { ADMIN_MOVIE_SCHEDULES } from "../../../core/constants/redirectURI"
import MovieSelectUI from "./MovieSelectUI"
import AuditoriumSelectUI from "./AuditoriumSelectUI"
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

const timeZone = 'Asia/Bangkok'

interface IMovieScheduleForm {
    movieId: number
    auditoriumId: number
    startDate: Date
    startAt: dayjs.Dayjs | null
    endAt: dayjs.Dayjs | null
    scheduleStatus: string
    moviePrice: number
}

const MovieScheduleCreateUI: React.FC = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { handleCreateMovieSchedule } = useMovieSchedule()
    const { movieList } = useMovie()
    const [movieId, setMovieId] = useState<number>(0)
    const [moviePrice, setMoviePrice] = useState<number>(0)
    const [currentMovieDuration, setCurrentMovieDuration] = useState<number>(0)
    const [currentMovieReleaseDate, setCurrentMovieReleaseDate] = useState<Date | null>(null)
    const [auditoriumId, setAuditoriumId] = useState<number>(0)
    const [endAt, setEndAt] = useState<dayjs.Dayjs | null>(null)

    const backToListSchedule = () => {
        navigate(ADMIN_MOVIE_SCHEDULES)
    }

    const handleSelectMovie = (movieId: number) => {
        setMovieId(movieId)
        const movie = movieList.find(m => m.movieId == movieId)
        setCurrentMovieDuration(movie?.duration as unknown as number)
        setMoviePrice(movie?.moviePrice as unknown as number)
        setCurrentMovieReleaseDate(movie?.releaseDate as unknown as Date)
    }

    const handleSelectAuditorium = (auditoriumId: number) => {
        setAuditoriumId(auditoriumId)
    }

    // const saveAsDraft = (values: ICreateMovieScheduleParam) => {
    //     values.scheduleStatus = "DRAFT"
    //     console.log("Success", values);
    //     handleCreateMovieSchedule(values);
    // }

    const updateEndAt = (values: dayjs.Dayjs) => {
        setEndAt(values.add(currentMovieDuration, 'minute'))
    }

    const onFinish = (values: IMovieScheduleForm) => {
        const startDateOnly = dayjs(values.startDate).tz(timeZone).startOf('day')

        const computedStartDate = values.startAt
            ? startDateOnly
                .hour(values.startAt.hour())
                .minute(values.startAt.minute())
                .second(values.startAt.second())
                .tz(timeZone)
                .format() // ➜ e.g., "2025-04-15T20:00:00+07:00"
            : startDateOnly.tz(timeZone).format()

        const computedEndDate = endAt
            ? startDateOnly
                .hour(endAt.hour())
                .minute(endAt.minute())
                .second(endAt.second())
                .tz(timeZone)
                .format()
            : startDateOnly.tz(timeZone).format()
        const param = {
            movieId: movieId,
            auditoriumId: auditoriumId,
            startAt: computedStartDate,
            endAt: computedEndDate,
            scheduleStatus: "FINAL",
            moviePrice: moviePrice
        } as ICreateMovieScheduleParam
        handleCreateMovieSchedule(param);
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
                                name="startDate"
                                rules={[
                                    {
                                        required: true,
                                        message: t("messages.required.start_date"),
                                    },
                                    {
                                        validator: (_, value) => {
                                            if (!value) {
                                                return Promise.reject(new Error('Start date is required'));
                                            }

                                            const releaseDate = currentMovieReleaseDate ? dayjs(currentMovieReleaseDate) : null;

                                            console.log(releaseDate)
                                            console.log(value)
                                            if (releaseDate && value.isAfter(releaseDate, 'day')) {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject(
                                                new Error(`Start date cannot be before the movie release date (${releaseDate?.format('YYYY-MM-DD')})`)
                                            );
                                        },
                                    },
                                ]}
                            >
                                <DatePicker className="app-input" />
                            </Form.Item>
                            <Form.Item
                                label={t("labels.start_at")}
                                name="startAt"
                                rules={[
                                    {
                                        required: true,
                                        message: t("messages.required.start_at"),
                                    },
                                ]}
                            >
                                <TimePicker className="app-input" onChange={updateEndAt} />
                            </Form.Item>
                            <Form.Item
                                label={t("labels.end_at")}
                            >
                                <TimePicker className="app-input" value={endAt ? endAt : undefined} disabled></TimePicker>
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