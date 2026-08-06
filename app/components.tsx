"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

const links = [
  ["Início", "/"], ["Minha História", "/sobre"], ["Interiores", "/projetos"],
  ["Comercial", "/interiores"], ["Externos", "/design"], ["Contato", "/contato"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  return <>
    <header className="site-header">
      <Link className="brand" href="/" aria-label="NB — página inicial">
        <Image
          src="/images/logo2.png"
          alt="NB Arquitetura"
          width={120}
          height={50}
          priority
        />
      </Link>

      <button
        className={`menu-button ${open ? "is-open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
    <nav className={`menu-panel ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <p className="eyebrow">Navegação</p>
      {links.map(([label, href], i) => <Link key={href} href={href} onClick={() => setOpen(false)}><small>0{i + 1}</small>{label}</Link>)}
      <div className="menu-contact"><a href="mailto:arq.natashabandeira@gmail.com">arq.natashabandeira@gmail.com</a><a href="https://www.instagram.com/arq_natasha_almeida/" target="_blank">Instagram ↗</a></div>
    </nav>
  </>;
}

export function Footer() {
  return <footer className="footer">
    <div><p className="eyebrow">Vamos criar juntos?</p><h2>Transformamos ideias<br/>em espaços com <em>alma.</em></h2></div>
    <div className="footer-links">
      <a href="mailto:arq.natashabandeira@gmail.com">E-mail ↗</a><a href="https://www.instagram.com/arq_natasha_almeida/" target="_blank">Instagram ↗</a>
      <a href="https://www.linkedin.com/in/natasha-bandeira-23548525b/" target="_blank">LinkedIn ↗</a><a href="https://wa.me/5522998109553?text=Olá%21%20Vi%20seu%20portfólio%20de%20arquitetura%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto." target="_blank">WhatsApp ↗</a>
    </div>
    <div className="footer-bottom"><span>© 2026 NB Arquitetura e Interiores</span><Link href="/contato">Rio de Janeiro - Nova Friburgo, Brasil</Link></div>
  </footer>;
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return <><Header/><main>{children}</main><Footer/></>;
}

export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

export function HomeScrollController() {
  useEffect(() => {
    const sectionSelector = [
      ".home-page > .hero",
      ".home-page > .manifesto",
      ".home-page .chapter",
      ".home-page > .selected",
      ".home-footer",
    ].join(",");

    let isScrolling = false;
    let touchStartY = 0;

    function getSections() {
      return Array.from(
        document.querySelectorAll<HTMLElement>(sectionSelector)
      );
    }

    function getCurrentSectionIndex(sections: HTMLElement[]) {
      let closestIndex = 0;
      let closestDistance = Infinity;

      sections.forEach((section, index) => {
        const distance = Math.abs(section.getBoundingClientRect().top);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      return closestIndex;
    }

    function smoothScrollTo(targetPosition: number, duration = 1400) {
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      let startTime: number | null = null;

      function easeInOutCubic(time: number) {
        return time < 0.5
          ? 4 * time * time * time
          : 1 - Math.pow(-2 * time + 2, 3) / 2;
      }

      function animation(currentTime: number) {
        if (startTime === null) {
          startTime = currentTime;
        }

        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        window.scrollTo(
          0,
          startPosition + distance * easeInOutCubic(progress)
        );

        if (elapsed < duration) {
          requestAnimationFrame(animation);
        }
      }

      requestAnimationFrame(animation);
    }

    function goToSection(direction: 1 | -1) {
      if (isScrolling) return;

      // Não interfere enquanto o menu estiver aberto
      if (document.querySelector(".menu-panel.is-open")) return;

      const sections = getSections();
      const currentIndex = getCurrentSectionIndex(sections);

      const nextIndex = Math.min(
        Math.max(currentIndex + direction, 0),
        sections.length - 1
      );

      if (nextIndex === currentIndex) return;

      isScrolling = true;

      smoothScrollTo(sections[nextIndex].offsetTop, 1000);

      window.setTimeout(() => {
        isScrolling = false;
      }, 1000);
    }

    function handleWheel(event: WheelEvent) {
      // Evita ativar com movimentos muito pequenos do touchpad
      if (Math.abs(event.deltaY) < 15) return;

      event.preventDefault();

      if (event.deltaY > 0) {
        goToSection(1);
      } else {
        goToSection(-1);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      const nextKeys = ["ArrowDown", "PageDown", " "];
      const previousKeys = ["ArrowUp", "PageUp"];

      if (nextKeys.includes(event.key)) {
        event.preventDefault();
        goToSection(1);
      }

      if (previousKeys.includes(event.key)) {
        event.preventDefault();
        goToSection(-1);
      }

      if (event.key === "Home") {
        event.preventDefault();
        getSections()[0]?.scrollIntoView({
          behavior: "smooth",
        });
      }

      if (event.key === "End") {
        event.preventDefault();

        const sections = getSections();

        sections[sections.length - 1]?.scrollIntoView({
          behavior: "smooth",
        });
      }
    }

    function handleTouchStart(event: TouchEvent) {
      touchStartY = event.touches[0]?.clientY ?? 0;
    }

    function handleTouchEnd(event: TouchEvent) {
      const touchEndY = event.changedTouches[0]?.clientY ?? 0;
      const difference = touchStartY - touchEndY;

      if (Math.abs(difference) < 60) return;

      if (difference > 0) {
        goToSection(1);
      } else {
        goToSection(-1);
      }
    }

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    window.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return null;
}