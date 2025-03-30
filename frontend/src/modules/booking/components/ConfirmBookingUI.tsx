import React, { useState } from "react";
import "../../../App.css"
import { Button, Card, Col, Layout, Modal, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { Content } from "antd/es/layout/layout";
import { IAuditorium, ISeat } from "../models/booking";

interface ConfirmModalProps {
    movieName: string 
    auditorium: IAuditorium
    startAt: Date 
    endAt: Date
    seat: ISeat[]
    totalPrice: number
}

export const ConfirmBookingUI: React.FC<ConfirmModalProps> = (bookingInfo: ConfirmModalProps) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { t } = useTranslation();
    const [modalText, setModalText] = useState('Content of the modal');

    const confirmBooking = () => {

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
                title="Title"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Layout>
                    <Content>
                        <Row justify="center">
                            <Col span={12}>
                                <Card
                                    title="Movie Ticket"
                                    bordered={false}
                                    style={{
                                        width: '100%',
                                        textAlign: 'center',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                    }}
                                >
                                    <Typography.Title level={3}>{bookingInfo.movieName}</Typography.Title>
                                    <Typography.Text strong>Start at:</Typography.Text> <Typography.Text>{bookingInfo.startAt.toISOString.name }</Typography.Text>
                                    <br />
                                    <Typography.Text strong>End at:</Typography.Text> <Typography.Text>{bookingInfo.endAt.toISOString.name }</Typography.Text>
                                    <br />
                                    <Typography.Text strong>Auditorium:</Typography.Text> <Typography.Text>{bookingInfo.auditorium.auditoriumName}</Typography.Text>
                                    <br />
                                    <Typography.Text strong>Seat:</Typography.Text> <Typography.Text>{bookingInfo.seat.map(s => s.seatCode).join(", ")}</Typography.Text>
                                    <br />
                                    <Row justify="center" style={{ marginTop: '20px' }}>
                                        <Col>
                                            <Typography.Text strong>Total Price:</Typography.Text> <Typography.Text>${bookingInfo.totalPrice}</Typography.Text>
                                        </Col>
                                    </Row>
                                    <Button className="app-btn" onClick={confirmBooking}>
                                        {t('labels.buttons.confirm-booking')}
                                    </Button>
                                </Card>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Modal>
        </>
    )
}