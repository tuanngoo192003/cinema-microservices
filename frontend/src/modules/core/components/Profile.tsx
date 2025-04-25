import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, MenuProps, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../user/hooks";
import {
  ADMIN_DASHBOARD,
  LOGIN,
  PROFILE,
} from "../constants/redirectURI.ts";
import { IProfile } from "../../user/models/user.ts";

export const Profile: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  const [isUserLogin, setIsUserLogin] = useState<boolean>(false);
  const [currentProfile, setCurrentProfile] = useState<IProfile | null>(null);
  const [obj, setObj] = useState(null);

  // Check profile existence on component mount
  useEffect(() => {
    const profile = localStorage.getItem("profile");
    if (profile) {
      setObj(JSON.parse(profile));
    }
    setIsUserLogin(!!profile);
  }, []);

  useEffect(() => {
    setCurrentProfile(obj);
  }, [obj]);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: t("labels.menu.profile"),
      onClick: () => navigate(PROFILE, { replace: true }),
    },
    ...(currentProfile?.role === "ADMIN"
      ? [
          {
            key: "2",
            label: t("labels.menu.admin_dashboard"),
            onClick: () => navigate(ADMIN_DASHBOARD, { replace: true }),
          },
        ]
      : []),
    { key: "3", label: t("labels.menu.logout"), onClick: handleLogout },
  ];

  return (
    <>
      {isUserLogin ? (
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Avatar
                size={30}
                src={currentProfile?.avatar}
                icon={!currentProfile?.avatar ? <UserOutlined /> : undefined}
              />
            </Space>
          </a>
        </Dropdown>
      ) : (
        <Link to={LOGIN} style={{color: "#efe3d9"}}>{t("labels.login")}</Link>
      )}
    </>
  );
};
