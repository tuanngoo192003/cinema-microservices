import { Row } from "antd";
import SeatUI from "./SeatUI";

type Props = {
  rows: string[];
  columns: number[];
};

export default function SeatList({ rows, columns }: Props) {
  return (
    <div style={{ width: "100%" }}>
      {rows.map((row) => (
        <Row key={row} gutter={[4, 4]} justify="center">
          {columns.map((col) => {
            return <SeatUI col={col} row={row} />;
          })}
        </Row>
      ))}
    </div>
  );
}
