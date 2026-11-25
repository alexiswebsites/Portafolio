"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/context/ToastContext";
import ResenaForm, {
  PROYECTOS,
  btnPrimary,
  btnSecondary,
  btnDanger,
  panelClass,
} from "./ResenaForm";
import ResenaCard from "./ResenaCard";

function capitalizarNombre(nombre = "") {
  return String(nombre)
    .trim()
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(" ");
}

// Ancho de cada card: completo en móvil, mitad (menos medio gap) en md+
const itemClass = "w-full md:w-[calc(50%-0.625rem)]";

export default function PortfolioReviews({ abrirLogin, abrirSignup }) {
  const router = useRouter();

  const {
    user,
    logout,
    loading: loadingUser,
    openLoginModal,
    openSignupModal,
  } = useUser();

  const { showToast } = useToast();

  const selectRef = useRef(null);

  const [resenas, setResenas] = useState([]);
  const [loadingResenas, setLoadingResenas] = useState(true);
  const [formAbierto, setFormAbierto] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ proyecto: "", comentario: "" });

  const nombreCuenta =
    user?.nombre_usuario || user?.usuario || user?.nombre || user?.name || "";

  const nombreCuentaVisual = capitalizarNombre(nombreCuenta);

  const cargarResenas = async () => {
    try {
      setLoadingResenas(true);

      const res = await fetch("/api/resenas", {
        cache: "no-store",
        credentials: "include",
      });

      if (!res.ok) throw new Error("No se pudieron cargar los comentarios");

      const data = await res.json();
      setResenas(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al cargar comentarios:", err);
      setResenas([]);
    } finally {
      setLoadingResenas(false);
    }
  };

  useEffect(() => {
    cargarResenas();
  }, []);

  useEffect(() => {
    if (formAbierto) selectRef.current?.focus();
  }, [formAbierto]);

  const abrirModalLogin = () => {
    setError("");
    if (typeof abrirLogin === "function") return abrirLogin();
    openLoginModal?.();
  };

  const abrirModalSignup = () => {
    setError("");
    if (typeof abrirSignup === "function") return abrirSignup();
    openSignupModal?.();
  };

  const abrirFormulario = () => {
    setError("");
    if (!user) return abrirModalLogin();
    setFormAbierto(true);
  };

  const cerrarFormulario = () => {
    if (enviando) return;
    setFormAbierto(false);
    setError("");
  };

  const cambiarCampo = (e) => {
    const { name, value } = e.target;
    setError("");
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const irMiCuenta = () => {
    router.push("/quickcart/mi-cuenta");
  };

  const cerrarSesion = async () => {
    try {
      await logout();
      setFormAbierto(false);
      setError("");
      showToast?.("Sesión cerrada correctamente", "success");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
      showToast?.("No se pudo cerrar la sesión", "error");
    }
  };

  const enviarResena = async (e) => {
    e.preventDefault();
    setError("");

    if (!user) return abrirModalLogin();

    const idUsuario = user?.id_usuario ?? user?.id ?? null;
    const nombre = nombreCuenta.trim();
    const proyecto = form.proyecto.trim();
    const comentario = form.comentario.trim();

    if (!idUsuario) {
      return setError(
        "No se pudo identificar tu cuenta. Cierra sesión e inicia nuevamente.",
      );
    }
    if (!nombre) return setError("No se pudo obtener el nombre de tu cuenta.");
    if (!proyecto) {
      return setError("Selecciona el sitio web relacionado con tu comentario.");
    }
    if (!PROYECTOS.includes(proyecto)) {
      return setError("Selecciona un sitio web válido.");
    }
    if (comentario.length < 10) {
      return setError("Escribe un comentario de al menos 10 caracteres.");
    }

    try {
      setEnviando(true);

      const res = await fetch("/api/resenas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        credentials: "include",
        body: JSON.stringify({
          id_usuario: idUsuario,
          nombre,
          empresa: "",
          proyecto,
          comentario,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || "No se pudo publicar el comentario.");
      }

      setForm({ proyecto: "", comentario: "" });
      setFormAbierto(false);
      await cargarResenas();
      showToast?.("Comentario publicado correctamente", "success");
    } catch (err) {
      console.error("Error al publicar comentario:", err);
      setError(err?.message || "Ocurrió un error al publicar el comentario.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section
      id="resenas"
      aria-labelledby="resenas-title"
      className="bg-white px-5 pt-5 pb-8 text-[#1d1d1f] sm:px-6 md:py-1 lg:px-8"
    >
      {/* Encabezado */}
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6e6e73]">
          Comentarios
        </p>

        <h2
          id="resenas-title"
          className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-5xl"
        >
          Opiniones de clientes
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-[#424245] md:text-lg">
          Experiencias reales sobre los sitios web que he desarrollado.
        </p>

        <button
          type="button"
          onClick={abrirFormulario}
          aria-expanded={formAbierto}
          className={`${btnPrimary} mt-6 w-full sm:w-auto sm:px-7`}
        >
          Dejar comentario
        </button>
      </header>

      {/* Estado de sesión */}
      <div aria-live="polite" className={`${panelClass} mt-10 p-4 sm:p-5`}>
        {loadingUser ? (
          <div className="space-y-2">
            <span className="sr-only">Verificando sesión…</span>
            <div
              aria-hidden="true"
              className="h-3 w-28 rounded-full bg-black/[0.05] motion-safe:animate-pulse"
            />
            <div
              aria-hidden="true"
              className="h-4 w-44 rounded-full bg-black/[0.07] motion-safe:animate-pulse"
            />
          </div>
        ) : user ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm text-[#6e6e73]">Sesión iniciada como</p>
              <p className="truncate text-base font-semibold tracking-[-0.01em]">
                {nombreCuentaVisual}
              </p>
              <p className="mt-0.5 text-sm text-[#6e6e73]">
                Tu comentario se publicará con este nombre.
              </p>
            </div>

            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <button type="button" onClick={irMiCuenta} className={btnSecondary}>
                Ver mi cuenta
              </button>
              <button type="button" onClick={cerrarSesion} className={btnDanger}>
                Cerrar sesión
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[15px] font-semibold">
                Inicia sesión para dejar un comentario.
              </p>
              <p className="mt-0.5 text-sm text-[#6e6e73]">
                Se publicará con el nombre de tu cuenta.
              </p>
            </div>

            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <button
                type="button"
                onClick={abrirModalLogin}
                className={btnSecondary}
              >
                Iniciar sesión
              </button>
              <button
                type="button"
                onClick={abrirModalSignup}
                className={btnPrimary}
              >
                Crear cuenta
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Formulario */}
      {formAbierto && user && (
        <ResenaForm
          ref={selectRef}
          nombre={nombreCuentaVisual}
          form={form}
          error={error}
          enviando={enviando}
          onChange={cambiarCampo}
          onSubmit={enviarResena}
          onClose={cerrarFormulario}
        />
      )}

      {/* Lista de comentarios: siempre centrada, sin importar cuántas cards haya */}
      <div aria-busy={loadingResenas} className="mx-auto mt-10 max-w-5xl">
        {loadingResenas ? (
          <div className="flex flex-wrap justify-center gap-5">
            <span className="sr-only">Cargando comentarios…</span>
            {[1, 2].map((item) => (
              <div
                key={item}
                aria-hidden="true"
                className={`${itemClass} rounded-3xl bg-white p-6 ring-1 ring-black/[0.08] motion-safe:animate-pulse sm:p-7`}
              >
                <div className="flex items-center gap-2">
                  <div className="h-3 w-28 rounded-full bg-black/[0.05]" />
                  <div className="h-4 w-24 rounded-full bg-black/[0.07]" />
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-3 w-32 rounded-full bg-black/[0.05]" />
                  <div className="h-4 w-28 rounded-full bg-black/[0.07]" />
                </div>
                <div className="mt-6 h-4 w-full rounded-full bg-black/[0.06]" />
                <div className="mt-3 h-4 w-[88%] rounded-full bg-black/[0.06]" />
                <div className="mt-3 h-4 w-[64%] rounded-full bg-black/[0.06]" />
              </div>
            ))}
          </div>
        ) : resenas.length === 0 ? (
          <div className="mx-auto max-w-3xl rounded-3xl bg-white px-6 py-12 text-center ring-1 ring-black/[0.08]">
            <p className="text-lg font-semibold tracking-[-0.02em]">
              Todavía no hay comentarios.
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-[#6e6e73]">
              Los comentarios publicados aparecerán en esta sección.
            </p>
          </div>
        ) : (
          <ul className="flex flex-wrap justify-center gap-5">
            {resenas.map((resena) => (
              <li key={resena.id} className={itemClass}>
                <ResenaCard
                  nombre={capitalizarNombre(resena.nombre)}
                  proyecto={resena.proyecto}
                  comentario={resena.comentario}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}