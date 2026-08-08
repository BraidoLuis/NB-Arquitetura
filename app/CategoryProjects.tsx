import Link from "next/link";
import { PageShell } from "./components";
import { getProjects } from "@/lib/projects";

type Props = {
  type: string;
  number: string;
  title: React.ReactNode;
  description: string;
};

export default async function CategoryProjects({
  type,
  number,
  title,
  description,
}: Props) {
  const projects = await getProjects({ type });

  return (
    <PageShell>
      <div style={{ padding: "130px 5vw 0" }}>
        <Link href="/" className="text-link">← Voltar ao início</Link>
      </div>
      <section className="page-intro">
        <p className="eyebrow">{number} · {type}</p>
        <div><h1>{title}</h1><p>{description}</p></div>
      </section>
      <section className="projects-list">
        {projects.map((project, index) => (
          <article className="project-card" key={project.slug}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <img
              src={project.images[0]}
              style={{ objectPosition: project.position }}
              alt={project.title}
              loading="lazy"
            />
            <div>
              <small>{project.type} · {project.place}</small>
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
              <Link className="text-link" href={`/projetos/${project.slug}`}>
                Ver projeto <span>↗</span>
              </Link>
            </div>
          </article>
        ))}
        {projects.length === 0 && (
          <p className="empty-projects">Nenhum projeto publicado nesta categoria.</p>
        )}
      </section>
    </PageShell>
  );
}
