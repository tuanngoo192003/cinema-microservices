import { Card, Col, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../../../App.css";
import dayjs from "dayjs";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import { BOOKING_FORMAT_URI } from "../../core/constants/redirectURI.ts";
import { useMovieSchedule } from "../hooks/index.ts";
import {
  IMovieScheduleTab,
} from "../models/movieSchedule.ts";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const { TabPane } = Tabs;

interface MovieSchedulesProps {
  movieId: number;
}

export const MovieSchedulesUI: React.FC<MovieSchedulesProps> = ({ movieId }) => {
  const { t } = useTranslation();
  const navigage = useNavigate();
  const [activeTab, setActiveTab] = useState("0");

  const { movieSchedules, loading, handleGetMovieSchedules } =
    useMovieSchedule();
  const [currentPage, /* setCurrentPage */] = useState(1);
  const [pageSize, /* setPageSize */] = useState(10);

  const [startAt, /* setStartAt */] = useState(new Date().toISOString());
  const [endAt, /* setEndAt */] = useState(
    new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString()
  );
  const [filteredSchedules, setFilteredSchedules] = useState<IMovieScheduleTab[]>([])

  useEffect(() => {
    handleGetMovieSchedules(movieId, currentPage, pageSize, startAt, endAt);
  }, [movieId]);

  useEffect(() => {
    const selectedDate = daysOfWeek[parseInt(activeTab)].date; // Get the current tab's date
  
    // Flatten movieSchedules (convert Record<number, IMovieScheduleTab[]> to IMovieScheduleTab[])
    const allSchedules = Object.values(movieSchedules).flat();
  
    const filtered = allSchedules.filter((schedule) => {
      const scheduleDate = new Date(schedule.StartAt).toISOString().substring(0, 10); // Extract YYYY-MM-DD
      const tabDate = selectedDate.toISOString().substring(0, 10); // Ensure tab date is in the same format
  
      return scheduleDate === tabDate; // Match schedule date with tab date
    });
  
    setFilteredSchedules(filtered);
  }, [activeTab, movieSchedules]);

  // Generate the next 7 days
  const daysOfWeek = Array.from({ length: 10 }, (_, index) => {
    const date = dayjs().utc().add(index, "day"); // Force UTC mode
    return {
      key: index.toString(),
      label: date.format("ddd, DD/MM"), // Example: Mon, 19/03
      date: date.toDate(),
    };
  });

  return (
    <>
      {loading ? (
        loading
      ) : (
        <Tabs defaultActiveKey="0" onChange={setActiveTab} centered>
          {daysOfWeek.map(({ key, label }) => (
            <TabPane key={key} tab={label}>
              <div>
                <Title level={5} style={{ marginLeft: "1rem" }}>
                  {label}
                </Title>
                <Row gutter={[16, 0]}>
                  {filteredSchedules.length > 0 ? (
                    filteredSchedules.map((schedule, index) => (
                      <Col key={index} xs={12} md={6}>
                        <Card
                          className="booking-card"
                          onClick={() =>
                            navigage(BOOKING_FORMAT_URI(schedule.ScheduleID), {
                              replace: true,
                            })
                          }
                        >
                          {t("common.start_at")}:{" "}
                          {schedule.StartAt.substring(11, 16)} -{" "}
                          {t("common.end_at")}:{" "}
                          {schedule.EndAt.substring(11, 16)}

                          <p>
                            {t("common.seat_left")}: {schedule.SeatLeft}
                          </p>
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
      )}
    </>
  );
};
