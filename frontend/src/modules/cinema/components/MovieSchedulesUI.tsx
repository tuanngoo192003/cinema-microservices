import {Card, Col, Row, Tabs} from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../../../App.css"
import dayjs from "dayjs";
import Title from "antd/es/typography/Title";
import {useNavigate} from "react-router-dom";
import {BOOKING_FORMAT_URI} from "../../core/constants/redirectURI.ts";
import { useMovieSchedule } from "../hooks/index.ts";
import { IMovieSchedule, transformMovieSchedules } from "../models/movieSchedule.ts";
const { TabPane } = Tabs;

interface MovieSchedulesProps {
    movieId: number;
}

// Sample movie schedule data (for testing)
const movieScheduleData: Record<number, { AuditoriumID: number, startAt: Date; endAt: Date; seatLeft: number }[]> = {
    0: [
        { AuditoriumID: 1, startAt: new Date("2025-03-19T14:00:00"), endAt: new Date("2025-03-19T16:00:00"), seatLeft: 80 },
        {   AuditoriumID: 1, startAt: new Date("2025-03-19T17:00:00"), endAt: new Date("2025-03-19T19:00:00"), seatLeft: 75 },
    ],
    1: [
        { AuditoriumID: 1, startAt: new Date("2025-03-20T14:00:00"), endAt: new Date("2025-03-20T16:00:00"), seatLeft: 60 },
        {AuditoriumID: 1, startAt: new Date("2025-03-21T14:00:00"), endAt: new Date("2025-03-21T16:00:00"), seatLeft: 55 },
    ],
    2: [
        {AuditoriumID: 1, startAt: new Date("2025-03-22T10:00:00"), endAt: new Date("2025-03-22T12:00:00"), seatLeft: 70 },
        {AuditoriumID: 1, startAt: new Date("2025-03-22T13:00:00"), endAt: new Date("2025-03-22T15:00:00"), seatLeft: 65 },
        {AuditoriumID: 1, startAt: new Date("2025-03-22T16:00:00"), endAt: new Date("2025-03-22T18:00:00"), seatLeft: 60 },
    ],
    3: [
        {AuditoriumID: 1, startAt: new Date("2025-03-23T12:00:00"), endAt: new Date("2025-03-23T14:00:00"), seatLeft: 50 },
    ],
    4: [
        {AuditoriumID: 1, startAt: new Date("2025-03-24T11:00:00"), endAt: new Date("2025-03-24T13:00:00"), seatLeft: 80 },
        {AuditoriumID: 1, startAt: new Date("2025-03-24T14:00:00"), endAt: new Date("2025-03-24T16:00:00"), seatLeft: 75 },
    ],
    5: [
        {AuditoriumID: 1, startAt: new Date("2025-03-25T15:00:00"), endAt: new Date("2025-03-25T17:00:00"), seatLeft: 60 },
        {AuditoriumID: 1, startAt: new Date("2025-03-25T18:00:00"), endAt: new Date("2025-03-25T20:00:00"), seatLeft: 55 },
    ],
    6: [
        {AuditoriumID: 1, startAt: new Date("2025-03-26T16:00:00"), endAt: new Date("2025-03-26T18:00:00"), seatLeft: 40 },
    ],
};

export const MovieSchedulesUI: React.FC<MovieSchedulesProps> = ({ movieId }) => {

    const { movieSchedules, loading, handleGetMovieSchedules } = useMovieSchedule()
    const [movieSchedulesTab, setMovieSchedulesTab] = useState<Record<number, { AuditoriumID: number; startAt: Date; endAt: Date; seatLeft: number }[]>>({});
    const [ currentPage, setCurrentPage] = useState(1);
    const [ pageSize, setPageSize] = useState(10);

    const [ startAt, setStartAt] = useState(new Date().toISOString())
    const [ endAt, setEndAt] = useState(new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString())

    useEffect(() => {
        handleGetMovieSchedules(movieId, currentPage, pageSize, startAt, endAt)
        //setMovieSchedulesTab(transformMovieSchedules(movieSchedules?.data as unknown as IMovieSchedule[]))
    }, [movieId])
    const { t } = useTranslation();
    const navigage = useNavigate()
    const [activeTab, setActiveTab] = useState("0");

    // Generate the next 7 days
    const daysOfWeek = Array.from({ length: 10 }, (_, index) => {
        const date = dayjs().add(index, "day"); // Normalize to start of day
        return {
            key: index.toString(),
            label: date.format("ddd, DD/MM"), // Example: Mon, 19/03
            date: date.toDate(),
        };
    });

    // Filter schedules for the selected day
    const filteredSchedules =
        movieScheduleData[parseInt(activeTab)] || [];

    return (
        <>
            {
                loading ? loading : (
                    <Tabs defaultActiveKey="0" onChange={setActiveTab} centered>
                        {daysOfWeek.map(({ key, label }) => (
                            <TabPane key={key} tab={label}>
                                <div>
                                    <Title level={5} style={{ marginLeft: "1rem" }}>{label}</Title>
                                        <Row gutter={[16, 0]}>
                                            {filteredSchedules.length > 0 ? (
                                                filteredSchedules.map((schedule, index) => (
                                                    <Col key={index} xs={12} md={6}>
                                                    <Card className="booking-card" onClick={() => navigage(BOOKING_FORMAT_URI(1), {replace: true})}>
                                                        {t("common.start_at")}: {dayjs(schedule.startAt).format("HH:mm")} -{" "}
                                                        {t("common.start_at")}: {dayjs(schedule.endAt).format("HH:mm")} {" "}
                                                        <p>{t("common.seat_left")}: {schedule.seatLeft}</p>
                                                    </Card>
                                                </Col>
                                            ))
                                        ) : (
                                            <p>{t("messages.no_schedule")}</p>
                                        )}
                                        </Row>
                                </div>
                            </TabPane>
                        ))}
                    </Tabs>
                )
            }
        </>
    );
};
