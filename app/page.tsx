import Link from "next/link";
import {
  Footer,
  Header,
  Reveal,
  HomeScrollController,
} from "./components";

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
    href: "/projetos",
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
    href: "/interiores",
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
    href: "/design",
    cls: "collage-c",
  },
];

export default function Home() {
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

        <section className="selected">
          <p className="eyebrow">Projeto em destaque · 2025</p>

          <div className="selected-grid">
            <div className="selected-image">
              <img src="/images/destaque.jpeg" alt="Projeto GLL Topografia" />
            </div>

            <div>
              <span>01 / GLL Topografia</span>

              <h2>
                Onde a
              <br />
                precisão encontra a <em>confiança.</em>
              </h2>

              <p>
                Com atuação voltada à topografia e geotecnologias, a GLL desenvolve serviços
                que garantem segurança e precisão para todas as etapas de um empreendimento,
                desde o levantamento inicial até o acompanhamento da execução da obra.
              </p>

              <Link className="button-outline" href="/projetos">
                Conhecer o projeto
              </Link>
            </div>
          </div>
        </section>
      </main>

      <div className="home-footer">
        <Footer />
      </div>
    </>
  );
}