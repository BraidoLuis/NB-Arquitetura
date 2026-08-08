import { notFound } from "next/navigation";
import { PageShell } from "../../components";
import { getProjectBySlug } from "@/lib/projects";
import ProjectDetailClient from "./ProjectDetailClient";
import BackButton from "./BackButton"; 

export const revalidate = 60;

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
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
        subtitle={subtitle ?? undefined}
        text={text}
        type={type}
      />
    </PageShell>
  );
}
