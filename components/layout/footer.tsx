import Link from "next/link"
import { ExternalLink } from "lucide-react"
import type { FooterLink, SocialLink } from "@/types"

interface FooterProps {
  links: FooterLink[]
  socialLinks?: SocialLink[]
  copyright?: string
}

export function Footer({ links, socialLinks, copyright = "© 2024 UNIDEV. All rights reserved." }: FooterProps) {
  return (
    <footer className="border-t bg-muted/50" role="contentinfo">
      <div className="container max-w-screen-xl px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Links */}
          <div>
            <h3 className="font-semibold text-sm mb-4">바로가기</h3>
            <nav className="space-y-2" aria-label="푸터 링크">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                  {...(link.external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                >
                  {link.label}
                  {link.external && <ExternalLink className="ml-1 h-3 w-3" />}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          {socialLinks && socialLinks.length > 0 && (
            <div>
              <h3 className="font-semibold text-sm mb-4">소셜 미디어</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`${social.platform}에서 팔로우하기`}
                  >
                    <span className="sr-only">{social.platform}</span>
                    {/* 실제 구현시 아이콘 컴포넌트로 교체 */}
                    <div className="w-5 h-5 bg-current rounded" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Copyright */}
          <div className="md:col-span-2 lg:col-span-1">
            <p className="text-sm text-muted-foreground">{copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
