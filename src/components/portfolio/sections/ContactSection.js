import { FaWhatsapp } from "react-icons/fa";

const whatsappMessage =
  "Hola, me interesa solicitar información sobre la creación de un sitio web.";

const whatsappUrl = `https://wa.me/5213312891927?text=${encodeURIComponent(
  whatsappMessage,
)}`;

const phoneUrl = "tel:+523312891927";

const emailUrl =
  "mailto:alexissanchezdev7@gmail.com?subject=Cotización%20de%20página%20web";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="
        bg-white text-[#1d1d1f]
        px-5 py-14 text-center
        md:px-6 md:py-[4.5rem]
      "
    >
      <div className="mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-[0.18em] text-[#6e6e73] md:text-sm">
          Contacto
        </p>

        <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#1d1d1f] md:text-4xl">
          ¿Necesitas una página o sistema web?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#6e6e73] md:text-base">
          Dime qué tipo de página necesitas, para qué negocio o proyecto será,
          o si buscas mejorar o dar mantenimiento a un sitio existente. El
          precio depende del tipo de sitio web, las secciones y funciones que
          necesites.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp (se abre en una nueva pestaña)"
            className="
              flex w-full items-center justify-center gap-2
              rounded-full bg-[#15803d]
              px-7 py-3 font-semibold text-white
              shadow-[0_8px_24px_rgba(21,128,61,0.16)]
              transition-[transform,background-color] duration-300
              hover:bg-[#166534]
              motion-safe:hover:-translate-y-0.5
              active:scale-[0.97]
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15803d]
              sm:w-auto md:px-8 md:py-4
            "
          >
            <FaWhatsapp aria-hidden="true" className="text-xl" />
            <span>Contactar por WhatsApp</span>
          </a>

          <a
            href={phoneUrl}
            aria-label="Llamar al 33 1289 1927"
            className="
              block w-full rounded-full
              border border-[#d2d2d7] bg-white
              px-7 py-3 font-medium text-[#1d1d1f]
              transition-[transform,border-color] duration-300
              hover:border-[#a1a1a6]
              motion-safe:hover:-translate-y-0.5
              active:scale-[0.97]
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d1d1f]
              sm:w-auto md:px-8 md:py-4
            "
          >
            Llamar
          </a>

          <a
            href={emailUrl}
            aria-label="Enviar correo a alexissanchezdev7@gmail.com"
            className="
              block w-full rounded-full
              border border-[#d2d2d7] bg-white
              px-7 py-3 font-medium text-[#1d1d1f]
              transition-[transform,border-color] duration-300
              hover:border-[#a1a1a6]
              motion-safe:hover:-translate-y-0.5
              active:scale-[0.97]
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d1d1f]
              sm:w-auto md:px-8 md:py-4
            "
          >
            Correo
          </a>
        </div>
      </div>
    </section>
  );
}