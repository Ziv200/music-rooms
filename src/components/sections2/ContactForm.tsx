"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site-config";
import { track } from "@/lib/analytics";
import type { heForm } from "@/content/he";

type FormCopy = Omit<typeof heForm, "validation"> & { validation: typeof heForm.validation };

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;
const UTM_STORE = "mr_utm";
const ORG_SLUGS = ["rehab", "disability", "hospital", "mental-health", "geriatric", "veterans", "hightech", "architects", "music-education", "other"];

type ErrKey = "name" | "role" | "organization" | "email" | "orgType" | "consent";
const FIELD_IDS: Record<ErrKey, string> = {
  name: "f-name",
  role: "f-role",
  organization: "f-organization",
  email: "f-email",
  orgType: "f-org-type",
  consent: "f-consent",
};

function readUtm(): Record<string, string> {
  const out: Record<string, string> = {};
  try {
    const params = new URLSearchParams(window.location.search);
    let found = false;
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) {
        out[k] = v.slice(0, 100);
        found = true;
      }
    }
    if (found) {
      sessionStorage.setItem(UTM_STORE, JSON.stringify(out));
      return out;
    }
    const saved = sessionStorage.getItem(UTM_STORE);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return out;
  }
}

export function ContactForm({
  lang,
  page,
  copy,
  title,
  intro,
  privacyHref,
  thanksUrl,
  caseStudyHref,
}: {
  lang: "he" | "en";
  page: string;
  copy: FormCopy;
  title: string;
  intro?: string;
  privacyHref: string;
  /** Absolute URL of the thank-you page, used by the no-JS fallback */
  thanksUrl: string;
  caseStudyHref: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [utm, setUtm] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Partial<Record<ErrKey, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const f = copy.fields;
  const o = copy.options;
  const v = copy.validation;
  const phone = lang === "he" ? SITE.phone.display : SITE.phone.intl;

  useEffect(() => {
    setEnhanced(true);
    setUtm(readUtm());
  }, []);

  useEffect(() => {
    if (status === "sent" || status === "error") statusRef.current?.focus();
  }, [status]);

  const validate = (form: HTMLFormElement) => {
    const d = new FormData(form);
    const e: Partial<Record<ErrKey, string>> = {};
    if (!String(d.get("name") || "").trim()) e.name = v.name;
    if (!String(d.get("role") || "")) e.role = v.role;
    if (!String(d.get("organization") || "").trim()) e.organization = v.organization;
    const email = String(d.get("email") || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) e.email = v.email;
    if (!String(d.get("org_type") || "")) e.orgType = v.orgType;
    if (!d.get("privacy_consent")) e.consent = v.consent;
    return e;
  };

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const e = validate(form);
    setErrors(e);
    const keys = Object.keys(e) as ErrKey[];
    if (keys.length) {
      document.getElementById(FIELD_IDS[keys[0]])?.focus();
      return;
    }
    const data = new FormData(form);
    const orgIdx = o.orgType.indexOf(String(data.get("org_type")));
    const orgLabel = heFormOrgTypes[orgIdx] ?? String(data.get("org_type"));
    data.set("_subject", `${copy.subject} – ${orgLabel}`);
    setStatus("sending");
    try {
      const res = await fetch(SITE.formsubmit.ajax, { method: "POST", headers: { Accept: "application/json" }, body: data });
      if (!res.ok) throw new Error(String(res.status));
      const json = (await res.json().catch(() => ({}))) as { success?: string | boolean };
      if (json.success === false || json.success === "false") throw new Error("rejected");
      track(`form-submit-${ORG_SLUGS[orgIdx] ?? "other"}`);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const input =
    "w-full bg-white border border-neutral-900/30 px-3.5 py-3 text-[16px] text-neutral-900 placeholder:text-neutral-500 focus:outline-2 focus:outline-offset-1 focus:outline-neutral-900 aria-[invalid=true]:border-red-700";
  const labelCls = "block text-[15px] font-medium text-neutral-900 mb-1.5";
  const req = <span className="text-sm font-normal text-neutral-600"> {copy.required}</span>;
  const errId = (k: ErrKey) => `${FIELD_IDS[k]}-error`;
  const err = (k: ErrKey) =>
    errors[k] ? (
      <p id={errId(k)} className="mt-1.5 text-[15px] text-red-800">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: ErrKey, hint?: string) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": [errors[k] ? errId(k) : "", hint || ""].filter(Boolean).join(" ") || undefined,
  });

  const select = (id: string, name: string, label: string, options: readonly string[], required?: ErrKey) => (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
        {required ? req : null}
      </label>
      <select id={id} name={name} required={!!required} defaultValue="" className={`${input} cursor-pointer`} {...(required ? aria(required) : {})}>
        <option value="">{copy.choose}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {required ? err(required) : null}
    </div>
  );

  const errorCount = Object.keys(errors).length;

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-900/10 bg-white">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl mb-10">
          <h2 id="contact-title" className="font-display text-3xl sm:text-4xl font-medium text-neutral-900 mb-4 text-balance">
            {title}
          </h2>
          {intro ? <p className="text-base sm:text-lg text-neutral-700 leading-relaxed">{intro}</p> : null}
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          <form
            ref={formRef}
            action={SITE.formsubmit.plain}
            method="POST"
            noValidate={enhanced}
            onSubmit={onSubmit}
            className="lg:col-span-8 space-y-5"
            aria-describedby={errorCount ? "form-errors" : undefined}
          >
            <input type="hidden" name="_subject" value={copy.subject} />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value={thanksUrl} />
            <input type="hidden" name="page" value={page} />
            <input type="hidden" name="lang" value={lang} />
            {UTM_KEYS.map((k) => (
              <input key={k} type="hidden" name={k} value={utm[k] || ""} />
            ))}
            <div aria-hidden="true" className="hidden">
              <label htmlFor="f-honey">Leave empty</label>
              <input id="f-honey" type="text" name="_honey" tabIndex={-1} autoComplete="off" />
            </div>

            <div id="form-errors" role="alert" aria-live="assertive" className={errorCount ? "border border-red-700 bg-red-50 p-4" : "sr-only"}>
              {errorCount ? (
                <ul className="list-disc ps-5 space-y-1 text-[15px] text-red-900">
                  {(Object.keys(errors) as ErrKey[]).map((k) => (
                    <li key={k}>
                      <a href={`#${FIELD_IDS[k]}`} className="underline">
                        {errors[k]}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="f-name" className={labelCls}>
                  {f.name}
                  {req}
                </label>
                <input id="f-name" name="name" type="text" required autoComplete="name" className={input} {...aria("name")} />
                {err("name")}
              </div>
              {select("f-role", "role", f.role, o.role, "role")}
              <div>
                <label htmlFor="f-organization" className={labelCls}>
                  {f.organization}
                  {req}
                </label>
                <input id="f-organization" name="organization" type="text" required autoComplete="organization" className={input} {...aria("organization")} />
                {err("organization")}
              </div>
              <div>
                <label htmlFor="f-email" className={labelCls}>
                  {f.email}
                  {req}
                </label>
                <input id="f-email" name="email" type="email" required autoComplete="email" dir="ltr" className={`${input} text-start`} {...aria("email")} />
                {err("email")}
              </div>
              <div>
                <label htmlFor="f-phone" className={labelCls}>
                  {f.phone}
                </label>
                <input id="f-phone" name="phone" type="tel" autoComplete="tel" dir="ltr" className={`${input} text-start`} aria-describedby={f.phoneHint ? "f-phone-hint" : undefined} />
                {f.phoneHint ? (
                  <p id="f-phone-hint" className="mt-1.5 text-sm text-neutral-600">
                    {f.phoneHint}
                  </p>
                ) : null}
              </div>
              {select("f-org-type", "org_type", f.orgType, o.orgType, "orgType")}
              {select("f-space", "space_status", f.spaceStatus, o.spaceStatus)}
              {select("f-program", "therapy_program", f.therapyProgram, o.therapyProgram)}
              {select("f-funding", "funding", f.funding, o.funding)}
              {select("f-timeline", "timeline", f.timeline, o.timeline)}
              {select("f-region", "region", f.region, o.region)}
              <div>
                <label htmlFor="f-room-size" className={labelCls}>
                  {f.roomSize}
                </label>
                <input id="f-room-size" name="room_size" type="text" className={input} aria-describedby={f.roomSizeHint ? "f-room-size-hint" : undefined} />
                {f.roomSizeHint ? (
                  <p id="f-room-size-hint" className="mt-1.5 text-sm text-neutral-600">
                    {f.roomSizeHint}
                  </p>
                ) : null}
              </div>
            </div>

            <fieldset>
              <legend className={labelCls}>{f.requests}</legend>
              <div className="space-y-2">
                {o.requests.map((r, i) => {
                  const key = ["visit", "donor", "pdf"][i];
                  return (
                    <div key={r} className="flex items-start gap-2.5">
                      <input id={`req-${key}`} type="checkbox" name={`request_${key}`} value={r} className="mt-1 w-5 h-5 accent-neutral-900" />
                      <label htmlFor={`req-${key}`} className="text-[16px] text-neutral-800">
                        {r}
                      </label>
                    </div>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <label htmlFor="f-message" className={labelCls}>
                {f.message}
              </label>
              <textarea id="f-message" name="message" rows={4} className={`${input} resize-y`} aria-describedby={f.messageHint ? "f-message-hint" : undefined} />
              {f.messageHint ? (
                <p id="f-message-hint" className="mt-1.5 text-sm text-neutral-600">
                  {f.messageHint}
                </p>
              ) : null}
            </div>

            <div>
              <div className="flex items-start gap-2.5">
                <input id="f-consent" type="checkbox" name="privacy_consent" value={lang === "he" ? "כן" : "yes"} required className="mt-1 w-5 h-5 accent-neutral-900" {...aria("consent")} />
                <label htmlFor="f-consent" className="text-[16px] text-neutral-800">
                  {copy.consentBefore}
                  <Link href={privacyHref} className="underline underline-offset-4">
                    {copy.consentLink}
                  </Link>
                  {copy.consentAfter}
                  {req}
                </label>
              </div>
              {err("consent")}
            </div>

            <div className="pt-1">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center justify-center px-6 py-3 bg-neutral-900 text-white text-[16px] font-medium hover:bg-neutral-700 disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
              >
                {status === "sending" ? copy.sending : copy.submit}
              </button>
              <p className="mt-3 text-sm text-neutral-600 max-w-xl">{copy.note}</p>
            </div>

            <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="outline-none">
              {status === "sent" ? (
                <p className="border border-neutral-900 bg-[#f7f6f3] p-4 text-[16px] text-neutral-900">
                  {copy.thanks}{" "}
                  <Link href={caseStudyHref} className="underline underline-offset-4 font-medium">
                    {copy.thanksLink}
                  </Link>
                </p>
              ) : status === "error" ? (
                <p className="border border-red-700 bg-red-50 p-4 text-[16px] text-red-900">{copy.error}</p>
              ) : null}
            </div>
          </form>

          <aside className="lg:col-span-4 space-y-4 text-[16px] text-neutral-800">
            <div className="quiet-card p-6 space-y-3">
              <p>
                {copy.sidebarLead}{" "}
                <a href={SITE.phone.tel} className="underline underline-offset-4 font-medium whitespace-nowrap" dir="ltr">
                  {phone}
                </a>
                {" · "}
                <a href={`mailto:${SITE.email}`} className="underline underline-offset-4">
                  {SITE.email}
                </a>
                {copy.sidebarTail ? `. ${copy.sidebarTail}` : null}
              </p>
              {copy.area ? <p className="text-neutral-700">{copy.area}</p> : null}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/** Hebrew org-type labels, used in the email subject for both languages. */
const heFormOrgTypes = ["מוסד שיקום", "מוסד או כפר לאנשים עם מוגבלות", "בית חולים (כללי או ילדים)", "מרכז לבריאות הנפש", "גריאטריה ואשפוז ממושך", "בית הלוחם או שיקום נכי צה\"ל", "חברת הייטק", "משרד אדריכלים או ניהול פרויקטים", "חינוך מוסיקלי", "אחר"];
