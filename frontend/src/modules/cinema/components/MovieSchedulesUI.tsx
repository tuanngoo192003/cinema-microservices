import {Card, Col, Row, Tabs} from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "../../../App.css"
import dayjs from "dayjs";
import Title from "antd/es/typography/Title";
const { TabPane } = Tabs;

interface SchedulesProps {
    id: number;
}

// Sample movie schedule data (for testing)
const movieScheduleData: Record<number, { start_at: Date; end_at: Date; seat_left: number }[]> = {
    1: [
        { start_at: new Date("2025-03-19T14:00:00"), end_at: new Date("2025-03-19T16:00:00"), seat_left: 80 },
        { start_at: new Date("2025-03-19T17:00:00"), end_at: new Date("2025-03-19T19:00:00"), seat_left: 75 },
    ],
    2: [
        { start_at: new Date("2025-03-20T14:00:00"), end_at: new Date("2025-03-20T16:00:00"), seat_left: 60 },
        { start_at: new Date("2025-03-21T14:00:00"), end_at: new Date("2025-03-21T16:00:00"), seat_left: 55 },
    ],
    3: [
        { start_at: new Date("2025-03-22T10:00:00"), end_at: new Date("2025-03-22T12:00:00"), seat_left: 70 },
        { start_at: new Date("2025-03-22T13:00:00"), end_at: new Date("2025-03-22T15:00:00"), seat_left: 65 },
        { start_at: new Date("2025-03-22T16:00:00"), end_at: new Date("2025-03-22T18:00:00"), seat_left: 60 },
    ],
    4: [
        { start_at: new Date("2025-03-23T12:00:00"), end_at: new Date("2025-03-23T14:00:00"), seat_left: 50 },
    ],
    5: [
        { start_at: new Date("2025-03-24T11:00:00"), end_at: new Date("2025-03-24T13:00:00"), seat_left: 80 },
        { start_at: new Date("2025-03-24T14:00:00"), end_at: new Date("2025-03-24T16:00:00"), seat_left: 75 },
    ],
    6: [
        { start_at: new Date("2025-03-25T15:00:00"), end_at: new Date("2025-03-25T17:00:00"), seat_left: 60 },
        { start_at: new Date("2025-03-25T18:00:00"), end_at: new Date("2025-03-25T20:00:00"), seat_left: 55 },
    ],
    7: [
        { start_at: new Date("2025-03-26T16:00:00"), end_at: new Date("2025-03-26T18:00:00"), seat_left: 40 },
    ],
};


export const SchedulesUI: React.FC<SchedulesProps> = ({ id }) => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState("0");

    // Generate the next 7 days
    const daysOfWeek = Array.from({ length: 7 }, (_, index) => {
        const date = dayjs().add(index, "day").startOf("day"); // Normalize to start of day
        return {
            key: index.toString(),
            label: date.format("ddd, DD/MM"), // Example: Mon, 19/03
            date: date.toDate(),
        };
    });

    const selectedDate = daysOfWeek[parseInt(activeTab)].date;

    // Filter schedules for the selected day
    const filteredSchedules =
        movieScheduleData[id]?.filter(schedule =>
            dayjs(schedule.start_at).isSame(selectedDate, "day")
        ) || [];

    return (
        <Tabs defaultActiveKey="0" onChange={setActiveTab} centered>
            {daysOfWeek.map(({ key, label }) => (
                <TabPane key={key} tab={label}>
                    <div>
                        <Title level={5} style={{ marginLeft: "1rem" }}>{label}</Title>
                        <Row gutter={[16, 0]}>
                            {filteredSchedules.length > 0 ? (
                                filteredSchedules.map((schedule, index) => (
                                    <Col key={index} xs={12} md={6}>
                                        <Card className="booking-card" onClick={() => setActiveTab("0")}>
                                            {t("common.start_at")}: {dayjs(schedule.start_at).format("HH:mm")} -{" "}
                                            {t("common.start_at")}: {dayjs(schedule.end_at).format("HH:mm")} {" "}
                                            <p>{t("common.seat_left")}: {schedule.seat_left}</p>
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
    );
};
