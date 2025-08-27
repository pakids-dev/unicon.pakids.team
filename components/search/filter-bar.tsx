"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, Filter } from "lucide-react"
import { useState } from "react"
import type { FilterOption } from "@/types"

interface FilterBarProps {
  filters: FilterOption[]
  activeFilters: string[]
  onFilterChange: (filters: string[]) => void
  title?: string
}

export function FilterBar({ filters, activeFilters, onFilterChange, title = "필터" }: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleFilterToggle = (filterId: string) => {
    const newFilters = activeFilters.includes(filterId)
      ? activeFilters.filter((id) => id !== filterId)
      : [...activeFilters, filterId]
    onFilterChange(newFilters)
  }

  const clearAllFilters = () => {
    onFilterChange([])
  }

  return (
    <div className="space-y-4">
      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium">적용된 필터:</span>
          {activeFilters.map((filterId) => {
            const filter = filters.find((f) => f.id === filterId)
            return filter ? (
              <Badge
                key={filterId}
                variant="secondary"
                className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => handleFilterToggle(filterId)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleFilterToggle(filterId)
                  }
                }}
                aria-label={`${filter.label} 필터 제거`}
              >
                {filter.label} ×
              </Badge>
            ) : null
          })}
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-6 px-2 text-xs">
            모두 지우기
          </Button>
        </div>
      )}

      {/* Filter Collapsible */}
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between md:w-auto bg-transparent"
            aria-expanded={isOpen}
            aria-controls="filter-content"
          >
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              {title}
              {activeFilters.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFilters.length}
                </Badge>
              )}
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent id="filter-content" className="mt-4 space-y-3 rounded-lg border p-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filters.map((filter) => (
              <div key={filter.id} className="flex items-center space-x-2">
                <Checkbox
                  id={filter.id}
                  checked={activeFilters.includes(filter.id)}
                  onCheckedChange={() => handleFilterToggle(filter.id)}
                  aria-describedby={filter.count ? `${filter.id}-count` : undefined}
                />
                <label
                  htmlFor={filter.id}
                  className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {filter.label}
                  {filter.count !== undefined && (
                    <span id={`${filter.id}-count`} className="ml-1 text-xs text-muted-foreground">
                      ({filter.count})
                    </span>
                  )}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
