import { PageShell } from "../components";
import { projects } from "../data";
import Link from "next/link";

export default function Comercial() {
  const projetosComerciais = projects.filter(
    p => p.type.toLowerCase().includes("comercial")
  );

  return (
    <PageShell>
      <section className="page-intro">
        <p className="eyebrow">03 · Comercial</p>
        <div>
          <h1>Comercial para<em>conectar.</em></h1>
          <p>
            Criamos espaços comerciais que unem funcionalidade, identidade de marca e experiência do usuário.
          </p>
        </div>
      </section>

      <section className="projects-list">
        {projetosComerciais.map((p, i) => (
          <article className="project-card" key={p.slug}>
            <span>0{i + 1}</span>
            <img
              src={p.images[0]}
              style={{ objectPosition: p.position }} 
              alt={p.title}
            />
            <div>
              <small>Comercial · {p.place}</small>
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