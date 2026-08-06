import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Natasha Bandeira - Arquitetura",
  description: "Arquitetura, interiores e design com intenção, sensibilidade e identidade.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
