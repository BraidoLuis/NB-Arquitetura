import { PageShell } from "../components";
import Link from "next/link";

export default function Design() {
  return (
    <PageShell>
      <div style={{ padding: "130px 5vw 0" }}>
        <Link href="/" className="text-link">
          ← Voltar ao início
        </Link>
      </div>
      <section className="page-intro">
        <p className="eyebrow">05 · Design</p>
        <div>
          <h1>
            Detalhes que criam<em>identidade.</em>
          </h1>
          <p>
            Do objeto à linguagem visual, o design completa a narrativa e transforma cada ponto de contato em experiência.
          </p>
        </div>
      </section>

      <section className="content-section design-grid">
        <article className="design-card">
          <img
            src="/images/design-cartao.jpeg"
            alt="Caderno com identidade visual NB"
          />
          <div>
            <p className="eyebrow">Identidade visual · 2026</p>
            <h2>Marca NB</h2>
          </div>
        </article>

        <article className="design-card">
          <img
            src="/images/design-caneca.png"
            alt="Caneca com identidade visual NB"
          />
          <div>
            <p className="eyebrow">Design de produto · 2026</p>
            <h2>Coleção Essencial</h2>
          </div>
        </article>
      </section>
    </PageShell>
  );
}