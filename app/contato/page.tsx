import { PageShell } from "../components";
import Link from "next/link";

export default function Contato() {
  return (
    <PageShell>
      <div style={{ padding: "130px 5vw 0" }}>
        <Link href="/" className="text-link">
          ← Voltar ao início
        </Link>
      </div>
      <section className="page-intro">
        <p className="eyebrow">05 · Contato</p>
        <div>
          <h1>
            Vamos começar uma<em>conversa?</em>
          </h1>
          <p>
            Conte um pouco sobre seu espaço, seus desejos e o momento do projeto. Será um prazer ouvir você.
          </p>
        </div>
      </section>

      <section className="content-section contact-grid">
        <div className="contact-copy">
          <p className="eyebrow">Novos projetos</p>
          <h2>Seu espaço pode ser o próximo capítulo.</h2>
          <p>
            Atendimentos presenciais e online. Entre em contato pelo canal que preferir para solicitar uma apresentação, tirar dúvidas ou agendar uma conversa inicial.
          </p>
          <div className="contact-meta">
            Segunda a sexta · 09h às 18h<br />
            Rio de Janeiro · Brasil
          </div>
        </div>

        <div className="contact-list">
          <a href="mailto:arq.natashabandeira@gmail.com">
            E-mail <span>↗</span>
          </a>
          <a
            href="https://wa.me/5522998109553?text=Olá%21%20Vi%20seu%20portfólio%20de%20arquitetura%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto."
            target="_blank"
          >
            WhatsApp <span>↗</span>
          </a>
          <a
            href="https://www.instagram.com/arq_natasha_almeida/"
            target="_blank"
          >
            Instagram <span>↗</span>
          </a>
          <a
            href="https://www.linkedin.com/in/natasha-bandeira-23548525b/"
            target="_blank"
          >
            LinkedIn <span>↗</span>
          </a>
        </div>
      </section>
    </PageShell>
  );
}