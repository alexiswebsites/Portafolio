"use client";

import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const whatsappMessage =
  "Hola, me interesa solicitar información sobre la creación de un sitio web.";

const whatsappUrl = `https://wa.me/5213312891927?text=${encodeURIComponent(
  whatsappMessage,
)}`;

const phoneUrl = "tel:+523312891927";

const emailUrl =
  "mailto:alexissanchezdev7@gmail.com?subject=Cotización%20de%20página%20web";

/* =========================================================
   DIVISOR DE SECCIÓN
   MODIFICA AQUÍ EL COLOR Y TAMAÑO DEL DIVISOR
========================================================= */

function BiNeBianniDivider({ position }) {
  const posicion =
    position === "top"
      ? "top-0 -translate-x-1/2 -translate-y-1/2"
      : "bottom-0 -translate-x-1/2 translate-y-1/2";

  return (
    <div
      aria-hidden="true"
      className={`
        pointer-events-none absolute left-1/2 z-20
        flex w-full max-w-none
        items-center justify-center gap-0
        ${posicion}
      `}
    >
      {/* Línea izquierda */}
      <span
        className="
          h-px flex-1
          bg-gradient-to-r
          from-transparent
          via-[#c7c7cc]/80
          to-[#c7c7cc]/40
        "
      />

      {/* Rombo central */}
      <span
        className="
          h-2.5 w-2.5 shrink-0 rotate-45
          rounded-[2px]
          bg-[#c7c7cc]
          shadow-[0_0_12px_rgba(0,0,0,0.08)]
        "
      />

      {/* Línea derecha */}
      <span
        className="
          h-px flex-1
          bg-gradient-to-l
          from-transparent
          via-[#c7c7cc]/80
          to-[#c7c7cc]/40
        "
      />
    </div>
  );
}

/* =========================================================
   CONTACT SECTION
========================================================= */

export default function ContactSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    /*
      La sección se anima una sola vez.

      Después de entrar en pantalla deja de observarse,
      evitando que desaparezca al subir o bajar.
    */

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setVisible(true);
        observer.unobserve(entry.target);
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="
        relative scroll-mt-[90px]
        overflow-visible
        bg-[#f5f5f7]
        text-[#1d1d1f]
        px-5 py-14
        text-center
        md:px-6 md:py-[4.5rem]
      "
    >
      {/* Separador superior */}
      <BiNeBianniDivider position="top" />

      {/* Fondo estático optimizado */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          overflow-hidden
        "
      >
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.92),transparent_38%),radial-gradient(circle_at_15%_100%,rgba(0,0,0,0.025),transparent_32%),radial-gradient(circle_at_90%_0%,rgba(255,255,255,0.75),transparent_30%)]
          "
        />
      </div>

      <div className="relative mx-auto max-w-3xl">

        {/* Texto pequeño */}
        <p
          className={`
            transform-gpu
            text-xs uppercase
            tracking-[0.18em]
            text-[#86868b]
            transition-[opacity,transform]
            duration-700
            ease-[cubic-bezier(0.16,1,0.3,1)]
            [backface-visibility:hidden]
            motion-reduce:transform-none
            motion-reduce:opacity-100
            motion-reduce:transition-none
            md:text-sm
            ${
              visible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }
          `}
        >
          Contacto
        </p>

        {/* TÍTULO: COLOR NEGRO APPLE */}
        <h2
          className={`
            mt-3 transform-gpu
            text-3xl font-semibold leading-tight
            !text-[#1d1d1f]
            transition-[opacity,transform]
            delay-[90ms]
            duration-[900ms]
            ease-[cubic-bezier(0.16,1,0.3,1)]
            [backface-visibility:hidden]
            motion-reduce:transform-none
            motion-reduce:opacity-100
            motion-reduce:transition-none
            md:text-5xl
            ${
              visible
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-10 scale-[0.93] opacity-0"
            }
          `}
        >
          ¿Necesitas una página o sistema web?
        </h2>

        {/* Descripción */}
        <p
          className={`
            mx-auto mt-5 max-w-2xl
            transform-gpu
            text-sm leading-relaxed
            !text-[#6e6e73]
            transition-[opacity,transform]
            delay-[210ms]
            duration-[800ms]
            ease-[cubic-bezier(0.16,1,0.3,1)]
            [backface-visibility:hidden]
            motion-reduce:transform-none
            motion-reduce:opacity-100
            motion-reduce:transition-none
            md:text-base
            ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }
          `}
        >
          Dime qué tipo de página necesitas, para qué negocio o proyecto será,
          o si buscas mejorar o dar mantenimiento a un sitio existente. El
          precio depende del tipo de sitio web, las secciones y funciones que
          necesites.
        </p>

        {/* BOTONES */}
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

          {/* WhatsApp */}
          <div
            className={`
              transform-gpu
              transition-[opacity,transform]
              delay-[330ms]
              duration-[750ms]
              ease-[cubic-bezier(0.16,1,0.3,1)]
              [backface-visibility:hidden]
              motion-reduce:transform-none
              motion-reduce:opacity-100
              motion-reduce:transition-none
              ${
                visible
                  ? "translate-x-0 translate-y-0 scale-100 opacity-100"
                  : "-translate-x-6 translate-y-6 scale-[0.94] opacity-0"
              }
            `}
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex w-full cursor-pointer
                items-center justify-center gap-2
                rounded-full
                bg-[#22c55e]
                px-7 py-3
                text-center font-semibold text-white
                shadow-[0_8px_24px_rgba(34,197,94,0.16)]
                transition-[transform,background-color,box-shadow]
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#16a34a]
                hover:shadow-[0_10px_28px_rgba(34,197,94,0.20)]
                active:scale-[0.97]
                md:px-8 md:py-4
              "
            >
              <FaWhatsapp className="text-xl" />
              <span>Contactar por WhatsApp</span>
            </a>
          </div>

          {/* Llamar */}
          <div
            className={`
              transform-gpu
              transition-[opacity,transform]
              delay-[420ms]
              duration-[750ms]
              ease-[cubic-bezier(0.16,1,0.3,1)]
              [backface-visibility:hidden]
              motion-reduce:transform-none
              motion-reduce:opacity-100
              motion-reduce:transition-none
              ${
                visible
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-7 scale-[0.94] opacity-0"
              }
            `}
          >
            <a
              href={phoneUrl}
              className="
                block w-full cursor-pointer
                rounded-full
                border border-[#d2d2d7]
                bg-white/75
                px-7 py-3
                text-center font-medium text-[#1d1d1f]
                transition-[transform,border-color,background-color]
                duration-300
                hover:-translate-y-0.5
                hover:border-[#a1a1a6]
                hover:bg-white
                active:scale-[0.97]
                md:px-8 md:py-4
              "
            >
              Llamar
            </a>
          </div>

          {/* Correo */}
          <div
            className={`
              transform-gpu
              transition-[opacity,transform]
              delay-[510ms]
              duration-[750ms]
              ease-[cubic-bezier(0.16,1,0.3,1)]
              [backface-visibility:hidden]
              motion-reduce:transform-none
              motion-reduce:opacity-100
              motion-reduce:transition-none
              ${
                visible
                  ? "translate-x-0 translate-y-0 scale-100 opacity-100"
                  : "translate-x-6 translate-y-6 scale-[0.94] opacity-0"
              }
            `}
          >
            <a
              href={emailUrl}
              className="
                block w-full cursor-pointer
                rounded-full
                border border-[#d2d2d7]
                bg-white/75
                px-7 py-3
                text-center font-medium text-[#1d1d1f]
                transition-[transform,border-color,background-color]
                duration-300
                hover:-translate-y-0.5
                hover:border-[#a1a1a6]
                hover:bg-white
                active:scale-[0.97]
                md:px-8 md:py-4
              "
            >
              Correo
            </a>
          </div>

        </div>
      </div>

      {/* Separador inferior */}
      <BiNeBianniDivider position="bottom" />
    </section>
  );
}