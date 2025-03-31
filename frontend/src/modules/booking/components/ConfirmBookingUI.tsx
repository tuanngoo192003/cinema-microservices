import React, { useState } from "react";
import "../../../App.css"
import { Button, Col, Layout, Modal, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { Content } from "antd/es/layout/layout";
import { IAuditorium, IBookingParam, IChoosedSeat } from "../models/booking";
import { useBooking } from "../hooks";
import { useParams } from "react-router-dom";
import { useAuth } from "../../user/hooks";

interface ConfirmModalProps {
    movieScheduleId?: number 
    movieName?: string
    auditorium?: IAuditorium
    startAt?: Date
    endAt?: Date
    seat: IChoosedSeat[]
    totalPrice: number
}

export const ConfirmBookingUI: React.FC<ConfirmModalProps> = (bookingInfo: ConfirmModalProps) => {
    const [open, setOpen] = useState(false);
    const { handleBooking } = useBooking()
    const { profile } = useAuth()
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { t } = useTranslation();
    const [modalText, setModalText] = useState('Content of the modal');

    const confirmBooking = () => {
        const bookingParam = {
            user_id: profile?.id,
            schedule_id: bookingInfo.movieScheduleId,
            seat_ids: bookingInfo.seat.map(s => s.seatId),
            total_price: bookingInfo.totalPrice,
            status: 'CONFIRMED'
        } as IBookingParam
        const { id } = useParams<{ id: string }>();
        const movieScheduleId = Number(id);
        handleBooking(bookingParam, movieScheduleId)
    }

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

    return (
        <>
            <Button className="app-btn" onClick={showModal}>
                {t('labels.buttons.continue')}
            </Button>
            <Modal
                title="Movie Ticket"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Layout>
                    <Content>
                        <Row justify="center">
                            <Col span={24}>
                                <div
                                    title="Movie Ticket"
                                    style={{
                                        width: '100%',
                                        textAlign: 'center',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                    }}
                                >
                                    <Typography.Title level={3}>{bookingInfo.movieName}</Typography.Title>
                                    <Typography.Text strong>Start at:</Typography.Text> <Typography.Text>{bookingInfo.startAt?.toISOString()}</Typography.Text>
                                    <br />
                                    <Typography.Text strong>End at:</Typography.Text> <Typography.Text>{bookingInfo.endAt?.toISOString()}</Typography.Text>
                                    <br />
                                    <Typography.Text strong>Auditorium:</Typography.Text> <Typography.Text>{bookingInfo.auditorium?.auditoriumName}</Typography.Text>
                                    <br />
                                    <Typography.Text strong>Seat:</Typography.Text> <Typography.Text>{bookingInfo.seat.map(s => s.seatCode).join(", ")}</Typography.Text>
                                    <br />
                                    <Row justify="center" style={{ marginTop: '2rem' }}>
                                        <Col>
                                            <Typography.Text strong>Total Price:</Typography.Text> <Typography.Text>${bookingInfo.totalPrice}</Typography.Text>
                                        </Col>
                                    </Row>
                                    <Button className="app-btn" style={{ marginTop: '2rem' }} onClick={confirmBooking}>
                                        {t('labels.buttons.confirm-booking')}
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Modal>
        </>
    )
}