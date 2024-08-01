
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./Providers/ThemeProviders";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MetaWorld X AI",
  description: "Web 4.0 3D site with AI integration",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link
          href="https://cesium.com/downloads/cesiumjs/releases/1.101/Build/Cesium/Widgets/widgets.css"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="w-screen h-screen">
            {children}
          </div>
          <Script
            src="https://cesium.com/downloads/cesiumjs/releases/1.101/Build/Cesium/Cesium.js"
            strategy="beforeInteractive"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
