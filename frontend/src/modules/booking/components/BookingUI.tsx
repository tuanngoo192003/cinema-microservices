import React, {useState} from "react";
import "../../../App.css"
import {Button, Card, Col, Divider, Image, Layout, Row, Typography} from "antd";
import {Content} from "antd/es/layout/layout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCouch, faClock, faCalendarDay, faTv, faBoxesStacked } from "@fortawesome/free-solid-svg-icons";
import chinatsu from "../../../assets/千夏.jpg";
import Title from "antd/es/typography/Title";
import {useTranslation} from "react-i18next";
import {AppFooter} from "../../core/components/AppFooter.tsx";
import {ConfirmBookingUI} from "./ConfirmBooking.tsx";

const rows = "ABCDEFGHIJ".split(""); // A to J
const columns = Array.from({ length: 12 }, (_, i) => i + 1);

export const BookingUI: React.FC = () => {
    const [seats, setSeats] = useState<{ id: string; status: "AVAILABLE" | "RESERVED" | "BOOKED" }[]>(
        rows.flatMap((row) =>
            columns.map((col) => ({
                id: `${row}${col}`,
                status: "AVAILABLE", // Default status
            }))
        )
    );
    console.log(setSeats)
    const { t } = useTranslation();
    const [mock, setMock] = useState({
        imageSrc: chinatsu,
        title: "Title 1",
        genre: "Romcom",
        duration: "120p",
        start_at: "23:45",
        auditorium: "P6",
        seat: ["A1", "A2", "A3"]
    });

    const appendSeat = (seatCode: string) => {
        setMock((prevMock) => ({
            ...prevMock,
            seat: [...prevMock.seat, seatCode] // Create a new array to trigger re-render
        }));
    };
    return (
        <>
            <Layout>
                <Content>
                    <Row
                        gutter={[0, 0]}
                        justify="center"
                        align="middle"
                        style={{ marginLeft: "10rem", marginRight: "10rem", minHeight: "100vh", display: "flex" }}
                    >
                        <Col xs={24} md={16} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Card style={{background: "#FFFFFF", height: "80vh", width: "100vw", padding: "1rem"}}>
                                {/* Legend */}
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "1rem",
                                    marginBottom: "2rem"
                                }}>
                                    <div style={{position: "relative", width: "2rem", height: "2rem"}}>
                                        <FontAwesomeIcon icon={faCouch} style={{fontSize: "2rem", color: "#bcb7b3"}}/>
                                        <p className="chair-text">
                                            A
                                        </p>
                                    </div>
                                    <p>{t('labels.available')}</p>
                                    <div style={{position: "relative", width: "2rem", height: "2rem"}}>
                                        <FontAwesomeIcon icon={faCouch} style={{fontSize: "2rem", color: "#866d37"}}/>
                                        <p className="chair-text" style={{color: "black"}}>
                                            R
                                        </p>
                                    </div>
                                    <p>{t('labels.reserved')}</p>
                                    <div style={{position: "relative", width: "2rem", height: "2rem"}}>
                                        <FontAwesomeIcon icon={faCouch} style={{fontSize: "2rem", color: "#9f1f1f"}}/>
                                        <p className="chair-text" style={{color: "white"}}>
                                            B
                                        </p>
                                    </div>
                                    <p>{t('labels.booked')}</p>
                                </div>

                                {/* Seats Layout */}
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: "1rem"
                                }}>
                                    {/* Curved Screen */}
                                    <svg width="100%" height="80" viewBox="0 0 800 80" preserveAspectRatio="none">
                                        <path d="M 0 60 Q 400 0, 800 60"
                                              stroke="gray"
                                              fill="rgba(200, 200, 200, 0.5)"
                                              strokeWidth="4"/>
                                    </svg>
                                </div>

                                {/* Seats Layout */}
                                <div style={{width: "100%"}}>
                                    {rows.map((row) => (
                                        <Row key={row} gutter={[4, 4]} justify="center">
                                            {columns.map((col) => {
                                                const seat = seats.find((s) => s.id === `${row}${col}`);
                                                return (
                                                    <Col key={seat?.id} span={2}
                                                         style={{textAlign: "center", position: "relative"}}>
                                                        <div style={{
                                                            width: "2rem",
                                                            height: "2rem",
                                                            position: "relative",
                                                            display: "inline-block"
                                                        }}>
                                                            <FontAwesomeIcon
                                                                icon={faCouch}
                                                                style={{
                                                                    fontSize: "1.5rem",
                                                                    color: seat?.status === "AVAILABLE" ? "#bcb7b3"
                                                                        : seat?.status === "RESERVED" ? "#866d37"
                                                                            : "#9f1f1f",
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={() => appendSeat(row+col.toString())}
                                                            />
                                                            <p style={{
                                                                position: "absolute",
                                                                fontSize: "0.75rem",
                                                                top: "50%",
                                                                left: "50%",
                                                                transform: "translate(-50%, -50%)",
                                                                color: seat?.status === "BOOKED" ? "white" : "black",
                                                                fontWeight: "bold",
                                                            }}>
                                                                {row}{col}
                                                            </p>
                                                        </div>
                                                    </Col>
                                                );
                                            })}
                                        </Row>
                                    ))}
                                </div>
                            </Card>
                        </Col>
                        <Col xs={24} md={8}
                             style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <Card style={{background: "#FFFFFF", height: "80vh"}}>
                                <Row
                                    gutter={[16, 0]}
                                    justify="center"
                                    align="middle"
                                >
                                    <Col xs={24} md={10}>
                                        <Image src={chinatsu} alt={chinatsu}
                                               style={{
                                                   borderRadius: "12px",
                                                   height: "11rem",     // Set an absolute height
                                                   objectFit: "contain", // Ensures the entire image fits inside
                                                   backgroundColor: "#fff", // White background for missing parts
                                                   display: "block"
                                               }}
                                        />
                                    </Col>
                                    <Col xs={24} md={14}>
                                        <div>
                                            <Title level={3}>
                                                青いの箱
                                            </Title>
                                            <Title level={5} style={{marginBottom: 0, whiteSpace: "nowrap"}}>
                                                {t("labels.titles.movie_genre")} : {mock.genre}
                                            </Title>
                                            <Title level={5} style={{marginTop: 4, whiteSpace: "nowrap"}}>
                                                 <FontAwesomeIcon icon={faClock}/> &nbsp; {t("labels.titles.duration")} : {mock.duration}
                                            </Title>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider dashed style={{ borderWidth: "2px" }} />
                                <Row>
                                    <Col span={24}>
                                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <Title level={5} style={{ marginBottom: 0 }}>
                                                    <FontAwesomeIcon icon={faCalendarDay} /> &nbsp; {t("common.start_at")} :
                                                </Title>
                                                <Typography.Text>{mock.start_at}</Typography.Text>
                                            </div>

                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <Title level={5} style={{ marginBottom: 0 }}>
                                                    <FontAwesomeIcon icon={faTv} /> &nbsp; {t("labels.titles.auditorium")} :
                                                </Title>
                                                <Typography.Text>{mock.auditorium}</Typography.Text>
                                            </div>

                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <Title level={5} style={{ marginBottom: 0 }}>
                                                    <FontAwesomeIcon icon={faBoxesStacked} /> &nbsp; {t("labels.titles.seat")} :
                                                </Title>
                                                <Typography.Text>{mock.seat.join(", ")}</Typography.Text>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>

                                <Row
                                    gutter={[16, 10]}
                                    justify="center"
                                    align="middle"
                                    style={{marginTop: "1rem"}}
                                >
                                    <ConfirmBookingUI/>
                                    <Button className="secondary-btn">
                                        {t('labels.buttons.back')}
                                    </Button>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Content>
                <div style={{marginTop: "-13rem"}}>
                    <AppFooter/>
                </div>
            </Layout>
        </>
    )
}