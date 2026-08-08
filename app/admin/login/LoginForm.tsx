"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm({ configurationMissing = false }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) throw signInError;
      router.replace("/admin");
      router.refresh();
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "Não foi possível entrar. Verifique os dados."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <Link href="/" className="admin-logo">NB</Link>
        <p className="eyebrow">Área restrita</p>
        <h1>Painel de projetos</h1>
        <p>Entre com o acesso administrativo para atualizar o portfólio.</p>

        {configurationMissing ? (
          <div className="admin-alert error">
            Configure o arquivo <code>.env.local</code> antes de acessar o painel.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="admin-form">
            <label>E-mail<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
            <label>Senha<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
            {error && <div className="admin-alert error">{error}</div>}
            <button type="submit" disabled={loading}>{loading ? "Entrando..." : "Entrar"}</button>
          </form>
        )}
        <Link href="/" className="admin-back">← Voltar ao site</Link>
      </section>
    </main>
  );
}
