"use client";

import { useState, FormEvent } from "react";
import { useTranslations, useLocale } from "next-intl";

export default function NewsletterForm() {
  const t = useTranslations("newsletter");
  const locale = useLocale();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    const payload = {
      firstName: form.get("firstName"),
      lastName: form.get("lastName"),
      email: form.get("email"),
      locale,
    };

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.status === 409) {
        setStatus("duplicate");
        return;
      }
      if (!res.ok) throw new Error();
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-line bg-white p-6" noValidate>
      <h3 className="text-lg font-bold text-forest">{t("title")}</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <input name="firstName" required placeholder="Vorname" className="input-field" aria-label="Vorname" />
        <input name="lastName" required placeholder="Nachname" className="input-field" aria-label="Nachname" />
        <input name="email" type="email" required placeholder="E-Mail" className="input-field" aria-label="E-Mail" />
      </div>
      <button type="submit" disabled={status === "loading"} className="btn-secondary mt-4 w-full sm:w-auto">
        {status === "loading" ? "…" : t("submit")}
      </button>
      {status === "success" && <p className="mt-3 text-sm font-medium text-forest">{t("success")}</p>}
      {status === "duplicate" && <p className="mt-3 text-sm font-medium text-federal">{t("alreadySubscribed")}</p>}
      {status === "error" && <p className="mt-3 text-sm font-medium text-federal">{t("error")}</p>}
    </form>
  );
}
