import React, { useState } from "react";
import {
  DesktopOutlined,
  InsertRowBelowOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import reactLogo from "../../../assets/react.svg";
import "../../../App.css"
import { Header } from "antd/es/layout/layout";
import { LanguagePicker } from "./LanguagePicker";
import { Profile } from "./Profile";
import { useTranslation } from "react-i18next";
import { HOME } from "../constants/redirectURI";
import { AppFooter } from "./AppFooter";

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
  {
    key: "/admin/auditoriums/create",
    navigateTo: "/admin/auditoriums/create",
    breadcrumbItem: ["Admin", "Auditoriums", "Create"],
  },
];

const routeMap: Record<string, string> = {
  "/admin/users": "/admin/users",
  "/admin/movies": "/admin/movies",
  "/admin/auditoriums": "/admin/auditoriums",
};

const matchedKey = Object.keys(routeMap).find((key) =>
  location.pathname.startsWith(key)
);

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

  const { t } = useTranslation();


  return (
    <Layout style={{ minHeight: "100vh", marginTop: "3.1rem" }}>
      <Header className="app-header">
        {/* Logo */}
        <div className="logo">
          <img src={reactLogo} alt="Logo" />
        </div>
        {/* Navigation Menu */}
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]} className="nav-menu">
          <Menu.Item key="1">
            <Link to={HOME}>{t('labels.home')}</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to={HOME}>{t('labels.menu.about')}</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to={HOME}>{t('labels.menu.contact')}</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <LanguagePicker />
          </Menu.Item>
          <Menu.Item key="5">
            <Profile />
          </Menu.Item>
        </Menu>
      </Header>
      <Sider
        style={{background: "#403C3AFF"}}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          className="side-menu"
          defaultSelectedKeys={[matchedKey ?? location.pathname]}
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
        <AppFooter/>
      </Layout>
    </Layout>
  );
}
