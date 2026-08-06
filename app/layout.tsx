import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NB — Arquitetura e Interiores",
  description: "Arquitetura, interiores e design com intenção, sensibilidade e identidade.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
