
"use client";

export default function PortfolioFooter() {
  return (
    <footer className="bg-[#f5f5f7] px-6 py-8 text-center text-sm text-[#6e6e73]">
      <p>© 2026 Miguel Alexis Sánchez Carranza.</p>

      <div className="mt-3 space-y-1">
        <p>WhatsApp: 33 12 89 19 27</p>

        <p>
          Correo:{" "}
          <a
            href="mailto:alexissanchezdev7@gmail.com"
            className="hover:text-[#0071e3] transition-colors"
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
            className="hover:text-[#0071e3] transition-colors"
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
            className="hover:text-[#0071e3] transition-colors"
          >
            Ver perfil
          </a>
        </p>
      </div>
    </footer>
  );
}
