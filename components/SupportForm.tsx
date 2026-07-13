"use client";

import { useState, FormEvent } from "react";
import { useTranslations, useLocale } from "next-intl";

export default function SupportForm() {
  const t = useTranslations("support");
  const locale = useLocale();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      firstName: form.get("firstName"),
      role: form.get("role"),
      organisation: form.get("organisation"),
      email: form.get("email"),
      address: form.get("address"),
      zip: form.get("zip"),
      city: form.get("city"),
      canton: form.get("canton"),
      remarks: form.get("remarks"),
      wantsPaymentSlip: form.get("wantsPaymentSlip") === "on",
      wantsCommittee: form.get("wantsCommittee") === "on",
      wantsNewsletter: form.get("wantsNewsletter") === "on",
    };

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-line bg-white p-6 sm:p-8" noValidate>
      <h3 className="text-xl font-bold text-forest">{t("formTitle")}</h3>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder={t("name")} className="input-field" aria-label={t("name")} />
        <input name="firstName" required placeholder={t("firstName")} className="input-field" aria-label={t("firstName")} />
        <input name="role" placeholder={t("role")} className="input-field" aria-label={t("role")} />
        <input name="organisation" placeholder={t("organisation")} className="input-field" aria-label={t("organisation")} />
        <input name="email" type="email" required placeholder={t("email")} className="input-field sm:col-span-2" aria-label={t("email")} />
        <input name="address" required placeholder={t("address")} className="input-field sm:col-span-2" aria-label={t("address")} />
        <input name="zip" required placeholder={t("zip")} className="input-field" aria-label={t("zip")} />
        <input name="city" required placeholder={t("city")} className="input-field" aria-label={t("city")} />
        <input name="canton" required placeholder={t("canton")} className="input-field" aria-label={t("canton")} />
        <textarea name="remarks" placeholder={t("remarks")} className="input-field sm:col-span-2" rows={3} aria-label={t("remarks")} />
      </div>

      <div className="mt-4 space-y-3">
        <label className="flex items-start gap-2 text-sm text-ink/80">
          <input type="checkbox" name="wantsPaymentSlip" className="mt-1" />
          {t("wantsPaymentSlip")}
        </label>
        <label className="flex items-start gap-2 text-sm text-ink/80">
          <input type="checkbox" name="wantsCommittee" className="mt-1" />
          {t("wantsCommittee")}
        </label>
        <label className="flex items-start gap-2 text-sm text-ink/80">
          <input type="checkbox" name="wantsNewsletter" className="mt-1" />
          {t("wantsNewsletter")}
        </label>
      </div>

      <button type="submit" disabled={status === "loading"} className="btn-primary mt-6 w-full sm:w-auto">
        {status === "loading" ? "…" : t("submit")}
      </button>

      {status === "success" && <p className="mt-4 text-sm font-medium text-forest">{t("success")}</p>}
      {status === "error" && <p className="mt-4 text-sm font-medium text-federal">{t("error")}</p>}
    </form>
  );
}
