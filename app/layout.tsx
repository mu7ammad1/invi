import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Navbar from "@/components/nav";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { hasEnvVars } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner"

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Frargy v1",
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
          <nav className="h-auto my-5 mb-10 flex justify-center items-center w-full *:max-w-full max-lg:hidden *:w-full px-10">
            <Navbar />
            <div className="w-full flex justify-end items-center text-sm">
              {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
            </div>
          </nav>

          <main className="gap-10 space-y-20 flex flex-col justify-center items-center w-full *:max-w-7xl *:w-full max-lg:pt-10">
            {children}
          </main>
          <Toaster />

        </ThemeProvider>
      </body>
    </html>
  );
}
