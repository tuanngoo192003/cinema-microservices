import React, { useEffect, useState } from "react";
import { Avatar, Divider, Layout, Radio, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { LoadingPage } from "../../../core/components/LoadingPage.tsx";
import dayjs from "dayjs";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import { IPagination } from "../../../core/models/core.ts";
import { useUser } from "../hooks/index.ts";
import { IProfile } from "../models/user.ts";

const UserList: React.FC = () => {
  const { users, loading, handleGetUserList } = useUser();
  const [ userPagination, setUserPagination ] = useState<IPagination<IProfile> | null>(null)
  const [selectionType, setSelectionType] = useState<"checkbox" | "radio">(
    "checkbox"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { t } = useTranslation();

  useEffect(() => {
    handleGetUserList("tuan.nguyenhuu", currentPage, pageSize);
  }, [currentPage, pageSize]);

  useEffect(() => {
    setUserPagination(users)
  }, [users])

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const rowSelection: TableProps<IProfile>["rowSelection"] = {
    type: selectionType,
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`Selected: ${selectedRowKeys}`, selectedRows);
    },
  };

  return (
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
        <Title>{t("titles.user_list")}</Title>
        <Content>
          {/* Selection Type */}
          <Radio.Group
            onChange={(e) => setSelectionType(e.target.value)}
            value={selectionType}
          >
            <Radio value="checkbox">Checkbox</Radio>
            <Radio value="radio">Radio</Radio>
          </Radio.Group>
          <Divider />

          {/* User Table */}
          {loading ? (
            <LoadingPage />
          ) : (
            <Table<IProfile>
              style={{ marginTop: "2rem" }}
              rowSelection={rowSelection}
              pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: userPagination?.totalRecord || 0, // Total records from API
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "20"],
              }}
              loading={loading}
              dataSource={userPagination?.data || []}
              rowKey="id"
              onChange={handleTableChange} // Handle pagination
              onRow={(record) => ({
                onClick: () => console.log("Row clicked:", record),
              })}
            >
              <Table.Column
                title={t("labels.first_name")}
                dataIndex="firstName"
                key="firstName"
              />
              <Table.Column
                title={t("labels.last_name")}
                dataIndex="lastName"
                key="lastName"
              />
              <Table.Column
                title={t("labels.email")}
                dataIndex="email"
                key="email"
              />
              <Table.Column
                title={t("labels.date_of_birth")}
                dataIndex="dateOfBirth"
                key="dateOfBirth"
                render={(date: string) => dayjs(date).format("DD-MM-YYYY")}
              />
              <Table.Column
                title={t("labels.phone_number")}
                dataIndex="phoneNumber"
                key="phoneNumber"
              />
              <Table.Column
                title="Avatar"
                dataIndex="avatar"
                key="avatar"
                render={(avatar) => (
                  <Avatar
                    size={30}
                    src={avatar}
                    icon={!avatar ? <UserOutlined /> : undefined}
                  />
                )}
              />
              <Table.Column
                title="Tags"
                dataIndex="role"
                key="role"
                render={(role) => <Tag color="blue">{role}</Tag>}
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
          )}
        </Content>
      </Layout>
    </>
  );
};

export default UserList;
