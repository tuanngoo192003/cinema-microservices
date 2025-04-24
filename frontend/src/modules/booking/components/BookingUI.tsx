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
import Title from "antd/es/typography/Title";
import { useTranslation } from "react-i18next";
import { AppFooter } from "../../core/components/AppFooter.tsx";
import { ConfirmBookingUI } from "./ConfirmBookingUI.tsx";
import SeatUI from "./SeatUI.tsx";
import useModal from "../../core/hooks/useModal.ts";
import { IAuditorium, IBookingParam, IBookingSeat, IChoosedSeat, IMovieSchedule, ISeat } from "../models/booking.ts";
import { useBooking, useReservedSeat } from "../hooks/index.ts";
import { useParams } from "react-router-dom";
import { LoadingPage } from "../../core/components/LoadingPage.tsx";
import { useAuth } from "../../user/hooks";
import { IReservedSeatParam } from "../models/reserved_seat.ts";

const BookingUI: React.FC = () => {
  const { t } = useTranslation();
  const { profile } = useAuth()
  const { isVisible, showModal, hideModal, isLoading } = useModal();
  const [modalText, setModalText] = useState<string>("");
  const { movieSchedule, bookingInfo, loading, handleGetMovieDetails, handleBooking, handleGetBookingByUserID } = useBooking()
  const [movieScheduleData, setMovieScheduleData] = useState<IMovieSchedule>();
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [auditorium, setAuditorium] = useState<IAuditorium | null>(null)
  const [numRows, setNumRows] = useState<number>(0)
  const [numCols, setNumCols] = useState<number>(0)
  const [isBooked, setIsBooked] = useState<boolean>(false)

  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);

  const [choose, setChoosed] = useState<IChoosedSeat[]>([]);
  const [seats, setSeats] = useState<ISeat[]>([]);
  const { handleReservedSeat, handleRemoveReservedSeat } = useReservedSeat()

  // Get BookingInfo and check if user is booked or not
  useEffect(() => {
    if (profile) handleGetBookingByUserID(profile.id)
  }, [profile])

  useEffect(() => {
    if (bookingInfo) {
      const filtered = bookingInfo.filter(b => b.userID == profile?.id)
      if (filtered.length > 0) {
        setIsBooked(true)
      }
    }
  }, [bookingInfo])

  // Get Movie Details data and setState
  useEffect(() => {
    handleGetMovieDetails(movieId);
  }, [movieId]);

  useEffect(() => {
    if (movieSchedule) {
      setMovieScheduleData(movieSchedule)
    }
  }, [movieSchedule])

  useEffect(() => {
    if (movieScheduleData) {
      setAuditorium(movieScheduleData?.auditorium)
    }
  }, [movieScheduleData])

  useEffect(() => {
    if (auditorium) {
      setNumCols(auditorium.columns)
      setNumRows(auditorium.rows)
      setSeats(auditorium.seats)
    }
  }, [auditorium])

  // handle when i seat is selected
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

  const appendSeat = async (seat: ISeat) => {
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
  
      const param = {
        scheduleId: movieSchedule?.id,
        seatId: newSeat.seatId,
        userId: profile?.id,
      } as IReservedSeatParam;
  
      const seatExists = prevChose.some((seat) => seat.seatId === newSeat.seatId);
  
      if (seatExists) {
        handleRemoveReservedSeat(newSeat.seatId);
        return prevChose.filter((seat) => seat.seatId !== newSeat.seatId);
      } else {
        const updatedSeats = [...prevChose, newSeat];
        const groupedSeatsByRow = groupSeatsByRow(updatedSeats);
  
        const isValid = groupedSeatsByRow.every(rowSeats => {
          const sortedSeats = rowSeats.sort((a, b) => {
            const aNumber = parseInt(a.seatCode.slice(1));
            const bNumber = parseInt(b.seatCode.slice(1));
            return aNumber - bNumber;
          });
  
          for (let i = 1; i < sortedSeats.length; i++) {
            const currentSeatNumber = parseInt(sortedSeats[i].seatCode.slice(1));
            const previousSeatNumber = parseInt(sortedSeats[i - 1].seatCode.slice(1));
  
            if (currentSeatNumber - previousSeatNumber > 1) {
              return false;
            }
          }
          return true;
        });
  
        if (isValid) {
          handleReservedSeat(param).then((res) => {
            if (!res) {
              return; // Don't update state if reservation failed
            }
            setChoosed(updatedSeats); // Update state after successful reservation
          });
          return prevChose; // Return previous state immediately
        } else {
          setModalText("Seats must be next to each other. Please choose consecutive seats.");
          showModal();
          return prevChose;
        }
      }
    });
  };
  

  // Utility function to group seats by row
  const groupSeatsByRow = (seats: IChoosedSeat[]) => {
    const grouped: Record<string, IChoosedSeat[]> = {};
    seats.forEach(seat => {
      const row = seat.seatCode[0]; // Assuming row is the first character of the seat code (like 'A1', 'A2', etc.)
      if (!grouped[row]) grouped[row] = [];
      grouped[row].push(seat);
    });
    return Object.values(grouped);
  };

  const handleConfirmBooking = () => {
    const bookingParam = {
      userId: profile?.id,
      movieId: movieSchedule?.movie.movieId,
      movieName: movieSchedule?.movie.movieName,
      description: movieSchedule?.movie.description,
      auditoriumName: movieSchedule?.auditorium.auditoriumName,
      releaseDate: movieSchedule?.movie.releaseDate,
      startAt: movieSchedule?.startAt,
      endAt: movieSchedule?.endAt,
      moviePrice: 0,
      movieGenre: movieSchedule?.movie.movieGenre,
      scheduleId: movieSchedule?.id,
      seats: choose.map(s => {
        return {
          seatId: s.seatId,
          seatCode: s.seatCode,
        } as IBookingSeat
      }),
      totalPrice: totalPrice,
      status: 'CONFIRMED'
    } as IBookingParam

    handleBooking(bookingParam, movieId)
  };

  if (loading || !seats || !numCols || !numRows) {
    return <div><LoadingPage /></div>;
  }

  return (
    <>
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
                  {Array.from({ length: numRows }).map((_, rowIndex) => (
                    <Row gutter={[16, 16]} justify="space-between" key={rowIndex} style={{ width: "100%" }}>
                      {seats
                        .slice(rowIndex * numCols, (rowIndex + 1) * numCols) // 🔹 Get seats for this row
                        .map((seat) => (
                          <SeatUI key={seat.id} handleOnclick={appendSeat} seat={seat} numCols={numCols} />
                        ))}
                    </Row>
                  ))}
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
                      src={movieScheduleData?.movie.imageURL}
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
                        {movieScheduleData?.startAt && (
                          <Typography.Text>
                            {new Date(movieScheduleData.startAt).toISOString().split("T")[0]}
                          </Typography.Text>
                        )}
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
                    totalPrice={totalPrice}
                    isBooked={isBooked}
                    onConfirm={handleConfirmBooking}
                  />
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
    </>
  );
};

export default BookingUI;
