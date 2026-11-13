
"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import HeroMockup from "./HeroMockup";

const whatsappMessage = "";

const whatsappUrl = `https://wa.me/5213312891927?text=${encodeURIComponent(
  whatsappMessage,
)}`;

export default function HeroSection() {
  const heroRef = useRef(null);
  const animationFrameRef = useRef(null);

  const [entradaLista, setEntradaLista] = useState(false);

  useLayoutEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    // Conserva la altura visible inicial del navegador.
    const alturaInicial = Math.round(
      window.visualViewport?.height ?? window.innerHeight,
    );

    hero.style.setProperty("--hero-height", `${alturaInicial}px`);

    const reducirMovimiento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducirMovimiento || window.scrollY > 40) {
      setEntradaLista(true);
      return;
    }

    animationFrameRef.current = window.requestAnimationFrame(() => {
      setEntradaLista(true);
    });

    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={heroRef}
      style={{
        minHeight: "var(--hero-height, 100svh)",
      }}
      className="
        relative isolate
        box-border overflow-hidden
        bg-[#f5f5f7]
        pt-[74px]
        sm:pt-[70px]
      "
    >
      {/* Fondo base Apple White */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 -z-30
          bg-[#f5f5f7]
        "
      />

      {/* Iluminación radial blanca: igual al About */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 -z-20
          bg-[
            radial-gradient(
              ellipse_at_15%_10%,
              rgba(255,255,255,0.95),
              transparent_48%
            ),
            radial-gradient(
              ellipse_at_85%_80%,
              rgba(255,255,255,0.85),
              transparent_46%
            )
          ]
        "
      />

      {/* Degradado ambiental */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 -z-10
          bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0)_50%,rgba(0,0,0,0.012))]
        "
      />

      {/* Contenido */}
      <div
        className="
          mx-auto grid
          min-h-[calc(var(--hero-height,100svh)-74px)]
          w-full max-w-7xl
          grid-rows-[minmax(0,1fr)_auto]
          items-center gap-2
          px-4 pb-3 pt-2
          sm:min-h-[calc(var(--hero-height,100svh)-70px)]
          sm:grid-rows-none
          sm:gap-5 sm:px-6 sm:pb-6 sm:pt-6
          md:gap-8 md:px-8
          lg:grid-cols-[0.9fr_1.1fr]
          lg:grid-rows-1
          lg:gap-12 lg:pb-10 lg:pt-10
        "
      >
        {/* Texto */}
        <div
          className={`
            relative z-20 order-2
            mx-auto w-full max-w-xl
            transform-gpu text-center
            transition-[opacity,transform]
            duration-[650ms]
            ease-[cubic-bezier(0.16,1,0.3,1)]
            [backface-visibility:hidden]
            motion-reduce:transform-none
            motion-reduce:opacity-100
            motion-reduce:transition-none
            lg:order-1 lg:mx-0 lg:text-left
            ${
              entradaLista
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }
          `}
        >
          {/* Etiqueta */}
          <p
            className="
              mb-2
              text-[11px] font-semibold
              uppercase tracking-[0.22em]
              text-[#86868b]
              sm:mb-3 sm:text-xs
            "
          >
            Desarrollo y diseño web
          </p>

          {/* Título */}
          <h1
            className="
              text-[clamp(1.9rem,8vw,4.7rem)]
              font-semibold
              leading-[0.96]
              tracking-[-0.05em]
              text-[#1d1d1f]
            "
          >
            Creador de sitios web

            <span
              className="
                mt-1 block
                text-[#86868b]
              "
            >
              para tu negocio.
            </span>
          </h1>

          {/* Descripción */}
          <div
            className="
              mt-3
              text-[13px]
              leading-relaxed
              text-[#6e6e73]
              sm:mt-5 sm:text-base
              md:mt-6
            "
          >
            <p>
              Recibe una vista previa de tu página en menos de 24 horas.
            </p>

            <p className="font-semibold text-[#424245]">
              Solo pagas si decides continuar.
            </p>
          </div>

          {/* Botones */}
          <div
            className="
              mt-4 flex w-full flex-col
              gap-2 sm:mt-6 sm:gap-2.5
            "
          >
            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex min-h-11 w-full
                cursor-pointer
                items-center justify-center gap-2
                rounded-full
                bg-[#22c55e]
                px-7
                text-sm font-semibold text-white
                shadow-[0_8px_24px_rgba(34,197,94,0.16)]
                transition-[transform,background-color,box-shadow]
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#16a34a]
                hover:shadow-[0_12px_28px_rgba(34,197,94,0.22)]
                active:scale-[0.97]
                sm:min-h-12
              "
            >
              <FaWhatsapp className="text-xl" />
              Contactar por WhatsApp
            </a>

            {/* Proyectos - Crystal Glass */}
            <a
              href="#projects"
              className="
                mb-11 flex min-h-11 w-full
                cursor-pointer
                items-center justify-center
                rounded-full
                border border-white/80
                bg-white/65
                px-7
                text-sm font-semibold text-[#1d1d1f]
                shadow-[0_8px_25px_rgba(0,0,0,0.045)]
                backdrop-blur-xl
                transition-[transform,background-color,border-color,box-shadow]
                duration-300
                hover:-translate-y-0.5
                hover:border-white
                hover:bg-white/90
                hover:shadow-[0_10px_30px_rgba(0,0,0,0.075)]
                active:scale-[0.97]
                sm:min-h-12
              "
            >
              Ver mis proyectos
            </a>
          </div>
        </div>

        {/* Mockup original: sin modificar */}
        <div
          className={`
            relative z-10 order-1
            min-w-0 transform-gpu
            transition-[opacity,transform]
            delay-[90ms]
            duration-[750ms]
            ease-[cubic-bezier(0.16,1,0.3,1)]
            [backface-visibility:hidden]
            motion-reduce:transform-none
            motion-reduce:opacity-100
            motion-reduce:transition-none
            lg:order-2
            ${
              entradaLista
                ? "translate-y-0 scale-100 opacity-100 lg:translate-x-0"
                : "-translate-y-3 scale-[0.975] opacity-0 lg:translate-x-6 lg:translate-y-0"
            }
          `}
        >
          <HeroMockup />
        </div>
      </div>
    </section>
  );
}
