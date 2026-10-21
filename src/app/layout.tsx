import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Форма регистрации",
  description: "Форма регистрации с валидацией на Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
