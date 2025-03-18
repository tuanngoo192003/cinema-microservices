import React, {useState} from "react";
import {Avatar, Dropdown, MenuProps, Space} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../user/hooks";

interface ProfileProps {
    avatarURL: string;
    isUserLogin: boolean;
}

export const Profile: React.FC<ProfileProps> = ({avatarURL, isUserLogin}) => {
    const { t } = useTranslation();
    const {handleLogout} = useAuth();
    const [url] = useState(avatarURL)

    const items: MenuProps['items'] = [
        { key: "1", label: t('labels.profile'), onClick: () => console.log("My Profile") },
        { key: "2", label: t('labels.logout'), onClick: handleLogout }
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
               <Link to="/login">{t('labels.login')}</Link>
           )}
       </>
    )
}

