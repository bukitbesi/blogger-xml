import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thebukitbesi.com"),
  title: {
    default: "The Bukit Besi — Informasi Malaysia",
    template: "%s | The Bukit Besi",
  },
  description:
    "Portal informasi Malaysia untuk panduan, direktori, alat digital, sejarah dan komuniti Bukit Besi.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The Bukit Besi — Informasi Malaysia",
    description:
      "Panduan, direktori dan kandungan tempatan yang berguna untuk pembaca Malaysia.",
    type: "website",
    locale: "ms_MY",
    url: "/",
    siteName: "The Bukit Besi",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "codex-preview": "development",
    "theme-color": "#2563eb",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ms-MY">
      <body>{children}</body>
    </html>
  );
}
