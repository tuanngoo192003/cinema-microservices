import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { IPagination } from "../../../core/models/core";
import { IMovieSchedule } from "../models/schedule";
import { useMovieSchedule } from "../hooks";
import { LoadingPage } from "../../../core/components/LoadingPage";
import { Button, Layout, Space, Table, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { ADMIN_MOVIE_SCHEDULES_CREATE } from "../../../core/constants/redirectURI";

const MovieScheduleListUI: React.FC = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    // const [totalItems, setTotalItems] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [movieId, /* setMovieId */] = useState<number>(2)
    const [startAt, /* setStartAt */] = useState<string>('')
    const [endAt, /* setEndAt */] = useState<string>('')
    const [pageSize, setPageSize] = useState(10);
    const { movieSchedules, loading, handleGetMovieScheduleList } = useMovieSchedule()
    const [movieSchedulePagination, setMovieSchedulePagination] = useState<IPagination<IMovieSchedule> | null>(null)

    useEffect(() => {
        handleGetMovieScheduleList(movieId, currentPage, pageSize, startAt, endAt)
    }, [movieId, currentPage, pageSize, startAt, endAt])

    useEffect(() => {
        setMovieSchedulePagination(movieSchedules)
    }, [movieSchedules])

    const handleTableChange = (pagination: any) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    return (
        <>
            {loading ? (
                <LoadingPage />
            ) : (
                <Layout
                    className="app-theme"
                    style={{
                        marginTop: "3.1rem",
                        paddingTop: "3rem",
                        paddingLeft: "3rem",
                        paddingRight: "3rem",
                        minHeight: "100vh",
                    }}
                >
                    <Content style={{ overflow: "auto" }}>
                        <Typography.Title style={{ textAlign: "center", marginBottom: "24px" }}>
                            {t('labels.titles.list_movie_schedules')}
                        </Typography.Title>
                        <Space style={{ marginBottom: 16 }}>
                            <Button
                                className="app-btn"
                                onClick={() => navigate(ADMIN_MOVIE_SCHEDULES_CREATE)}
                            >
                                {t('labels.buttons.create')}
                            </Button>
                        </Space>
                        <Table<IMovieSchedule>
                            style={{ marginTop: "2rem" }}
                            dataSource={movieSchedulePagination?.data}
                            rowKey="auditorium_id"
                            loading={loading}
                            pagination={{
                                current: currentPage,
                                pageSize: pageSize,
                                total: movieSchedulePagination?.totalRecord || 0, // Total records from API
                                showSizeChanger: true,
                                pageSizeOptions: ["5", "10", "20"],
                            }}
                            onChange={handleTableChange}
                        >
                            <Table.Column
                                title={t("labels.movie_name")}
                                dataIndex="movieName"
                                key="movieName"
                            />
                            <Table.Column
                                title={t("labels.auditorium_name")}
                                dataIndex="auditoriumName"
                                key="duration"
                            />
                            <Table.Column
                                title={t("labels.seat_left")}
                                dataIndex="seatLeft"
                                key="seatLeft"
                            />
                            <Table.Column
                                title={t("labels.start_at")}
                                dataIndex="startAt"
                                key="startAt"
                                render={(startAt) => {
                                    return (<>
                                        {startAt.split('T')[0]} {startAt.split('T')[1].slice(0, 8)}
                                    </>)
                                }}
                            />
                            <Table.Column
                                title={t("labels.end_at")}
                                dataIndex="endAt"
                                key="endAt"
                                render={(endAt) => {
                                    return (<>
                                        {endAt.split('T')[0]} {endAt.split('T')[1].slice(0, 8)}
                                    </>)
                                }}
                            />
                            <Table.Column
                                title={t("labels.schedule_status")}
                                dataIndex="scheduleStatus"
                                key="scheduleStatus"
                            />
                            <Table.Column
                                title="Action"
                                key="action"
                                render={() => (
                                    <Space size="middle">
                                        <a>{t("labels.view_detail")}</a>
                                        <a>{t("labels.delete")}</a>
                                    </Space>
                                )}
                            />
                        </Table>
                    </Content>
                </Layout>
            )}
        </>
    )
}

export default MovieScheduleListUI