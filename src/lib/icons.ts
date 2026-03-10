import type { LucideIcon } from 'lucide-react'
import {
  ScanFace,
  MessageCircle,
  Users,
  HeartHandshake,
  Lightbulb,
  Calendar,
  HelpingHand,
  GraduationCap,
  ShieldCheck,
  MapPin,
  HelpCircle,
  Info,
  X,
} from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  'scan-face': ScanFace,
  'message-circle': MessageCircle,
  'users': Users,
  'heart-handshake': HeartHandshake,
  'lightbulb': Lightbulb,
  'calendar': Calendar,
  'helping-hand': HelpingHand,
  'graduation-cap': GraduationCap,
  'shield-check': ShieldCheck,
  'map-pin': MapPin,
  'help-circle': HelpCircle,
  'info': Info,
  'x': X,
}

export function getIcon(iconName: string): LucideIcon {
  return ICON_MAP[iconName] ?? HelpCircle
}

export { HelpCircle, X }
