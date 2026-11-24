export default function ResenaCard({ nombre, proyecto, comentario }) {
  return (
    <figure
      className="
        flex h-full flex-col rounded-[28px] bg-white p-7 sm:p-9
        ring-1 ring-black/[0.08]
        shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-16px_rgba(0,0,0,0.12)]
        transition-[transform,box-shadow] duration-300 ease-apple
        hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_28px_56px_-24px_rgba(0,0,0,0.22)]
        motion-safe:hover:-translate-y-1
      "
    >
      <figcaption className="border-b border-black/[0.08] pb-5">
        {/* dl/dt/dd: forma semántica de pares "etiqueta: valor" */}
        <dl className="grid gap-2.5">
          <div className="flex min-w-0 items-baseline gap-2">
            <dt className="shrink-0 text-sm text-[#6e6e73]">
              Nombre de usuario:
            </dt>
            <dd className="min-w-0 truncate text-lg font-semibold tracking-[-0.01em] text-[#1d1d1f]">
              {nombre}
            </dd>
          </div>

          {proyecto && (
            <div className="flex min-w-0 items-baseline gap-2">
              <dt className="shrink-0 text-sm text-[#6e6e73]">
                Sitio web relacionado:
              </dt>
              <dd className="flex min-w-0 items-center gap-2 text-[15px] font-semibold text-[#1d1d1f]">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 shrink-0 rounded-full bg-[#0071e3]"
                />
                <span className="truncate">{proyecto}</span>
              </dd>
            </div>
          )}
        </dl>
      </figcaption>

      <blockquote className="mt-6 flex-1">
        <p className="whitespace-pre-wrap break-words text-[17px] leading-[1.65] tracking-[-0.01em] text-[#1d1d1f]">
          {comentario}
        </p>
      </blockquote>
    </figure>
  );
}