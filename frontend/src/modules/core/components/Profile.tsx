import React, {useState} from "react";
import {Avatar, Dropdown, MenuProps, Space} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../user/hooks";
import {ADMIN_DASHBOARD, LOGIN, PROFILES, USER_LIST} from "../constants/redirectURI.ts";

interface ProfileProps {
    avatarURL: string;
    isUserLogin: boolean;
    userRole: string | undefined;
}

export const Profile: React.FC<ProfileProps> = ({avatarURL, isUserLogin, userRole}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const {handleLogout} = useAuth();
    const [url] = useState(avatarURL)
    const [role] = useState(userRole);

    const items: MenuProps['items'] = [
        { key: "1", label: t('labels.menu.profile'), onClick: () => navigate(PROFILES, { replace: true }) },
        ...(role === 'ADMIN' ? [
            { key: "2", label: t('labels.menu.admin_dashboard'), onClick: () => navigate(ADMIN_DASHBOARD, { replace: true }) }
          ] : []),
        { key: "3", label: t('labels.menu.logout'), onClick: handleLogout },
    ]

    return (
       <>
           {isUserLogin ? (
               <Dropdown menu={{ items }} >
                   <a onClick={(e) => e.preventDefault()}>
                       <Space>
                           <Avatar size={30} src={url} icon={!url ? <UserOutlined/> : undefined} />
                       </Space>
                   </a>
               </Dropdown>
           ) : (
               <Link to={LOGIN}>{t('labels.login')}</Link>
           )}
       </>
    )
}

