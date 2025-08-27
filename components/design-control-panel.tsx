"use client"

import { useState } from "react"
import { useDesign } from "./design-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Palette, Type, Layout, Sparkles, Settings, X } from "lucide-react"
import { useTheme } from "next-themes"

export function DesignControlPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const { currentDesign, setDesign, applyPreset, presets, currentPreset } = useDesign()
  const { theme, setTheme } = useTheme()

  const handleColorChange = (colorKey: keyof typeof currentDesign.colors, value: string) => {
    const newDesign = {
      ...currentDesign,
      colors: {
        ...currentDesign.colors,
        [colorKey]: value,
      },
    }
    setDesign(newDesign)
  }

  const handleSpacingChange = (value: number[]) => {
    const newDesign = {
      ...currentDesign,
      spacing: { scale: value[0] },
    }
    setDesign(newDesign)
  }

  const handleRadiusChange = (value: string) => {
    const newDesign = {
      ...currentDesign,
      borderRadius: { base: value },
    }
    setDesign(newDesign)
  }

  const handleShadowChange = (value: "soft" | "sharp" | "none") => {
    const newDesign = {
      ...currentDesign,
      shadows: { style: value },
    }
    setDesign(newDesign)
  }

  const colorInputs = [
    { key: "primary" as const, label: "Primary", description: "Main brand color" },
    { key: "secondary" as const, label: "Secondary", description: "Supporting color" },
    { key: "accent" as const, label: "Accent", description: "Highlight color" },
  ]

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg"
        size="icon"
      >
        <Settings className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-80 bg-background border-l shadow-xl overflow-y-auto">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Design Studio
          </h2>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Theme Toggle */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Layout className="h-4 w-4" />
              Theme Mode
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Preset Themes */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Design Presets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(presets).map((presetName) => (
                <Button
                  key={presetName}
                  variant={currentPreset === presetName ? "default" : "outline"}
                  size="sm"
                  onClick={() => applyPreset(presetName)}
                  className="capitalize"
                >
                  {presetName}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Color Customization */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Colors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {colorInputs.map(({ key, label, description }) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium">{label}</Label>
                  <Badge variant="secondary" className="text-xs">
                    {description}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded border-2 border-border"
                    style={{ backgroundColor: currentDesign.colors[key] }}
                  />
                  <input
                    type="text"
                    value={currentDesign.colors[key]}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="flex-1 px-2 py-1 text-xs border rounded"
                    placeholder="oklch(0.5 0.2 180)"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Typography */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Type className="h-4 w-4" />
              Typography
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium">Heading Font</Label>
              <Select
                value={currentDesign.fonts.heading}
                onValueChange={(value) => {
                  const newDesign = {
                    ...currentDesign,
                    fonts: { ...currentDesign.fonts, heading: value },
                  }
                  setDesign(newDesign)
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="var(--font-geist-sans)">Geist Sans</SelectItem>
                  <SelectItem value="var(--font-geist-mono)">Geist Mono</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Layout */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Layout className="h-4 w-4" />
              Layout
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium">Spacing Scale: {currentDesign.spacing.scale}x</Label>
              <Slider
                value={[currentDesign.spacing.scale]}
                onValueChange={handleSpacingChange}
                min={0.8}
                max={1.5}
                step={0.1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">Border Radius</Label>
              <Select value={currentDesign.borderRadius.base} onValueChange={handleRadiusChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">None</SelectItem>
                  <SelectItem value="0.125rem">Small</SelectItem>
                  <SelectItem value="0.375rem">Medium</SelectItem>
                  <SelectItem value="0.625rem">Large</SelectItem>
                  <SelectItem value="1rem">Extra Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">Shadow Style</Label>
              <Select value={currentDesign.shadows.style} onValueChange={handleShadowChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="soft">Soft</SelectItem>
                  <SelectItem value="sharp">Sharp</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
