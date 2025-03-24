import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col } from "antd";
import { faCouch } from "@fortawesome/free-solid-svg-icons";

type Props = {
  row: string;
  col: number;
};

export default function SeatUI({ row, col }: Props) {
  return (
    <>
      <Col
        key={`${row}-${col}`}
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
        >
          <FontAwesomeIcon
            icon={faCouch}
            style={{
              fontSize: "1.5rem",
              color: "#bcb7b3",
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
