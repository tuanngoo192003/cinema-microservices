import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks";
import { Card, Image, Layout, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import "../../../App.css";
import chinatsu from "../../../assets/千夏.jpg";
import { IProfile } from "../models/user";
import { useTranslation } from "react-i18next";

const ProfileUI: React.FC = () => {
    const { t } = useTranslation()
    const { profile } = useAuth()
    const [profileInfo, setProfileInfo] = useState<IProfile | null>(null)

    useEffect(() => {
        setProfileInfo(profile)
    }, [profile])

    return (
        <>
            <Layout
                className="app-theme"
                style={{
                    minHeight: "90vh",
                    overflow: "hidden",
                    paddingBottom: "3rem",
                }}
            >
                <Content>
                    <Card
                        title={t('titles.user_profile')}
                    >
                        <Image
                            src={profileInfo?.avatar}
                            alt={chinatsu}
                            style={{
                                borderRadius: "12px",
                                height: "11rem",
                                objectFit: "contain",
                                backgroundColor: "#fff",
                                display: "block",
                            }}
                        />
                        <Typography.Text strong>{t('labels.full_name')} :</Typography.Text>
                        {profile?.firstName} {profile?.lastName}
                        <br />
                        <Typography.Text> {t('lables.email')} </Typography.Text>
                        {profile?.email}
                        <br />
                        <Typography.Text strong>{t('labels.date_of_birth')}:</Typography.Text>
                        {profile?.dateOfBirth.split("T")[0]}
                        <br />
                        <Typography.Text> {t('lables.phone_number')} </Typography.Text>
                        {profile?.phoneNumber}
                        <br />
                        
                    </Card>
                </Content>
            </Layout>
        </>
    )
}

export default ProfileUI