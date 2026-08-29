import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

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
    <html lang="es" className={`${spaceGrotesk.variable} antialiased`}>
      <body className="min-h-screen bg-white">
        <CartProvider>
          {children}
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
