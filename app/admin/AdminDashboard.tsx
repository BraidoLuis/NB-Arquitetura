"use client";

import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Project } from "@/lib/types";

const MAX_FILE_SIZE = 1.5 * 1024 * 1024;
const EMPTY_PROJECT: Project = {
  slug: "",
  type: "Interiores",
  title: "",
  subtitle: "",
  place: "Nova Friburgo · 2026",
  images: [],
  position: "center center",
  summary: "",
  text: "",
  published: true,
  featured: false,
  in_progress: false,
  sort_order: 0,
};

function slugify(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function storagePathFromUrl(url: string) {
  const marker = "/storage/v1/object/public/project-images/";
  return url.includes(marker) ? decodeURIComponent(url.split(marker)[1]) : null;
}

export default function AdminDashboard({ userEmail }: { userEmail: string }) {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<Project>(EMPTY_PROJECT);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase.from("projects").select("*")
      .order("sort_order", { ascending: true }).order("created_at", { ascending: false });
    if (error) setMessage({ type: "error", text: error.message });
    else setProjects((data as Project[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    let active = true;
    const supabase = createClient();
    void supabase.from("projects").select("*")
      .order("sort_order", { ascending: true }).order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!active) return;
        if (error) setMessage({ type: "error", text: error.message });
        else setProjects((data as Project[]) ?? []);
        setLoading(false);
      });
    return () => { active = false; };
  }, []);

  function startNew() {
    setEditing(null);
    setForm({ ...EMPTY_PROJECT, images: [] });
    setRemovedImages([]);
    setMessage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startEdit(project: Project) {
    setEditing(project);
    setForm({ ...project, images: [...project.images] });
    setRemovedImages([]);
    setMessage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function change<K extends keyof Project>(key: K, value: Project[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function uploadImages(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (!files.length) return;

    const invalid = files.find((file) => !file.type.startsWith("image/") || file.size > MAX_FILE_SIZE);
    if (invalid) {
      setMessage({
        type: "error",
        text: !invalid.type.startsWith("image/")
          ? `${invalid.name} não é uma imagem válida.`
          : `${invalid.name} ultrapassa o limite de 1,5 MB. Comprima a imagem antes de enviar.`,
      });
      return;
    }

    setUploading(true);
    setMessage(null);
    const supabase = createClient();
    const newUrls: string[] = [];

    try {
      for (const file of files) {
        const extension = file.name.split(".").pop()?.toLowerCase() || "webp";
        const folder = form.slug || slugify(form.title) || "projeto";
        const path = `${folder}/${crypto.randomUUID()}.${extension}`;
        const { error } = await supabase.storage.from("project-images").upload(path, file, {
          cacheControl: "31536000",
          contentType: file.type,
          upsert: false,
        });
        if (error) throw error;
        newUrls.push(supabase.storage.from("project-images").getPublicUrl(path).data.publicUrl);
      }
      setForm((current) => ({ ...current, images: [...current.images, ...newUrls] }));
      setMessage({ type: "success", text: `${newUrls.length} imagem(ns) enviada(s). Salve o projeto para concluir.` });
    } catch (uploadError) {
      const uploadedPaths = newUrls.map(storagePathFromUrl).filter((path): path is string => Boolean(path));
      if (uploadedPaths.length) await supabase.storage.from("project-images").remove(uploadedPaths);
      setMessage({ type: "error", text: uploadError instanceof Error ? uploadError.message : "Falha no upload." });
    } finally {
      setUploading(false);
    }
  }

  function removeImage(index: number) {
    const url = form.images[index];
    if (storagePathFromUrl(url)) setRemovedImages((current) => [...current, url]);
    setForm((current) => ({ ...current, images: current.images.filter((_, imageIndex) => imageIndex !== index) }));
  }

  function moveImage(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= form.images.length) return;
    const images = [...form.images];
    [images[index], images[target]] = [images[target], images[index]];
    change("images", images);
  }

  async function saveProject(event: FormEvent) {
    event.preventDefault();
    setMessage(null);
    if (!form.images.length) {
      setMessage({ type: "error", text: "Adicione pelo menos uma imagem ao projeto." });
      return;
    }

    setSaving(true);
    const supabase = createClient();
    const payload = {
      slug: slugify(form.slug || form.title), type: form.type.trim(), title: form.title.trim(),
      subtitle: form.subtitle?.trim() || null, place: form.place.trim(), images: form.images,
      position: form.position, summary: form.summary.trim(), text: form.text.trim(),
      published: Boolean(form.published), featured: Boolean(form.featured),
      in_progress: Boolean(form.in_progress), sort_order: Number(form.sort_order) || 0,
    };

    try {
      if (payload.featured) {
        const { error } = await supabase.from("projects").update({ featured: false }).eq("featured", true);
        if (error) throw error;
      }
      if (payload.in_progress) {
        const { error } = await supabase.from("projects").update({ in_progress: false }).eq("in_progress", true);
        if (error) throw error;
      }

      const result = editing?.id
        ? await supabase.from("projects").update(payload).eq("id", editing.id).select().single()
        : await supabase.from("projects").insert(payload).select().single();
      if (result.error) throw result.error;

      const paths = removedImages.map(storagePathFromUrl).filter((path): path is string => Boolean(path));
      if (paths.length) await supabase.storage.from("project-images").remove(paths);

      setEditing(result.data as Project);
      setForm(result.data as Project);
      setRemovedImages([]);
      setMessage({ type: "success", text: "Projeto salvo. O site será atualizado em até 1 minuto." });
      await loadProjects();
      router.refresh();
    } catch (saveError) {
      setMessage({ type: "error", text: saveError instanceof Error ? saveError.message : "Não foi possível salvar." });
    } finally {
      setSaving(false);
    }
  }

  async function deleteProject(project: Project) {
    if (!project.id || !window.confirm(`Excluir permanentemente “${project.title}”?`)) return;
    const supabase = createClient();
    const { error } = await supabase.from("projects").delete().eq("id", project.id);
    if (error) return setMessage({ type: "error", text: error.message });
    const paths = project.images.map(storagePathFromUrl).filter((path): path is string => Boolean(path));
    if (paths.length) await supabase.storage.from("project-images").remove(paths);
    if (editing?.id === project.id) startNew();
    setMessage({ type: "success", text: "Projeto e imagens excluídos." });
    await loadProjects();
  }

  async function signOut() {
    await createClient().auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div><strong>NB</strong><span>Painel de projetos</span></div>
        <nav><Link href="/" target="_blank">Ver site ↗</Link><span>{userEmail}</span><button onClick={signOut}>Sair</button></nav>
      </header>
      <div className="admin-layout">
        <section className="admin-editor">
          <div className="admin-title-row"><div><p className="eyebrow">Editor</p><h1>{editing ? "Editar projeto" : "Novo projeto"}</h1></div><button className="secondary" onClick={startNew}>+ Novo</button></div>
          {message && <div className={`admin-alert ${message.type}`}>{message.text}</div>}
          <form onSubmit={saveProject} className="admin-project-form">
            <div className="admin-field-grid">
              <label>Título<input value={form.title} onChange={(e) => { change("title", e.target.value); if (!editing) change("slug", slugify(e.target.value)); }} required /></label>
              <label>Slug<input value={form.slug} onChange={(e) => change("slug", slugify(e.target.value))} required /></label>
              <label>Categoria<select value={form.type} onChange={(e) => change("type", e.target.value)}><option>Interiores</option><option>Comercial</option><option>Externos</option><option>Design</option><option>Em andamento</option></select></label>
              <label>Local e ano<input value={form.place} onChange={(e) => change("place", e.target.value)} required /></label>
              <label className="full">Subtítulo<input value={form.subtitle ?? ""} onChange={(e) => change("subtitle", e.target.value)} /></label>
              <label className="full">Resumo<textarea rows={3} value={form.summary} onChange={(e) => change("summary", e.target.value)} required /></label>
              <label className="full">Descrição completa<textarea rows={7} value={form.text} onChange={(e) => change("text", e.target.value)} required /></label>
              <label>Enquadramento da capa<select value={form.position} onChange={(e) => change("position", e.target.value)}><option value="center center">Centro</option><option value="left center">Esquerda</option><option value="right center">Direita</option><option value="center top">Topo</option><option value="center bottom">Base</option></select></label>
              <label>Ordem<input type="number" value={form.sort_order ?? 0} onChange={(e) => change("sort_order", Number(e.target.value))} /></label>
            </div>
            <fieldset className="admin-checks"><legend>Exibição</legend>
              <label><input type="checkbox" checked={form.published ?? true} onChange={(e) => change("published", e.target.checked)} /> Publicado</label>
              <label><input type="checkbox" checked={form.featured ?? false} onChange={(e) => change("featured", e.target.checked)} /> Destaque da Home</label>
              <label><input type="checkbox" checked={form.in_progress ?? false} onChange={(e) => change("in_progress", e.target.checked)} /> Em andamento na Home</label>
            </fieldset>
            <section className="admin-images">
              <div><h2>Imagens</h2><p>A primeira será a capa. WebP/JPG/PNG, no máximo 1,5 MB cada.</p></div>
              <label className={`upload-button ${uploading ? "disabled" : ""}`}>{uploading ? "Enviando..." : "+ Adicionar imagens"}<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple onChange={uploadImages} disabled={uploading} /></label>
              <div className="admin-image-list">
                {form.images.map((url, index) => <article key={`${url}-${index}`}>
                  <img src={url} alt={`Imagem ${index + 1}`} /><span>{index === 0 ? "Capa" : index + 1}</span>
                  <div><button type="button" onClick={() => moveImage(index, -1)} disabled={index === 0}>←</button><button type="button" onClick={() => moveImage(index, 1)} disabled={index === form.images.length - 1}>→</button><button type="button" className="danger" onClick={() => removeImage(index)}>Remover</button></div>
                </article>)}
              </div>
            </section>
            <button className="save-button" type="submit" disabled={saving || uploading}>{saving ? "Salvando..." : "Salvar projeto"}</button>
          </form>
        </section>
        <aside className="admin-project-list">
          <div><p className="eyebrow">Portfólio</p><h2>Projetos</h2><span>{projects.length} cadastrados</span></div>
          {loading ? <p>Carregando...</p> : projects.map((project) => <article key={project.id} className={editing?.id === project.id ? "active" : ""}>
            <img src={project.images[0]} alt="" /><div><small>{project.type}{!project.published && " · Rascunho"}</small><strong>{project.title}</strong><span>{project.featured && "Destaque · "}{project.in_progress && "Em andamento"}</span></div>
            <button onClick={() => startEdit(project)}>Editar</button><button className="danger" onClick={() => deleteProject(project)}>Excluir</button>
          </article>)}
        </aside>
      </div>
    </main>
  );
}
