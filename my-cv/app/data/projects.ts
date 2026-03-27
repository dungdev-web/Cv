import { Project } from "@/lib/type";

export const projects: Project[] = [
  {
    id: "todo",
    title: "Todo App",
    titleVi: "Ứng dụng Todo",
    description: "Task management app with localStorage and filters.",
    descriptionVi: "Ứng dụng quản lý công việc với localStorage và bộ lọc.",
    fullDescription:
      "A comprehensive task management application that helps you organize your daily tasks. Features include creating, editing, deleting tasks with persistent storage using localStorage. Includes filtering by status and due dates.",
    fullDescriptionVi:
      "Ứng dụng quản lý công việc toàn diện giúp bạn tổ chức các nhiệm vụ hàng ngày. Tính năng bao gồm tạo, chỉnh sửa, xóa công việc với lưu trữ bền vững bằng localStorage. Hỗ trợ lọc theo trạng thái và ngày đến hạn.",
    image: "/todo.png",
    tags: ["React", "Tailwind", "Node.js", "MUI", "Framer Motion", "MySQL"],
    techStack: ["React", "Node.js","Tailwind", "MySQL"],
    features: [
      "Add/Edit/Delete tasks",
      "Filter by status",
      "Local storage persistence",
      "Responsive design",
    ],
    featuresVi: [
      "Thêm/Sửa/Xóa công việc",
      "Lọc theo trạng thái",
      "Lưu trữ với localStorage",
      "Thiết kế responsive",
    ],
    demo: "https://quan-ly-thoi-gian.vercel.app/",
    github: "https://github.com/dungdev-web/quan_ly_thoi_gian",
    type: "Fullstack",
  },
  {
    id: "auth-ui",
    title: "Authentication UI",
    titleVi: "Giao diện Đăng nhập",
    description: "Login / Register UI with validation and Material UI.",
    descriptionVi:
      "Giao diện đăng nhập / đăng ký với validation và Material UI.",
    fullDescription:
      "Beautiful and functional authentication interface with form validation. Supports both login and registration flows with real-time validation feedback, password strength indicator, and error handling.",
    fullDescriptionVi:
      "Giao diện xác thực đẹp và đầy đủ chức năng với validation form. Hỗ trợ cả luồng đăng nhập và đăng ký với phản hồi validation theo thời gian thực, chỉ số độ mạnh mật khẩu và xử lý lỗi.",
    image: "/login.png",
    tags: ["React", "MUI"],
    techStack: ["React"],
    features: [
      "Form validation",
      "Password strength meter",
      "Email verification",
      "Error handling",
    ],
    featuresVi: [
      "Validation form",
      "Chỉ số độ mạnh mật khẩu",
      "Xác minh email",
      "Xử lý lỗi",
    ],
    demo: "#",
    github: "https://github.com/dungdev-web/Login_MUI",
    type: "Frontend",
  },
  {
    id: "portfolio",
    title: "Personal Portfolio",
    titleVi: "Portfolio Cá nhân",
    description: "My portfolio built with NextJS, Tailwind and Framer Motion.",
    descriptionVi:
      "Portfolio của tôi được xây dựng với NextJS, Tailwind và Framer Motion.",
    fullDescription:
      "A modern, interactive portfolio website showcasing my work and skills. Built with cutting-edge technologies, featuring smooth animations, dark mode support, and optimized performance.",
    fullDescriptionVi:
      "Website portfolio hiện đại, tương tác trưng bày công việc và kỹ năng của tôi. Được xây dựng với công nghệ tiên tiến, có animation mượt mà, hỗ trợ dark mode và hiệu năng tối ưu.",
    image: "/porfordio.png",
    tags: ["NextJS", "Tailwind","TypeScript", "Framer Motion", "React", "Firebase"],
    techStack: ["React", "NextJS","TypeScript","Tailwind", "Firebase Realtime"],
    features: [
      "Smooth animations",
      "Dark mode",
      "SEO optimized",
      "Mobile responsive",
    ],
    featuresVi: [
      "Animation mượt mà",
      "Chế độ tối",
      "Tối ưu SEO",
      "Tương thích mobile",
    ],
    demo: "https://cv-swart-psi-63.vercel.app/",
    github: "https://github.com/dungdev-web/Cv",
    type: "Fullstack",
  },
  {
    id: "quiz",
    title: "Quiz Game",
    titleVi: "Trò chơi Quiz",
    description: "Quiz app with timer, score, streak and categories.",
    descriptionVi:
      "Ứng dụng quiz với đồng hồ đếm ngược, điểm số, chuỗi và danh mục.",
    fullDescription:
      "An engaging quiz game with multiple categories, real-time scoring, and competitive gameplay. Features include timed questions, streak tracking, and detailed results analysis.",
    fullDescriptionVi:
      "Trò chơi quiz hấp dẫn với nhiều danh mục, tính điểm theo thời gian thực và gameplay cạnh tranh. Tính năng bao gồm câu hỏi có giới hạn thời gian, theo dõi chuỗi trả lời đúng và phân tích kết quả chi tiết.",
    image: "/my-quizz.png",
    tags: ["JavaScript", "HTML", "CSS", "Tailwind"],
    techStack: ["JavaScript","Tailwind"],
    features: [
      "Multiple categories",
      "Timer system",
      "Streak tracking",
      "Score analysis",
    ],
    featuresVi: [
      "Nhiều danh mục",
      "Hệ thống đồng hồ",
      "Theo dõi chuỗi",
      "Phân tích điểm số",
    ],
    demo: "https://my-quizz-inky.vercel.app/",
    github: "https://github.com/dungdev-web/my_quizz",
    type: "Frontend",
  },
  {
    id: "weather",
    title: "Weather App",
    titleVi: "Ứng dụng Thời tiết",
    description:
      "Weather app that displays real-time weather by city using API.",
    descriptionVi:
      "Ứng dụng hiển thị thời tiết thực tế theo thành phố sử dụng API.",
    fullDescription:
      "The Weather App is a web application that uses an API to display weather information for the city the user searches for. The app provides basic information such as temperature, humidity, weather conditions, and daily forecasts.",
    fullDescriptionVi:
      "Ứng dụng thời tiết là một web app sử dụng API để hiển thị thông tin thời tiết cho thành phố người dùng tìm kiếm. Ứng dụng cung cấp các thông tin cơ bản như nhiệt độ, độ ẩm, tình trạng thời tiết và dự báo theo ngày.",
    image: "/weather.png",
    tags: ["React", "Tailwind", "API"],
    techStack: ["React","Tailwind", "Fetch API"],
    features: [
      "City weather search",
      "Temperature & humidity",
      "Daily forecast",
      "Responsive design",
    ],
    featuresVi: [
      "Tìm kiếm thời tiết theo thành phố",
      "Nhiệt độ & độ ẩm",
      "Dự báo theo ngày",
      "Thiết kế responsive",
    ],
    demo: "https://weather-ten-livid.vercel.app/",
    github: "https://github.com/dungdev-web/weather",
    type: "Frontend",
  },
  {
    id: "budget",
    title: "Budget App",
    titleVi: "Ứng dụng Quản lý Chi tiêu",
    description:
      "Personal expense management app with statistical charts and income/expense categorization.",
    descriptionVi:
      "Ứng dụng quản lý chi tiêu cá nhân với biểu đồ thống kê và phân loại thu/chi.",
    fullDescription:
      "The Personal Budget App is a web application that helps users track and manage their daily income and expenses. The app supports income and expense categorization and is currently developing visual statistical charts by time period and category.",
    fullDescriptionVi:
      "Ứng dụng quản lý ngân sách cá nhân giúp người dùng theo dõi và quản lý thu nhập và chi tiêu hàng ngày. Ứng dụng hỗ trợ phân loại thu chi và đang phát triển biểu đồ thống kê trực quan theo thời gian và danh mục.",
    image: "/budget.png",
    tags: ["React", "Firebase"],
    techStack: ["React", "Firebase Realtime"],
    features: [
      "Income/Expense tracking",
      "Category management",
      "Statistical charts",
      "Firebase storage",
    ],
    featuresVi: [
      "Theo dõi thu/chi",
      "Quản lý danh mục",
      "Biểu đồ thống kê",
      "Lưu trữ Firebase",
    ],
    demo: "https://budget-ivory-seven.vercel.app/",
    github: "https://github.com/dungdev-web/budget",
    type: "Fullstack",
  },
  {
    id: "personal-blog",
    title: "Personal Blog",
    titleVi: "Blog Cá nhân",
    description:
      "Personal blog with Markdown support, topic categories, and content search.",
    descriptionVi:
      "Blog cá nhân hỗ trợ Markdown, phân loại chủ đề và tìm kiếm nội dung.",
    fullDescription:
      "Personal Blog is a website that shares programming knowledge, supports writing articles using Markdown, categorizes articles by topic, and allows content searching.",
    fullDescriptionVi:
      "Blog cá nhân là website chia sẻ kiến thức lập trình, hỗ trợ viết bài bằng Markdown, phân loại bài viết theo chủ đề và cho phép tìm kiếm nội dung.",
    image: "/blog.png",
    tags: ["React", "Firebase", "Markdown"],
    techStack: ["React", "Firebase Realtime"],
    features: [
      "Markdown articles",
      "Topic categories",
      "Content search",
      "Responsive design",
    ],
    featuresVi: [
      "Bài viết Markdown",
      "Phân loại chủ đề",
      "Tìm kiếm nội dung",
      "Thiết kế responsive",
    ],
    demo: "https://personal-blog-silk-ten.vercel.app/",
    github: "https://github.com/dungdev-web/personal_blog",
    type: "Frontend",
  },
  {
    id: "ecommerce-shoes",
    title: "Ecommerce Shoes",
    titleVi: "Thương mại điện tử Giày",
    description:
      "Modern e-commerce website for selling shoes with product filtering, cart, and checkout.",
    descriptionVi:
      "Website thương mại điện tử hiện đại bán giày với lọc sản phẩm, giỏ hàng và thanh toán.",
    fullDescription:
      "Ecommerce Shoes is a modern online shopping website specialized in selling shoes. The application allows users to browse products, filter by categories, view product details, add items to cart, and proceed to checkout.",
    fullDescriptionVi:
      "Ecommerce Shoes là website mua sắm trực tuyến hiện đại chuyên bán giày. Ứng dụng cho phép người dùng duyệt sản phẩm, lọc theo danh mục, xem chi tiết sản phẩm, thêm vào giỏ hàng và tiến hành thanh toán.",
    image: "/nodejs.png",
    tags: ["React", "Tailwind", "MongoDB", "HTML", "Node.js"],
    techStack: ["React", "Node.js","Tailwind", "MongoDB"],
    features: [
      "Product listing and details",
      "Filter by category, price, brand",
      "Add/Remove from cart",
      "Checkout flow",
    ],
    featuresVi: [
      "Danh sách và chi tiết sản phẩm",
      "Lọc theo danh mục, giá, thương hiệu",
      "Thêm/Xóa khỏi giỏ hàng",
      "Luồng thanh toán",
    ],
    demo: "#",
    github: "https://github.com/dungdev-web/NodeJs",
    type: "Fullstack",
  },
  {
    id: "ecommerce-hamburger",
    title: "Ecommerce Hamburger",
    titleVi: "Thương mại điện tử Hamburger",
    description:
      "Modern e-commerce website for ordering hamburgers with menu, cart, and checkout system.",
    descriptionVi:
      "Website đặt hàng hamburger trực tuyến với menu, giỏ hàng và hệ thống thanh toán.",
    fullDescription:
      "Ecommerce Hamburger is a modern online food ordering website specialized in selling hamburgers and fast food. The application allows users to browse the menu, view food details, add items to the cart, and place orders.",
    fullDescriptionVi:
      "Ecommerce Hamburger là website đặt đồ ăn trực tuyến hiện đại chuyên bán hamburger và đồ ăn nhanh. Ứng dụng cho phép người dùng duyệt menu, xem chi tiết món ăn, thêm vào giỏ hàng và đặt hàng.",
    image: "/hamburger.png",
    tags: ["React", "Tailwind", "NextJS","TypeScript", "MySQL", "Node.js"],
    techStack: ["React", "NextJS","TypeScript","Tailwind", "Node.js", "MySQL"],
    features: [
      "Menu listing and food details",
      "Add/Remove from cart",
      "Place order and summary",
      "Backend API with Node.js",
    ],
    featuresVi: [
      "Danh sách menu và chi tiết món",
      "Thêm/Xóa khỏi giỏ hàng",
      "Đặt hàng và tóm tắt đơn",
      "Backend API với Node.js",
    ],
    demo: "#",
    github: "https://github.com/dungdev-web/react_web",
    type: "Fullstack",
  },
  {
    id: "flash-card",
    title: "Flash Card English",
    titleVi: "Flashcard Tiếng Anh",
    description:
      "English learning app using flashcards to practice vocabulary and improve memory.",
    descriptionVi:
      "Ứng dụng học tiếng Anh bằng flashcard để luyện từ vựng và cải thiện trí nhớ.",
    fullDescription:
      "Flash Card English is a web application designed to help users learn and memorize English vocabulary through flashcards. The app allows users to create, view, edit, and delete flashcards, practice words with flip animations, and track their learning progress.",
    fullDescriptionVi:
      "Flash Card English là web app giúp người dùng học và ghi nhớ từ vựng tiếng Anh qua flashcard. Ứng dụng cho phép tạo, xem, sửa và xóa flashcard, luyện tập từ với animation lật thẻ và theo dõi tiến độ học tập.",
    image: "/english.png",
    tags: ["React", "Tailwind", "Firebase", "NextJS","TypeScript"],
    techStack: ["React", "NextJS","TypeScript","Tailwind", "Firebase Realtime"],
    features: [
      "Create flashcards",
      "Flip animation",
      "Vocabulary practice",
      "Backend API with Firebase",
    ],
    featuresVi: [
      "Tạo flashcard",
      "Animation lật thẻ",
      "Luyện tập từ vựng",
      "Backend API với Firebase",
    ],
    demo: "https://flash-card-pink-five.vercel.app/login",
    github: "https://github.com/dungdev-web/flash-card",
    type: "Fullstack",
  },
  {
    id: "chat-realtime",
    title: "Chat Realtime",
    titleVi: "Chat Thời gian thực",
    description:
      "Realtime chat application with authentication, online status, and instant messaging.",
    descriptionVi:
      "Ứng dụng chat thời gian thực với xác thực, trạng thái online và nhắn tin tức thì.",
    fullDescription:
      "Chat Realtime is a real-time messaging web application that allows users to communicate instantly with each other. The app supports user authentication, sending and receiving messages in real time, and displaying online/offline status.",
    fullDescriptionVi:
      "Chat Realtime là ứng dụng nhắn tin thời gian thực cho phép người dùng giao tiếp tức thì với nhau. Ứng dụng hỗ trợ xác thực người dùng, gửi và nhận tin nhắn theo thời gian thực và hiển thị trạng thái online/offline.",
    image: "/chat.png",
    tags: ["React", "Tailwind", "Firebase", "Socket.io"],
    techStack: ["React", "Socket.io","Tailwind", "Firebase Realtime"],
    features: [
      "User authentication",
      "Realtime messaging",
      "Online/offline status",
      "Modern chat UI",
    ],
    featuresVi: [
      "Xác thực người dùng",
      "Nhắn tin thời gian thực",
      "Trạng thái online/offline",
      "Giao diện chat hiện đại",
    ],
    demo: "https://chat-social-self.vercel.app/",
    github: "https://github.com/dungdev-web/chat_social",
    type: "Fullstack",
  },
  {
    id: "short-link",
    title: "Short Link Generator",
    titleVi: "Tạo Link Rút gọn",
    description:
      "URL shortener application with link management, analytics, and rate limiting.",
    descriptionVi:
      "Ứng dụng rút gọn URL với quản lý link, phân tích và giới hạn tần suất.",
    fullDescription:
      "Short Link Generator is a web application that allows users to convert long URLs into short, shareable links. The system supports creating, managing, and redirecting short links with high performance and security.",
    fullDescriptionVi:
      "Short Link Generator là ứng dụng web cho phép người dùng chuyển đổi URL dài thành link ngắn có thể chia sẻ. Hệ thống hỗ trợ tạo, quản lý và chuyển hướng link ngắn với hiệu năng cao và bảo mật.",
    image: "/short-link.png",
    tags: [
      "React",
      "NextJS",
      "Tailwind",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Rate Limiting",
    ],
    techStack: ["React", "NextJS","TypeScript","Tailwind", "Node.js","PostgreSQL"],
    features: [
      "Generate short links",
      "Fast redirect",
      "Rate limiting",
      "PostgreSQL storage",
    ],
    featuresVi: [
      "Tạo link rút gọn",
      "Chuyển hướng nhanh",
      "Giới hạn tần suất",
      "Lưu trữ PostgreSQL",
    ],
    demo: "#",
    github: "https://github.com/dungdev-web/short_link",
    type: "Fullstack",
  },
  {
    id: "real-time-employee",
    title: "Real-Time Employee Management",
    titleVi: "Quản lý Nhân viên Thời gian thực",
    description:
      "Real-time employee management system with live updates, authentication, and role-based access.",
    descriptionVi:
      "Hệ thống quản lý nhân viên thời gian thực với cập nhật trực tiếp, xác thực và phân quyền.",
    fullDescription:
      "Real-Time Employee Management is a web application designed to manage employee information with real-time data updates. The system allows admins to create, update, and delete employee records while changes are instantly synchronized across clients using Firebase.",
    fullDescriptionVi:
      "Quản lý Nhân viên Thời gian thực là ứng dụng web quản lý thông tin nhân viên với cập nhật dữ liệu theo thời gian thực. Hệ thống cho phép admin tạo, cập nhật và xóa hồ sơ nhân viên trong khi thay đổi được đồng bộ ngay lập tức qua Firebase.",
    image: "/realtim-manage.png",
    tags: [
      "React",
      "SCSS",
      "Node.js",
      "Firebase",
      "Socket.io",
      "Rate Limiting",
    ],
    techStack: ["React", "Socket.io", "Node.js","Firebase Realtime"],

    features: [
      "CRUD employee records",
      "Real-time sync with Firebase",
      "Role-based access control",
      "Employee search & filter",
    ],
    featuresVi: [
      "CRUD hồ sơ nhân viên",
      "Đồng bộ thời gian thực với Firebase",
      "Phân quyền theo vai trò",
      "Tìm kiếm & lọc nhân viên",
    ],
    demo: "#",
    github: "https://github.com/dungdev-web/Real-time-employee",
    type: "Fullstack",
  },
  {
    id: "company-comparison",
    title: "Company Comparison App",
    titleVi: "Ứng dụng So sánh Công ty",
    description:
      "A tool that helps job seekers compare two companies side-by-side to make smarter career decisions.",
    descriptionVi:
      "Công cụ giúp người tìm việc so sánh hai công ty song song để đưa ra quyết định nghề nghiệp thông minh hơn.",
    fullDescription:
      "Company Comparison App is a web application designed for job seekers who are weighing multiple job offers or researching potential employers. Users can compare two companies across key dimensions such as salary, benefits, work culture, career growth, and tech stack.",
    fullDescriptionVi:
      "Ứng dụng So sánh Công ty được thiết kế cho người tìm việc đang cân nhắc nhiều lời mời làm việc. Người dùng có thể so sánh hai công ty theo các tiêu chí như lương, phúc lợi, văn hóa làm việc, cơ hội phát triển và tech stack.",
    image: "/company.png",
    tags: ["React", "NestJS", "Tailwind", "Excel"],
    techStack: ["React", "NestJS","Tailwind","Train AI"],

    features: [
      "Side-by-side company comparison",
      "Customizable criteria",
      "Weighted scoring system",
      "Export to Excel",
    ],
    
    featuresVi: [
      "So sánh công ty song song",
      "Tiêu chí tùy chỉnh",
      "Hệ thống tính điểm có trọng số",
      "Xuất báo cáo Excel",
    ],
    demo: "#",
    github: "https://github.com/dungdev-web/excel_app",
    type: "Fullstack",
  },
  {
    id: "tera-shoes",
    title: "Tera Shoes E-commerce",
    titleVi: "Thương mại điện tử Tera Shoes",
    description:
      "Full-stack e-commerce platform for shoes with AI recommendations, zalo payment, admin dashboard, and Docker deployment.",
    descriptionVi:
      "Nền tảng thương mại điện tử giày full-stack với gợi ý AI, thanh toán zalo pay, trang quản trị và triển khai Docker.",
    fullDescription:
      "Tera Shoes is a full-stack e-commerce platform specialized in selling shoes. The application features a modern shopping experience with AI-powered product recommendations, zalo payment, a comprehensive admin dashboard for managing products, orders, and users. Built with React, NextJS, MySQL, and deployed with Docker for scalable and consistent environments.",
    fullDescriptionVi:
      "Tera Shoes là nền tảng thương mại điện tử full-stack chuyên bán giày. Ứng dụng mang lại trải nghiệm mua sắm hiện đại với gợi ý sản phẩm bằng AI,thanh toán zalo, trang quản trị toàn diện để quản lý sản phẩm, đơn hàng và người dùng. Được xây dựng với React, NextJS, MySQL và triển khai bằng Docker.",
    image: "/shoes.png",
    tags: [
      "React",
      "NextJS",
      "TypeScript",
      "Tailwind",
      "MySQL",
      "Node.js",
      "AI",
      "Docker",
      "ZaloPay",
    ],
    techStack: ["React", "NextJS","TypeScript","Tailwind","Node.js","MySQL","Payment","Docker","Train AI"],
    features: [
      "Product listing, search and filter",
      "AI-powered product recommendations",
      "Shopping cart and checkout flow",
      "Admin dashboard for orders & products",
      "Docker deployment system",
    ],
    featuresVi: [
      "Danh sách sản phẩm, tìm kiếm và lọc",
      "Gợi ý sản phẩm bằng AI",
      "Giỏ hàng và luồng thanh toán",
      "Trang quản trị đơn hàng & sản phẩm",
      "Triển khai hệ thống bằng Docker",
    ],
    demo: "#",
    githubFe: "https://github.com/dungdev-web/FE-datn-",
    githubBe: "https://github.com/dungdev-web/BE-datn-",
    type: "Fullstack",
  },
  {
    id: "image-scanner",
    title: "Image Scanner Extension",
    titleVi: "Extension Image Scanner",
    description:
      "Chrome Extension that scans all images on the current page and displays them in a SidePanel with search, filter, and AI processing.",
    descriptionVi:
      "Chrome Extension quét toàn bộ ảnh trên trang hiện tại, hiển thị trong SidePanel với tìm kiếm, lọc và xử lý AI trực tiếp trên trình duyệt.",
    fullDescription:
      "Image Scanner is a Chrome Extension that scans all images on the current webpage — including <img> tags, CSS background-image, <picture>, and SVG <image> — and displays them in a Chrome SidePanel. Built with React, TypeScript, and TensorFlow.js for in-browser AI processing without any API key. Features include thumbnail preview, image size and URL display, search by URL, size filtering, image count badge on the extension icon, and auto-detection of new images via MutationObserver.",
    fullDescriptionVi:
      "Image Scanner là Chrome Extension quét toàn bộ ảnh trên trang web hiện tại — bao gồm thẻ <img>, CSS background-image, <picture> và SVG <image> — và hiển thị trong Chrome SidePanel. Được xây dựng với React, TypeScript và TensorFlow.js để xử lý AI ngay trên trình duyệt mà không cần API key. Tính năng gồm xem thumbnail, hiển thị kích thước và URL ảnh, tìm kiếm theo URL, lọc theo kích thước, badge số lượng ảnh trên icon và tự động phát hiện ảnh mới qua MutationObserver.",
    image: "/image-scanner.png",
    tags: [
      "React",
      "TypeScript",
      "TensorFlow.js",
      "Ant Design",
      "AG Grid",
      "Vite",
      "Chrome Extension",
      "NestJS",
      "WordPress"
    ],
    techStack: ["React", "NestJS","TypeScript"],
    features: [
      "Scan all images: <img>, CSS background-image, <picture>, SVG <image>",
      "Display thumbnail, image size and URL in a data grid",
      "Search images by URL",
      "Filter by size: Small / Medium / Large",
      "Image count badge on extension icon",
      "Auto-detect new images with MutationObserver",
    ],
    featuresVi: [
      "Quét tất cả ảnh: <img>, CSS background-image, <picture>, SVG <image>",
      "Hiển thị thumbnail, kích thước và URL ảnh dạng bảng",
      "Tìm kiếm ảnh theo URL",
      "Lọc theo kích thước: Nhỏ / Vừa / Lớn",
      "Badge số lượng ảnh trên icon extension",
      "Tự động phát hiện ảnh mới bằng MutationObserver",
    ],
    demo: "#",
    github: "https://github.com/dungdev-web/test_extention",
    type: "Extension",
  },
];
