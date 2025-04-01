import React, { useState } from "react";
import "../../../App.css"
import { Button, Col, Layout, Modal, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { Content } from "antd/es/layout/layout";
import { IAuditorium, IChoosedSeat } from "../models/booking";

interface ConfirmModalProps {
    movieScheduleId?: number
    movieName?: string
    auditorium?: IAuditorium
    startAt?: Date
    endAt?: Date
    seat: IChoosedSeat[]
    totalPrice: number
    onConfirm: () => void
}

export const ConfirmBookingUI: React.FC<ConfirmModalProps> = (bookingInfo: ConfirmModalProps) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { t } = useTranslation();
    const [/* modalText */, setModalText] = useState('Content of the modal');

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

                                    <Typography.Text strong>Start at:</Typography.Text>                                    
                                    {bookingInfo?.startAt && (
                                        <Typography.Text>
                                            {new Date(bookingInfo.startAt).toISOString().split("T")[0]}
                                        </Typography.Text>
                                    )}
                                    <br />
                                    <Typography.Text strong>End at:</Typography.Text> 
                                    {bookingInfo?.endAt && (
                                        <Typography.Text>
                                            {new Date(bookingInfo.endAt).toISOString().split("T")[0]}
                                        </Typography.Text>
                                    )}
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
                                    <Button className="app-btn" style={{ marginTop: '2rem' }} onClick={bookingInfo.onConfirm}>
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
