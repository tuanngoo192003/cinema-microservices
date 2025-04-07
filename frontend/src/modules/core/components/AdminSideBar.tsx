import React, { useState } from "react";
import {
  CalendarOutlined,
  DesktopOutlined,
  InsertRowBelowOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../../App.css"
import { Header } from "antd/es/layout/layout";
import { LanguagePicker } from "./LanguagePicker";
import { Profile } from "./Profile";
import { useTranslation } from "react-i18next";
import { HOME } from "../constants/redirectURI";
import { AppFooter } from "./AppFooter";
import SubMenu from "antd/es/menu/SubMenu";
import Title from "antd/es/typography/Title";

const { Content, Sider } = Layout;

interface Props {
  children?: React.ReactNode;
}

interface MenuConfig {
  key: string;
  navigateTo: string;
  breadcrumbItem: string[];
}

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
    key: "/admin/movie-schedules",
    navigateTo: "/admin/movie-schedules",
    breadcrumbItem: ["Admin", "Movie schedules"]
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
  "/admin/movie-schedules": "/admin/movie-schedules",
  "/admin/auditoriums": "/admin/auditoriums",
};

const matchedKey = Object.keys(routeMap).find((key) =>
  location.pathname.startsWith(key)
);

export default function AdminSideBar({ children }: Props) {
  const { t } = useTranslation()
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
    <Layout style={{ minHeight: "100vh", marginTop: "3.1rem" }}>
      <Header className="app-header">
        {/* Logo */}
        <div className="logo">
          <Title level={3} style={{ color: "#efe3d9" }}>Absolute Cinema</Title>
        </div>
        {/* Navigation Menu */}
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]} className="nav-menu">
          <Menu.Item key="1">
            <Link to={HOME} style={{ color: "#efe3d9" }}>{t('labels.home')}</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to={HOME} style={{ color: "#efe3d9" }}>{t('labels.menu.about')}</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to={HOME} style={{ color: "#efe3d9" }}>{t('labels.menu.contact')}</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <LanguagePicker />
          </Menu.Item>
          <Menu.Item key="5" style={{ color: "#efe3d9" }}>
            <Profile />
          </Menu.Item>
        </Menu>
      </Header>
      <Sider
        style={{ background: "#403C3AFF" }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          className="side-menu"
          defaultSelectedKeys={[matchedKey ?? location.pathname]}
          mode="inline"
          onClick={handleMenuClick}
        >
          <Menu.Item key="/admin/users" icon={<UserOutlined />}>
            {t('side_bar.users')}
          </Menu.Item>
          <Menu.Item key="/admin/movies" icon={<DesktopOutlined />}>
            {t('side_bar.movies')}
          </Menu.Item>
          <Menu.Item key="/admin/movie-schedules" icon={< CalendarOutlined />}>
            {t('side_bar.movie_schedules')}
          </Menu.Item>
          <Menu.Item key="/admin/auditoriums" icon={<InsertRowBelowOutlined />}>
            {t('side_bar.auditoriums')}
          </Menu.Item>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="4">{t('team.team_1')}</Menu.Item>
            <Menu.Item key="5">{t('team.team_2')}</Menu.Item>
          </SubMenu>
        </Menu>
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
        <AppFooter />
      </Layout>
    </Layout>
  );
}
