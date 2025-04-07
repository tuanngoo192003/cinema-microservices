import { Button, Layout, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import "../../../../App.css"
import { useNavigate } from "react-router-dom";
import { ADMIN_AUDITORIUMS_CREATE } from "../../../core/constants/redirectURI";
import { useTranslation } from "react-i18next";
import { useAuditorium } from "../hooks";
import { LoadingPage } from "../../../core/components/LoadingPage";
import { Content } from "antd/es/layout/layout";
import { IPagination } from "../../../core/models/core";
import { IAuditorium } from "../models/auditorium_admin";

export default function AuditoriumsListUI() {
  const { auditoriums, loading, handleGetAuditoriumList } = useAuditorium()
  const [ auditoriumPagination, setAuditoriumPagination ] = useState<IPagination<IAuditorium> | null>(null)
  //const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [auditoriumName,  /*setAuditoriumName*/ ] = useState<string>('')
  const [pageSize, setPageSize] = useState(10);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetAuditoriumList(currentPage, pageSize, auditoriumName)
  }, [auditoriumName, currentPage, pageSize])

  useEffect(() => {
    setAuditoriumPagination(auditoriums)
  }, [auditoriums])

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <Layout
            className="app-theme"
            style={{
              marginTop: "3.1rem",
              paddingTop: "3rem",
              paddingLeft: "3rem",
              paddingRight: "3rem",
              minHeight: "100vh",
              overflow: "hidden",
            }}
          >
            <Content>
              <Typography.Title style={{ textAlign: "center", marginBottom: "24px" }}>
                {t('labels.titles.list_auditorium')}
              </Typography.Title>
              <Space style={{ marginBottom: 16 }}>
                <Button
                  className="app-btn"
                  onClick={() => navigate(ADMIN_AUDITORIUMS_CREATE)}
                >
                  {t('labels.buttons.create')}
                </Button>
              </Space>
              <Table<IAuditorium>
                style={{ marginTop: "2rem" }}
                dataSource={auditoriumPagination?.data}
                rowKey="auditorium_id"
                loading={loading}
                pagination={{
                  current: currentPage,
                  pageSize: pageSize,
                  total: auditoriumPagination?.totalRecord || 0, // Total records from API
                  showSizeChanger: true,
                  pageSizeOptions: ["5", "10", "20"],
                }}
                onChange={handleTableChange}
              >
                <Table.Column
                  title={t("labels.auditorium_name")}
                  dataIndex="auditorium_name"
                  key="auditorium_name"
                />
                <Table.Column
                  title={t("labels.capacity")}
                  dataIndex="capacity"
                  key="capacity"
                />
                <Table.Column
                  title="Action"
                  key="action"
                  render={() => (
                    <Space size="middle">
                      <a>{t("labels.view_detail")}</a>
                      <a>{t("labels.delete")}</a>
                    </Space>
                  )}
                />
              </Table>
            </Content>
          </Layout>
        </>
      )}
    </>
  );
}
