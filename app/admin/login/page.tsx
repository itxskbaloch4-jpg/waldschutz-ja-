"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: form.get("password") }),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Falsches Passwort.");
    }
  }

  return (
    <main className="mx-auto flex max-w-sm flex-col justify-center py-32">
      <h1 className="text-xl font-bold text-forest">Admin Login</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="password"
          name="password"
          required
          placeholder="Passwort"
          className="input-field"
          autoFocus
        />
        <button type="submit" className="btn-primary w-full">Anmelden</button>
        {error && <p className="text-sm text-federal">{error}</p>}
      </form>
    </main>
  );
}
