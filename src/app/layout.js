
import "./globals.css";

import AppProvider from "@/components/AppProvider";

const title = "Portafolio | Miguel Alexis Sánchez Carranza";

const description =
  "Portafolio de Miguel Alexis Sánchez Carranza, desarrollador web Full Stack. Explora mis proyectos y experiencia en desarrollo web.";

export const metadata = {
  metadataBase: new URL("https://alexissanchez.vercel.app"),

  title,
  description,

  icons: {
    icon: "/alexiswebsites.png",
  },

  openGraph: {
    title,
    description,
    url: "https://alexissanchez.vercel.app",
    siteName: "Miguel Alexis Sánchez Carranza",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/alexiswebsites.png",
        width: 1200,
        height: 630,
        alt: "Miguel Alexis Sánchez Carranza | Desarrollador Web Full Stack",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/alexiswebsites.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="min-h-full bg-[#09060f]">
      <body className="min-h-screen bg-[#09060f]">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
