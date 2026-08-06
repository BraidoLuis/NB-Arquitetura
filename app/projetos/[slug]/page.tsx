import { notFound } from "next/navigation";
import { PageShell } from "../../components";
import { projects } from "../../data";

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const { images, title, subtitle, text, type } = project;
  const imageCount = images?.length || 0;
  const hasFive = imageCount === 5;

  return (
    <PageShell>
      <div className="project-detail">
        <div className="project-gallery">
          {hasFive && (
            <div className="hero-image">
              <img src={images[0]} alt={title} />
            </div>
          )}
          <div className={`gallery-grid ${hasFive ? "four" : "four"}`}>
            {hasFive
              ? images.slice(1).map((src, idx) => (
                  <img key={idx} src={src} alt={`${title} - imagem ${idx + 2}`} />
                ))
              : images.map((src, idx) => (
                  <img key={idx} src={src} alt={`${title} - imagem ${idx + 1}`} />
                ))}
          </div>
        </div>
        <aside className="project-info">
          <p className="eyebrow">{type}</p>
          <h1 className="project-title">{title}</h1>
          {subtitle && <h2 className="project-subtitle">{subtitle}</h2>}
          <p className="project-text">{text}</p>
        </aside>
      </div>
    </PageShell>
  );
}