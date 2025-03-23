import React, { useState } from "react";
import {
  DesktopOutlined,
  InsertRowBelowOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

interface Props {
  children?: React.ReactNode;
}

interface MenuConfig {
  key: string;
  navigateTo: string;
  breadcrumbItem: string[];
}

const items: MenuItem[] = [
  getItem("User", "/admin/users", <UserOutlined />),
  getItem("Movies", "/admin/movies", <DesktopOutlined />),
  getItem("Auditoriums", "/admin/auditoriums", <InsertRowBelowOutlined />),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "4"),
    getItem("Team 2", "5"),
  ]),
];

const configs: MenuConfig[] = [
  {
    key: "/admin/users",
    navigateTo: "/admin/users",
    breadcrumbItem: ["Admin", "Users", "List"],
  },
  {
    key: "/admin/movies",
    navigateTo: "/admin/movies",
    breadcrumbItem: ["Admin", "Movies"],
  },
  {
    key: "/admin/auditoriums",
    navigateTo: "/admin/auditoriums",
    breadcrumbItem: ["Admin", "Auditoriums", "List"],
  },
];

export default function AdminSideBar({ children }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const config = configs.find((c) => c.key === e.key);
    if (config) {
      navigate(config.navigateTo);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[location.pathname]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {configs
              .find((config) => config.key === location.pathname)
              ?.breadcrumbItem.map((item) => (
                <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
              )) || <Breadcrumb.Item>Dashboard</Breadcrumb.Item>}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
