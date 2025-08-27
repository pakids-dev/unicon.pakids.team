"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface MediaGalleryProps {
  images: string[]
  videos?: string[]
  alt: string
  autoPlay?: boolean
  className?: string
}

export function MediaGallery({ images, videos = [], alt, autoPlay = false, className }: MediaGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)

  const allMedia = [...images, ...videos]
  const isVideo = (index: number) => index >= images.length

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % allMedia.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length)
  }

  const openModal = (index: number) => {
    setModalIndex(index)
    setIsModalOpen(true)
  }

  if (allMedia.length === 0) return null

  return (
    <>
      <div className={cn("space-y-4", className)}>
        {/* Main Display */}
        <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
          {isVideo(currentIndex) ? (
            <video
              src={allMedia[currentIndex]}
              controls
              autoPlay={autoPlay}
              className="w-full h-full object-cover"
              aria-label={`${alt} 비디오`}
            >
              <track kind="captions" />
            </video>
          ) : (
            <Image
              src={allMedia[currentIndex] || "/placeholder.svg"}
              alt={`${alt} - 이미지 ${currentIndex + 1}`}
              fill
              className="object-cover cursor-pointer"
              onClick={() => openModal(currentIndex)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            />
          )}

          {/* Navigation Arrows */}
          {allMedia.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="sm"
                className="absolute left-2 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100"
                onClick={prevSlide}
                aria-label="이전 미디어"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100"
                onClick={nextSlide}
                aria-label="다음 미디어"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Video Play Indicator */}
          {isVideo(currentIndex) && (
            <div className="absolute top-2 right-2">
              <div className="bg-black/50 rounded-full p-1">
                <Play className="h-4 w-4 text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {allMedia.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {allMedia.map((media, index) => (
              <button
                key={index}
                className={cn(
                  "relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all",
                  currentIndex === index
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-transparent hover:border-muted-foreground/50",
                )}
                onClick={() => setCurrentIndex(index)}
                aria-label={`${isVideo(index) ? "비디오" : "이미지"} ${index + 1} 선택`}
              >
                {isVideo(index) ? (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <Play className="h-4 w-4 text-muted-foreground" />
                  </div>
                ) : (
                  <Image
                    src={media || "/placeholder.svg"}
                    alt={`썸네일 ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Full-size Images */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl w-full p-0">
          <div className="relative">
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-2 right-2 z-10"
              onClick={() => setIsModalOpen(false)}
              aria-label="모달 닫기"
            >
              <X className="h-4 w-4" />
            </Button>
            {!isVideo(modalIndex) && (
              <Image
                src={allMedia[modalIndex] || "/placeholder.svg"}
                alt={`${alt} - 확대 이미지`}
                width={800}
                height={600}
                className="w-full h-auto"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
