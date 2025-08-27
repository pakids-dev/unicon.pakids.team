"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Design token types
export interface DesignTokens {
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
  }
  fonts: {
    heading: string
    body: string
  }
  spacing: {
    scale: number
  }
  borderRadius: {
    base: string
  }
  shadows: {
    style: "soft" | "sharp" | "none"
  }
}

// Preset themes
export const designPresets: Record<string, DesignTokens> = {
  default: {
    colors: {
      primary: "oklch(0.205 0 0)",
      secondary: "oklch(0.97 0 0)",
      accent: "oklch(0.646 0.222 41.116)",
      background: "oklch(1 0 0)",
      foreground: "oklch(0.145 0 0)",
    },
    fonts: {
      heading: "var(--font-geist-sans)",
      body: "var(--font-geist-sans)",
    },
    spacing: { scale: 1 },
    borderRadius: { base: "0.625rem" },
    shadows: { style: "soft" },
  },
  fantasy: {
    colors: {
      primary: "oklch(0.45 0.15 280)",
      secondary: "oklch(0.85 0.05 320)",
      accent: "oklch(0.65 0.2 45)",
      background: "oklch(0.98 0.02 320)",
      foreground: "oklch(0.15 0.05 280)",
    },
    fonts: {
      heading: "var(--font-geist-sans)",
      body: "var(--font-geist-sans)",
    },
    spacing: { scale: 1.1 },
    borderRadius: { base: "1rem" },
    shadows: { style: "soft" },
  },
  cyberpunk: {
    colors: {
      primary: "oklch(0.6 0.25 180)",
      secondary: "oklch(0.2 0.1 280)",
      accent: "oklch(0.7 0.3 120)",
      background: "oklch(0.1 0.05 280)",
      foreground: "oklch(0.9 0.1 180)",
    },
    fonts: {
      heading: "var(--font-geist-mono)",
      body: "var(--font-geist-sans)",
    },
    spacing: { scale: 0.9 },
    borderRadius: { base: "0.25rem" },
    shadows: { style: "sharp" },
  },
  minimal: {
    colors: {
      primary: "oklch(0.3 0 0)",
      secondary: "oklch(0.95 0 0)",
      accent: "oklch(0.5 0 0)",
      background: "oklch(1 0 0)",
      foreground: "oklch(0.1 0 0)",
    },
    fonts: {
      heading: "var(--font-geist-sans)",
      body: "var(--font-geist-sans)",
    },
    spacing: { scale: 1.2 },
    borderRadius: { base: "0.125rem" },
    shadows: { style: "none" },
  },
  retro: {
    colors: {
      primary: "oklch(0.5 0.2 30)",
      secondary: "oklch(0.9 0.1 60)",
      accent: "oklch(0.6 0.25 350)",
      background: "oklch(0.95 0.05 60)",
      foreground: "oklch(0.2 0.1 30)",
    },
    fonts: {
      heading: "var(--font-geist-mono)",
      body: "var(--font-geist-sans)",
    },
    spacing: { scale: 1.1 },
    borderRadius: { base: "0.5rem" },
    shadows: { style: "sharp" },
  },
}

interface DesignContextType {
  currentDesign: DesignTokens
  setDesign: (design: DesignTokens) => void
  applyPreset: (presetName: string) => void
  presets: Record<string, DesignTokens>
  currentPreset: string
  setCurrentPreset: (preset: string) => void
}

const DesignContext = createContext<DesignContextType | undefined>(undefined)

export function DesignProvider({ children }: { children: React.ReactNode }) {
  const [currentDesign, setCurrentDesign] = useState<DesignTokens>(designPresets.default)
  const [currentPreset, setCurrentPreset] = useState("default")

  const setDesign = (design: DesignTokens) => {
    setCurrentDesign(design)
    applyDesignTokens(design)
  }

  const applyPreset = (presetName: string) => {
    if (designPresets[presetName]) {
      setCurrentPreset(presetName)
      setDesign(designPresets[presetName])
    }
  }

  const applyDesignTokens = (design: DesignTokens) => {
    const root = document.documentElement

    // Apply colors
    root.style.setProperty("--primary", design.colors.primary)
    root.style.setProperty("--secondary", design.colors.secondary)
    root.style.setProperty("--accent", design.colors.accent)
    root.style.setProperty("--chart-1", design.colors.accent)

    // Apply fonts
    root.style.setProperty("--font-heading", design.fonts.heading)
    root.style.setProperty("--font-body", design.fonts.body)

    // Apply spacing scale
    root.style.setProperty("--spacing-scale", design.spacing.scale.toString())

    // Apply border radius
    root.style.setProperty("--radius", design.borderRadius.base)

    // Apply shadow style class
    root.setAttribute("data-shadow-style", design.shadows.style)
  }

  useEffect(() => {
    applyDesignTokens(currentDesign)
  }, [currentDesign])

  return (
    <DesignContext.Provider
      value={{
        currentDesign,
        setDesign,
        applyPreset,
        presets: designPresets,
        currentPreset,
        setCurrentPreset,
      }}
    >
      {children}
    </DesignContext.Provider>
  )
}

export function useDesign() {
  const context = useContext(DesignContext)
  if (context === undefined) {
    throw new Error("useDesign must be used within a DesignProvider")
  }
  return context
}
