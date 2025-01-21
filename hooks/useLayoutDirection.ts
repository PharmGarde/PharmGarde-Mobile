import { useTranslation } from "react-i18next";

export const useLayoutDirection = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return {
    isRTL,
    direction: isRTL ? "rtl" : "ltr",
  };
};
