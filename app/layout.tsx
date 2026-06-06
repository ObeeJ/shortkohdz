import type { Metadata } from "next";
import { Sora, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Nav, Footer } from "./components/ui";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const MARK_FAVICON =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-100 -100 200 200"><rect x="-100" y="-100" width="200" height="200" rx="46" fill="#0B0F14"/><g fill="#F4F0E8">${[0, 60, 120, 180, 240, 300]
      .map(
        (d) =>
          `<polygon points="-7,-18 7,-18 3.5,-92 -3.5,-92" transform="rotate(${d})"/>`
      )
      .join("")}</g><circle r="10" fill="#FF553D"/></svg>`
  );

export const metadata: Metadata = {
  title: "shortkohdz — solutions, on dial",
  description:
    "shortkohdz is a parent company shipping ventures across fintech, commerce, logistics, health & culture — the direct line to a solution that works on the worst day.",
  icons: { icon: MARK_FAVICON },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${jetbrains.variable} ${instrument.variable}`}
    >
      <body>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
