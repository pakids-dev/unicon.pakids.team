"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface BoothMapProps {
  booths?: any[]
  onBoothClick?: (booth: any) => void
  selectedBoothId?: string
}

export function BoothMap({ booths = [], onBoothClick, selectedBoothId }: BoothMapProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-blue-50 via-white to-yellow-50 p-4 border-b">
          <h3 className="text-xl font-bold text-center mb-2">부스배치도</h3>
          <p className="text-sm text-center text-muted-foreground">UNICON 2025 전시장 부스 배치 안내</p>
        </div>

        <div className="relative bg-white">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mTWMwcI2pthgUkJov4pqey8mDoSNld.png"
            alt="UNICON 2025 부스 배치도 - 전시장 레이아웃과 각 부스별 위치 안내"
            width={1200}
            height={600}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        <div className="p-4 border-t bg-background">
          <div className="text-center text-sm text-muted-foreground">
            <p>각 부스별 상세 정보는 현장에서 확인하실 수 있습니다.</p>
            <p className="mt-1">문의사항이 있으시면 안내데스크를 방문해 주세요.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
