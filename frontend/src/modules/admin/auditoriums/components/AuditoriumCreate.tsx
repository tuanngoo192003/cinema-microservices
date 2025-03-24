import { Button, Form, Input, InputNumber, Typography } from "antd";
import { useState } from "react";
import { getRows } from "../../../core/constants/seat";
import SeatList from "./SeatList";
import { CreateAuditorium } from "../services";
import { HttpStatusCode } from "axios";
import { useNavigate } from "react-router-dom";
import { ADMIN_AUDITORIUMS } from "../../../core/constants/redirectURI";

export default function AuditoriumCreate() {
  const [rowCount, setRowCount] = useState<number>(1);
  const [colCount, setColCount] = useState<number>(1);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const rows = getRows(rowCount).split("");
  const columns = Array.from({ length: colCount }, (_, i) => i + 1);

  const handleCreate = async () => {
    if (name) {
      try {
        const result = await CreateAuditorium({
          auditorium_name: name,
          rows: rowCount,
          columns: colCount,
        });
        if (result.status == HttpStatusCode.Ok) {
          navigate(ADMIN_AUDITORIUMS);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
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
      <Button variant="solid" color="green" onClick={handleCreate}>
        Save
      </Button>
    </>
  );
}
