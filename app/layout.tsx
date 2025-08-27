import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { DesignProvider } from "@/components/design-provider"

export const metadata: Metadata = {
  title: "UNICON 2025",
  description: "University Game Developers Conference",
  generator: "pakids",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <DesignProvider>{children}</DesignProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
