import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col } from "antd";
import { faCouch } from "@fortawesome/free-solid-svg-icons";
import { ISeat } from "../models/booking";
import separateSeatCode from "../../core/utils";
import { useAuth } from "../../user/hooks";

type Props = {
  handleOnclick: (seat: ISeat) => void;
  seat: ISeat;
  numCols: number;
};

export default function SeatUI({ handleOnclick, seat, numCols }: Props) {
  const { profile } = useAuth();
  const { row, col } = separateSeatCode(seat.seatCode);

  const isOwnedByUser = seat?.userId === profile?.id;
  const seatStatus = isOwnedByUser ? "CHOOSED" : seat?.status;
  const isDisabled = isOwnedByUser;
  
  return (
    <Col
      span={24 / numCols}
      key={seat?.id}
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
          pointerEvents: isDisabled ? "none" : "auto",
          opacity: isDisabled ? 0.5 : 1,
        }}
        onClick={!isDisabled ? () => handleOnclick(seat) : undefined}
      >
        <FontAwesomeIcon
          icon={faCouch}
          style={{
            fontSize: "1.5rem",
            color:
              seatStatus === "AVAILABLE"
                ? "#bcb7b3"
                : seatStatus === "RESERVED"
                  ? "#50a3ba"
                  : seatStatus === "CHOOSED"
                    ? "#b8ba50"
                    : "#9f1f1f",
            cursor: isDisabled ? "not-allowed" : "pointer",
          }}
        />
        <p
          style={{
            position: "absolute",
            fontSize: "0.75rem",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: seatStatus === "BOOKED" ? "white" : "black",
            fontWeight: "bold",
          }}
        >
          {row}
          {col}
        </p>
      </div>
    </Col>
  );
}