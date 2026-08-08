-- Execute todo este arquivo no SQL Editor do Supabase uma única vez.
create extension if not exists pgcrypto;

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists(select 1 from public.admins where user_id = auth.uid());
$$;

grant execute on function public.is_admin() to anon, authenticated;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  type text not null,
  title text not null,
  subtitle text,
  place text not null,
  images text[] not null default '{}',
  position text not null default 'center center',
  summary text not null,
  text text not null,
  published boolean not null default true,
  featured boolean not null default false,
  in_progress boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;

drop policy if exists "Projetos publicados são públicos" on public.projects;
create policy "Projetos publicados são públicos" on public.projects
for select using (published = true or public.is_admin());

drop policy if exists "Administradora cadastra projetos" on public.projects;
create policy "Administradora cadastra projetos" on public.projects
for insert to authenticated with check (public.is_admin());

drop policy if exists "Administradora atualiza projetos" on public.projects;
create policy "Administradora atualiza projetos" on public.projects
for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Administradora exclui projetos" on public.projects;
create policy "Administradora exclui projetos" on public.projects
for delete to authenticated using (public.is_admin());

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at before update on public.projects
for each row execute function public.set_updated_at();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'project-images',
  'project-images',
  true,
  1572864,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Imagens de projetos são públicas" on storage.objects;
create policy "Imagens de projetos são públicas" on storage.objects
for select using (bucket_id = 'project-images');

drop policy if exists "Administradora envia imagens" on storage.objects;
create policy "Administradora envia imagens" on storage.objects
for insert to authenticated with check (bucket_id = 'project-images' and public.is_admin());

drop policy if exists "Administradora atualiza imagens" on storage.objects;
create policy "Administradora atualiza imagens" on storage.objects
for update to authenticated using (bucket_id = 'project-images' and public.is_admin());

drop policy if exists "Administradora exclui imagens" on storage.objects;
create policy "Administradora exclui imagens" on storage.objects
for delete to authenticated using (bucket_id = 'project-images' and public.is_admin());

insert into public.projects
  (slug, type, title, subtitle, place, images, position, summary, text, published, featured, in_progress, sort_order)
values
  ('gll-topografia', 'Comercial', 'GLL Topografia', 'Identidade visual e espaço de trabalho', 'Nova Friburgo · 2025', array['/images/gll-1.jpeg','/images/gll-2.jpeg','/images/gll-3.jpeg'], 'left center', 'Projeto de interiores comercial com foco em funcionalidade e identidade de marca.', 'Com atuação voltada à topografia e geotecnologias, a GLL desenvolve serviços que garantem segurança e precisão para todas as etapas de um empreendimento, desde o levantamento inicial até o acompanhamento da execução da obra.', true, true, false, 10),
  ('projeto-5-igreja-batista-nf', 'Comercial', 'Projeto 5° Igreja Batista NF', null, 'Nova Friburgo · 2026', array['/images/igreja-1.jpeg','/images/igreja-2.jpeg','/images/igreja-3.jpeg','/images/igreja-4.jpeg','/images/igreja-5.jpeg','/images/igreja-6.jpeg','/images/igreja-7.jpeg'], 'center center', 'Fachada que integra arquitetura contemporânea à paisagem natural da região.', 'Projeto de fachada que integra elementos naturais e contemporâneos, valorizando a paisagem local.', true, false, false, 20),
  ('quarto-infantil', 'Interiores', 'Quarto Infantil', null, 'Nova Friburgo · 2026', array['/images/quarto-infantil-1.jpeg','/images/quarto-infantil-2.jpeg'], 'center center', 'Ambiente infantil acolhedor, funcional e pensado para acompanhar diferentes fases.', 'Projeto de interiores que combina organização, conforto e identidade em um espaço infantil.', true, false, false, 30),
  ('md-contabilidade', 'Comercial', 'MD Contabilidade', null, 'Nova Friburgo · 2026', array['/images/escritorio-contabilidade-1.jpeg','/images/escritorio-contabilidade-2.jpeg','/images/escritorio-contabilidade-3.jpeg','/images/escritorio-contabilidade-4.jpeg','/images/escritorio-contabilidade-5.jpeg','/images/escritorio-contabilidade-6.jpeg'], 'center center', 'Escritório contemporâneo que alia produtividade, conforto e presença profissional.', 'Projeto comercial desenvolvido para comunicar confiança e organizar os diferentes fluxos de trabalho.', true, false, false, 40),
  ('studio-edificio-redondo', 'Interiores', 'Studio Edifício Redondo', null, 'Nova Friburgo · 2026', array['/images/edificio-redondo-1.jpeg','/images/edificio-redondo-2.jpeg','/images/edificio-redondo-3.jpeg','/images/edificio-redondo-4.jpeg','/images/edificio-redondo-5.jpeg','/images/edificio-redondo-6.jpeg','/images/edificio-redondo-7.jpeg','/images/edificio-redondo-8.jpeg','/images/edificio-redondo-9.jpeg','/images/edificio-redondo-10.jpeg'], 'center center', 'Um studio compacto com integração, leveza e aproveitamento inteligente do espaço.', 'Interiores concebidos para ampliar a percepção do ambiente e equilibrar as diferentes funções do morar.', true, false, false, 50),
  ('casa-rb', 'Interiores', 'Casa R/B', null, 'Nova Friburgo · 2026', array['/images/casa-rb-1.jpeg','/images/casa-rb-2.jpeg','/images/casa-rb-3.jpeg','/images/casa-rb-4.jpeg','/images/casa-rb-5.jpeg','/images/casa-rb-6.jpeg'], 'center center', 'Interiores de linguagem natural e acolhedora para uma casa cheia de personalidade.', 'Projeto residencial que valoriza materiais, iluminação e continuidade entre os ambientes.', true, false, false, 60),
  ('casa-cl', 'Interiores', 'Casa C/L', null, 'Nova Friburgo · 2026', array['/images/casa-cl-1.jpeg','/images/casa-cl-2.jpeg','/images/casa-cl-3.jpeg','/images/casa-cl-4.jpeg','/images/casa-cl-5.jpeg','/images/casa-cl-6.jpeg','/images/casa-cl-7.jpeg','/images/casa-cl-8.jpeg','/images/casa-cl-9.jpeg','/images/casa-cl-10.jpeg','/images/casa-cl-11.jpeg','/images/casa-cl-12.jpeg','/images/casa-cl-13.jpeg'], 'center center', 'Espaços integrados, materiais atemporais e uma atmosfera que convida a permanecer.', 'Projeto de interiores residencial desenvolvido a partir da rotina e da identidade dos moradores.', true, false, false, 70),
  ('marca-nb', 'Design', 'Marca NB', 'Identidade visual', 'Nova Friburgo · 2026', array['/images/design-cartao.jpeg'], 'center center', 'Uma identidade elegante e atemporal para traduzir arquitetura e interiores.', 'Desenvolvimento da identidade visual NB, do conceito às aplicações da marca.', true, false, false, 80),
  ('colecao-essencial', 'Design', 'Coleção Essencial', 'Design de produto', 'Nova Friburgo · 2026', array['/images/design-caneca.png'], 'center center', 'Aplicações que prolongam a linguagem da marca em objetos cotidianos.', 'Coleção de objetos desenvolvida para levar a identidade NB a diferentes pontos de contato.', true, false, false, 90),
  ('lofts-cabo-frio', 'Em andamento', 'Lofts Cabo Frio', 'Um novo capítulo', 'Cabo Frio · 2026', array['/images/loft-2.png','/images/loft-1.jpeg'], 'center center', 'Projeto em desenvolvimento que une inovação, conforto e sustentabilidade.', 'Acompanhe as novidades e cada etapa deste projeto em nossas redes sociais.', true, false, true, 100)
on conflict (slug) do nothing;

-- Depois de criar a usuária em Authentication > Users, substitua o e-mail abaixo.
-- Esta instrução pode ser executada separadamente.
insert into public.admins (user_id)
select id from auth.users where email = 'EMAIL_DA_NATASHA'
on conflict (user_id) do nothing;
