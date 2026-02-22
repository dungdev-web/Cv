"use client";
import { useState, useCallback, useRef } from "react";
import { certificates } from "@/app/data/certificate";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function CertificateModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Zoom state
  const [isZoomed, setIsZoomed] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{ x: number; y: number; px: number; py: number } | null>(null);

  const resetZoom = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setIsZoomed(false);
  }, []);

  const handleZoomIn = useCallback(() => {
    setScale((s) => {
      const next = Math.min(s + 0.5, 4);
      setIsZoomed(next > 1);
      return next;
    });
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale((s) => {
      const next = Math.max(s - 0.5, 1);
      if (next === 1) {
        setPosition({ x: 0, y: 0 });
        setIsZoomed(false);
      }
      return next;
    });
  }, []);

  const handleImageClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) return;
    if (scale < 2) {
      // Zoom in to click point
      const rect = e.currentTarget.getBoundingClientRect();
      const cx = e.clientX - rect.left - rect.width / 2;
      const cy = e.clientY - rect.top - rect.height / 2;
      setScale(2.5);
      setPosition({ x: -cx * 0.5, y: -cy * 0.5 });
      setIsZoomed(true);
    } else {
      resetZoom();
    }
  }, [scale, isDragging, resetZoom]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (scale <= 1) return;
    e.preventDefault();
    dragStart.current = { x: e.clientX, y: e.clientY, px: position.x, py: position.y };
    setIsDragging(false);
  }, [scale, position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragStart.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) setIsDragging(true);
    setPosition({ x: dragStart.current.px + dx, y: dragStart.current.py + dy });
  }, []);

  const handleMouseUp = useCallback(() => {
    dragStart.current = null;
    setTimeout(() => setIsDragging(false), 10);
  }, []);

  // Wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setScale((s) => {
      const next = e.deltaY < 0 ? Math.min(s + 0.2, 4) : Math.max(s - 0.2, 1);
      if (next === 1) {
        setPosition({ x: 0, y: 0 });
        setIsZoomed(false);
      } else {
        setIsZoomed(true);
      }
      return next;
    });
  }, []);

  const goNext = useCallback(() => {
    if (isZoomed) return; // prevent slide when zoomed
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % certificates.length);
    resetZoom();
  }, [isZoomed, resetZoom]);

  const goPrev = useCallback(() => {
    if (isZoomed) return;
    setDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? certificates.length - 1 : prev - 1,
    );
    resetZoom();
  }, [isZoomed, resetZoom]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") {
        if (isZoomed) resetZoom();
        else onClose();
      }
      if (e.key === "+") handleZoomIn();
      if (e.key === "-") handleZoomOut();
    },
    [goNext, goPrev, onClose, isZoomed, resetZoom, handleZoomIn, handleZoomOut],
  );

  const cert = certificates[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
            onClick={() => (isZoomed ? resetZoom() : onClose())}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <div
              className="relative w-full max-w-3xl bg-background rounded-3xl border border-border shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-lg">My Certificates</span>
                  <Badge variant="secondary" className="ml-1">
                    {currentIndex + 1} / {certificates.length}
                  </Badge>
                </div>

                {/* Zoom controls */}
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleZoomOut}
                    disabled={scale <= 1}
                    className="rounded-full w-8 h-8 disabled:opacity-30"
                    title="Zoom out (-)"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>

                  {/* Scale indicator */}
                  <span className="text-xs text-muted-foreground w-10 text-center font-mono">
                    {Math.round(scale * 100)}%
                  </span>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleZoomIn}
                    disabled={scale >= 4}
                    className="rounded-full w-8 h-8 disabled:opacity-30"
                    title="Zoom in (+)"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>

                  {isZoomed && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={resetZoom}
                      className="rounded-full w-8 h-8 text-muted-foreground hover:text-foreground"
                      title="Reset zoom (Esc)"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  )}

                  <div className="w-px h-5 bg-border mx-1" />

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Slider area */}
              <div
                className="relative overflow-hidden bg-secondary/20 min-h-[360px] flex items-center justify-center"
                onWheel={handleWheel}
              >
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -80 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-full flex flex-col items-center justify-center p-6 gap-4"
                  >
                    {/* Image container */}
                    <div
                      className={`relative w-full max-w-xl aspect-[4/3] rounded-2xl overflow-hidden border-2 border-border shadow-xl ${
                        scale > 1
                          ? "cursor-grab active:cursor-grabbing"
                          : "cursor-zoom-in"
                      }`}
                      onClick={handleImageClick}
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                    >
                      <div
                        className={`absolute inset-0 bg-linear-to-br ${cert.color} opacity-20`}
                      />

                      {/* Zoomable image wrapper */}
                      <div
                        className="w-full h-full"
                        style={{
                          transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                          transformOrigin: "center center",
                          transition: isDragging ? "none" : "transform 0.2s ease",
                          willChange: "transform",
                          userSelect: "none",
                        }}
                      >
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-full object-cover pointer-events-none"
                          draggable={false}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      </div>

                      {/* Fallback content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 pointer-events-none">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-2 uppercase tracking-widest">
                            Certificate of Completion
                          </p>
                        </div>
                      </div>

                      {/* Zoom hint badge */}
                      {!isZoomed && (
                        <div className="absolute bottom-3 right-3 pointer-events-none">
                          <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                            <ZoomIn className="w-3 h-3 text-white" />
                            <span className="text-white text-xs">Click to zoom</span>
                          </div>
                        </div>
                      )}

                      {/* Zoomed indicator */}
                      {isZoomed && (
                        <div className="absolute bottom-3 left-3 pointer-events-none">
                          <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                            <span className="text-white text-xs">Drag to pan · Scroll to zoom</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Certificate info */}
                    <div className="text-center">
                      <h3 className="font-semibold text-lg">{cert.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {cert.issuer} · {cert.date}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Nav arrows — hidden when zoomed */}
                {!isZoomed && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={goPrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background shadow-lg"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={goNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background shadow-lg"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </>
                )}
              </div>

              {/* Dot indicators */}
              <div className="flex items-center justify-center gap-2 py-4 border-t border-border">
                {certificates.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (isZoomed) { resetZoom(); return; }
                      setDirection(i > currentIndex ? 1 : -1);
                      setCurrentIndex(i);
                      resetZoom();
                    }}
                    className={`transition-all duration-300 rounded-full ${
                      i === currentIndex
                        ? "w-6 h-2.5 bg-primary"
                        : "w-2.5 h-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                    }`}
                    aria-label={`Go to certificate ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}