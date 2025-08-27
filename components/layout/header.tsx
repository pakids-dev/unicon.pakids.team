"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { NavItem } from "@/types"

interface HeaderProps {
  logo?: string
  navigation: NavItem[]
  mobileMenuOpen?: boolean
  onMobileMenuToggle?: () => void
  onNavClick?: () => void
}

export function Header({
  logo = "UNICON 2025",
  navigation,
  mobileMenuOpen: controlledOpen,
  onMobileMenuToggle,
  onNavClick,
}: HeaderProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const isOpen = controlledOpen ?? internalOpen
  const toggleMenu = onMobileMenuToggle ?? (() => setInternalOpen(!internalOpen))

  const handleNavClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onNavClick) {
      onNavClick()
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyber-pink/20 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-lg shadow-cyber-pink/5">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyber-pink to-transparent animate-pulse" />

      <div className="container flex h-24 max-w-screen-xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center space-x-3 group flex-shrink-0 cursor-pointer"
          aria-label="홈으로 이동"
        >
          <div className="flex flex-col">
            <span className="text-2xl font-bold bg-gradient-to-r from-cyber-pink to-neon-blue bg-clip-text group-hover:scale-105 transition-transform duration-300 text-white">
              UNIDEV LOGO
            </span>
          </div>
        </Link>

        <nav
          className="hidden md:flex items-center justify-center space-x-12 absolute left-1/2 transform -translate-x-1/2"
          role="navigation"
          aria-label="주요 메뉴"
        >
          {navigation.map((item, index) => (
            <button
              key={item.href}
              onClick={handleNavClick}
              className={cn(
                "relative text-base font-semibold transition-all duration-300 hover:text-cyber-pink group px-4 py-2 cursor-pointer",
                "hover:scale-110 hover:text-shadow-glow transform-gpu",
                "before:absolute before:inset-x-0 before:-bottom-2 before:h-0.5 before:bg-gradient-to-r before:from-cyber-pink before:to-neon-blue before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100",
                "after:absolute after:inset-0 after:bg-cyber-pink/5 after:rounded-lg after:scale-0 after:transition-transform after:duration-300 hover:after:scale-100",
                item.isActive ? "text-cyber-pink shadow-glow" : "text-muted-foreground hover:text-cyber-pink",
              )}
              style={{ animationDelay: `${index * 100}ms` }}
              aria-current={item.isActive ? "page" : undefined}
            >
              <span className="relative z-10">{item.label}</span>
              {item.isActive && <div className="absolute inset-0 bg-cyber-pink/10 rounded-lg blur-xl" />}
            </button>
          ))}
        </nav>

        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "md:hidden relative overflow-hidden border border-cyber-pink/30 hover:border-cyber-pink/60 transition-all duration-300 flex-shrink-0 cursor-pointer",
            "hover:bg-cyber-pink/10 hover:shadow-glow hover:scale-105 transform-gpu",
            isOpen && "bg-cyber-pink/20 border-cyber-pink shadow-glow",
          )}
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyber-pink/20 to-neon-blue/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
          {isOpen ? (
            <X className="h-5 w-5 text-cyber-pink relative z-10" />
          ) : (
            <Menu className="h-5 w-5 text-cyber-pink relative z-10" />
          )}
        </Button>
      </div>

      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-cyber-pink/20 bg-background/95 backdrop-blur-xl"
          role="navigation"
          aria-label="모바일 메뉴"
        >
          <div className="container px-4 py-6 space-y-3">
            {navigation.map((item, index) => (
              <button
                key={item.href}
                onClick={(e) => {
                  handleNavClick(e)
                  toggleMenu()
                }}
                className={cn(
                  "block w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 relative overflow-hidden group cursor-pointer",
                  "hover:scale-105 transform-gpu",
                  item.isActive
                    ? "bg-gradient-to-r from-cyber-pink/20 to-neon-blue/20 text-cyber-pink border border-cyber-pink/30 shadow-glow"
                    : "text-muted-foreground hover:text-cyber-pink hover:bg-cyber-pink/10 border border-transparent hover:border-cyber-pink/30",
                )}
                style={{ animationDelay: `${index * 50}ms` }}
                aria-current={item.isActive ? "page" : undefined}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyber-pink/10 to-neon-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
