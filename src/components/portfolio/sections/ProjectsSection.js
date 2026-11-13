"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function BiNeBianniDivider({ position }) {
  const posicion =
    position === "top"
      ? "top-0 -translate-y-1/2"
      : "bottom-0 translate-y-1/2";

  return (
    <div
      aria-hidden="true"
      className={`
        pointer-events-none absolute left-0 z-20
        flex w-full items-center justify-center gap-0
        ${posicion}
      `}
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-black/15 to-black/10" />

      <span
        className="
          h-2.5 w-2.5 shrink-0 rotate-45
          rounded-[2px]
          border border-black/10
          bg-white/90
          shadow-[0_1px_5px_rgba(0,0,0,0.12)]
        "
      />

      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-black/15 to-black/10" />
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  const [sectionVisible, setSectionVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState(() => new Set());

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      setSectionVisible(true);
      setVisibleCards(new Set([0, 1, 2, 3]));
      return;
    }

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setSectionVisible(true);
        sectionObserver.unobserve(entry.target);
      },
      {
        threshold: 0.06,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    const cardsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = Number(entry.target.dataset.cardIndex);

          setVisibleCards((previousCards) => {
            if (previousCards.has(index)) return previousCards;

            const nextCards = new Set(previousCards);
            nextCards.add(index);

            return nextCards;
          });

          cardsObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -5% 0px",
      },
    );

    sectionObserver.observe(section);

    cardRefs.current.forEach((card) => {
      if (card) cardsObserver.observe(card);
    });

    return () => {
      sectionObserver.disconnect();
      cardsObserver.disconnect();
    };
  }, []);

  const cardAnimationClass = (index) => {
    const cardVisible = visibleCards.has(index);

    const initialPosition = [
      "-translate-x-6 rotate-[-1.5deg]",
      "translate-x-6 rotate-[1.5deg]",
      "-translate-x-6 rotate-[-1.5deg]",
      "translate-x-6 rotate-[1.5deg]",
    ];

    return `
      h-full min-w-0 transform-gpu
      transition-[opacity,transform]
      duration-[800ms]
      ease-[cubic-bezier(0.16,1,0.3,1)]
      [backface-visibility:hidden]
      motion-reduce:transform-none
      motion-reduce:opacity-100
      motion-reduce:transition-none
      ${
        cardVisible
          ? "translate-x-0 translate-y-0 scale-100 rotate-0 opacity-100"
          : `${initialPosition[index]} translate-y-10 scale-[0.93] opacity-0`
      }
    `;
  };

  const cardStyle = `
    group block h-full w-full
    cursor-pointer
    rounded-2xl
    border border-white/80
    bg-white/65 backdrop-blur-xl
    p-5
    shadow-[0_8px_30px_rgba(0,0,0,0.045)]
    transition-[transform,border-color,background-color,box-shadow]
    duration-300
    active:scale-[0.985]
    sm:hover:-translate-y-1
    sm:hover:border-black/10
    sm:hover:bg-white/90
    md:p-7
  `;

  const categoryStyle = `
    shrink-0 rounded-full
    border border-black/10
    bg-white/70
    px-3 py-1
    text-xs text-[#6e6e73]
  `;

  const titleStyle = "text-lg font-medium text-[#1d1d1f]";

  const descriptionStyle =
    "mt-3 text-sm leading-relaxed text-[#424245] md:text-base";

  const linkStyle = `
    mt-5 inline-block
    text-sm font-medium text-[#1d1d1f]
    transition-[color,transform]
    duration-300
    group-hover:translate-x-1
    group-hover:text-black
  `;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="
        relative scroll-mt-[90px]
        overflow-visible
        bg-[#f5f5f7] text-[#1d1d1f]
        px-5 py-12
        md:px-6 md:py-16
      "
    >
      <BiNeBianniDivider position="top" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_100%_18%,rgba(0,0,0,0.045),transparent_34%),radial-gradient(circle_at_0%_88%,rgba(0,0,0,0.025),transparent_30%)]
          "
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* ENCABEZADO */}
        <div className="max-w-2xl">
          <p
            className={`
              transform-gpu text-xs uppercase tracking-[0.18em]
              text-[#86868b]
              transition-[opacity,transform] duration-700
              ease-[cubic-bezier(0.16,1,0.3,1)]
              md:text-sm
              ${
                sectionVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }
            `}
          >
            Portafolio
          </p>

          <h2
            className={`
              mt-3 origin-left transform-gpu
              text-2xl font-semibold
              transition-[opacity,transform] delay-[90ms]
              duration-[850ms]
              ease-[cubic-bezier(0.16,1,0.3,1)]
              md:text-4xl
              ${
                sectionVisible
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-9 scale-[0.94] opacity-0"
              }
            `}
          >
            Proyectos propios
          </h2>

          <p
            className={`
              mt-4 transform-gpu text-sm leading-relaxed
              text-[#424245]
              transition-[opacity,transform] delay-[190ms]
              duration-[750ms]
              ease-[cubic-bezier(0.16,1,0.3,1)]
              md:text-base
              ${
                sectionVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-7 opacity-0"
              }
            `}
          >
            Una selección de proyectos creados para mostrar mi forma de
            trabajar.
          </p>
        </div>

        {/* PROYECTOS */}
        <div className="mt-7 grid gap-4 md:mt-8 md:grid-cols-2 md:gap-6">
          {/* 1. MODO DE VIAJE */}
          <div
            ref={(element) => {
              cardRefs.current[0] = element;
            }}
            data-card-index="0"
            className={cardAnimationClass(0)}
            style={{
              transitionDelay: visibleCards.has(0) ? "0ms" : "0ms",
            }}
          >
            <a
              href="https://mododeviaje.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitar Modo de Viaje"
              className={cardStyle}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className={titleStyle}>Modo de Viaje</h3>

                <span className={categoryStyle}>
                  Sitio web
                </span>
              </div>

              <p className={descriptionStyle}>
                Descripción provisional del proyecto. Aquí podrás agregar
                información sobre el sitio web, sus funcionalidades y el
                trabajo realizado.
              </p>

              <span className={linkStyle}>
                Visitar sitio →
              </span>
            </a>
          </div>

          {/* 2. HAMBURGUESAS FÁTIMA */}
          <div
            ref={(element) => {
              cardRefs.current[1] = element;
            }}
            data-card-index="1"
            className={cardAnimationClass(1)}
            style={{
              transitionDelay: visibleCards.has(1) ? "80ms" : "0ms",
            }}
          >
            <a
              href="https://hamburguesas-fatima.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitar Hamburguesas Fátima"
              className={cardStyle}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className={titleStyle}>
                  Hamburguesas Fátima
                </h3>

                <span className={categoryStyle}>
                  Restaurante
                </span>
              </div>

              <p className={descriptionStyle}>
                Página web para negocio de comida, enfocada en mostrar un
                menú digital con carrito, recibir pedidos a domicilio por
                WhatsApp y facilitar la atención directa con clientes.
              </p>

              <span className={linkStyle}>
                Visitar sitio →
              </span>
            </a>
          </div>

          {/* 3. BI NE BIANNI */}
          <div
            ref={(element) => {
              cardRefs.current[2] = element;
            }}
            data-card-index="2"
            className={cardAnimationClass(2)}
            style={{
              transitionDelay: visibleCards.has(2) ? "80ms" : "0ms",
            }}
          >
            <a
              href="https://binebianni.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitar Bi Ne Bianni"
              className={cardStyle}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className={titleStyle}>Bi Ne Bianni</h3>

                <span className={categoryStyle}>
                  Sitio empresarial
                </span>
              </div>

              <p className={descriptionStyle}>
                Sitio web para una consultoría social, con secciones
                informativas, presentación de servicios y diseño moderno.
              </p>

              <span className={linkStyle}>
                Visitar sitio →
              </span>
            </a>
          </div>

          {/* 4. QUICKCART */}
          <div
            ref={(element) => {
              cardRefs.current[3] = element;
            }}
            data-card-index="3"
            className={cardAnimationClass(3)}
            style={{
              transitionDelay: visibleCards.has(3) ? "80ms" : "0ms",
            }}
          >
            <Link
              href="/quickcart"
              aria-label="Visitar QuickCart"
              className={cardStyle}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className={titleStyle}>QuickCart</h3>

                <span className={categoryStyle}>
                  Tienda online
                </span>
              </div>

              <p className={descriptionStyle}>
                Tienda online de demostración con catálogo de productos,
                carrito de compras y flujo de pedido simulado.
              </p>

              <span className={linkStyle}>
                Ver proyecto →
              </span>
            </Link>
          </div>
        </div>
      </div>

      <BiNeBianniDivider position="bottom" />
    </section>
  );
}