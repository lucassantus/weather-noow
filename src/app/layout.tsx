import dayjs from "dayjs";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Providers } from "./providers";

import "./globals.css";

import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Weather Noow",
  description: "Weather Noow is a weather app that shows the current weather.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.className} suppressHydrationWarning>
      <body className="h-screen bg-custom-gray-800" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
