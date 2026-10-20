import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Rubik } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/toast";
import { ThemeProvider } from "@/components/theme-provider";
import AppNav, { AppProvider } from "@/components/app-nav";
import AuthProvider from "@/components/auth-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SSBU Companion",
    template: "%s | SSBU Companion",
  },
  description:
    "Run Super Smash Bros. Ultimate sets with a friend: rock-paper-scissors, stage and character picks, and scoreboard.",
  applicationName: "SSBU Companion",
  appleWebApp: {
    capable: true,
    title: "SSBU Companion",
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e5e7eb" },
    { media: "(prefers-color-scheme: dark)", color: "#1f2937" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${rubik.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider>
            <AppNav />
            <main className="flex flex-col flex-1">
              <AuthProvider>{children}</AuthProvider>
            </main>
            <Toaster />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
