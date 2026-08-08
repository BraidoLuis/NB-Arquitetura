import { projects as localProjects } from "@/app/data";
import type { Project } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";

function normalize(project: Project): Project {
  return { ...project, images: project.images ?? [] };
}

export async function getProjects(options?: {
  type?: string;
  includeDrafts?: boolean;
}): Promise<Project[]> {
  const supabase = await createClient();

  if (!supabase) {
    return localProjects
      .filter((project) =>
        options?.type
          ? project.type.toLowerCase().includes(options.type.toLowerCase())
          : true
      )
      .map(normalize);
  }

  let query = supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (!options?.includeDrafts) query = query.eq("published", true);
  if (options?.type) query = query.ilike("type", `%${options.type}%`);

  const { data, error } = await query;

  if (error) {
    console.error("Erro ao carregar projetos:", error.message);
    return localProjects
      .filter((project) =>
        options?.type
          ? project.type.toLowerCase().includes(options.type.toLowerCase())
          : true
      )
      .map(normalize);
  }

  return (data as Project[]).map(normalize);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await createClient();

  if (!supabase) {
    return localProjects.find((project) => project.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) console.error("Erro ao carregar projeto:", error.message);
  return (data as Project | null) ??
    localProjects.find((project) => project.slug === slug) ??
    null;
}

export async function getHomeProjects() {
  const all = await getProjects();
  return {
    featured: all.find((project) => project.featured) ?? all[0] ?? null,
    inProgress: all.find((project) => project.in_progress) ?? null,
  };
}
