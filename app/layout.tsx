import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Nav, Footer } from "./components/ui";
import { GlassFilter } from "@/components/ui/liquid-glass";
import { WelcomeIntro } from "./components/WelcomeIntro";
import { ScrollMotion } from "./components/ScrollMotion";

// Blocking script: apply saved theme before first paint (default dark) to avoid FOUC.
// Marks returning visitors before first paint so the welcome curtain never flashes twice in a session.
const WELCOME_INIT = `(function(){var d=document.documentElement;try{var force=location.search.indexOf('welcome')>-1;d.setAttribute('data-welcome',(!force&&sessionStorage.getItem('skd_welcome_seen'))?'seen':'show');}catch(e){d.setAttribute('data-welcome','show');}})();`;

const THEME_INIT = `(function(){try{var t=localStorage.getItem('skd-theme');if(t==='light'){document.documentElement.classList.remove('dark');}else{document.documentElement.classList.add('dark');}}catch(e){document.documentElement.classList.add('dark');}})();`;

// Animated dynamic favicon script: rotates asterisk 4 degrees every 160ms with brand core color #FF553D
const FAVICON_ANIMATOR = `(function(){
  if (typeof window === 'undefined') return;
  var angle = 0;
  var arms = [0, 60, 120, 180, 240, 300];
  function updateFavicon() {
    angle = (angle + 4) % 360;
    var polygons = arms.map(function(d){
      return '<polygon points="-7,-18 7,-18 3.5,-92 -3.5,-92" transform="rotate(' + d + ')"/>';
    }).join('');
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-100 -100 200 200"><rect x="-100" y="-100" width="200" height="200" rx="46" fill="#080B11"/><g transform="rotate(' + angle + ')" fill="#FFFFFF">' + polygons + '</g><circle r="10" fill="#FF553D"/></svg>';
    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }
  setInterval(updateFavicon, 160);
})();`;

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-100 -100 200 200"><style>@keyframes rot{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}.ast{transform-origin:0 0;animation:rot 12s linear infinite}.core{animation:pulse 2s ease-in-out infinite}@keyframes pulse{0%,100%{r:10px}50%{r:13px}}</style><rect x="-100" y="-100" width="200" height="200" rx="46" fill="#080B11"/><g class="ast" fill="#FFFFFF">${[0, 60, 120, 180, 240, 300]
      .map(
        (d) =>
          `<polygon points="-7,-18 7,-18 3.5,-92 -3.5,-92" transform="rotate(${d})"/>`
      )
      .join("")}</g><circle class="core" r="10" fill="#FF553D"/></svg>`
  );

const SITE = "https://shortkohdz.com";
const TITLE = "shortkohdz · solutions, on dial";
const DESC =
  "shortkohdz is backend and infrastructure engineering built to work on the worst day, not just the best.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESC,
  applicationName: "shortkohdz",
  alternates: { canonical: "/" },
  // The tab favicon is the animated SVG; link previews and old browsers get the static brand mark.
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "shortkohdz",
    title: TITLE,
    description: DESC,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "shortkohdz: a direct line to systems that hold up" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`dark ${plusJakarta.variable} ${jetbrains.variable} ${instrument.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <script dangerouslySetInnerHTML={{ __html: WELCOME_INIT }} />
        <script dangerouslySetInnerHTML={{ __html: FAVICON_ANIMATOR }} />
      </head>
      <body>
        <WelcomeIntro />
        <ScrollMotion />
        <GlassFilter />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
