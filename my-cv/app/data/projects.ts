import { Project } from "@/lib/type";
export const projects: Project[] = [
  {
    id: "todo",
    title: "Todo App",
    description: "Task management app with localStorage and filters.",
    fullDescription:
      "A comprehensive task management application that helps you organize your daily tasks. Features include creating, editing, deleting tasks with persistent storage using localStorage. Includes filtering by status and due dates.",
    image: "/todo.png",
    tags: ["React", "Tailwind", "Node.js", "MUI", "Framer Motion"],
    features: [
      "Add/Edit/Delete tasks",
      "Filter by status",
      "Local storage persistence",
      "Responsive design",
    ],
    demo: "https://quan-ly-thoi-gian.vercel.app/",
    github: "https://github.com/dungdev-web/quan_ly_thoi_gian",
  },
  {
    id: "auth-ui",
    title: "Authentication UI",
    description: "Login / Register UI with validation and Material UI.",
    fullDescription:
      "Beautiful and functional authentication interface with form validation. Supports both login and registration flows with real-time validation feedback, password strength indicator, and error handling.",
    image: "/login.png",
    tags: ["React", "MUI"],
    features: [
      "Form validation",
      "Password strength meter",
      "Email verification",
      "Error handling",
    ],
    demo: "#",
    github: "https://github.com/dungdev-web/Login_MUI",
  },
  {
    id: "portfolio",
    title: "Personal Portfolio",
    description: "My portfolio built with Next.js, Tailwind and Framer Motion.",
    fullDescription:
      "A modern, interactive portfolio website showcasing my work and skills. Built with cutting-edge technologies, featuring smooth animations, dark mode support, and optimized performance.",
    image: "/porfordio.png",
    tags: ["Next.js", "Tailwind", "Framer Motion", "React", "Firebase"],
    features: [
      "Smooth animations",
      "Dark mode",
      "SEO optimized",
      "Mobile responsive",
    ],
    demo: "https://cv-five-beige.vercel.app/",
    github: "https://github.com/dungdev-web/Cv",
  },
  {
    id: "quiz",
    title: "Quiz Game",
    description: "Quiz app with timer, score, streak and categories.",
    fullDescription:
      "An engaging quiz game with multiple categories, real-time scoring, and competitive gameplay. Features include timed questions, streak tracking, and detailed results analysis.",
    image: "/my-quizz.png",
    tags: ["JavaScript", "HTML", "CSS", "Tailwind"],
    features: [
      "Multiple categories",
      "Timer system",
      "Streak tracking",
      "Score analysis",
    ],
    demo: "https://my-quizz-inky.vercel.app/",
    github: "https://github.com/dungdev-web/my_quizz",
  },
  {
    id: "weather",
    title: "Weather App",
    description: "Task management app with localStorage and filters.",
    fullDescription:
      "The Weather App is a web application that uses an API to display weather information for the city the user searches for. The app provides basic information such as temperature, humidity, weather conditions, and daily forecasts. The interface is designed to be responsive and easy to use on various devices. This project helps develop skills in working with APIs, handling asynchronous data, and building user interfaces.",
    image: "/weather.png",
    tags: ["React", "Tailwind", "API"],
    features: [
      "Add/Edit/Delete tasks",
      "Filter by status",
      "Local storage persistence",
      "Responsive design",
    ],
    demo: "https://weather-ten-livid.vercel.app/",
    github: "#",
  },
  {
    id: "budget",
    title: "Budget App",
    description:
      "Personal expense management app with statistical charts and income/expense categorization.",
    fullDescription:
      "The Personal Budget App is a web application that helps users track and manage their daily income and expenses. The app supports income and expense categorization and is currently developing visual statistical charts by time period and category. Data is stored in Firebase for long-term use, and the interface is designed to be responsive and compatible with various devices. This project helps develop data processing skills, visualization through charts, and the creation of a basic personal finance management application.",
    image: "/budget.png",
    tags: ["React", "Firebase"],
    features: [
      "Add/Edit/Delete tasks",
      "Filter by status",
      "Local storage persistence",
      "Responsive design",
    ],
    demo: "https://budget-ivory-seven.vercel.app/",
    github: "https://github.com/dungdev-web/budget",
  },
  {
    id: "personal-blog",
    title: "Personal Blog",
    description:
      "Personal expense management app with statistical charts and income/expense categorization.",
    fullDescription:
      "Personal Blog is a website that shares programming knowledge, supports writing articles using Markdown, categorizes articles by topic, and allows content searching. The website has a responsive interface and displays well on various devices. This project helps develop skills in building content systems, processing article data, and developing a complete blog website.",
    image: "/blog.png",
    tags: ["React", "Firebase", "Markdown"],
    features: [
      "Add/Edit/Delete tasks",
      "Filter by status",
      "Local storage persistence",
      "Responsive design",
    ],
    demo: "https://personal-blog-silk-ten.vercel.app/",
    github: "https://github.com/dungdev-web/personal_blog",
  },
  {
    id: "ecommerce-shoes",
    title: "Ecommerce Shoes",
    description:
      "Modern e-commerce website for selling shoes with product filtering, cart, and checkout.",
    fullDescription:
      "Ecommerce Shoes is a modern online shopping website specialized in selling shoes. The application allows users to browse products, filter by categories, view product details, add items to cart, and proceed to checkout. The project focuses on building a clean UI, smooth user experience, and reusable components. It also helps practice state management, product listing, and basic e-commerce flows.",
    image: "/nodejs.png",
    tags: ["React", "Tailwind", "MongoDB", "HTML", "Node.js"],
    features: [
      "Product listing and product details page",
      "Filter by category, price, and brand",
      "Add to cart and remove from cart",
      "Checkout flow and order summary",
      "Responsive design for all devices",
    ],
    demo: "#",
    github: "https://github.com/dungdev-web/NodeJs",
  },
  {
    id: "ecommerce-hamburger",
    title: "Ecommerce Hamburger",
    description:
      "Modern e-commerce website for ordering hamburgers with menu, cart, and checkout system.",
    fullDescription:
      "Ecommerce Hamburger is a modern online food ordering website specialized in selling hamburgers and fast food. The application allows users to browse the menu, view food details, add items to the cart, and place orders. The project focuses on building a clean UI, smooth user experience, and a full-stack flow using Node.js and MongoDB. It also helps practice CRUD operations, API development, and basic e-commerce ordering flows.",
    image: "/hamburger.png",
    tags: ["React", "Tailwind", "MySQL", "Node.js"],
    features: [
      "Menu listing and food detail page",
      "Add to cart and remove items from cart",
      "Place order and order summary",
      "Backend API with Node.js & MongoDB",
      "Responsive design for all devices",
    ],
    demo: "#",
    github: "https://github.com/dungdev-web/react_web",
  },
  {
    id: "flash-card",
    title: "Flash Card English",
    description:
      "English learning app using flashcards to practice vocabulary and improve memory.",
    fullDescription:
      "Flash Card English is a web application designed to help users learn and memorize English vocabulary through flashcards. The app allows users to create, view, edit, and delete flashcards, practice words with flip animations, and track their learning progress. The project focuses on building an intuitive UI, smooth interactions, and a simple backend using Node.js and MySQL for data storage. This project helps practice CRUD operations, basic database design, and full-stack development skills.",
    image: "/english.png",
    tags: ["React", "Tailwind", "Firebase", "Next.js"],
    features: [
      "Create flashcards",
      "Flip card animation to show meaning",
      "Vocabulary practice and review",
      "Backend API with Next.js & Firebase",
      "Responsive design for all devices",
    ],
    demo: "https://flash-card-pink-five.vercel.app/login",
    github: "https://github.com/dungdev-web/flash-card",
  },
  {
    id: "chat-realtime",
    title: "Chat Realtime",
    description:
      "Realtime chat application with authentication, online status, and instant messaging.",
    fullDescription:
      "Chat Realtime is a real-time messaging web application that allows users to communicate instantly with each other. The app supports user authentication, sending and receiving messages in real time, and displaying online/offline status. Built with Next.js, React, Tailwind CSS, and Firebase, the project focuses on real-time data handling, modern UI design, and scalable frontend architecture. This project helps practice working with real-time databases, authentication flows, and responsive UI development.",
    image: "/chat.png",
    tags: ["React", "Tailwind", "Firebase", "Socket.io"],
    features: [
      "User authentication (login / register)",
      "Realtime messaging with Firebase",
      "Online and offline user status",
      "Modern chat UI with responsive design",
      "Deployed on Vercel",
    ],
    demo: "https://chat-social-self.vercel.app/",
    github: "https://github.com/dungdev-web/chat_social",
  },
  {
    id: "short-link",
    title: "Short Link Generator",
    description:
      "URL shortener application with link management, analytics, and rate limiting.",
    fullDescription:
      "Short Link Generator is a web application that allows users to convert long URLs into short, shareable links. The system supports creating, managing, and redirecting short links with high performance and security. It also includes rate limiting to prevent abuse and ensures stable operation. Built with Next.js, React, Tailwind CSS, Node.js, and PostgreSQL, this project focuses on backend API design, database modeling, and building a scalable full-stack application.",
    image: "/short-link.png",
    tags: [
      "React",
      "Next.js",
      "Tailwind",
      "Node.js",
      "PostgreSQL",
      "Rate Limiting",
    ],
    features: [
      "Generate short links from long URLs",
      "Fast redirect with backend API",
      "Rate limiting to prevent spam and abuse",
      "PostgreSQL database for link storage",
      "Responsive UI and modern design",
    ],
    demo: "#",
    github: "https://github.com/dungdev-web/short_link",
  },
];
