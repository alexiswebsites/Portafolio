import { FaWhatsapp } from "react-icons/fa";
import HeroMockup from "./HeroMockup";

const WHATSAPP_NUMBER = "5213312891927";
const WHATSAPP_MESSAGE =
  "Hola, me interesa una página web para mi negocio. ¿Me das más información?";

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

/*
  El Hero mide exactamente una pantalla (100vh).
  Todos los espacios y tamaños usan vh (1vh = 1% de la altura de la pantalla)
  dentro de clamp() → se adaptan a pantallas altas o bajas sin pasarse
  de un mínimo ni de un máximo.

  En móvil: mockup + texto forman un solo bloque centrado verticalmente
  (content-center), así el texto queda pegado al mockup y no al borde de abajo.
*/
export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="
        relative h-screen max-h-screen overflow-hidden
        bg-white
        pt-[74px] sm:pt-[70px]
      "
    >
      <div
        className="
          mx-auto grid h-full min-h-0 w-full max-w-7xl
          grid-rows-[minmax(0,auto)_auto]
          content-center items-center
          gap-[clamp(0.5rem,2.5vh,1.5rem)]
          px-4
          pb-[clamp(1.25rem,5vh,3rem)]
          pt-[clamp(0.25rem,1vh,1rem)]
          sm:px-8
          lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]
          lg:grid-rows-1 lg:gap-10
        "
      >
        {/* Texto + botones */}
        <div
          className="
            fade
            order-2 mx-auto w-full max-w-md
            text-center
            lg:order-1 lg:mx-0 lg:max-w-xl lg:text-left
          "
        >
          <p
            className="
              mb-[clamp(0.5rem,1.5vh,1rem)]
              text-[11px] font-semibold uppercase
              tracking-[0.22em] text-[#6e6e73]
              sm:text-xs
            "
          >
            Desarrollo y diseño web
          </p>

          <h1
            id="hero-title"
            className="
              text-balance
              text-[length:clamp(1.85rem,min(8vw,6vh),4.75rem)]
              font-semibold leading-[1.02]
              tracking-[-0.045em] text-[#1d1d1f]
            "
          >
            Creador de sitios web
            <span className="block text-[#86868b]">para tu negocio.</span>
          </h1>

          <div
            className="
              mt-[clamp(1rem,3.5vh,2.5rem)]
              flex flex-col gap-2
              sm:flex-row sm:justify-center sm:gap-2.5
              lg:justify-start
            "
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp (se abre en una nueva pestaña)"
              className="
                inline-flex min-h-12 items-center justify-center gap-2
                rounded-full bg-[#15803d] px-7
                text-sm font-semibold text-white
                transition-[background-color,translate,scale] duration-200 ease-apple
                hover:bg-[#166534]
                active:scale-[0.97]
                motion-safe:hover:-translate-y-0.5
                focus-visible:outline-2 focus-visible:outline-offset-2
                focus-visible:outline-[#15803d]
              "
            >
              <FaWhatsapp aria-hidden="true" className="text-xl" />
              Contactar por WhatsApp
            </a>

            <a
              href="#projects"
              className="
                inline-flex min-h-12 items-center justify-center
                rounded-full border border-[#d2d2d7] bg-white px-7
                text-sm font-semibold text-[#1d1d1f]
                transition-[background-color,border-color,translate,scale] duration-200 ease-apple
                hover:border-[#1d1d1f] hover:bg-[#f5f5f7]
                active:scale-[0.97]
                motion-safe:hover:-translate-y-0.5
                focus-visible:outline-2 focus-visible:outline-offset-2
                focus-visible:outline-[#1d1d1f]
              "
            >
              Ver mis proyectos
            </a>
          </div>
        </div>

        {/* Mockup */}
        <div
          className="
            fade [--delay:90ms]
            order-1 flex min-h-0 w-full min-w-0
            items-center justify-center
            lg:order-2 lg:h-full
          "
        >
          <div className="w-full max-w-[68vh] lg:max-w-[760px]">
            <HeroMockup />
          </div>
        </div>
      </div>
    </section>
  );
}