import { Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { DownloadLink } from "@/types"

interface DownloadCTAProps {
  downloadLinks: DownloadLink[]
  gameTitle: string
  disabled?: boolean
  className?: string
}

export function DownloadCTA({ downloadLinks = [], gameTitle, disabled = false, className }: DownloadCTAProps) {
  if (!downloadLinks || downloadLinks.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">현재 다운로드할 수 있는 버전이 없습니다.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          {gameTitle} 다운로드
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {downloadLinks.map((link, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="capitalize">
                  {link.platform}
                </Badge>
                <span className="text-sm font-medium">v{link.version}</span>
              </div>
              <p className="text-sm text-muted-foreground">파일 크기: {link.fileSize}</p>
              {link.releaseNotes && <p className="text-xs text-muted-foreground mt-1">{link.releaseNotes}</p>}
            </div>
            <Button
              asChild
              disabled={disabled}
              className="ml-4"
              aria-label={`${link.platform}용 ${gameTitle} 다운로드`}
            >
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                다운로드
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>
        ))}

        {disabled && (
          <p className="text-sm text-muted-foreground text-center mt-4">
            다운로드 기능이 일시적으로 비활성화되었습니다.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
