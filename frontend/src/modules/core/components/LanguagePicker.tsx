import {Select} from "antd";
import * as React from "react";
import {useTranslation} from "react-i18next";
import {changeLanguage, Language} from "../locales/i18n.ts";

const handleChange = (value: Language) => {
    changeLanguage(value)
};

export const LanguagePicker: React.FC = () => {
    const { t } = useTranslation();
    return (
        <>
            <Select
                defaultValue="vi"
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                    { value: 'en', label: t('labels.english') },
                    { value: 'vi', label: t('labels.vietnamese') },
                    { value: 'ja', label: t('labels.japanese') },
                ]}
            />
        </>
    )
}