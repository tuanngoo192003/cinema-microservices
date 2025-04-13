import { Button, Form, Input, InputNumber, Layout, Modal, Typography } from "antd";
import { useState } from "react";
import { getRows } from "../../../core/constants/seat";
import SeatListUI from "./SeatListUI";
import { CreateAuditorium } from "../services/auditorium";
import { HttpStatusCode } from "axios";
import { useNavigate } from "react-router-dom";
import { ADMIN_AUDITORIUMS } from "../../../core/constants/redirectURI";
import { LoadingPage } from "../../../core/components/LoadingPage";
import "../../../../App.css";
import { useTranslation } from "react-i18next";
import { Content } from "antd/es/layout/layout";
import { useAuditorium } from "../hooks";

export interface IUpdateAuditoriumProps {
  id: number
  movieName: string
  imageURL: string
  description: string
  duration: number
  releaseDate: Date
  movieGenre: string
  isDeleted: boolean
}

export interface AuditoriumUpdateUIProps {
  movie?: IUpdateAuditoriumProps;
}

export default function AuditoriumUpdateUI() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [/* modalText */, setModalText] = useState('Content of the modal');
  const { loading } = useAuditorium();
  //const [auditoriumId, setAuditoriumId] = useState<number>(0);
  const { t } = useTranslation()
  //const { id } = useParams<{ id: string }>();
  const [rowCount, setRowCount] = useState<number>(1);
  const [colCount, setColCount] = useState<number>(1);
  //const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const rows = getRows(rowCount).split("");
  const columns = Array.from({ length: colCount }, (_, i) => i + 1);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

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

  if (loading) return <LoadingPage />;

  return (
    <>
      <Button className="app-btn" onClick={showModal}>
        {t("labels.view_detail")}
      </Button>
      <Modal
        title="Movie Ticket"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Layout
          style={{
            minHeight: "90vh",
            overflow: "hidden",
            paddingBottom: "3rem",
          }}
        >
          <Content>
            <Typography.Title style={{ textAlign: "center", marginBottom: "24px" }}>
              Update Auditorium
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
            <SeatListUI columns={columns} rows={rows} />
            <Button className="app-btn" onClick={handleCreate}>
              {t('labels.button.save')}
            </Button>
          </Content>
        </Layout>
      </Modal>
    </>
  );
}
