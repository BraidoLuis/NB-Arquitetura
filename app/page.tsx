import Link from "next/link";
import {
  Footer,
  Header,
  Reveal,
  HomeScrollController,
} from "./components";

const chapters = [
  { n: "01", title: "arquitetura", desc: "Volumes, luz e matéria desenhados para pertencer ao lugar.", image: "/images/interiores.jpg", href: "/projetos", cls: "collage-a" },
  { n: "02", title: "interiores", desc: "Ambientes sensíveis, funcionais e profundamente pessoais.", image: "/images/interiores.jpg", href: "/interiores", cls: "collage-b" },
  { n: "03", title: "design", desc: "Objetos e identidades que prolongam a narrativa de cada espaço.", image: "/images/design-caderno.png", href: "/design", cls: "collage-c" },
];

export default function Home() {
  return <><Header/>
    <HomeScrollController />
    <main className="home-page">
      
      <section className="hero">
        <div className="hero-grain"/>
        <p className="hero-kicker">Arquitetura · Interiores · Design</p>
        <h1>Espaços que contam<br/>a sua <em>história.</em></h1>
        <div className="hero-mark" aria-hidden="true"><span>N</span><i></i><span>B</span></div>
        <p className="hero-copy">Projetamos atmosferas autênticas onde estética, função e afeto encontram equilíbrio.</p>
        <a className="scroll-cue" href="#manifesto"><span>Explore</span><i>↓</i></a>
      </section>

      <Reveal className="manifesto" ><section id="manifesto">
        <p className="eyebrow">Nosso olhar</p>
        <h2>Mais do que construir,<br/>criamos lugares para <em>sentir.</em></h2>
        <p>Cada projeto nasce da escuta. Traduzimos histórias, hábitos e desejos em uma arquitetura atemporal, honesta e cheia de significado.</p>
        <Link className="text-link" href="/sobre">Conheça nossa história <span>↗</span></Link>
      </section></Reveal>

      <div className="chapters">
        {chapters.map((item) => <section className={`chapter ${item.cls}`} key={item.title}>
          <div className="chapter-canvas" aria-hidden="true">
            <div className="crop crop-1" style={{backgroundImage:`url(${item.image})`}}/>
            <div className="crop crop-2" style={{backgroundImage:`url(${item.image})`}}/>
            <div className="crop crop-3" style={{backgroundImage:`url(${item.image})`}}/>
            <div className="crop crop-4" style={{backgroundImage:`url(${item.image})`}}/>
          </div>
          <div className="chapter-title"><small>{item.n}</small><h2>{item.title}</h2><p>{item.desc}</p><Link href={item.href}>Ver seleção <span>↗</span></Link></div>
        </section>)}
      </div>

      <section className="selected">
        <p className="eyebrow">Projeto em destaque · 2026</p>
        <div className="selected-grid"><div className="selected-image"><img src="/images/interiores.jpg" alt="Colagem de projeto de interiores contemporâneo"/></div><div><span>01 / Casa Serena</span><h2>Uma pausa<br/>entre <em>luz e matéria.</em></h2><p>Ambientes fluidos, texturas naturais e uma relação delicada entre interior e paisagem.</p><Link className="button-outline" href="/projetos">Descobrir o projeto</Link></div></div>
      </section>
    </main>

  <div className="home-footer">
    <Footer />
  </div></>;
}
