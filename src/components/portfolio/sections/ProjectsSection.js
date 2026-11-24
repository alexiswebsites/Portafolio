import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    title: "Modo de Viaje",
    subtitle: "Sitio web de viajes · México",
    category: "Agencia de viajes",
    description:
      "Sitio web para una agencia de viajes con experiencias curadas, viajes a medida y en grupo, presentación de servicios y contacto directo por WhatsApp.",
    domain: "mododeviaje.com",
    image: "/images/proyectos/heromdv.png",
    href: "https://mododeviaje.com/",
    cta: "Visitar sitio",
  },
  {
    title: "Bi Ne Bianni",
    subtitle: "Mediación entre empresas y comunidades",
    category: "Consultoría social",
    description:
      "Sitio web para una consultoría social que vincula empresas con comunidades, con secciones informativas, presentación de servicios y diseño moderno.",
    domain: "bnbconsultoria.com",
    image: "/images/proyectos/herobinebiani.png",
    href: "https://bnbconsultoria.com/",
    cta: "Visitar sitio",
  },
  {
    title: "QuickCart",
    subtitle: "Tienda demo con carrito de compras",
    category: "Tienda de electrónica",
    description:
      "Tienda online de demostración con catálogo de productos electrónicos por categorías, carrito de compras y flujo de pedido simulado.",
    domain: "alexissanchez.vercel.app/quickcart",
    image: "/images/proyectos/heroquickcart.png",
    href: "/quickcart",
    cta: "Visitar sitio",
  },
  {
    title: "Hamburguesas Fátima",
    subtitle: "Menú digital para entregas a domicilio",
    category: "Puesto de comida",
    description:
      "Página web para un puesto de comida, enfocada en mostrar un menú digital con carrito, recibir pedidos a domicilio por WhatsApp y facilitar la atención directa con clientes.",
    domain: "hamburguesas-fatima.vercel.app",
    image: "/images/proyectos/herofatima.png",
    href: "https://hamburguesas-fatima.vercel.app/",
    cta: "Visitar sitio",
  },
  // Quinto proyecto: descoméntalo cuando lo tengas listo
  // {
  //   title: "Foto Estudio Sánchez",
  //   subtitle: "Estudio de fotografía · México",
  //   category: "Fotografía",
  //   description:
  //     "Sitio web para un estudio de fotografía con galería de trabajos, paquetes de sesiones y contacto para agendar citas.",
  //   domain: "fotoestudiosanchez.com",
  //   image: "/images/proyectos/herofotoestudio.png",
  //   href: "https://fotoestudiosanchez.com/",
  //   cta: "Visitar sitio",
  // },
];

/*
  Layout automático según cuántos proyectos haya.
  Escritorio (6 columnas): filas de 3 cards; si sobran, las primeras filas
  llevan 2 cards más grandes → nunca queda una card sola.
    4 → 2+2 · 5 → 2+3 · 6 → 3+3 · 7 → 2+2+3 · 8 → 2+3+3
  Tablet (4 columnas): filas de 2; si es impar, la última se centra.
  Celular: 1 columna.
*/
function getLayout(total) {
  if (total === 1) {
    return [
      {
        featured: false,
        className: "sm:col-span-2 sm:col-start-2 lg:col-span-2 lg:col-start-3",
      },
    ];
  }

  const remainder = total % 3;
  const featuredCount = remainder === 0 ? 0 : remainder === 2 ? 2 : 4;

  return Array.from({ length: total }, (_, i) => {
    const featured = i < featuredCount;
    const isOddLast = total % 2 === 1 && i === total - 1;

    return {
      featured,
      className: [
        "sm:col-span-2",
        featured ? "lg:col-span-3" : "lg:col-span-2",
        isOddLast ? "sm:col-start-2 lg:col-start-auto" : "",
      ].join(" "),
    };
  });
}

function ArrowIcon({ external }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {external ? (
        <path d="M7 17 17 7M8 7h9v9" />
      ) : (
        <path d="M5 12h14M13 6l6 6-6 6" />
      )}
    </svg>
  );
}

function ProjectCard({ project, featured }) {
  const { title, subtitle, category, description, domain, image, href, cta } =
    project;
  const isInternal = href.startsWith("/");

  const cardClass = `
    group relative flex h-full flex-col rounded-[24px] bg-[#f5f5f7]
    ring-1 ring-black/[0.06]
    shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.12)]
    transition-transform duration-500 ease-apple
    motion-safe:hover:-translate-y-1
    before:pointer-events-none before:absolute before:inset-0 before:rounded-[24px]
    before:shadow-[0_28px_56px_-24px_rgba(0,0,0,0.25)]
    before:opacity-0 before:transition-opacity before:duration-500
    hover:before:opacity-100
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066cc]
    focus-visible:ring-offset-4 focus-visible:ring-offset-white
  `;

  const content = (
    <>
      {/* Ventana tipo navegador */}
      <div className="relative overflow-hidden rounded-t-[24px] border-b border-black/[0.06]">
        <div className="flex h-10 items-center gap-3 border-b border-black/[0.06] bg-[#f5f5f7] px-4">
          <div className="flex shrink-0 gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57] ring-1 ring-inset ring-black/[0.12]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e] ring-1 ring-inset ring-black/[0.12]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840] ring-1 ring-inset ring-black/[0.12]" />
          </div>

          <div
            aria-hidden="true"
            className="
              mx-auto flex h-6 min-w-0 max-w-[75%] items-center gap-1.5 rounded-md
              bg-white px-3 ring-1 ring-black/[0.06]
              shadow-[0_1px_2px_rgba(0,0,0,0.06)]
            "
          >
            <svg
              viewBox="0 0 24 24"
              className="h-3 w-3 shrink-0 text-[#515154]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            <span className="truncate text-xs font-medium text-[#424245]">
              {domain}
            </span>
          </div>

          <div className="w-[48px] shrink-0" aria-hidden="true" />
        </div>

        <div className="relative aspect-video overflow-hidden bg-[#f5f5f7]">
          <Image
            src={image}
            alt={`Vista previa del sitio web de ${title}`}
            fill
            sizes={
              featured
                ? "(min-width: 1024px) 500px, (min-width: 640px) 50vw, 100vw"
                : "(min-width: 1024px) 330px, (min-width: 640px) 50vw, 100vw"
            }
            className="
              object-cover object-top
              transition-transform duration-700 ease-apple
              motion-safe:group-hover:scale-[1.03]
            "
          />
        </div>
      </div>

      {/* Información */}
      <div className="flex flex-1 flex-col rounded-b-[24px] bg-[#f5f5f7] px-6 pb-6 pt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0055b3]">
          {category}
        </p>

        <h3
          className={`mt-2 font-semibold leading-snug tracking-tight text-[#1d1d1f] ${
            featured ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
          }`}
        >
          {title}
        </h3>

        <p className="mt-1 text-sm font-medium text-[#424245]">{subtitle}</p>

        <p className="mt-3 text-[15px] leading-relaxed text-[#515154]">
          {description}
        </p>

        {/* mt-auto empuja el CTA al fondo para que todas las cards queden parejas */}
        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <span className="text-sm font-semibold text-[#0055b3] transition-colors duration-300 group-hover:text-[#003d82]">
            {cta}
          </span>

          <span
            aria-hidden="true"
            className="
              flex h-9 w-9 shrink-0 items-center justify-center rounded-full
              bg-white text-[#1d1d1f]
              shadow-[0_1px_2px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.04]
              transition-colors duration-300
              group-hover:bg-[#0066cc] group-hover:text-white
              group-focus-visible:bg-[#0066cc] group-focus-visible:text-white
            "
          >
            <ArrowIcon external={!isInternal} />
          </span>
        </div>
      </div>
    </>
  );

  if (isInternal) {
    return (
      <Link href={href} className={cardClass}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClass}
    >
      {content}
      <span className="sr-only"> (se abre en una pestaña nueva)</span>
    </a>
  );
}

export default function ProjectsSection() {
  const layout = getLayout(projects.length);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="bg-white px-5 py-16 text-[#1d1d1f] sm:px-6 md:py-24 lg:px-8"
    >
      <header className="mx-auto mb-10 max-w-5xl md:mb-14">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6e6e73]">
            Portafolio
          </p>

          <h2
            id="projects-heading"
            className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl"
          >
            Proyectos propios
          </h2>

          <p className="mt-4 text-base leading-relaxed text-[#424245] md:text-lg">
            Una selección de proyectos creados para mostrar mi forma de
            trabajar.
          </p>
        </div>
      </header>

      <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-4 lg:grid-cols-6 lg:gap-6">
        {projects.map((project, index) => (
          <li key={project.title} className={layout[index].className}>
            <ProjectCard
              project={project}
              featured={layout[index].featured}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}