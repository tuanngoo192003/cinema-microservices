import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMovie } from "../hooks";
import { Avatar, Button, Layout, Space, Table, Tooltip, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { LoadingPage } from "../../../core/components/LoadingPage";
import { useNavigate } from "react-router-dom";
import { IPagination } from "../../../core/models/core";
import { IMovie } from "../models/movie";
import { ADMIN_MOVIES_CREATE } from "../../../core/constants/redirectURI";
import { UserOutlined } from "@ant-design/icons";
import MovieUpdateUI, { IUpdateMovieProps } from "./MovieUpdateUI";

const AdminMovieListUI: React.FC = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    // const [totalItems, setTotalItems] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [movieName, /* setMovieName */] = useState<string>('')
    const [movieGenre, /* setMovieGenre */] = useState<string>('')
    const [releaseStart, /* setReleaseStart */] = useState<Date>(() => {
        const now = new Date();
        return new Date(now.setDate(now.getDate() - 14));
    });

    const [releaseEnd, /* setReleaseEnd */] = useState<Date>(() => {
        const now = new Date();
        return new Date(now.setDate(now.getDate() + 14));
    });
    const [pageSize, setPageSize] = useState(10);
    const { movies, loading, handleGetMovieList } = useMovie()
    const [moviePagination, setMoviePagination] = useState<IPagination<IMovie> | null>(null)

    useEffect(() => {
        handleGetMovieList(currentPage, pageSize, movieName, movieGenre, formatDate(releaseStart), formatDate(releaseEnd))
    }, [movieName, movieGenre, currentPage, pageSize, releaseStart, releaseEnd])

    useEffect(() => {
        setMoviePagination(movies)
    }, [movies])

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
                        overflow: "hidden",
                    }}
                >
                    <Content>
                        <Typography.Title style={{ textAlign: "center", marginBottom: "24px" }}>
                            {t('labels.titles.list_movies')}
                        </Typography.Title>
                        <Space style={{ marginBottom: 16 }}>
                            <Button
                                className="app-btn"
                                onClick={() => navigate(ADMIN_MOVIES_CREATE)}
                            >
                                {t('labels.buttons.create')}
                            </Button>
                        </Space>
                        <Table<IMovie>
                            style={{ marginTop: "2rem" }}
                            dataSource={moviePagination?.data}
                            rowKey="auditorium_id"
                            loading={loading}
                            pagination={{
                                current: currentPage,
                                pageSize: pageSize,
                                total: moviePagination?.totalRecord || 0, // Total records from API
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
                                title={t("labels.description")}
                                dataIndex="description"
                                key="description"
                                render={(text: string) => {
                                    const maxLength = 30; // Maximum characters before truncating
                                    const truncatedText = text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

                                    return (
                                        <Tooltip title={text}>
                                            <span style={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                maxWidth: 200,
                                                display: 'inline-block'
                                            }}>
                                                {truncatedText}
                                            </span>
                                        </Tooltip>
                                    );
                                }}
                            />
                            <Table.Column
                                title={t("labels.duration")}
                                dataIndex="duration"
                                key="duration"
                            />
                            <Table.Column
                                title={t("labels.release_date")}
                                dataIndex="releaseDate"
                                key="releaseDate"
                            />
                            <Table.Column
                                title={t("labels.movie_genre")}
                                dataIndex="movieGenre"
                                key="movieGenre"
                            />
                            <Table.Column
                                title={t('labels.image')}
                                dataIndex="imageURL"
                                key="imageURL"
                                render={(avatar) => (
                                    <Avatar
                                        size={30}
                                        src={avatar}
                                        icon={!avatar ? <UserOutlined /> : undefined}
                                    />
                                )}
                            />
                            <Table.Column
                                title="Action"
                                key="action"
                                render={(_, record: IMovie) => {
                                    const movieData: IUpdateMovieProps = {
                                        id: record.movieId,
                                        movieName: record.movieName,
                                        imageURL: record.imageURL,
                                        description: record.description,
                                        duration: record.duration,
                                        releaseDate: record.releaseDate,
                                        movieGenre: record.movieGenre,
                                        isDeleted: false,
                                    };
                                    return (
                                        <Space size="middle">
                                            <MovieUpdateUI movie={movieData} />
                                            <a>{t("labels.delete")}</a>
                                        </Space>
                                    )
                                }}
                            />
                        </Table>

                    </Content>
                </Layout>
            )}
        </>
    )
}

export default AdminMovieListUI