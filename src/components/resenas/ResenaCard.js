export default function ResenaCard({ nombre, proyecto, comentario }) {
  return (
    <figure
      className="
        relative flex h-full flex-col rounded-3xl bg-white p-5 sm:p-6
        ring-1 ring-black/[0.08]
        shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.1)]
        transition-transform duration-300 ease-apple
        motion-safe:hover:-translate-y-1
        before:pointer-events-none before:absolute before:inset-0 before:rounded-3xl
        before:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.22)]
        before:opacity-0 before:transition-opacity before:duration-300
        hover:before:opacity-100
      "
    >
      <figcaption className="border-b border-black/[0.08] pb-4">
        {/* dl/dt/dd: forma semántica de pares "etiqueta: valor" */}
        <dl className="grid gap-2">
          <div className="flex min-w-0 items-baseline gap-2">
            <dt className="shrink-0 text-[13px] text-[#6e6e73]">
              Nombre de usuario:
            </dt>
            <dd className="min-w-0 truncate text-base font-semibold tracking-[-0.01em] text-[#1d1d1f]">
              {nombre}
            </dd>
          </div>

          {proyecto && (
            <div className="flex min-w-0 items-baseline gap-2">
              <dt className="shrink-0 text-[13px] text-[#6e6e73]">
                Sitio web relacionado:
              </dt>
              <dd className="flex min-w-0 items-center gap-1.5 text-sm font-semibold text-[#1d1d1f]">
                <span
                  aria-hidden="true"
                  className="size-1.5 shrink-0 rounded-full bg-[#1d1d1f]"
                />
                <span className="truncate">{proyecto}</span>
              </dd>
            </div>
          )}
        </dl>
      </figcaption>

      <blockquote className="mt-4 flex-1">
        <p className="whitespace-pre-wrap break-words text-[15px] leading-relaxed text-[#1d1d1f]">
          {comentario}
        </p>
      </blockquote>
    </figure>
  );
}