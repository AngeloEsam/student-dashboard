import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome to Student Dashboard",
        login: "Login",
        logout: "Logout",
      },
    },
    ar: {
      translation: {
        welcome: "مرحبًا بك في لوحة الطلاب",
        login: "تسجيل الدخول",
        logout: "تسجيل الخروج",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
