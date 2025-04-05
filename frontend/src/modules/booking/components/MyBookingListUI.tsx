import React, { useEffect, useState } from "react";
import { useBooking } from "../hooks";
import { IBooking } from "../models/booking";
import { Layout, Space, Table } from "antd";
import Title from "antd/es/typography/Title";
import { Content } from "antd/es/layout/layout";
import { useTranslation } from "react-i18next";
import { LoadingPage } from "../../core/components/LoadingPage";
import { useAuth } from "../../user/hooks";

const MyBookingListUI: React.FC = () => {

    const { t } = useTranslation()
    const { bookingInfo, loading, handleGetBookingByUserID } = useBooking()
    const { profile } = useAuth()
    const [bookingList, setBookingList] = useState<IBooking[]>([])

    useEffect(() => {
        handleGetBookingByUserID(profile?.id as unknown as number)
    }, [])

    useEffect(() => {
        setBookingList(bookingInfo)
    }, [bookingInfo])

    return (
        <>
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
                <Title>{t("titles.booking_list")}</Title>
                <Content>

                    {/* User Table */}
                    {loading ? (
                        <LoadingPage />
                    ) : (
                        <Table<IBooking>
                            style={{ marginTop: "2rem" }}
                            loading={loading}
                            dataSource={bookingList || []}
                            rowKey="id"
                            onRow={(record) => ({
                                onClick: () => console.log("Row clicked:", record),
                            })}
                        >
                            <Table.Column
                                title={t("labels.movie_name")}
                                dataIndex="movieName"
                                key="movieName"
                            />
                            <Table.Column
                                title={t("labels.total_price")}
                                dataIndex="totalPrice"
                                key="totalPrice"
                            />
                            <Table.Column
                                title={t("labels.status")}
                                dataIndex="status"
                                key="status"
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
                    )}
                </Content>
            </Layout>
        </>
    )
}

export default MyBookingListUI