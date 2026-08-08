import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

const baseUrl = "https://nb-arquitetura.vercel.app";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/sobre`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/interiores`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/comercial`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/externos`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/design`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contato`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return staticPages;
  }

  const supabase = createClient(
    supabaseUrl,
    supabaseKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );

  const { data: projects, error } = await supabase
    .from("projects")
    .select("slug")
    .eq("published", true);

  if (error || !projects) {
    return staticPages;
  }

  const projectPages: MetadataRoute.Sitemap =
    projects.map((project) => ({
      url: `${baseUrl}/projetos/${project.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [...staticPages, ...projectPages];
}