import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { SeasonalProvider } from "@/context/SeasonalContext";
import HalloweenDecor from "@/components/ui/HalloweenDecor";
import { SEASONAL, HALLOWEEN_STORAGE_KEY } from "@/config/seasonal";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "3Dev Labs",
  description:
    "Tienda de impresiones 3D únicas hecha por developers para developers.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Aplica el modo Halloween antes de pintar para evitar el parpadeo */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var c=${JSON.stringify(SEASONAL.halloween)};if(!c.enabled)return;var d=new Date(),md=("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2);if(c.window&&(md<c.window.start||md>c.window.end))return;if(localStorage.getItem("${HALLOWEEN_STORAGE_KEY}")==="1")document.documentElement.classList.add("halloween")}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen bg-white">
        <CartProvider>
          <SeasonalProvider>
            {children}
            <HalloweenDecor />
          </SeasonalProvider>
        </CartProvider>
        <Script
          type="module"
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
