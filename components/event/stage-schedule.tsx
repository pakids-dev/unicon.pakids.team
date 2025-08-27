"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, User, Calendar } from "lucide-react"
import type { EventSchedule } from "@/types"

interface StageScheduleProps {
  schedules: EventSchedule[]
  currentTime?: Date
  onScheduleClick?: (schedule: EventSchedule) => void
}

export function StageSchedule({ schedules, currentTime, onScheduleClick }: StageScheduleProps) {
  const [selectedDay, setSelectedDay] = useState("2025-09-28")

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "ceremony":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "presentation":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "networking":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "ceremony":
        return "개막식"
      case "presentation":
        return "발표"
      case "networking":
        return "네트워킹"
      default:
        return type
    }
  }

  const filteredSchedules = schedules.filter((schedule) => schedule.startTime.startsWith(selectedDay))

  return (
    <div className="space-y-6">
      {/* Day Selector */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          variant={selectedDay === "2025-09-28" ? "default" : "outline"}
          onClick={() => setSelectedDay("2025-09-28")}
          className="flex items-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          Day 1 (9/28)
        </Button>
        <Button
          variant={selectedDay === "2025-09-29" ? "default" : "outline"}
          onClick={() => setSelectedDay("2025-09-29")}
          className="flex items-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          Day 2 (9/29)
        </Button>
      </div>

      {/* Schedule List */}
      <div className="grid gap-4 md:gap-6">
        {filteredSchedules.length > 0 ? (
          filteredSchedules.map((schedule) => (
            <Card
              key={schedule.id}
              className="cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => onScheduleClick?.(schedule)}
            >
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <CardTitle className="text-lg font-semibold text-balance">{schedule.title}</CardTitle>
                  <Badge className={getTypeColor(schedule.type)}>{getTypeLabel(schedule.type)}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span>
                      {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{schedule.location}</span>
                  </div>
                  {schedule.presenter && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 flex-shrink-0" />
                      <span>{schedule.presenter}</span>
                    </div>
                  )}
                </div>
                {schedule.description && (
                  <p className="text-sm text-muted-foreground text-pretty">{schedule.description}</p>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">선택한 날짜에 예정된 일정이 없습니다.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
