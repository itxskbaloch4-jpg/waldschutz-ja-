"use client";

import { useState, FormEvent } from "react";

export default function AdminNewsPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    const payload = {
      slug: form.get("slug"),
      locale: form.get("locale"),
      title: form.get("title"),
      excerpt: form.get("excerpt"),
      body: form.get("body"),
      coverImage: form.get("coverImage"),
    };

    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": form.get("adminToken") as string,
        },
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
    <main className="container-page max-w-2xl py-16">
      <h1 className="text-2xl font-bold text-forest">Admin — News hinzufügen</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input name="adminToken" type="password" required placeholder="Admin Token" className="input-field" />
        <select name="locale" required className="input-field">
          <option value="de">DE</option>
          <option value="en">EN</option>
          <option value="fr">FR</option>
        </select>
        <input name="slug" required placeholder="slug-beispiel" className="input-field" />
        <input name="title" required placeholder="Titel" className="input-field" />
        <input name="excerpt" placeholder="Kurzbeschreibung" className="input-field" />
        <input name="coverImage" placeholder="Bild-URL" className="input-field" />
        <textarea name="body" required placeholder="Inhalt (HTML)" rows={8} className="input-field" />
        <button type="submit" disabled={status === "loading"} className="btn-primary">
          {status === "loading" ? "…" : "Veröffentlichen"}
        </button>
        {status === "success" && <p className="text-sm text-forest">Gespeichert.</p>}
        {status === "error" && <p className="text-sm text-federal">Fehler.</p>}
      </form>
    </main>
  );
}
