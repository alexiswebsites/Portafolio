"use client";

import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "5213312891927";
const WHATSAPP_MESSAGE = "";

const whatsappUrl = WHATSAPP_MESSAGE
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
  : `https://wa.me/${WHATSAPP_NUMBER}`;

const easing = "ease-[cubic-bezier(0.22,1,0.36,1)]";

/*
  Detecta si la página dejó de estar hasta arriba SIN escuchar el scroll.
  Un IntersectionObserver vigila un pixel invisible al inicio de la página:
  el navegador solo avisa cuando ese pixel entra o sale de la pantalla.
*/
function useScrolled() {
  const sentinelRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) =>
      setScrolled(!entry.isIntersecting)
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [sentinelRef, scrolled];
}

export default function PortfolioHeader() {
  const [sentinelRef, scrolled] = useScrolled();

  return (
    <>
      {/* Pixel invisible en el top de la página (lo vigila el observer) */}
      <span
        ref={sentinelRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-px w-px"
      />

      <header
        className={`
          fixed inset-x-0 top-0 z-50 w-full
          backdrop-blur-[10px] backdrop-saturate-150
          transition-[background-color] duration-300 ${easing} motion-reduce:transition-none
          ${scrolled ? "bg-[#161617]/[0.62]" : "bg-[#161617]/[0.77]"}
        `}
      >
        <div className="mx-auto flex h-[74px] w-full max-w-6xl items-center justify-between gap-2 px-3 sm:h-[70px] sm:gap-3 sm:px-5 md:px-6">
          {/* Nombre: lleva al inicio */}
          <a
            href="#top"
            aria-label="Miguel Alexis Sánchez Carranza, ir al inicio"
            className={`
              group relative min-w-0 select-none rounded-2xl px-2 py-2 sm:px-2.5
              transition-[transform,background-color] duration-300 ${easing}
              hover:bg-white/[0.08] active:scale-[0.97]
              motion-reduce:transition-none
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
            `}
          >
            {/* Línea animada: usa scale (GPU) en lugar de width (recalcula layout) */}
            <span
              aria-hidden="true"
              className={`
                pointer-events-none absolute bottom-[3px] left-[10%] h-px w-[80%]
                origin-center scale-x-0 rounded-full bg-white/60 opacity-0
                transition-[transform,opacity] duration-300 ${easing}
                group-hover:scale-x-100 group-hover:opacity-100
                motion-reduce:transition-none
              `}
            />

            <span className="relative block leading-[1.05]">
              {/* Celular */}
              <span className="block whitespace-nowrap text-[15px] font-bold tracking-wide text-white min-[390px]:text-[16px] sm:hidden">
                Miguel Alexis
              </span>
              <span className="mt-0.5 block whitespace-nowrap text-[15px] font-bold tracking-wide text-white/90 min-[390px]:text-[16px] sm:hidden">
                Sánchez Carranza
              </span>

              {/* Tablet y escritorio */}
              <span
                className="
                  hidden whitespace-nowrap text-[15px] font-semibold tracking-wide text-white
                  transition-colors duration-300 ease-out
                  group-hover:text-white/90
                  sm:block md:text-[16px]
                "
              >
                Miguel Alexis Sánchez Carranza
              </span>
            </span>
          </a>

          {/* WhatsApp: sólido y sobrio, sin glow */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp (se abre en una nueva pestaña)"
            className={`
              group inline-flex h-[44px] shrink-0 select-none items-center justify-center gap-2
              rounded-full bg-[#10843f] px-4 text-white sm:px-5
              ring-1 ring-inset ring-white/10
              shadow-[0_1px_2px_rgba(0,0,0,0.3)]
              transition-[transform,background-color,box-shadow] duration-300 ${easing}
              hover:-translate-y-px hover:bg-[#0d7536] hover:shadow-[0_4px_12px_rgba(0,0,0,0.35)]
              active:translate-y-0 active:scale-[0.97]
              motion-reduce:transition-none motion-reduce:hover:translate-y-0
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
            `}
          >
            <FaWhatsapp
              aria-hidden="true"
              className={`
                size-[18px] shrink-0
                transition-transform duration-300 ${easing}
                group-hover:scale-105 motion-reduce:transition-none
              `}
            />
            <span className="whitespace-nowrap text-[15px] font-semibold leading-none tracking-wide">
              WhatsApp
            </span>
          </a>
        </div>
      </header>
    </>
  );
}