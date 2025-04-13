import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Layout,
  Typography,
} from "antd";
import { useState } from "react";
import "../../../../App.css";
import { getRows } from "../../../core/constants/seat";
import { useAuditorium } from "../hooks";
import SeatListUI from "./SeatListUI";
import { useTranslation } from "react-i18next";
import { Content } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import { ADMIN_AUDITORIUMS } from "../../../core/constants/redirectURI";
import { IAuditoriumParam } from "../models/auditorium_admin";

export default function AuditoriumCreateUI() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [rowCount, setRowCount] = useState<number>(1);
  const [colCount, setColCount] = useState<number>(1);
  const [name, setName] = useState("");
  const { handleCreateAuditorium } = useAuditorium();
  const rows = getRows(rowCount).split("");
  const columns = Array.from({ length: colCount }, (_, i) => i + 1);
  const createAuditorium = () => {
    const body: IAuditoriumParam = {
      auditorium_name: name,
      rows: rowCount,
      columns: colCount,
    };
    console.log(body)
    handleCreateAuditorium(body);
  };
  const backToAuditoriumList = () => {
    navigate( ADMIN_AUDITORIUMS )
  }

  return (
    <>
      <Layout
        style={{ minHeight: "100vh", overflow: "hidden" }}
      >
        <Content>
          <Card>
            <Typography.Title
              style={{ textAlign: "center", marginBottom: "24px" }}
            >
              {t('titles.auditorium_create')}
            </Typography.Title>
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout="vertical"
              style={{ maxWidth: 1000 }}
            >
              <Form.Item label={t('labels.auditorium_name')}>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Item>
              <Form.Item label={t('labels.num_rows')}>
                <InputNumber
                  min={1}
                  max={26}
                  value={rowCount}
                  onChange={(value) => setRowCount(value || 1)}
                />
              </Form.Item>
              <Form.Item label={t('labels.num_cols')}>
                <InputNumber
                  min={1}
                  max={50}
                  value={colCount}
                  onChange={(value) => setColCount(value || 1)}
                />
              </Form.Item>
            </Form>
              {t('titles.preview')}
            <SeatListUI columns={columns} rows={rows} />
            <Button className="app-btn" onClick={createAuditorium}>
              {t("labels.buttons.save")}
            </Button>
            <Button className="secondary-btn" onClick={backToAuditoriumList}>
              {t('labels.buttons.back')}
            </Button>
          </Card>
        </Content>
      </Layout>
    </>
  );
}
