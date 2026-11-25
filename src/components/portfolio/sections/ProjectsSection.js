import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    title: "Modo de Viaje",
    subtitle: "Agencia de viajes de Perú",
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

/* ---------- Barra del navegador (decorativa) ---------- */

const trafficLights = [
  {
    color: "bg-[#ff5f57]",
    glyph: (
      <path
        d="M4.2 4.2l3.6 3.6M7.8 4.2 4.2 7.8"
        stroke="#4d0000"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    ),
  },
  {
    color: "bg-[#febc2e]",
    glyph: (
      <path
        d="M3.6 6h4.8"
        stroke="#985600"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    ),
  },
  {
    color: "bg-[#28c840]",
    glyph: (
      <>
        <path d="M3.6 3.6h3.6L3.6 7.2z" fill="#006500" />
        <path d="M8.4 8.4H4.8l3.6-3.6z" fill="#006500" />
      </>
    ),
  },
];

/*
  Grid de 3 columnas: [círculos] [URL] [vacío]
  - Las columnas de los lados son 1fr → miden lo mismo → la URL queda
    en el centro exacto de la card.
  - La del centro mide lo que mide el texto (auto).
  - Solo en pantallas muy angostas (ej. iPhone SE) la columna derecha
    cede espacio para que la URL no se corte.
*/
function BrowserBar({ domain }) {
  // "alexissanchez.vercel.app/quickcart" → host + "/quickcart"
  const [host, ...rest] = domain.split("/");
  const path = rest.length ? `/${rest.join("/")}` : "";

  return (
    // Todo es decorativo: un solo aria-hidden en el contenedor basta
    <div
      aria-hidden="true"
      className="
        @container grid h-10 items-center gap-2 border-b border-black/[0.06] px-3
        grid-cols-[minmax(max-content,1fr)_minmax(0,auto)_minmax(0,1fr)]
        bg-linear-to-b from-[#fbfbfd] to-[#efeff1]
      "
    >
      {/* Círculos rojo / amarillo / verde (más chicos en cards angostas) */}
      <div className="flex gap-1 @[400px]:gap-1.5">
        {trafficLights.map(({ color, glyph }, i) => (
          <span
            key={i}
            className={`grid size-2.5 place-items-center rounded-full ${color} ring-1 ring-inset ring-black/[0.12] @[400px]:size-3`}
          >
            <svg viewBox="0 0 12 12" className="size-full">
              {glyph}
            </svg>
          </span>
        ))}
      </div>

      {/* Barra de dirección: mide lo que mide el texto */}
      <div
        className="
          flex h-6 min-w-0 items-center justify-center gap-1.5 rounded-md
          bg-white px-2.5 ring-1 ring-black/[0.06]
          shadow-[0_1px_2px_rgba(0,0,0,0.06)]
        "
      >
        {/* Candado: solo cuando hay espacio de sobra */}
        <svg
          viewBox="0 0 24 24"
          className="hidden size-3 shrink-0 text-[#6e6e73] @[440px]:block"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>

        {/*
          La letra se adapta al ancho de la barra (100cqi), entre 10px y 12px.
          136px = espacio fijo (padding + círculos + huecos); 19 ≈ ancho de
          34 caracteres, la URL más larga (alexissanchez.vercel.app/quickcart).
        */}
        <span className="min-w-0 truncate text-[length:clamp(10px,calc((100cqi_-_136px)/19),12px)] font-medium text-[#424245]">
          {host}
          {/* La ruta SIEMPRE se muestra: sin ella, /quickcart parecería tu portafolio */}
          {path && <span className="text-[#6e6e73]">{path}</span>}
        </span>
      </div>

      {/* La 3.ª columna queda vacía: equilibra a los círculos para centrar la URL */}
    </div>
  );
}

/* ---------- Card ---------- */

/*
  Hover / foco (la imagen NO se escala, así no se corta nada):
  - La card sube y su fondo pasa de gris a blanco
  - Aparece una sombra neutra más profunda
  - El círculo de la flecha se pone negro y la flecha se desliza hacia ↗
  - "Visitar sitio" se subraya de izquierda a derecha
  En Tailwind v4, hover: solo aplica en dispositivos con mouse,
  así que en celular no se queda "pegado" al tocar.
*/
const cardClass = `
  group relative flex h-full flex-col rounded-3xl bg-[#f5f5f7]
  ring-1 ring-black/[0.06]
  shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.12)]
  transition duration-500 ease-apple
  hover:bg-white
  motion-safe:hover:-translate-y-1.5
  motion-safe:focus-visible:-translate-y-1.5
  before:pointer-events-none before:absolute before:inset-0 before:rounded-3xl
  before:shadow-[0_30px_60px_-28px_rgba(0,0,0,0.28)]
  before:opacity-0 before:transition-opacity before:duration-500
  hover:before:opacity-100 focus-visible:before:opacity-100
  focus-visible:bg-white focus-visible:outline-none
  focus-visible:ring-2 focus-visible:ring-[#0066cc]
  focus-visible:ring-offset-4 focus-visible:ring-offset-white
`;

function ProjectCard({ project, featured }) {
  const { title, subtitle, category, description, domain, image, href, cta } =
    project;
  const isInternal = href.startsWith("/");

  const content = (
    <>
      {/* Ventana tipo navegador */}
      <div className="overflow-hidden rounded-t-3xl border-b border-black/[0.06]">
        <BrowserBar domain={domain} />

        {/* La imagen nunca se escala: se ve completa siempre */}
        <div className="relative aspect-video bg-[#e8e8ed]">
          <Image
            src={image}
            alt={`Vista previa del sitio web de ${title}`}
            fill
            sizes={
              featured
                ? "(min-width: 1024px) 500px, (min-width: 640px) 50vw, 100vw"
                : "(min-width: 1024px) 330px, (min-width: 640px) 50vw, 100vw"
            }
            className="object-cover object-top"
          />
        </div>
      </div>

      {/* Información (sin fondo propio: toma el de la card y cambia junto con ella) */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
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
          <span
            className="
              relative text-sm font-semibold text-[#0055b3]
              after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full
              after:origin-left after:scale-x-0 after:bg-current
              after:transition-transform after:duration-300 after:ease-apple
              group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100
            "
          >
            {cta}
          </span>

          <span
            aria-hidden="true"
            className="
              flex size-9 shrink-0 items-center justify-center rounded-full
              bg-white text-[#1d1d1f]
              shadow-[0_1px_2px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.04]
              transition-colors duration-300
              group-hover:bg-[#1d1d1f] group-hover:text-white
              group-focus-visible:bg-[#1d1d1f] group-focus-visible:text-white
            "
          >
            <svg
              viewBox="0 0 24 24"
              className="
                size-4 transition-transform duration-300 ease-apple
                motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5
                motion-safe:group-focus-visible:translate-x-0.5 motion-safe:group-focus-visible:-translate-y-0.5
              "
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </span>
        </div>
      </div>
    </>
  );

  // Ruta interna → <Link> (navegación rápida de Next, misma pestaña)
  if (isInternal) {
    return (
      <Link href={href} className={cardClass}>
        {content}
      </Link>
    );
  }

  // Sitio externo → pestaña nueva + aviso para lectores de pantalla
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

/* ---------- Sección ---------- */

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
            <ProjectCard project={project} featured={layout[index].featured} />
          </li>
        ))}
      </ul>
    </section>
  );
}