"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink, Mail, Phone } from "lucide-react"
import Image from "next/image"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-sm border border-cyber-pink/30">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-heading font-semibold text-sidebar-foreground">Contact</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="relative w-60 h-32">
              <Image src="/pakids-logo-transparent.png" alt="pakids logo" fill className="object-contain" />
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <span className="text-white">E. contact@pakids.team</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <span className="text-white">P. 010-3255-4653</span>
            </div>
          </div>

          {/* Website Button */}
          <div className="flex justify-center pt-4">
            <Button
              onClick={() => window.open("https://www.pakids.team", "_blank")}
              className="bg-cyber-pink hover:bg-cyber-pink/90 text-white cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-glow transform-gpu border border-cyber-pink/30 hover:border-cyber-pink/60"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              www.pakids.team 바로가기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
