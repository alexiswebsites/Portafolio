import { FaWhatsapp } from "react-icons/fa";
import HeroMockup from "./HeroMockup";

const WHATSAPP_NUMBER = "5213312891927";
const WHATSAPP_MESSAGE =
  "Hola, me interesa una página web para mi negocio. ¿Me das más información?";

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

/*
  Mide la pantalla UNA vez al cargar y guarda la altura en --hero-h.
  - No cambia cuando la barra del navegador se esconde o aparece.
  - Solo recalcula si cambia el ANCHO (girar el celular).
*/
const lockHeroHeight = `
(function () {
  var root = document.documentElement;
  var lastWidth = window.innerWidth;

  function setHeight() {
    root.style.setProperty("--hero-h", window.innerHeight + "px");
  }

  setHeight();

  window.addEventListener("resize", function () {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    setHeight();
  });
})();
`;

export default function HeroSection() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: lockHeroHeight }} />

      <section
        aria-labelledby="hero-title"
        style={{
          height: "var(--hero-h, 100svh)",
          maxHeight: "var(--hero-h, 100svh)",
          // 1% de la altura fija del Hero: todo se mide con esto
          "--hu": "calc(var(--hero-h, 100svh) / 100)",
        }}
        className="
          relative
          overflow-hidden
          bg-white
          pt-[74px] sm:pt-[70px]
        "
      >
        <div
          className="
            mx-auto grid h-full min-h-0 w-full max-w-7xl
            grid-rows-[minmax(0,1fr)_auto]
            items-center
            gap-[clamp(0.5rem,calc(var(--hu)*2.5),1.5rem)]
            px-4
            pb-[clamp(1.25rem,calc(var(--hu)*5),3rem)]
            pt-[clamp(0.25rem,calc(var(--hu)*1),1rem)]
            sm:px-8
            lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]
            lg:grid-rows-1 lg:gap-10
          "
        >
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
                mb-[clamp(0.5rem,calc(var(--hu)*1.5),1rem)]
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
                text-[length:clamp(1.85rem,min(8vw,calc(var(--hu)*6)),4.75rem)]
                font-semibold leading-[1.02]
                tracking-[-0.045em] text-[#1d1d1f]
              "
            >
              Creador de sitios web
              <span className="block text-[#86868b]">para tu negocio.</span>
            </h1>

            <div
              className="
                mt-[clamp(1rem,calc(var(--hu)*3.5),2.5rem)]
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
                  transition-[background-color,transform] duration-200 ease-apple
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
                  transition-[background-color,border-color,transform] duration-200 ease-apple
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

          <div
            className="
              fade [--delay:90ms]
              order-1 flex h-full min-h-0 w-full min-w-0
              items-center justify-center
              lg:order-2
            "
          >
            <div className="w-full max-w-[calc(var(--hu)*68)] lg:max-w-[760px]">
              <HeroMockup />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}