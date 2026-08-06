import { PageShell } from "../components";
import { projects } from "../data";
import Link from "next/link";

export default function Interiores() {
  return (
    <PageShell>
      <div style={{ padding: "130px 5vw 0" }}>
        <Link href="/" className="text-link">
          ← Voltar ao início
        </Link>
      </div>
      <section className="page-intro">
        <p className="eyebrow">02 · Interiores</p>
        <div>
          <h1>
            Interiores que<em>encantam.</em>
          </h1>
          <p>
            Ambientes pensados para acolher, inspirar e traduzir a essência de quem vive cada espaço.
          </p>
        </div>
      </section>

      <section className="projects-list">
        {projects
          .filter((p) => p.type.toLowerCase().includes("interiores"))
          .map((p, i) => (
            <article className="project-card" key={p.slug}>
              <span>0{i + 1}</span>
              <img
                src={p.images[0]}
                style={{ objectPosition: p.position }}
                alt={p.title}
              />
              <div>
                <small>Interiores · {p.place}</small>
                <h2>{p.title}</h2>
                <p>{p.summary}</p>
                <Link className="text-link" href={`/projetos/${p.slug}`}>
                  Ver projeto <span>↗</span>
                </Link>
              </div>
            </article>
          ))}
      </section>
    </PageShell>
  );
}