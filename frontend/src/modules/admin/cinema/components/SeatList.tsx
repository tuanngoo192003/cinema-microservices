import { Layout, Row } from "antd";
import SeatUI from "./SeatUI";
import { Content } from "antd/es/layout/layout";

type Props = {
  rows: string[];
  columns: number[];
};

export default function SeatList({ rows, columns }: Props) {
  return (
    <Layout className="app-theme">
      <Content>
        {rows.map((row) => (
          <Row key={row} gutter={[4, 4]} justify="center" align="middle" style={{ height: "100vh" }}>
            {columns.map((col) => {
              return <SeatUI col={col} row={row} />;
            })}
          </Row>
        ))}
      </Content>
    </Layout>
  );
}
