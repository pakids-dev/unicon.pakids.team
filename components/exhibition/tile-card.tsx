"use client"

import type React from "react"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Game } from "@/types"

interface TileCardProps {
  game: Game
  variant?: "default" | "featured"
  onClick?: () => void
  showCategory?: boolean
}

export function TileCard({ game, variant = "default", onClick, showCategory = true }: TileCardProps) {
  const isFeatured = variant === "featured"

  return (
    <Card
      className={cn(
        "group cursor-pointer transition-all duration-200 hover:shadow-lg",
        isFeatured && "ring-2 ring-primary/20 shadow-md",
        onClick && "hover:scale-[1.02]",
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
      aria-label={`${game.title} 게임 상세보기`}
    >
      <CardHeader className="p-0">
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <Image
            src={game.thumbnail || "/placeholder.svg"}
            alt={`${game.title} 스크린샷`}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {isFeatured && (
            <div className="absolute top-2 left-2">
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                추천
              </Badge>
            </div>
          )}
          {showCategory && (
            <div className="absolute top-2 right-2">
              <Badge
                variant={game.category === "challenger" ? "default" : "outline"}
                className={cn(
                  "text-xs font-semibold",
                  game.category === "challenger"
                    ? "bg-purple-500 text-white border-purple-400 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-shadow"
                    : "bg-blue-500 text-white border-blue-400 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-shadow",
                )}
              >
                {game.category === "challenger" ? "챌린저" : "루키"}
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
          {game.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">{game.teamName}</p>
        <p className="text-sm line-clamp-2 mb-3">{game.shortDescription}</p>

        {/* Genres */}
        <div className="flex flex-wrap gap-1">
          {game.genres.slice(0, 3).map((genre) => (
            <Badge key={genre} variant="outline" className="text-xs">
              {genre}
            </Badge>
          ))}
          {game.genres.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{game.genres.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {/* Platforms */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>플랫폼:</span>
          <div className="flex gap-1">
            {game.platforms
              .map((platform) => (
                <span key={platform} className="capitalize">
                  {platform}
                </span>
              ))
              .reduce((prev, curr, index) => (index === 0 ? [curr] : [...prev, ", ", curr]), [] as React.ReactNode[])}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
