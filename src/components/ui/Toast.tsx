"use client";

import { AnimatePresence, motion } from "framer-motion";

export type ToastKind = "success" | "error";

type ToastProps = {
  open: boolean;
  kind?: ToastKind;
  message: string;
  onClose?: () => void;
};

export function Toast({ open, kind = "success", message, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 inset-x-0 z-[80] flex justify-center px-4 pointer-events-none"
        >
          <div
            className={`pointer-events-auto max-w-md w-full flex items-start gap-3 px-4 py-3 shadow-lg border ${
              kind === "error"
                ? "bg-white border-red-900/20 text-neutral-900"
                : "bg-neutral-900 border-neutral-900 text-white"
            }`}
          >
            <span
              aria-hidden
              className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] ${
                kind === "error"
                  ? "bg-red-900/10 text-red-900"
                  : "bg-white/15 text-white"
              }`}
            >
              {kind === "error" ? "!" : "✓"}
            </span>
            <p className="flex-1 text-sm leading-relaxed pt-0.5">{message}</p>
            {onClose ? (
              <button
                type="button"
                onClick={onClose}
                className={`shrink-0 text-xs tracking-wide opacity-60 hover:opacity-100 transition-opacity ${
                  kind === "error" ? "text-neutral-700" : "text-white"
                }`}
                aria-label="Close"
              >
                ✕
              </button>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
