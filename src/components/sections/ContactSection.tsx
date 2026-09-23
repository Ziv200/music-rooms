"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/hooks/useLang";
import {
  SectionWrapper,
  SectionLabel,
  SectionTitle,
  SectionSubtitle,
} from "@/components/ui/SectionWrapper";
import { Toast } from "@/components/ui/Toast";

const FORMSUBMIT = "https://formsubmit.co/ajax/1dd8e8986b87aa29f7acd0533941d73b";

export function ContactSection() {
  const { t } = useLang();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [toast, setToast] = useState<{
    open: boolean;
    kind: "success" | "error";
    message: string;
  }>({ open: false, kind: "success", message: "" });

  const f = t.contact.form;
  const inputClass =
    "w-full bg-white border border-neutral-900/12 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900/40 transition-colors";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch(FORMSUBMIT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: data,
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("sent");
      form.reset();
      setToast({ open: true, kind: "success", message: f.toastSuccess });
      setTimeout(() => setStatus("idle"), 6000);
      setTimeout(() => setToast((t) => ({ ...t, open: false })), 5000);
    } catch {
      setStatus("error");
      setToast({ open: true, kind: "error", message: f.toastError });
      setTimeout(() => setStatus("idle"), 6000);
      setTimeout(() => setToast((t) => ({ ...t, open: false })), 5000);
    }
  };

  return (
    <SectionWrapper id="contact" className="border-t border-neutral-900/8">
      <div className="mb-12 max-w-2xl">
        <SectionLabel>{t.contact.sectionLabel}</SectionLabel>
        <SectionTitle>{t.contact.title}</SectionTitle>
        <SectionSubtitle>{t.contact.subtitle}</SectionSubtitle>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <motion.form
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="lg:col-span-7 quiet-card p-6 sm:p-8 space-y-5"
        >
          <input type="hidden" name="_subject" value="Inquiry — Ilan Ziv Music & Sound Services" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] tracking-wide text-neutral-500 mb-2">
                {f.name}
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder={f.namePlaceholder}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-[11px] tracking-wide text-neutral-500 mb-2">
                {f.email}
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder={f.emailPlaceholder}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] tracking-wide text-neutral-500 mb-2">
                {f.facilityType}
              </label>
              <select
                name="organization"
                required
                className={`${inputClass} text-neutral-700 appearance-none cursor-pointer`}
                defaultValue=""
              >
                {f.facilityOptions.map((opt, i) => (
                  <option key={i} value={i === 0 ? "" : opt} disabled={i === 0}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] tracking-wide text-neutral-500 mb-2">
                {f.dimensions}
              </label>
              <input
                type="text"
                name="dimensions"
                placeholder={f.dimensionsPlaceholder}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] tracking-wide text-neutral-500 mb-2">
              {f.scope}
            </label>
            <textarea
              name="message"
              rows={4}
              required
              placeholder={f.scopePlaceholder}
              className={`${inputClass} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending" || status === "sent"}
            className={`inline-flex items-center px-5 py-2.5 text-[13px] tracking-wide transition-colors ${
              status === "sent"
                ? "bg-neutral-200 text-neutral-600"
                : status === "error"
                  ? "bg-red-900 text-white"
                  : "bg-neutral-900 text-white hover:bg-neutral-800"
            }`}
          >
            {status === "sending"
              ? "…"
              : status === "sent"
                ? f.sent
                : status === "error"
                  ? "Error — try again"
                  : f.submit}
          </button>
        </motion.form>

        <div className="lg:col-span-5 space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="quiet-card p-6"
          >
            <h4 className="text-sm font-medium text-neutral-900 mb-3">
              {t.contact.sidebarTitle}
            </h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              {t.contact.sidebarBody}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="quiet-card p-6"
          >
            <h4 className="text-sm font-medium text-neutral-900 mb-4">
              {t.contact.directTitle}
            </h4>
            <div className="space-y-4">
              <div>
                <div className="text-[10px] tracking-[0.14em] uppercase text-neutral-400 mb-1">
                  {t.contact.emailLabel}
                </div>
                <a
                  href="mailto:ziv200@gmail.com"
                  className="text-sm text-neutral-800 hover:underline underline-offset-4"
                >
                  ziv200@gmail.com
                </a>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.14em] uppercase text-neutral-400 mb-1">
                  {t.contact.locationLabel}
                </div>
                <p className="text-sm text-neutral-600">{t.contact.locationValue}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Toast
        open={toast.open}
        kind={toast.kind}
        message={toast.message}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
      />
    </SectionWrapper>
  );
}
