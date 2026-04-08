import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { projects } from "@/app/data/projects";
import { certificates } from "@/app/data/certificate";
import { notifyChat } from "@/lib/telegram";
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
});
function extractContent(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .filter((c: any) => c.type === "text")
      .map((c: any) => c.text)
      .join(" ");
  }
  return String(content ?? "");
}
const buildProjectsText = () =>
  projects
    .map((p, i) => {
      const lines = [
        `${i + 1}. ${p.titleVi ?? p.title}${p.titleVi && p.titleVi !== p.title ? ` (${p.title})` : ""}`,
        `   Loại: ${p.type ?? "N/A"}`,
        `   Tech: ${p.techStack.join(", ")}`,
        `   Thẻ tag liên quan: ${p.tags.join(", ")} `,
        `   Mô tả: ${p.fullDescriptionVi ?? p.fullDescription}`,
      ];
      if (p.features?.length)
        lines.push(`   Tính năng: ${(p.featuresVi ?? p.features)?.join(", ")}`);
      if (p.demo) lines.push(`   Demo: ${p.demo}`);
      if (p.github) lines.push(`   GitHub: ${p.github}`);
      if (p.githubFe) lines.push(`   GitHub FE: ${p.githubFe}`);
      if (p.githubBe) lines.push(`   GitHub BE: ${p.githubBe}`);
      return lines.join("\n");
    })
    .join("\n\n");
const buildCertificatesText = () =>
  certificates
    .map((c, i) => {
      const lines = [
        `${i + 1}. ${c.title}`,
        `   Nguồn: ${c.issuer ?? "N/A"}`,
        `   Năm: ${c.date}`,
      ];
      return lines.join("\n");
    })
    .join("\n\n");
    const buildFeaturedProjectsText = () => `
=== DỰ ÁN NỔI BẬT ===

1. Todo App
   Mô tả: Ứng dụng quản lý công việc cá nhân với đầy đủ tính năng CRUD, hỗ trợ phân loại theo danh mục, đánh dấu ưu tiên, và lọc theo trạng thái.
   Tech: React, Node.js, MySQL, REST API
   Tính năng nổi bật:
   - Thêm, sửa, xoá task (CRUD hoàn chỉnh)
   - Phân loại task theo danh mục / tag
   - Filter: Tất cả / Đang làm / Hoàn thành
   - Backend REST API với Node.js kết nối MySQL
   - UI responsive với Tailwind CSS
   - Ai tự tạo task, xóa task theo yêu cầu người dùng và tự động sắp xếp task theo deadline
   Điểm học được: Thiết kế REST API từ đầu, quản lý state phức tạp hơn với nhiều filter, triển khai full-stack app đơn giản. Đây là dự án đầu tiên Dũng build để học cách thiết kế API và quản lý dữ liệu từ backend, sau này đã áp dụng kinh nghiệm này vào các dự án phức tạp hơn như Tera Shoes.
   Tính năng sắp tới: Tích hợp thêm tính năng nhắc nhở (reminder) cho task, và AI tự động phân loại task vào các danh mục dựa trên nội dung mô tả.
2. Flashcard App
   Mô tả: Ứng dụng học từ vựng / ghi nhớ kiến thức theo phương pháp thẻ ghi nhớ (flashcard), hỗ trợ lật thẻ và tự tạo bộ thẻ cá nhân.
   Tech: React, NextJS, TypeScript, Tailwind CSS, Firebase
   Tính năng nổi bật:
   - Tạo, chỉnh sửa, xoá bộ thẻ (deck) và từng thẻ
   - Hiệu ứng lật thẻ 3D (CSS transform)
   - Chế độ ôn tập: hiển thị lần lượt từng thẻ, đánh dấu đã thuộc / chưa thuộc
   - Lưu tiến độ học vào Firestore
   - UI đơn giản, tập trung vào trải nghiệm học tập
   - Ai hỗ trợ người học và nói chuyện như một tutor, giúp giải thích từ vựng hoặc khái niệm trên thẻ khi người dùng yêu cầu
   - Phân quyền đơn giản cho phép người dùng tạo bộ thẻ riêng tư hoặc công khai chia sẻ với người khác
   - Tích hợp tính năng trả phí để mở khoá các bộ thẻ cao cấp, dùng VNPay(sanbox) để mô phỏng quy trình thanh toán
   Điểm học được: CSS 3D animation, UX học tập, tích hợp Firebase cho backend, xây dựng tính năng AI tutor hỗ trợ học tập. Đây là dự án giúp Dũng học cách tạo trải nghiệm người dùng tương tác và tích hợp AI vào ứng dụng học tập.
   Tính năng sắp tới: Tích hợp thêm các thuật toán lặp lại ngắt quãng (spaced repetition) để tối ưu hoá hiệu quả học tập, và mở rộng tính năng chia sẻ bộ thẻ giữa người dùng và xóa thẻ khi người dùng đã thuộc trong vòng 30 ngày,...
3. 👟 Tera Shoes — E-commerce bán giày
   Mô tả: Website thương mại điện tử bán giày đầy đủ chức năng, từ duyệt sản phẩm đến thanh toán. Đây là một trong những dự án phức tạp nhất Dũng đã build.
   Tech: Next.js,React, Docker, TypeScript, Tailwind CSS, Node.js, MySQL , REST API
   Tính năng nổi bật:
   - Trang danh sách sản phẩm với filter theo size, màu sắc, giá
   - Trang chi tiết sản phẩm với gallery ảnh
   - Giỏ hàng (cart) — thêm/xoá/cập nhật số lượng, lưu vào database
   - Quy trình checkout: nhập thông tin giao hàng, xác nhận đơn
   - Quản lý đơn hàng phía admin (với authentication đơn giản)
   - UI hiện đại, tối ưu mobile-first
   - Ai recommend sản phẩm dựa trên lịch sử duyệt và mua hàng (dùng thuật toán gợi ý đơn giản)
   Điểm học được: Thiết kế API RESTful, UX e-commerce, quản lý state phức tạp (giỏ hàng), triển khai ứng dụng full-stack, tích hợp AI recommendation.

4. Company Comparison App
   Mô tả: Ứng dụng giúp người dùng so sánh thông tin giữa các công ty (quy mô, ngành nghề, chỉ số...) một cách trực quan.
   Tech: React, TypeScript, Tailwind CSS, REST API / dữ liệu tĩnh, Excel
   Tính năng nổi bật:
   - Tìm kiếm và chọn nhiều công ty để so sánh song song
   - Hiển thị bảng so sánh các chỉ số theo cột
   - Biểu đồ trực quan hoá dữ liệu (Chart.js hoặc Recharts)
   - Giao diện rõ ràng, dễ đọc dù nhiều dữ liệu
    - Dữ liệu có thể được lấy từ API hoặc lưu trữ tĩnh dưới dạng JSON/Excel
    - Ai hỗ trợ giải thích ý nghĩa của các chỉ số và so sánh giữa các công ty khi người dùng yêu cầu
   Điểm học được: Data visualization, thiết kế UI dạng bảng phức tạp, xử lý dữ liệu so sánh
  Tính năng sắp tới: Tích hợp thêm các chỉ số và dữ liệu thời gian thực, và cải thiện phần giải thích AI để cung cấp insights sâu hơn về sự khác biệt giữa các công ty và áp dụng các tài liệu từ các trang tuyển dụng như TOPCV, ITViec,... để phân tích
5. Personal Blog — AI-powered
   Mô tả: Blog cá nhân nơi Dũng chia sẻ kiến thức lập trình và kinh nghiệm học web. Điểm đặc biệt là tích hợp Cohere AI để hỗ trợ tạo nội dung bài viết.
   Tech: Next.js, TypeScript, Tailwind CSS, Cohere AI API, Firebase / MDX
   Tính năng nổi bật:
   - Viết và đăng bài blog với Markdown / MDX
   - Tích hợp Cohere AI để generate draft bài viết từ tiêu đề / chủ đề
   - Trang danh sách bài viết theo tag / danh mục
   - Trang chi tiết bài viết với layout đọc thoải mái
   - Hiện tại đang trong giai đoạn phát triển, chưa có nhiều bài viết
   Ghi chú thành thật: Đây là dự án Dũng đang build và cải thiện dần, AI generate content vẫn đang được tinh chỉnh để ra bài chất lượng hơn.
   Điểm học được: Tích hợp LLM API (Cohere), MDX rendering, content-driven architecture
   Tính năng sắp tới: Cải thiện chất lượng AI-generated content, thêm tính năng tương tác cho người đọc (bình luận, đánh giá), và tối ưu SEO cho blog và thêm đăng nhập người dùng.
`;
const buildSystemPrompt = () => {
  const privateInfo = process.env.AI_KNOWLEDGE_BASE ?? "";
  return `
Bạn là AI assistant đại diện cho Dũng trên portfolio website.
Trả lời ngắn gọn, thân thiện, chuyên nghiệp bằng tiếng Việt.
Sử dụng Markdown để định dạng câu trả lời cho dễ đọc:
- Dùng **bold** để nhấn mạnh từ khoá quan trọng
- Dùng danh sách gạch đầu dòng (-) khi liệt kê tính năng, kỹ năng
- Dùng \`code\` cho tên công nghệ, thư viện (vd: \`React\`, \`MySQL\`)
- Dùng ### để tạo tiêu đề nhỏ nếu câu trả lời dài
- Không dùng bảng, không dùng quá nhiều heading — giữ gọn gàng
Chỉ trả lời dựa trên thông tin bên dưới. Nếu không có thông tin, nói:
"Mình chưa có thông tin về điều này, hãy liên hệ trực tiếp với Dũng qua email nhé!"

=== THÔNG TIN VỀ DŨNG ===
${privateInfo}


--- Kỹ năng ---
Frontend: React, Next.js, TypeScript, Tailwind CSS, Framer Motion, HTML/CSS
Backend: Node.js, Firebase, REST API
Database: Firebase Firestore, MongoDB, PostgreSQL
Tools: Git, Vercel, Figma, VS Code
Đang học: Redis, NestJs, Docker

--- Dự án (${projects.length} projects) ---
${buildProjectsText()}
${buildFeaturedProjectsText()}
--- Chứng Chỉ liên quan ---
${buildCertificatesText()}
--- Kinh nghiệm ---
- Sinh viên CNTT đã tốt nghiệp cao đẳng
- Tự học web development 1 năm
- Đã build và deploy nhiều dự án cá nhân
- Đang tìm kiếm vị trí Frontend / Full-stack Developer
- Thực tập tại Công ty TNHH HTDIGI với vị trí WordPress Developer
- Tham gia các dự án web wordpress và dự án riêng về short link generation link github: https://github.com/dungdev-web/short_link
--- Học vấn ---
- Cao đẳng FPT (đã tốt nghiệp)
- Tìm kiếm cơ hội liên thông trong năm nay
--- Tình trạng hôn nhân ---
- Độc thân
--- Điểm mạnh ---
- Đam mê UI/UX đẹp và animations
- Học hỏi nhanh công nghệ mới
- Chú trọng performance và code sạch
`;
};

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "system", content: buildSystemPrompt() }, ...messages],
      max_tokens: 500,
      temperature: 0.7,
    });

    const reply =
      completion.choices[0]?.message?.content ?? "Xin lỗi, có lỗi xảy ra.";
    const userMessages = messages.filter((m: any) => m.role === "user");
    if (userMessages.length === 1) {
      notifyChat({
        question: extractContent(userMessages[0].content),
        country: req.headers.get("x-vercel-ip-country") ?? undefined,
        ua: req.headers.get("user-agent") ?? undefined,
      });
    }
    // console.log("messages length:", messages.length);
    // console.log("first message:", JSON.stringify(messages[0]));
    // console.log("CHAT_ID:", process.env.TELEGRAM_CHAT_ID);
    // console.log("BOT_TOKEN exists:", !!process.env.TELEGRAM_BOT_TOKEN);
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Groq API error:", error);
    return NextResponse.json({ error: "Lỗi kết nối API" }, { status: 500 });
  }
}
