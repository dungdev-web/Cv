// lib/i18n.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "vi";

export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      badge: "Available for freelance",
      greeting: "Hi, I'm",
      role: "Frontend Developer",
      description:
        "I craft beautiful, performant web experiences with modern technologies. Passionate about clean code and pixel-perfect designs.",
      viewProjects: "View Projects",
      contactMe: "Contact Me",
      openToWork: "✨ Open to work",
      monthsExp: "Months Exp",
      projects: "Projects",
    },
    about: {
      badge: "About Me",
      heading1: "Fresher Frontend Developer",
      heading2: "passionate about",
      heading3: "creating amazing experiences 🚀",
      desc1: "a fresher frontend developer is currently learning and developing skills in building modern web interfaces with React, Next.js, and Tailwind CSS.",
      desc2: "My goal is to become a professional Frontend Developer, contributing real value to products and participating in real-world projects in a business environment.",
      downloadCV: "Download CV",
      viewCert: "View certificate",
      stats: {
        projects: "Projects",
        passion: "Passion",
        learning: "Learning",
      },
      highlights: {
        cleanCode: { title: "Clean Code", description: "Write code that is easy to read and maintain." },
        fastLearner: { title: "Fast Learner", description: "Always learning new technologies." },
        detail: { title: "Detail-oriented", description: "Attention to every detail in UI/UX." },
      },
    },
    skills: {
      badge: "Technical Skills",
      heading1: "My",
      heading2: "Skills",
      heading3: "& Expertise",
      subtitle: "Technologies and tools I'm using and improving every day to build amazing products.",
      coreTitle: "Core Technologies",
      toolsTitle: "Tools & Workflow",
      techMastered: "Technologies mastered",
      radarTitle: "Skill Radar",
      expertiseTitle: "Expertise & Soft Skills",
      expertise: {
        learning: { title: "Continuous Learning", description: "Always exploring new technologies and best practices to stay current." },
        cleanCode: { title: "Clean Code Focus", description: "Writing maintainable, well-documented code that's easy to understand." },
        uiux: { title: "UI/UX Mindset", description: "Attention to detail in design implementation and user experience." },
        responsive: { title: "Responsive Design", description: "Beautiful interfaces that work seamlessly across all devices." },
        performance: { title: "Performance", description: "Optimizing load times and ensuring smooth user experiences." },
        problem: { title: "Problem Solving", description: "Tackling complex challenges with creative and efficient solutions." },
        debug: { title: "Debugging Skills", description: "Quickly identifying and fixing bugs using modern tools." },
        collab: { title: "Collaboration", description: "Working effectively with teams and communicating concepts clearly." },
      },
    },
    projects: {
      heading: "My Projects",
      subtitle: "Here are some projects I built while learning and practicing frontend development.",
      viewDetail: "View detail",
      description: "Description",
      mainFeatures: "Main Features",
      viewDemo: "View demo",
      viewCode: "View code",
      demoSoon: "Demo is under development 🚧",
      codeSoon: "Code is being updated 🚧",
    },
    contact: {
      badge: "Contact",
      heading1: "Get In",
      heading2: "Touch",
      subtitle: "Feel free to contact me for work, collaboration, or just a friendly chat 👋",
      email: "Email",
      phone: "Phone",
      location: "Location",
      namePlaceholder: "Your name",
      emailPlaceholder: "Your email",
      subjectPlaceholder: "Subject",
      messagePlaceholder: "Your message...",
      send: "Send Message",
      sending: "Sending...",
      connectWith: "Connect with me",
    },
  },

  vi: {
    nav: {
      home: "Trang chủ",
      about: "Giới thiệu",
      skills: "Kỹ năng",
      projects: "Dự án",
      contact: "Liên hệ",
    },
    hero: {
      badge: "Sẵn sàng nhận dự án freelance",
      greeting: "Xin chào, tôi là",
      role: "Lập trình viên Frontend",
      description:
        "Tôi tạo ra những trải nghiệm web đẹp và hiệu quả với công nghệ hiện đại. Đam mê clean code và thiết kế pixel-perfect.",
      viewProjects: "Xem dự án",
      contactMe: "Liên hệ",
      openToWork: "✨ Sẵn sàng làm việc",
      monthsExp: "Tháng kinh nghiệm",
      projects: "Dự án",
    },
    about: {
      badge: "Giới thiệu",
      heading1: "Fresher Frontend Developer",
      heading2: "đam mê",
      heading3: "tạo ra những trải nghiệm tuyệt vời 🚀",
      desc1: "là một fresher frontend developer đang học và phát triển kỹ năng xây dựng giao diện web hiện đại với React, Next.js và Tailwind CSS.",
      desc2: "Mục tiêu của tôi là trở thành Frontend Developer chuyên nghiệp, đóng góp giá trị thực cho sản phẩm và tham gia vào các dự án thực tế trong môi trường doanh nghiệp.",
      downloadCV: "Tải CV",
      viewCert: "Xem chứng chỉ",
      stats: {
        projects: "Dự án",
        passion: "Đam mê",
        learning: "Học tập",
      },
      highlights: {
        cleanCode: { title: "Code sạch", description: "Viết code dễ đọc và dễ bảo trì." },
        fastLearner: { title: "Học nhanh", description: "Luôn học hỏi công nghệ mới." },
        detail: { title: "Chú ý chi tiết", description: "Quan tâm đến từng chi tiết trong UI/UX." },
      },
    },
    skills: {
      badge: "Kỹ năng kỹ thuật",
      heading1: "Kỹ năng",
      heading2: "",
      heading3: "& Chuyên môn của tôi",
      subtitle: "Các công nghệ và công cụ tôi sử dụng và cải thiện mỗi ngày để xây dựng sản phẩm tuyệt vời.",
      coreTitle: "Công nghệ cốt lõi",
      toolsTitle: "Công cụ & Quy trình",
      techMastered: "Công nghệ thành thạo",
      radarTitle: "Biểu đồ kỹ năng",
      expertiseTitle: "Chuyên môn & Kỹ năng mềm",
      expertise: {
        learning: { title: "Học liên tục", description: "Luôn khám phá công nghệ mới và best practices." },
        cleanCode: { title: "Tập trung clean code", description: "Viết code dễ bảo trì, dễ hiểu và có tài liệu rõ ràng." },
        uiux: { title: "Tư duy UI/UX", description: "Chú ý chi tiết trong thiết kế và trải nghiệm người dùng." },
        responsive: { title: "Thiết kế responsive", description: "Giao diện đẹp hoạt động tốt trên mọi thiết bị." },
        performance: { title: "Tối ưu hiệu năng", description: "Tối ưu thời gian tải và đảm bảo trải nghiệm mượt mà." },
        problem: { title: "Giải quyết vấn đề", description: "Xử lý thách thức phức tạp bằng giải pháp sáng tạo." },
        debug: { title: "Kỹ năng debug", description: "Nhanh chóng tìm và sửa lỗi với công cụ hiện đại." },
        collab: { title: "Làm việc nhóm", description: "Làm việc hiệu quả và giao tiếp kỹ thuật rõ ràng." },
      },
    },
    projects: {
      heading: "Dự án của tôi",
      subtitle: "Đây là một số dự án tôi đã xây dựng trong quá trình học và thực hành lập trình frontend.",
      viewDetail: "Xem chi tiết",
      description: "Mô tả",
      mainFeatures: "Tính năng chính",
      viewDemo: "Xem demo",
      viewCode: "Xem code",
      demoSoon: "Demo đang được phát triển 🚧",
      codeSoon: "Code đang được cập nhật 🚧",
    },
    contact: {
      badge: "Liên hệ",
      heading1: "Liên hệ",
      heading2: "với tôi",
      subtitle: "Hãy liên hệ với tôi về công việc, hợp tác, hoặc chỉ là một cuộc trò chuyện thân thiện 👋",
      email: "Email",
      phone: "Điện thoại",
      location: "Địa điểm",
      namePlaceholder: "Tên của bạn",
      emailPlaceholder: "Email của bạn",
      subjectPlaceholder: "Tiêu đề",
      messagePlaceholder: "Tin nhắn của bạn...",
      send: "Gửi tin nhắn",
      sending: "Đang gửi...",
      connectWith: "Kết nối với tôi",
    },
  },
} as const;

export type Translations = typeof translations.en;

interface I18nContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = translations[lang] as Translations;
  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}