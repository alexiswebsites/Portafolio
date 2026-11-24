"use client";

import { forwardRef } from "react";

export const PROYECTOS = ["Hamburguesas Fátima", "Bi Ne Bianni"];
export const MAX_COMENTARIO = 2000;

// Base SIN color de fondo: cada variante define el suyo para evitar conflictos
const btnBase = `
  inline-flex min-h-11 cursor-pointer items-center justify-center
  rounded-full px-5 text-sm font-semibold
  transition-[background-color,box-shadow,transform,opacity] duration-200 ease-apple
  active:scale-[0.97]
  focus-visible:outline-2 focus-visible:outline-offset-2
  focus-visible:outline-[#1d1d1f]
  disabled:pointer-events-none disabled:opacity-50
`;

// Azul #0071e3 con texto blanco = 4.6:1 (WCAG AA)
export const btnPrimary = `
  ${btnBase}
  bg-[#0071e3] text-white hover:bg-[#0062c4]
  focus-visible:outline-[#0071e3]
`;
export const btnSecondary = `
  ${btnBase}
  bg-white text-[#1d1d1f] ring-1 ring-inset ring-black/15 hover:ring-[#1d1d1f]
`;
export const btnDanger = `
  ${btnBase}
  bg-white text-[#d70015] ring-1 ring-inset ring-[#d70015]/30 hover:ring-[#d70015]
`;

export const panelClass = `
  mx-auto max-w-3xl rounded-[28px] bg-white
  ring-1 ring-black/[0.08]
  shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-16px_rgba(0,0,0,0.12)]
`;

// Borde #86868b = 3.6:1 sobre blanco (WCAG 1.4.11)
const fieldClass = `
  mt-2 w-full rounded-2xl bg-white px-4 py-3.5
  text-[15px] text-[#1d1d1f]
  ring-1 ring-[#86868b]
  transition-[box-shadow,opacity] duration-200
  placeholder:text-[#6e6e73]
  hover:ring-[#1d1d1f]
  focus:outline-none focus:ring-2 focus:ring-[#0071e3]
  disabled:cursor-not-allowed disabled:opacity-50
`;

const labelClass = "block text-sm font-semibold text-[#1d1d1f]";

const ResenaForm = forwardRef(function ResenaForm(
  { nombre, form, error, enviando, onChange, onSubmit, onClose },
  selectRef,
) {
  return (
    <div className={`${panelClass} mt-4 p-6 sm:p-10`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold tracking-[-0.025em]">
            Escribe tu comentario
          </h3>
          <p className="mt-2 text-sm text-[#6e6e73]">
            Publicando como{" "}
            <span className="font-semibold text-[#1d1d1f]">{nombre}</span>
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          disabled={enviando}
          aria-label="Cerrar formulario"
          className="
            flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center
            rounded-full bg-white text-[#1d1d1f]
            ring-1 ring-inset ring-black/15
            transition-[box-shadow,transform] duration-200 ease-apple
            hover:ring-[#1d1d1f] active:scale-[0.95]
            focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-[#1d1d1f]
            disabled:pointer-events-none disabled:opacity-50
          "
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-6">
        <div>
          <label htmlFor="proyecto-comentario" className={labelClass}>
            Sitio web relacionado
          </label>

          <div className="relative">
            <select
              ref={selectRef}
              id="proyecto-comentario"
              name="proyecto"
              value={form.proyecto}
              onChange={onChange}
              required
              disabled={enviando}
              className={`${fieldClass} cursor-pointer appearance-none pr-12`}
            >
              <option value="">Selecciona un sitio web</option>
              {PROYECTOS.map((proyecto) => (
                <option key={proyecto} value={proyecto}>
                  {proyecto}
                </option>
              ))}
            </select>

            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="pointer-events-none absolute right-4 top-1/2 mt-1 h-4 w-4 -translate-y-1/2 text-[#6e6e73]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>

        <div>
          <label htmlFor="comentario-proyecto" className={labelClass}>
            Comentario
          </label>

          <textarea
            id="comentario-proyecto"
            name="comentario"
            value={form.comentario}
            onChange={onChange}
            placeholder="Cuéntanos tu experiencia con este sitio web…"
            rows={5}
            required
            minLength={10}
            maxLength={MAX_COMENTARIO}
            disabled={enviando}
            aria-describedby="comentario-contador"
            className={`${fieldClass} resize-none leading-relaxed`}
          />

          <p
            id="comentario-contador"
            className="mt-2 text-right text-xs tabular-nums text-[#6e6e73]"
          >
            {form.comentario.length}/{MAX_COMENTARIO} caracteres (mínimo 10)
          </p>
        </div>

        {error && (
          <p
            role="alert"
            className="flex items-start gap-2.5 rounded-2xl bg-white px-4 py-3.5 text-sm font-medium text-[#d70015] ring-1 ring-inset ring-[#d70015]/40"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="mt-px h-4 w-4 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            {error}
          </p>
        )}

        <div className="flex flex-col-reverse gap-2 border-t border-black/[0.08] pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={enviando}
            className={btnSecondary}
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={enviando}
            className={`${btnPrimary} gap-2 sm:px-7`}
          >
            {enviando && (
              <span
                aria-hidden="true"
                className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white motion-safe:animate-spin"
              />
            )}
            {enviando ? "Publicando…" : "Publicar comentario"}
          </button>
        </div>
      </form>
    </div>
  );
});

export default ResenaForm;