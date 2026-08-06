import { PageShell } from "../components";
import { projects } from "../data";
import Link from "next/link";

export default function Externos() {
  return (
    <PageShell>
      <section className="page-intro">
        <p className="eyebrow">04 · Externos</p>
        <div>
          <h1>
            Externos que<em>integram paisagem.</em>
          </h1>
          <p>
            Projetos que conectam arquitetura e natureza, valorizando o entorno e criando espaços ao ar livre com identidade.
          </p>
        </div>
      </section>

      <section className="projects-list">
        {projects
          .filter((p) => p.type.toLowerCase().includes("externo"))
          .map((p, i) => (
            <article className="project-card" key={p.slug}>
              <span>0{i + 1}</span>
              <img
                src={p.images[0]}
                style={{ objectPosition: p.position }}
                alt={p.title}
              />
              <div>
                <small>Externos · {p.place}</small>
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