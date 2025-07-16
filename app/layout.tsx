import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import NavAuto from "@/components/NavAuto";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Frargy v2",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const rubik = Rubik({
  variable: "--font-rubik-sans",
  display: "swap",
  subsets: ["arabic"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${rubik.className} antialiased bg-neutral-50`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavAuto />
          <main className="gap-10 space-y-20 flex flex-col justify-center items-center w-full *:max-w-7xl *:w-full max-lg:py-10 px-3">
            {children}
          </main>
          <Toaster />

        </ThemeProvider>
      </body>
    </html>
  );
}
