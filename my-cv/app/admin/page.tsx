"use client";
// app/admin/page.tsx

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Upload,
  FileText,
  CheckCircle,
  XCircle,
  LogOut,
  ExternalLink,
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [cvData, setCvData] = useState<{
    files: { name: string; size: number; lastModified: string }[];
    active: string | null;
  }>({ files: [], active: null });

  const fetchCvData = () => {
    fetch("/api/admin/upload-cv")
      .then((r) => r.json())
      .then(setCvData);
  };

  useEffect(() => {
    fetchCvData();
  }, []);
  const handleSetActive = async (filename: string) => {
    await fetch("/api/admin/upload-cv", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename }),
    });
    fetchCvData(); // refresh
  };
  const handleFile = (f: File) => {
    if (f.type !== "application/pdf") {
      setStatus("error");
      setMessage("Chỉ chấp nhận file PDF!");
      return;
    }
    setFile(f);
    setStatus("idle");
    setMessage("");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setStatus("idle");

    const formData = new FormData();
    formData.append("cv", file);

    const res = await fetch("/api/admin/upload-cv", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setStatus("success");
      setMessage("✅ Upload thành công! CV đã được cập nhật.");
      setFile(null);
    } else {
      const data = await res.json();
      setStatus("error");
      setMessage(data.error ?? "Upload thất bại!");
    }
    setUploading(false);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Thẻ CV hiện tại — đặt trước Upload card */}
      <Card className="p-5 border-2 mb-4">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Chọn CV hiện tại
        </h2>

        {cvData.files.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">
            Chưa có file PDF nào.
          </p>
        ) : (
          <div className="space-y-2">
            {cvData.files.map((f) => (
              <div
                key={f.name}
                className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                  cvData.active === f.name
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${cvData.active === f.name ? "bg-primary/10" : "bg-red-500/10"}`}
                  >
                    <FileText
                      className={`w-4 h-4 ${cvData.active === f.name ? "text-primary" : "text-red-400"}`}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold flex items-center gap-2">
                      {f.name}
                      {cvData.active === f.name && (
                        <span className="text-[10px] bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                          Active
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(f.size / 1024).toFixed(1)} KB ·{" "}
                      {new Date(f.lastModified).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={`/pdf/${f.name}`} target="_blank">
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                  {cvData.active !== f.name && (
                    <Button size="sm" onClick={() => handleSetActive(f.name)}>
                      Dùng file này
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p className="text-sm text-muted-foreground">Dũng.dev</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <a
                href="/pdf/LuuDucDung_InternFresher_Frontend.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Xem CV hiện tại
              </a>
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Đăng xuất
            </Button>
          </div>
        </div>

        {/* Upload card */}
        <Card className="p-6 border-2">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Cập nhật CV PDF
          </h2>

          {/* Drop zone */}
          <motion.div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            animate={{
              borderColor: dragOver
                ? "hsl(var(--primary))"
                : "hsl(var(--border))",
            }}
            className="border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors hover:border-primary/50 hover:bg-primary/5"
          >
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
            />
            <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            {file ? (
              <div>
                <p className="font-semibold text-primary">{file.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            ) : (
              <div>
                <p className="font-medium">Kéo thả PDF vào đây</p>
                <p className="text-sm text-muted-foreground mt-1">
                  hoặc click để chọn file
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Tối đa 10MB
                </p>
              </div>
            )}
          </motion.div>

          {/* Status message */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex items-center gap-2 mt-4 text-sm px-4 py-3 rounded-lg ${
                  status === "success"
                    ? "bg-green-500/10 text-green-600"
                    : "bg-red-500/10 text-red-500"
                }`}
              >
                {status === "success" ? (
                  <CheckCircle className="w-4 h-4 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 shrink-0" />
                )}
                {message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Upload button */}
          <Button
            className="w-full mt-4"
            disabled={!file || uploading}
            onClick={handleUpload}
          >
            {uploading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Đang upload...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload CV
              </span>
            )}
          </Button>
        </Card>

        {/* Info */}
        <p className="text-xs text-muted-foreground text-center mt-4">
          File sẽ được lưu tại{" "}
          <code className="bg-secondary px-1 rounded">public/pdf/cv.pdf</code>
        </p>
      </div>
    </div>
  );
}
