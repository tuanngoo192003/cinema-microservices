import React, { useEffect, useState } from "react";
import { useBooking } from "../hooks";
import { IBooking, IBookingSeat } from "../models/booking";
import { Button, Layout, Modal, Table } from "antd";
import Title from "antd/es/typography/Title";
import { Content } from "antd/es/layout/layout";
import { useTranslation } from "react-i18next";
import { LoadingPage } from "../../core/components/LoadingPage";
import { useAuth } from "../../user/hooks";

const MyBookingListUI: React.FC = () => {

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [/* modalText */, setModalText] = useState('Content of the modal');
    const { t } = useTranslation()
    const { bookingInfo, loading, handleGetBookingByUserID } = useBooking()
    const { profile } = useAuth()
    const [bookingList, setBookingList] = useState<IBooking[]>([])

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
        handleGetBookingByUserID(profile?.id as unknown as number)
    }, [])

    useEffect(() => {
        setBookingList(bookingInfo)
    }, [bookingInfo])

    return (
        <>
            <Button
                className={"app-btn"}
                style={{
                    marginLeft: "10px",
                    width: "10rem",
                }}
                onClick={showModal}
            >
                {t("labels.buttons.my_bookings")}
            </Button>
            <Modal
                title="Movie Ticket"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                width="90%"
            >
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
                                    title={t("labels.auditorium_name")}
                                    dataIndex="auditoriumName"
                                    key="auditoriumName"
                                />
                                <Table.Column
                                    title={t("labels.seats")}
                                    dataIndex="seats"
                                    key="seats"
                                    render={(seats: IBookingSeat[] | null | undefined) =>
                                        Array.isArray(seats) && seats.length > 0
                                            ? seats.map(seat => seat.seatCode).join(", ")
                                            : "-"
                                    }
                                />
                                <Table.Column
                                    title={t("labels.date")}
                                    dataIndex="startAt"
                                    key="startAt"
                                    render={(startAt?: string) =>
                                        startAt ? startAt.substring(0, 10) : "-"
                                    }
                                />
                                <Table.Column
                                    title={t("labels.start_at")}
                                    dataIndex="startAt"
                                    key="startAt"
                                    render={(startAt?: string) =>
                                        startAt ? startAt.substring(11, 19) : "-"
                                    }
                                />
                                <Table.Column
                                    title={t("labels.end_at")}
                                    dataIndex="endAt"
                                    key="endAt"
                                    render={(endAt?: string) =>
                                        endAt ? endAt.substring(11, 19) : "-"
                                    }
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
                            </Table>
                        )}
                    </Content>
                </Layout>
            </Modal>
        </>
    )
}

export default MyBookingListUI