"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { TileCard } from "@/components/exhibition/tile-card"
import { SearchInput } from "@/components/search/search-input"
import { FilterBar } from "@/components/search/filter-bar"
import { SortSelect } from "@/components/search/sort-select"
import { Pagination } from "@/components/ui/pagination"
import { StageSchedule } from "@/components/event/stage-schedule"
import { BoothMap } from "@/components/event/booth-map"
import { DesignControlPanel } from "@/components/design-control-panel"
import { ContactModal } from "@/components/ui/contact-modal"
import { Button } from "@/components/ui/button"
import { Play, Calendar, MapPin, Users } from "lucide-react"
import type { NavItem, FooterLink, Game, FilterOption, SortOption, EventSchedule, Booth } from "@/types"

const mockNavigation: NavItem[] = [
  { label: "소개", href: "/about", isActive: false },
  { label: "전시", href: "/exhibition", isActive: false },
  { label: "참가 업체·동아리", href: "/participants", isActive: false },
  { label: "문의", href: "/contact", isActive: false },
]

const mockFooterLinks: FooterLink[] = [
  { label: "행사 소개", href: "/about" },
  { label: "참가 신청", href: "/apply" },
  { label: "후원 문의", href: "/sponsor" },
  { label: "개인정보처리방침", href: "/privacy" },
]

const mockSchedules: EventSchedule[] = [
  {
    id: "1",
    title: "개막식 및 환영사",
    startTime: "2025-09-28T09:00:00Z",
    endTime: "2025-09-28T09:30:00Z",
    type: "ceremony",
    location: "메인 스테이지",
    description: "UNICON 2025 개막식과 UNIDEV 대표의 환영사",
    presenter: "UNIDEV 대표",
    isActive: true,
    createdAt: "2024-08-15T09:00:00Z",
    updatedAt: "2024-09-20T11:00:00Z",
  },
  {
    id: "2",
    title: "Shadow Realm Chronicles 개발 비하인드",
    startTime: "2025-09-28T10:00:00Z",
    endTime: "2025-09-28T10:30:00Z",
    type: "presentation",
    location: "메인 스테이지",
    description: "18개월간의 개발 여정과 기술적 도전들",
    presenter: "Mystic Studios",
    isActive: true,
    createdAt: "2024-08-15T09:00:00Z",
    updatedAt: "2024-09-20T11:00:00Z",
  },
  {
    id: "3",
    title: "인디 개발자 네트워킹",
    startTime: "2025-09-28T14:00:00Z",
    endTime: "2025-09-28T15:00:00Z",
    type: "networking",
    location: "라운지 구역",
    description: "개발자들과 업계 관계자들의 자유로운 교류 시간",
    isActive: true,
    createdAt: "2024-08-15T09:00:00Z",
    updatedAt: "2024-09-20T11:00:00Z",
  },
]

const mockBooths: Booth[] = [
  {
    id: "booth-a01",
    number: "A-01",
    type: "game",
    position: { x: 100, y: 150, width: 120, height: 120, floor: "1F", zone: "A" },
    teamId: "team-001",
    size: "3x3",
    facilities: ["power", "internet", "display", "seating"],
    capacity: 8,
    isAvailable: false,
    isActive: true,
    notes: "Mystic Studios - Shadow Realm Chronicles",
  },
  {
    id: "booth-b05",
    number: "B-05",
    type: "game",
    position: { x: 250, y: 150, width: 100, height: 100, floor: "1F", zone: "B" },
    teamId: "team-002",
    size: "2x2",
    facilities: ["power", "internet", "display"],
    capacity: 4,
    isAvailable: false,
    isActive: true,
    notes: "Pixel Pioneers - Pixel Dash Adventure",
  },
  {
    id: "booth-c03",
    number: "C-03",
    type: "game",
    position: { x: 400, y: 200, width: 100, height: 100, floor: "1F", zone: "C" },
    size: "2x2",
    facilities: ["power", "internet"],
    capacity: 4,
    isAvailable: true,
    isActive: true,
    notes: "Available booth",
  },
]

const mockGames: Game[] = [
  {
    id: "1",
    title: "Shadow Realm Chronicles",
    teamName: "Mystic Studios",
    description: "어둠의 세계에서 펼쳐지는 판타지 액션 RPG",
    shortDescription: "어둠의 세계를 배경으로 한 판타지 액션 RPG",
    thumbnail: "/fantasy-game-screenshot.png",
    category: "challenger",
    genres: ["RPG", "Action", "Adventure"],
    platforms: ["PC", "Console"],
    downloadLinks: [
      {
        platform: "PC",
        url: "#",
        fileSize: "2.5 GB",
        version: "1.2.0",
        releaseNotes: "버그 수정 및 성능 개선",
      },
    ],
  },
  {
    id: "2",
    title: "Pixel Dash Adventure",
    teamName: "Pixel Pioneers",
    description: "레트로 픽셀 아트 스타일의 플랫포머 게임",
    shortDescription: "레트로 픽셀 아트 스타일의 캐주얼 플랫포머",
    thumbnail: "/pixel-art-platformer.png",
    category: "rookie",
    genres: ["Platformer", "Casual"],
    platforms: ["Mobile", "Web"],
    downloadLinks: [
      {
        platform: "Web",
        url: "#",
        fileSize: "50 MB",
        version: "1.0.0",
      },
    ],
  },
  {
    id: "3",
    title: "Cyber Runner 2077",
    teamName: "Future Games",
    description: "미래 도시를 배경으로 한 사이버펑크 액션 게임",
    shortDescription: "사이버펑크 세계관의 액션 어드벤처",
    thumbnail: "/fantasy-game-screenshot.png",
    category: "challenger",
    genres: ["Action", "Adventure"],
    platforms: ["PC"],
    downloadLinks: [],
  },
  {
    id: "4",
    title: "Magic Forest Quest",
    teamName: "Indie Wizards",
    description: "마법의 숲에서 펼쳐지는 모험 퍼즐 게임",
    shortDescription: "마법과 퍼즐이 결합된 모험 게임",
    thumbnail: "/pixel-art-platformer.png",
    category: "rookie",
    genres: ["Puzzle", "Adventure"],
    platforms: ["Mobile", "PC"],
    downloadLinks: [],
  },
]

const mockFilters: FilterOption[] = [
  { id: "rpg", label: "RPG", count: 5 },
  { id: "action", label: "액션", count: 8 },
  { id: "puzzle", label: "퍼즐", count: 3 },
  { id: "platformer", label: "플랫포머", count: 4 },
  { id: "pc", label: "PC", count: 12 },
  { id: "mobile", label: "모바일", count: 7 },
  { id: "challenger", label: "챌린저", count: 8 },
  { id: "rookie", label: "루키", count: 12 },
]

const mockSortOptions: SortOption[] = [
  { value: "name", label: "이름순" },
  { value: "category", label: "카테고리순" },
  { value: "recent", label: "최신순" },
  { value: "popular", label: "인기순" },
]

export default function HomePage() {
  const [searchValue, setSearchValue] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [sortValue, setSortValue] = useState("name")
  const [currentPage, setCurrentPage] = useState(1)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const handleItemClick = () => {
    setIsContactModalOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header navigation={mockNavigation} onNavClick={handleItemClick} />

      {/* Main Content */}
      <main className="flex-1">
        <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
          {/* Background Video */}
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
            <source
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Video%20Game%20Gamer-2IvH9M7vPDQbBjR3c3tJiMSUoexfW0.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {/* Video overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60 z-10" />

          <div className="relative z-20 text-center space-y-6 px-4 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white text-balance font-heading">UNICON 2025</h1>
            <p className="text-xl md:text-2xl text-white/90 text-pretty">University Game Developers Conference</p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              전국 대학생 게임 개발자들이 한자리에 모여 창작의 열정을 나누는 특별한 시간
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-glow transform-gpu border border-cyber-pink/30 hover:border-cyber-pink/60"
                onClick={handleItemClick}
              >
                <Play className="w-5 h-5 mr-2" />
                행사 영상 보기
              </Button>
              <div className="text-white/90 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  2025년 9월 28일 - 29일
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="w-4 h-4" />
                  코엑스 컨벤션센터
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container max-w-screen-xl mx-auto px-4 py-12 space-y-16">
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold font-heading">무대 일정표</h2>
              <p className="text-muted-foreground text-lg">메인 스테이지에서 진행되는 발표와 이벤트를 확인하세요</p>
            </div>
            <StageSchedule schedules={mockSchedules} onScheduleClick={handleItemClick} />
          </section>

          <section className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold font-heading">부스 배치도</h2>
              <p className="text-muted-foreground text-lg">각 부스를 클릭하여 참가팀 정보를 확인하세요</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <BoothMap booths={mockBooths} mapImage="/game-screenshot-2.png" onBoothClick={handleItemClick} />
            </div>
          </section>

          <section className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold font-heading">참가 게임 & 업체</h2>
              <p className="text-muted-foreground text-lg">UNICON 2025에 참가하는 게임들을 만나보세요</p>
            </div>

            {/* Search and Filter */}
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <SearchInput
                  value={searchValue}
                  onChange={setSearchValue}
                  placeholder="게임 또는 팀 이름으로 검색..."
                />
                <SortSelect options={mockSortOptions} value={sortValue} onChange={setSortValue} />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />총 {mockGames.length}개 게임
                </div>
              </div>
              <FilterBar filters={mockFilters} activeFilters={activeFilters} onFilterChange={setActiveFilters} />
            </div>

            {/* Game Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {mockGames.map((game) => (
                <TileCard
                  key={game.id}
                  game={game}
                  variant={game.id === "1" ? "featured" : "default"}
                  onClick={handleItemClick}
                />
              ))}
            </div>

            <div className="flex justify-center">
              <Pagination currentPage={currentPage} totalPages={3} onPageChange={setCurrentPage} showInfo />
            </div>
          </section>
        </div>
      </main>

      <Footer
        links={mockFooterLinks}
        socialLinks={[
          { platform: "Instagram", url: "#", icon: "instagram" },
          { platform: "Twitter", url: "#", icon: "twitter" },
          { platform: "Discord", url: "#", icon: "discord" },
        ]}
        copyright="© 2025 UNIDEV. All rights reserved."
      />

      {/* Design Control Panel */}
      <DesignControlPanel />

      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  )
}
