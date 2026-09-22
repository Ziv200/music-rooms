"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { type Lang, translations, type Translations } from "@/lib/translations";

interface LangContextType {
  lang: Lang;
  t: Translations;
  dir: "ltr" | "rtl";
  toggleLang: () => void;
}

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("he");

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "en" ? "he" : "en"));
  }, []);

  const t = translations[lang];
  const dir = t.dir;

  return (
    <LangContext.Provider value={{ lang, t, dir, toggleLang }}>
      <div dir={dir} lang={lang} className="contents">
        {children}
      </div>
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) throw new Error("useLang must be used within LangProvider");
  return context;
}
