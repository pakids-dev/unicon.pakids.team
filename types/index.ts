// 공통 타입 정의
export interface NavItem {
  label: string
  href: string
  isActive?: boolean
}

export interface FooterLink {
  label: string
  href: string
  external?: boolean
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface Game {
  id: string
  title: string
  teamName: string
  description: string
  shortDescription: string
  thumbnail: string
  category: "challenger" | "rookie"
  genres: string[]
  platforms: string[]
  downloadLinks?: DownloadLink[]
}

export interface DownloadLink {
  platform: string
  url: string
  fileSize: string
  version: string
}

export interface FilterOption {
  id: string
  label: string
  count?: number
}

export interface SortOption {
  value: string
  label: string
}

export interface Booth {
  id: string
  number: string
  teamName?: string
  position: {
    x: number
    y: number
    width: number
    height: number
  }
  type: "game" | "sponsor" | "info"
}

export interface EventSchedule {
  id: string
  title: string
  startTime: Date
  endTime: Date
  location: string
  presenter?: string
  type: "presentation" | "demo" | "networking"
}

export interface Program {
  id: string
  title: string
  description?: string
  time?: string
  location?: string
  type: string
}
