import {Header} from "antd/es/layout/layout";
import * as React from "react";
import "../../../App.css"
import {Menu} from "antd";
import reactLogo from "../../../assets/react.svg";
import {Link} from "react-router-dom";
import {LanguagePicker} from "./LanguagePicker.tsx";
import {useTranslation} from "react-i18next";
import {Profile} from "./Profile.tsx";

interface IMainLayoutProps {
    children: React.ReactNode;
}

export const NavBar = ({ children }: IMainLayoutProps) => {
    const { t } = useTranslation();
    return (
        <>
            <Header className="app-header">
                {/* Logo */}
                <div className="logo">
                    <img src={reactLogo} alt="Logo" />
                </div>
                {/* Navigation Menu */}
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]} className="nav-menu">
                    <Menu.Item key="1">
                        <Link to="/">{t('labels.home')}</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/about">{t('labels.about')}</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/contact">{t('labels.contact')}</Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <LanguagePicker/>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Profile avatarURL="sadfasfd" isUserLogin={false}/>
                    </Menu.Item>
                </Menu>
            </Header>
            <div>
                {children}
            </div>
        </>
    )
}