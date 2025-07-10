import Footer from "@/components/footer";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

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
