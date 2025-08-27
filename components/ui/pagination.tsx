"use client"

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showInfo?: boolean
  className?: string
}

export function Pagination({ currentPage, totalPages, onPageChange, showInfo = true, className }: PaginationProps) {
  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  if (totalPages <= 1) return null

  const visiblePages = getVisiblePages()

  return (
    <div className={cn("space-y-4", className)}>
      {showInfo && (
        <div className="text-sm text-muted-foreground text-center">
          {totalPages}페이지 중 {currentPage}페이지
        </div>
      )}

      <nav className="flex items-center justify-center space-x-1" role="navigation" aria-label="페이지네이션">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="이전 페이지"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only md:not-sr-only md:ml-1">이전</span>
        </Button>

        {/* Page Numbers */}
        {visiblePages.map((page, index) =>
          page === "..." ? (
            <div key={`dots-${index}`} className="px-2">
              <MoreHorizontal className="h-4 w-4" />
            </div>
          ) : (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page as number)}
              aria-label={`${page}페이지로 이동`}
              aria-current={currentPage === page ? "page" : undefined}
              className="min-w-[40px]"
            >
              {page}
            </Button>
          ),
        )}

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="다음 페이지"
        >
          <span className="sr-only md:not-sr-only md:mr-1">다음</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </nav>
    </div>
  )
}
