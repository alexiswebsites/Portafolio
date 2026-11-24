export default function PortfolioFooter() {
  return (
    <footer className="bg-white px-6 py-8 text-center text-sm text-[#6e6e73]">
      <p>© 2026 Miguel Alexis Sánchez Carranza.</p>

      <div className="mt-3 space-y-1">
        <p>
          WhatsApp:{" "}
          <a
            href="https://wa.me/523312891927"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 transition-colors hover:text-[#0071e3] hover:underline"
          >
            +52 33 1289 1927
          </a>
        </p>

        <p>
          Correo:{" "}
          <a
            href="mailto:alexissanchezdev7@gmail.com"
            className="underline-offset-4 transition-colors hover:text-[#0071e3] hover:underline"
          >
            alexissanchezdev7@gmail.com
          </a>
        </p>

        <p>
          GitHub:{" "}
          <a
            href="https://github.com/alexiswebsites"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 transition-colors hover:text-[#0071e3] hover:underline"
          >
            github.com/alexiswebsites
          </a>
        </p>

        <p>
          LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/miguel-alexis-sanchez-carranza-b3773b337/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 transition-colors hover:text-[#0071e3] hover:underline"
          >
            Ver perfil
          </a>
        </p>
      </div>
    </footer>
  );
}