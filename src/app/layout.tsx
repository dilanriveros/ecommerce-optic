import Footer from "@/components/footer";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";

export const metadata = {
  title: "TarreDev E-commerce",
  description: "Tienda oficial de lentes TarreDev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="flex flex-col" style={{ minHeight: "100dvh" }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader
              color="#2299DD"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={true}
              easing="ease"
              speed={200}
              shadow="0 0 10px #2299DD,0 0 5px #2299DD"
              template='<div class="bar" role="bar"><div class="peg"></div></div> 
              <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
              zIndex={1600}
              showAtBottom={false}
            />
          <Navbar />

          {/* 👇 CAMBIO: de pt-16 → pt-4  (ajusta a pt-0 si lo quieres completamente pegado) */}
          <main className="flex-grow pt-0">
            {children}
          </main>
          <Toaster/>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
