import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col } from "antd";
import { faCouch } from "@fortawesome/free-solid-svg-icons";
import { Seat } from "../models/Seat";

type Props = {
  handleOnclick: (seat: Seat) => void;
  row: string;
  col: number;
  seat: Seat;
};

export default function SeatUI({ handleOnclick, row, col, seat }: Props) {
  return (
    <>
      <Col
        key={seat?.id}
        span={2}
        style={{
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "2rem",
            height: "2rem",
            position: "relative",
            display: "inline-block",
          }}
          onClick={() => handleOnclick(seat)}
        >
          <FontAwesomeIcon
            icon={faCouch}
            style={{
              fontSize: "1.5rem",
              color:
                seat?.status === "AVAILABLE"
                  ? "#bcb7b3"
                  : seat?.status === "RESERVED"
                  ? "#50a3ba"
                  : seat?.status === "CHOOSED"
                  ? "#b8ba50"
                  : "#9f1f1f",
              cursor: "pointer",
            }}
          />
          <p
            style={{
              position: "absolute",
              fontSize: "0.75rem",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: seat?.status === "BOOKED" ? "white" : "black",
              fontWeight: "bold",
            }}
          >
            {row}
            {col}
          </p>
        </div>
      </Col>
    </>
  );
}
