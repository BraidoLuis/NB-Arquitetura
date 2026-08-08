import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "gll-topografia",
    type: "Comercial",
    title: "GLL Topografia",
    subtitle: "Identidade visual e espaço de trabalho",
    place: "Nova Friburgo · 2025",
    images: [
      "/images/gll-1.jpeg",
      "/images/gll-2.jpeg",
      "/images/gll-3.jpeg",
    ],
    position: "left center",
    summary: "Projeto de interiores comercial com foco em funcionalidade e identidade de marca.",
    text: "Com atuação voltada à topografia e geotecnologias, a GLL desenvolve serviços que garantem segurança e precisão para todas as etapas de um empreendimento, desde o levantamento inicial até o acompanhamento da execução da obra.",
    featured: true,
    sort_order: 10,
  },
  {
    slug: "projeto-5-igreja-batista-nf",
    type: "Comercial",
    title: "Projeto 5° Igreja Batista NF",
    place: "Nova Friburgo · 2026",
    images: [
      "/images/igreja-1.jpeg",
      "/images/igreja-2.jpeg",
      "/images/igreja-3.jpeg",
      "/images/igreja-4.jpeg",
      "/images/igreja-5.jpeg",
      "/images/igreja-6.jpeg",
      "/images/igreja-7.jpeg"
    ],
    position: "center center",
    summary: "Fachada que integra arquitetura contemporânea à paisagem natural da região.",
    text: "Projeto de fachada que integra elementos naturais e contemporâneos, valorizando a paisagem local."
  },
  {
    slug: "quarto-infantil",
    type: "Interiores",
    title: "Quarto Infantil",
    place: "Nova Friburgo · 2026",
    images: [
      "/images/quarto-infantil-1.jpeg",
      "/images/quarto-infantil-2.jpeg"
    ],
    position: "center center",
    summary: "Fachada que integra arquitetura contemporânea à paisagem natural da região.",
    text: "Projeto de fachada que integra elementos naturais e contemporâneos, valorizando a paisagem local."
  },
  {
    slug: "md-contabilidade",
    type: "Comercial",
    title: "MD Contabilidade",
    place: "Nova Friburgo · 2026",
    images: [
      "/images/escritorio-contabilidade-1.jpeg",
      "/images/escritorio-contabilidade-2.jpeg",
      "/images/escritorio-contabilidade-3.jpeg",
      "/images/escritorio-contabilidade-4.jpeg",
      "/images/escritorio-contabilidade-5.jpeg",
      "/images/escritorio-contabilidade-6.jpeg"
    ],
    position: "center center",
    summary: "Fachada que integra arquitetura contemporânea à paisagem natural da região.",
    text: "Projeto de fachada que integra elementos naturais e contemporâneos, valorizando a paisagem local."
  },
  {
    slug: "studio-edificio-redondo",
    type: "Interiores",
    title: "Studio Edificio Redondo",
    place: "Nova Friburgo · 2026",
    images: [
      "/images/edificio-redondo-1.jpeg",
      "/images/edificio-redondo-2.jpeg",
      "/images/edificio-redondo-3.jpeg",
      "/images/edificio-redondo-4.jpeg",
      "/images/edificio-redondo-5.jpeg",
      "/images/edificio-redondo-6.jpeg",
      "/images/edificio-redondo-7.jpeg",
      "/images/edificio-redondo-8.jpeg",
      "/images/edificio-redondo-9.jpeg",
      "/images/edificio-redondo-10.jpeg"
    ],
    position: "center center",
    summary: "Fachada que integra arquitetura contemporânea à paisagem natural da região.",
    text: "Projeto de fachada que integra elementos naturais e contemporâneos, valorizando a paisagem local."
  },
  {
    slug: "casa-rb",
    type: "Interiores",
    title: "Casa R/B",
    place: "Nova Friburgo · 2026",
    images: [
      "/images/casa-rb-1.jpeg",
      "/images/casa-rb-2.jpeg",
      "/images/casa-rb-3.jpeg",
      "/images/casa-rb-4.jpeg",
      "/images/casa-rb-5.jpeg",
      "/images/casa-rb-6.jpeg"
    ],
    position: "center center",
    summary: "Fachada que integra arquitetura contemporânea à paisagem natural da região.",
    text: "Projeto de fachada que integra elementos naturais e contemporâneos, valorizando a paisagem local."
  },
  {
    slug: "casa-cl",
    type: "Interiores",
    title: "Casa C/L",
    place: "Nova Friburgo · 2026",
    images: [
      "/images/casa-cl-1.jpeg",
      "/images/casa-cl-2.jpeg",
      "/images/casa-cl-3.jpeg",
      "/images/casa-cl-4.jpeg",
      "/images/casa-cl-5.jpeg",
      "/images/casa-cl-6.jpeg",
      "/images/casa-cl-7.jpeg",
      "/images/casa-cl-8.jpeg",
      "/images/casa-cl-9.jpeg",
      "/images/casa-cl-10.jpeg",
      "/images/casa-cl-11.jpeg",
      "/images/casa-cl-12.jpeg",
      "/images/casa-cl-13.jpeg",
    ],
    position: "center center",
    summary: "Fachada que integra arquitetura contemporânea à paisagem natural da região.",
    text: "Projeto de fachada que integra elementos naturais e contemporâneos, valorizando a paisagem local."
  },
  {
    slug: "lofts-cabo-frio",
    type: "Em andamento",
    title: "Lofts Cabo Frio",
    subtitle: "Um novo capítulo",
    place: "Cabo Frio · 2026",
    images: ["/images/loft-2.png", "/images/loft-1.jpeg"],
    position: "center center",
    summary: "Projeto em desenvolvimento que une inovação, conforto e sustentabilidade.",
    text: "Acompanhe as novidades e cada etapa deste projeto em nossas redes sociais.",
    in_progress: true,
    sort_order: 100,
  },
  {
    slug: "marca-nb",
    type: "Design",
    title: "Marca NB",
    subtitle: "Identidade visual",
    place: "Nova Friburgo · 2026",
    images: ["/images/design-cartao.jpeg"],
    position: "center center",
    summary: "Uma identidade elegante e atemporal para traduzir arquitetura e interiores.",
    text: "Desenvolvimento da identidade visual NB, do conceito às aplicações da marca.",
  },
  {
    slug: "colecao-essencial",
    type: "Design",
    title: "Coleção Essencial",
    subtitle: "Design de produto",
    place: "Nova Friburgo · 2026",
    images: ["/images/design-caneca.png"],
    position: "center center",
    summary: "Aplicações que prolongam a linguagem da marca em objetos cotidianos.",
    text: "Coleção de objetos desenvolvida para levar a identidade NB a diferentes pontos de contato.",
  }
];
