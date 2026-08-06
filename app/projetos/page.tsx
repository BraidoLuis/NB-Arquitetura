import { PageShell } from "../components";
import { projects } from "../data";

export default function Projetos() {
  return (
    <PageShell>
      <section className="page-intro">
        <p className="eyebrow">02 · Portfólio</p>
        <div>
          <h1>
            Projetos que<em>permanecem.</em>
          </h1>
          <p>
            Uma seleção de trabalhos residenciais e comerciais desenvolvidos com atenção ao contexto, à matéria e às pessoas.
          </p>
        </div>
      </section>

      <section className="projects-list">
        {projects.map((p, i) => (
          <article className="project-card" key={p.slug}>
            <span>0{i + 1}</span>
            <img
              src={p.image}
              style={{ objectPosition: p.position }}
              alt={p.title}
            />
            <div>
              <small>{p.type} · {p.place}</small>
              <h2>{p.title}</h2>
              <p>{p.text}</p>
              <a className="text-link" href="#">
                Ver projeto <span>↗</span>
              </a>
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}