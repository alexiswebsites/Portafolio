const technologies = [
  {
    name: "Next.js",
    type: "Framework",
    description: "Sitios rápidos y optimizados.",
    color: "bg-[#1d1d1f]",
  },
  {
    name: "React",
    type: "Librería",
    description: "Interfaces dinámicas por componentes.",
    color: "bg-[#61dafb]",
  },
  {
    name: "Tailwind CSS",
    type: "Estilos",
    description: "Diseños responsive y detallados.",
    color: "bg-[#38bdf8]",
  },
  {
    name: "JavaScript",
    type: "Lenguaje",
    description: "Lógica e interactividad web.",
    color: "bg-[#facc15]",
  },
  {
    name: "Node.js",
    type: "Backend",
    description: "APIs y funciones del servidor.",
    color: "bg-[#84cc16]",
  },
  {
    name: "MySQL",
    type: "Base de datos",
    description: "Usuarios, productos e información.",
    color: "bg-[#60a5fa]",
  },
  {
    name: "WordPress",
    type: "CMS",
    description: "Sitios administrables para negocios.",
    color: "bg-[#21759b]",
  },
  {
    name: "Vercel",
    type: "Despliegue",
    description: "Publicación rápida de proyectos.",
    color: "bg-[#1d1d1f]",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="
        bg-white text-[#1d1d1f]
        px-5 py-8
        sm:px-8 sm:py-20
        lg:py-1
      "
    >
      <div className="mx-auto max-w-5xl">
        <p
          className="
            text-xs font-semibold uppercase
            tracking-[0.22em] text-[#6e6e73]
          "
        >
          Sobre mí
        </p>

        <h2
          id="about-title"
          className="
            mt-3 max-w-3xl text-balance
            text-[length:clamp(1.75rem,5vw,3rem)]
            font-semibold leading-[1.08]
            tracking-[-0.035em]
          "
        >
          Desarrollo páginas y sistemas interactivos.
        </h2>

        <div
          className="
            mt-6 max-w-3xl space-y-4
            text-base leading-relaxed text-[#6e6e73]
            sm:text-lg
          "
        >
          <p className="text-[#1d1d1f]">
            Me gusta crear sitios claros, modernos y fáciles de usar, cuidando
            tanto el diseño como el funcionamiento.
          </p>

          <p>
            Estudié la carrera de Tecnólogo Profesional en Sistemas
            Informáticos en la Escuela Politécnica de Guadalajara, donde
            fortalecí mis bases en lógica, programación, software y tecnologías
            web.
          </p>

          <p>
            Trabajo con dedicación, cuidando el diseño, la estructura del
            código y la experiencia del usuario.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-5xl sm:mt-20">
        <p
          className="
            text-xs font-semibold uppercase
            tracking-[0.22em] text-[#6e6e73]
          "
        >
          Stack
        </p>

        <h3
          className="
            mt-3 text-[length:clamp(1.375rem,3.5vw,1.875rem)]
            font-semibold tracking-[-0.025em]
          "
        >
          Tecnologías con las que trabajo
        </h3>

        <ul
          className="
            mt-8 grid grid-cols-2 gap-3
            sm:gap-4 lg:grid-cols-4
          "
        >
          {technologies.map((technology) => (
            <li
              key={technology.name}
              className="
                min-w-0 rounded-2xl
                bg-[#f5f5f7] p-4
                transition-colors duration-200 ease-apple
                hover:bg-[#ededf0]
                sm:rounded-3xl sm:p-6
              "
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className={`h-2.5 w-2.5 shrink-0 rounded-full ${technology.color}`}
                />

                <h4 className="truncate text-sm font-semibold sm:text-base">
                  {technology.name}
                </h4>
              </div>

              <p className="mt-1 text-xs font-medium text-[#6e6e73] sm:text-sm">
                {technology.type}
              </p>

              <p
                className="
                  mt-3 text-[13px] leading-relaxed text-[#424245]
                  sm:mt-4 sm:text-sm
                "
              >
                {technology.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}