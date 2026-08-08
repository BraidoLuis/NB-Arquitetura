import Link from "next/link";
import {
  Footer,
  Header,
  Reveal,
  HomeScrollController,
} from "./components";
import { getHomeProjects } from "@/lib/projects";

export const revalidate = 60;

const chapters = [
  {
    n: "01",
    title: "Interiores",
    desc: "Volumes, luz e matéria desenhados para pertencer ao lugar.",
    images: [
      "/images/interiores1.jpeg",
      "/images/interiores2.jpeg",
      "/images/interiores3.jpeg",
      "/images/interiores4.jpeg",
    ],
    href: "/interiores",
    cls: "collage-a",
  },
  {
    n: "02",
    title: "Comercial",
    desc: "Ambientes sensíveis, funcionais e profundamente pessoais.",
    images: [
      "/images/comercial-1.jpeg",
      "/images/comercial-2.jpeg",
      "/images/comercial-3.jpeg",
      "/images/comercial-4.jpeg",
    ],
    href: "/comercial",
    cls: "collage-b",
  },
  {
    n: "03",
    title: "Externos",
    desc: "Objetos e identidades que prolongam a narrativa de cada espaço.",
    images: [
      "/images/externo-1.jpeg",
      "/images/externo-2.jpeg",
      "/images/externo-3.jpeg",
      "/images/externo-4.jpeg",
    ],
    href: "/externos",
    cls: "collage-c",
  },
  {
    n: "04",
    title: "Design",
    desc: "Detalhes que criam identidade: do cartão ao objeto, a marca ganha vida.",
    images: [
      "/images/logo-nb.jpeg",
      "/images/design-cartao.jpeg",
      "/images/design-caneca.png",
      "/images/design-caderno.png",
    ],
    href: "/design",
    cls: "collage-d",
  },
];

export default async function Home() {
  const { featured, inProgress } = await getHomeProjects();
  return (
    <>
      <Header />
      <HomeScrollController />
      <main className="home-page">
        <section className="hero">
          <div className="hero-grain" />
          <p className="hero-kicker">Interiores · Comercial · Externos</p>
          <h1>
            Espaços que contam<br />a sua <em>história.</em>
          </h1>
          <div className="hero-mark" aria-hidden="true">
            <span>N</span>
            <i></i>
            <span>B</span>
          </div>
          <p className="hero-copy">
            Projetamos atmosferas autênticas onde estética, função e afeto encontram equilíbrio.
          </p>
          <a className="scroll-cue" href="#manifesto">
            <span>Explore</span>
            <i>↓</i>
          </a>
        </section>

        <Reveal className="manifesto">
          <section id="manifesto">
            <p className="eyebrow">Nosso olhar</p>
            <h2>
              Mais do que construir,
              <br />
              criamos lugares para <em>sentir.</em>
            </h2>
            <p>
              Cada projeto nasce da escuta. Traduzimos histórias, hábitos e desejos em uma arquitetura atemporal, honesta e cheia de significado.
            </p>
            <Link className="text-link" href="/sobre">
              Conheça nossa história <span>↗</span>
            </Link>
          </section>
        </Reveal>

        <div className="chapters">
          {chapters.map((item) => (
            <section className={`chapter ${item.cls}`} key={item.title}>
              <div className="chapter-canvas" aria-hidden="true">
                {item.images.map((image, index) => (
                  <div
                    key={image}
                    className={`crop crop-${index + 1}`}
                    style={{
                      backgroundImage: `url(${image})`,
                    }}
                  />
                ))}
              </div>
              <div className="chapter-title">
                <small>{item.n}</small>
                <h2>{item.title}</h2>
                <p>{item.desc}</p>
                <Link href={item.href}>
                  Ver seleção <span>↗</span>
                </Link>
              </div>
            </section>
          ))}
        </div>

        {featured && <section className="selected">
          <p className="eyebrow">Projeto em destaque · {featured.place}</p>

          <div className="selected-grid">
            <div className="selected-image">
              <img src={featured.images[0]} alt={featured.title} />
            </div>

            <div>
              <span>01 / {featured.subtitle || featured.type}</span>

              <h2>
                {featured.title}
              </h2>

              <p>
                {featured.summary}
              </p>

              <Link className="button-outline" href={`/projetos/${featured.slug}`}>
                Conhecer o projeto
              </Link>
            </div>
          </div>
        </section>}

        {inProgress && <section className="selected">
          <p className="eyebrow">Em andamento · {inProgress.place}</p>

          <div className="selected-grid">
            <div className="selected-image">
              <img
                src={inProgress.images[0]}
                alt={inProgress.title}
              />
            </div>

            <div>
              <span>{inProgress.title}</span>

              <h2>
                Em breve:<br />
                um novo <em>capítulo.</em>
              </h2>

              <p>
                {inProgress.summary}
              </p>

              <a
                className="button-outline"
                href="https://www.instagram.com/arq_natasha_almeida/"
                target="_blank"
              >
                Acompanhar no Instagram ↗
              </a>
            </div>
          </div>
        </section>}
      </main>

      <div className="home-footer">
        <Footer />
      </div>
    </>
  );
}
