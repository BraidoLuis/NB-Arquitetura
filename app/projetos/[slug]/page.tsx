import { notFound } from "next/navigation";
import { PageShell } from "../../components";
import { projects } from "../../data";
import ProjectDetailClient from "./ProjectDetailClient";
import BackButton from "./BackButton"; 

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const { images, title, subtitle, text, type } = project;

  return (
    <PageShell>
      <div style={{ padding: "130px 5vw 0" }}>
        <BackButton />
      </div>
      <ProjectDetailClient
        images={images}
        title={title}
        subtitle={subtitle}
        text={text}
        type={type}
      />
    </PageShell>
  );
}