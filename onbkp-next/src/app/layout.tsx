import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/components/providers/react-query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { NextAuthSessionProvider } from "@/components/providers/session-provider";
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OnBkp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={inter.className}>
          <ReactQueryProvider>
            <NextAuthSessionProvider>            
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {children}
                <Toaster></Toaster>
              </ThemeProvider>
            </NextAuthSessionProvider>
          </ReactQueryProvider>
        </body>
      </html>
  );
}
