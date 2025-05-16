import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome to Student Dashboard",
        login: "Login",
        logout: "Logout",

        // Dashboard Translations
        quizzesDashboard: "Quizzes Dashboard",
        addQuiz: "Add Quiz",
        title: "Title",
        course: "Course",
        actions: "Actions",
        edit: "Edit",
        delete: "Delete",
        noQuizzes: "No quizzes available.",
        quizAdded: "Quiz added successfully",
        quizUpdated: "Quiz updated successfully",
        quizDeleted: "Quiz deleted successfully",
        titleRequired: "Title is required",
        cancel: "Cancel",
        update: "Update",
        add: "Add",
        errorFetching: "Failed to fetch quizzes",
        errorSaving: "Failed to save quiz",
        errorDeleting: "Failed to delete quiz",
        announcementDashboard: "Announcements Dashboard",
        addAnnouncement: "Add Announcement",
        editAnnouncement: "Edit Announcement",
        addNewAnnouncement: "Add New Announcement",
        announcementAdded: "Announcement added successfully",
        announcementUpdated: "Announcement updated successfully",
        announcementDeleted: "Announcement deleted successfully",
        deleteConfirmation: "Are you sure you want to delete this announcement?",
        noAnnouncements: "No announcements available.",
        content: "Content",
      },
    },
    ar: {
      translation: {
        welcome: "مرحبًا بك في لوحة الطلاب",
        login: "تسجيل الدخول",
        logout: "تسجيل الخروج",

        quizzesDashboard: "لوحة الاختبارات",
        addQuiz: "إضافة اختبار",
        title: "العنوان",
        course: "المقرر",
        actions: "الإجراءات",
        edit: "تعديل",
        delete: "حذف",
        noQuizzes: "لا توجد اختبارات متاحة.",
        quizAdded: "تمت إضافة الاختبار بنجاح",
        quizUpdated: "تم تعديل الاختبار بنجاح",
        quizDeleted: "تم حذف الاختبار بنجاح",
        titleRequired: "العنوان مطلوب",
        cancel: "إلغاء",
        update: "تعديل",
        add: "إضافة",
        errorFetching: "فشل في جلب الاختبارات",
        errorSaving: "فشل في حفظ الاختبار",
        errorDeleting: "فشل في حذف الاختبار",
        announcementDashboard: "لوحة الإعلانات",
        addAnnouncement: "إضافة إعلان",
        editAnnouncement: "تعديل الإعلان",
        addNewAnnouncement: "إضافة إعلان جديد",
        announcementAdded: "تمت إضافة الإعلان بنجاح",
        announcementUpdated: "تم تعديل الإعلان بنجاح",
        announcementDeleted: "تم حذف الإعلان بنجاح",
        deleteConfirmation: "هل أنت متأكد أنك تريد حذف هذا الإعلان؟",
        noAnnouncements: "لا توجد إعلانات متاحة.",
        content: "المحتوى",

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
