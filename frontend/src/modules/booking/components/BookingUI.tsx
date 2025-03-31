import React, { useEffect, useState } from "react";
import "../../../App.css";
import {
  Button,
  Card,
  Col,
  Divider,
  Image,
  Layout,
  Modal,
  Row,
  Typography,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCouch,
  faClock,
  faCalendarDay,
  faTv,
  faBoxesStacked,
} from "@fortawesome/free-solid-svg-icons";
import chinatsu from "../../../assets/千夏.jpg";
import Title from "antd/es/typography/Title";
import { useTranslation } from "react-i18next";
import { AppFooter } from "../../core/components/AppFooter.tsx";
import { ConfirmBookingUI } from "./ConfirmBookingUI.tsx";
import SeatUI from "./SeatUI.tsx";
import useModal from "../../core/hooks/useModal.ts";
import { IChoosedSeat, IMovieSchedule, ISeat } from "../models/booking.ts";
import { useBooking } from "../hooks/index.ts";
import { useParams } from "react-router-dom";
import { LoadingPage } from "../../core/components/LoadingPage.tsx";

const BookingUI: React.FC = () => {
  const { t } = useTranslation();
  const { isVisible, showModal, hideModal, isLoading } = useModal();
  const [modalText, setModalText] = useState<string>("");
  const { movieSchedule, loading, handleGetMovieDetails } = useBooking()
  const [movieScheduleData, setMovieScheduleData] = useState<IMovieSchedule>();
  const [totalPrice, setTotalPrice] = useState<number>(0)

  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);

  const [choose, setChoosed] = useState<IChoosedSeat[]>([]);
  const [seats, setSeats] = useState<ISeat[]>([]);

  useEffect(() => {
    handleGetMovieDetails(movieId);
  }, [movieId]);

  useEffect(() => {
    if (movieSchedule) setMovieScheduleData(movieSchedule)
  }, [movieSchedule])

  useEffect(() => {
    if (movieScheduleData) {
      setSeats(movieScheduleData?.auditorium.seats)
    }
  }, [movieScheduleData])

  useEffect(() => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        choose.some((c) => c.seatId === seat.id) && seat.status !== "CHOOSED"
          ? { ...seat, status: "CHOOSED" }
          : seat.status === "CHOOSED" && !choose.some((c) => c.seatId === seat.id)
          ? { ...seat, status: "AVAILABLE" }
          : seat
      )
    );
    let currentPrice = 0
    choose.forEach(c => {
      currentPrice = currentPrice + c.seatPrice
    })
    setTotalPrice(currentPrice)
  }, [choose]);

  const appendSeat = (seat: ISeat) => {
    if (seat.status == "BOOKED" || seat.status == "RESERVED") {
      setModalText(
        `This seat is already ${seat.status.toLocaleLowerCase()}. Please choose other seat.`
      );
      showModal();
      return;
    }

    setChoosed(prevChose => {
      const newSeat: IChoosedSeat = {
        seatId: seat.id,
        seatCode: seat.seatCode,
        seatPrice: seat.price,
      };

      return prevChose.some((seat) => seat.seatId === newSeat.seatId)
        ? prevChose.filter((seat) => seat.seatId !== newSeat.seatId) 
        : [...prevChose, newSeat];
    });
  };

  return (
    <>
      {loading ? (<LoadingPage />) : (
        <Layout>
          <Content>
            <Row
              gutter={[0, 0]}
              justify="center"
              align="middle"
              style={{
                marginLeft: "10rem",
                marginRight: "10rem",
                minHeight: "100vh",
                display: "flex",
              }}
            >
              <Col
                xs={24}
                md={16}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Card
                  style={{
                    background: "#FFFFFF",
                    height: "80vh",
                    width: "100vw",
                    padding: "1rem",
                  }}
                >
                  {/* Legend */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "1rem",
                      marginBottom: "2rem",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "2rem",
                        height: "2rem",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faCouch}
                        style={{ fontSize: "2rem", color: "#bcb7b3" }}
                      />
                      <p className="chair-text">A</p>
                    </div>
                    <p>{t("labels.available")}</p>
                    <div
                      style={{
                        position: "relative",
                        width: "2rem",
                        height: "2rem",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faCouch}
                        style={{ fontSize: "2rem", color: "#50a3ba" }}
                      />
                      <p className="chair-text" style={{ color: "black" }}>
                        R
                      </p>
                    </div>
                    <p>{t("labels.reserved")}</p>
                    <div
                      style={{
                        position: "relative",
                        width: "2rem",
                        height: "2rem",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faCouch}
                        style={{ fontSize: "2rem", color: "#9f1f1f" }}
                      />
                      <p className="chair-text" style={{ color: "white" }}>
                        B
                      </p>
                    </div>
                    <p>{t("labels.booked")}</p>
                    <div
                      style={{
                        position: "relative",
                        width: "2rem",
                        height: "2rem",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faCouch}
                        style={{ fontSize: "2rem", color: "#b8ba50" }}
                      />
                      <p className="chair-text" style={{ color: "white" }}>
                        C
                      </p>
                    </div>
                    <p>{t("labels.your_choices")}</p>
                  </div>

                  {/* Seats Layout */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    {/* Curved Screen */}
                    <svg
                      width="100%"
                      height="80"
                      viewBox="0 0 800 80"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M 0 60 Q 400 0, 800 60"
                        stroke="gray"
                        fill="rgba(200, 200, 200, 0.5)"
                        strokeWidth="4"
                      />
                    </svg>
                  </div>

                  {/* Seats Layout */}
                  <div style={{ width: "100%" }}>
                    <Row gutter={[4, 4]} justify="center">
                      {seats.map(seat => {
                        return (
                          <SeatUI
                            handleOnclick={appendSeat}
                            seat={seat}
                          />
                        );
                      })}
                    </Row>
                  </div>
                </Card>
              </Col>
              <Col
                xs={24}
                md={8}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Card style={{ background: "#FFFFFF", height: "80vh" }}>
                  <Row gutter={[16, 0]} justify="center" align="middle">
                    <Col xs={24} md={10}>
                      <Image
                        src={chinatsu}
                        alt={chinatsu}
                        style={{
                          borderRadius: "12px",
                          height: "11rem", // Set an absolute height
                          objectFit: "contain", // Ensures the entire image fits inside
                          backgroundColor: "#fff", // White background for missing parts
                          display: "block",
                        }}
                      />
                    </Col>
                    <Col xs={24} md={14}>
                      <div>
                        <Title level={3}>{movieScheduleData?.movie.movieName}</Title>
                        <Title
                          level={5}
                          style={{ marginBottom: 0, whiteSpace: "nowrap" }}
                        >
                          {t("labels.titles.movie_genre")} : {movieScheduleData?.movie.movieGenre}
                        </Title>
                        <Title
                          level={5}
                          style={{ marginTop: 4, whiteSpace: "nowrap" }}
                        >
                          <FontAwesomeIcon icon={faClock} /> &nbsp;{" "}
                          {t("labels.titles.duration")} :{" "}
                          {movieScheduleData?.movie.duration}
                        </Title>
                      </div>
                    </Col>
                  </Row>
                  <Divider dashed style={{ borderWidth: "2px" }} />
                  <Row>
                    <Col span={24}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.5rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Title level={5} style={{ marginBottom: 0 }}>
                            <FontAwesomeIcon icon={faCalendarDay} /> &nbsp;{" "}
                            {t("common.start_at")} :
                          </Title>
                          <Typography.Text>
                            {movieScheduleData?.startAt ? movieScheduleData.startAt.toISOString().split("T")[0] : ""}
                          </Typography.Text>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Title level={5} style={{ marginBottom: 0 }}>
                            <FontAwesomeIcon icon={faTv} /> &nbsp;{" "}
                            {t("labels.titles.auditorium")} :
                          </Title>
                          <Typography.Text>
                            {movieScheduleData?.auditorium.auditoriumName}
                          </Typography.Text>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Title level={5} style={{ marginBottom: 0 }}>
                            <FontAwesomeIcon icon={faBoxesStacked} /> &nbsp;{" "}
                            {t("labels.titles.seat")} :
                          </Title>
                          <Typography.Text>{choose.map(c => c.seatCode).join(", ")}</Typography.Text>
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <Row
                    gutter={[16, 10]}
                    justify="center"
                    align="middle"
                    style={{ marginTop: "1rem" }}
                  >
                    <ConfirmBookingUI
                      movieScheduleId={movieSchedule?.id}
                      movieName={movieSchedule?.movie.movieName}
                      auditorium={movieSchedule?.auditorium}
                      startAt={movieSchedule?.startAt}
                      endAt={movieSchedule?.endAt}
                      seat={choose}
                      totalPrice={totalPrice} />
                    <Button className="secondary-btn">
                      {t("labels.buttons.back")}
                    </Button>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Content>
          <Modal
            title="Title"
            open={isVisible}
            onOk={hideModal}
            confirmLoading={isLoading}
            onCancel={hideModal}
          >
            <p>{modalText}</p>
          </Modal>
          <div style={{ marginTop: "-13rem" }}>
            <AppFooter />
          </div>
        </Layout>
      )}
    </>
  );
};

export default BookingUI;
