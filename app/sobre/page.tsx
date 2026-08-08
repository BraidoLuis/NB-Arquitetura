import { PageShell } from "../components";
import Link from "next/link";

export default function Sobre() {
  return (
    <PageShell>
      <div style={{ padding: "130px 5vw 0" }}>
        <Link href="/" className="text-link">
          ← Voltar ao início
        </Link>
      </div>
      <section className="page-intro">
        <p className="eyebrow">01 · Minha História</p>
        <div>
          <h1>
            Arquitetura com<em>propósito.</em>
          </h1>
          <p>
            Projetar é compreender pessoas, paisagens e modos de viver — e transformar essa escuta em espaços que permanecem.
          </p>
        </div>
      </section>

      <section className="content-section about-grid">
        <img
          className="portrait"
          src="/images/foto-perfil.jpeg"
          alt="Identidade NB Arquitetura e Interiores"
        />
        <div className="prose">
          {/* <h2>
            Uma trajetória construída
            entre espaço e detalhe.
          </h2> */}

          <h2>Olá, sou Natasha Bandeira.</h2>

          <p>
            Olá, sou <strong>Natasha Bandeira</strong>, arquiteta e urbanista. Acredito
            que um bom projeto nasce da união entre sensibilidade, técnica e atenção aos
            detalhes. Meu objetivo é desenvolver espaços que traduzam a identidade de
            cada cliente, conciliando estética, funcionalidade e soluções inteligentes
            para o dia a dia.
          </p>

          <p>
            Minha trajetória foi construída por meio da experiência prática em
            diferentes áreas da arquitetura e da construção civil. Ao longo dos últimos
            anos, atuei em escritórios de arquitetura, engenharia e marcenaria
            planejada, participando do desenvolvimento de projetos residenciais e
            comerciais, projetos de interiores, cadernos executivos, detalhamentos
            técnicos, modelagem 3D, documentação para execução e acompanhamento de
            processos construtivos.
          </p>

          <p>
            Essas vivências ampliaram minha visão sobre todas as etapas de um projeto.
            Hoje, procuro desenvolver soluções que não sejam apenas bonitas, mas também
            funcionais, executáveis e pensadas para proporcionar conforto, praticidade e
            durabilidade. Cada decisão de projeto é tomada considerando tanto a
            experiência de quem irá utilizar o espaço quanto a viabilidade de sua
            execução.
          </p>

          <p>
            Atualmente, meu trabalho é voltado ao desenvolvimento de projetos
            arquitetônicos e de interiores, renderizações fotorealistas, detalhamento de
            marcenaria, cadernos executivos e documentação técnica. Utilizo ferramentas
            como SketchUp, LayOut, Enscape, AutoCAD, Archicad e Revit para apresentar
            cada projeto com clareza, precisão e um alto nível de qualidade.
          </p>

          <p>
            Mais do que criar ambientes, acredito que a arquitetura tem o poder de
            transformar a forma como as pessoas vivem, trabalham e se relacionam com os
            espaços. Por isso, cada projeto é desenvolvido de forma personalizada,
            respeitando as necessidades, os sonhos e o estilo de vida de cada cliente,
            sempre buscando resultados atemporais, funcionais e visualmente marcantes.
          </p>
        </div>
      </section>
        <div className="timeline">
          <div>
            <strong>2026 - Atual</strong>
            <span>
              <b>Arquiteta · Rohen Arquitetura</b><br />
              Desenvolvimento de projetos arquitetônicos e de interiores,
              elaboração de cadernos executivos, detalhamentos técnicos,
              modelagem 3D e documentação para execução de obras.
            </span>
          </div>

          <div>
            <strong>2025</strong>
            <span>
              <b>Estagiária de Arquitetura · Rohen Arquitetura</b><br />
              Desenvolvimento de projetos arquitetônicos e de interiores,
              elaboração de cadernos executivos, detalhamentos técnicos,
              modelagem 3D e documentação para execução de obras.
            </span>
          </div>

          <div>
            <strong>2024</strong>
            <span>
              <b>Projetista · RBA Decor</b><br />
              Desenvolvimento de projetos de móveis planejados residenciais
              e comerciais, modelagem 3D, detalhamento executivo,
              especificação de materiais e acompanhamento de fabricação.
            </span>
          </div>

          <div>
            <strong>2023</strong>
            <span>
              <b>Estagiária de Arquitetura · Panton Engenharia e Arquitetura</b><br />
              Produção de documentação executiva, desenhos técnicos,
              detalhamentos construtivos, modelagem 3D e compatibilização
              entre projetos arquitetônicos e complementares.
            </span>
          </div>

          <div>
            <strong>2023</strong>
            <span>
              <b>Estagiária de Arquitetura · Giovanni Cariello</b><br />
              Desenvolvimento de projetos residenciais e interiores,
              cadernos executivos, detalhamento de marcenaria,
              modelagem tridimensional e organização de pranchas técnicas.
            </span>
          </div>

          <div>
            <strong>2022 — 2023</strong>
            <span>
              <b>Estagiária de Construção Civil · Predial Primus</b><br />
              Acompanhamento de obras, fiscalização de execução,
              controle de materiais, atualização de diário de obra
              e suporte à equipe de engenharia.
            </span>
          </div>

          <div className="download-row">
            <a className="button-outline" href="/images/Portfólio-Natasha.pdf" download>
              Baixar Portfólio ↓
            </a>
          </div>
        </div>
    </PageShell>
  );
}