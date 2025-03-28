import { Button, Form, Input, InputNumber, Layout, Typography } from "antd";
import { useState } from "react";
import "../../../../App.css"
import { getRows } from "../../../core/constants/seat";
import { useAuditorium } from "../hooks";
import { IAuditoriumParam } from "../models/Auditorium";
import SeatList from "./SeatList";
import { useTranslation } from "react-i18next";
import { Content } from "antd/es/layout/layout";

export default function AuditoriumCreate() {
  const { t } = useTranslation()
  const [rowCount, setRowCount] = useState<number>(1);
  const [colCount, setColCount] = useState<number>(1);
  const [name, setName] = useState("");
  const { handleCreateAuditorium } = useAuditorium()
  const rows = getRows(rowCount).split("");
  const columns = Array.from({ length: colCount }, (_, i) => i + 1);
  const createAuditorium = () => {
    const body: IAuditoriumParam = {
      auditorium_name: name,
      rows: rowCount,
      columns: colCount,
    };

    handleCreateAuditorium(body);
  };

  return (
    <>
      <Layout className="app-theme" style={{ minHeight: "100vh", overflow: "hidden" }}>
        <Content>
          <Typography.Title style={{ textAlign: "center", marginBottom: "24px" }}>
            Create Auditorium
          </Typography.Title>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="vertical"
            style={{ maxWidth: 1000 }}
          >
            <Form.Item label="Auditorium's name">
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Item>
            <Form.Item label="Rows number">
              <InputNumber
                min={1}
                max={26}
                value={rowCount}
                onChange={(value) => setRowCount(value || 1)}
              />
            </Form.Item>
            <Form.Item label="Columns number">
              <InputNumber
                min={1}
                max={50}
                value={colCount}
                onChange={(value) => setColCount(value || 1)}
              />
            </Form.Item>
          </Form>
          <SeatList columns={columns} rows={rows} />
          <Button className="app-btn" onClick={createAuditorium}>
            {t('labels.buttons.save')}
          </Button>
        </Content>
      </Layout>
    </>
  );
}
