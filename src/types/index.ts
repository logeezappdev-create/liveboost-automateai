// User and Authentication
export interface User {
  id: string
  email: string
  name?: string
  createdAt: Date
  updatedAt: Date
}

// Products
export interface Product {
  id: string
  userId: string
  name: string
  price: number
  isActive: boolean
  autoReply?: string
  promoPercent?: number
  promoMessage?: string
  createdAt: Date
  updatedAt: Date
}

// Live Configuration
export interface LiveConfig {
  id: string
  userId: string
  name: string
  featuredProducts: string[] // Product IDs
  discount: number // Percentage
  limitedPlaces?: number
  overlayMessage: string
  timerEnabled: boolean
  timerDuration: number // minutes
  socialProof: boolean
  createdAt: Date
  updatedAt: Date
}

// Live Events
export interface LiveEvent {
  id: string
  userId: string
  configId?: string
  platform: 'tiktok' | 'instagram' | 'facebook'
  startedAt: Date
  endedAt?: Date
  leadsCaptured: number
  revenue: number
  isActive: boolean
  leads: Lead[]
}

// Leads
export interface Lead {
  id: string
  liveEventId: string
  username: string
  message?: string
  score: number
  converted: boolean
  revenue?: number
  createdAt: Date
}

// User Settings
export interface UserSettings {
  id: string
  userId: string
  tone: 'pro' | 'friendly' | 'enthusiastic'
  useEmojis: boolean
  signature?: string
  autoReplyPrice: boolean
  deliveryMessage?: string
  notifyHotLead: boolean
  dailyReport: boolean
  createdAt: Date
  updatedAt: Date
}

// WebSocket Events
export interface WebSocketMessage {
  type: 'new-lead' | 'lead-update' | 'stats-update'
  data: any
}

// API Responses
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

// Message from platform
export interface PlatformMessage {
  id: string
  platform: 'tiktok' | 'instagram' | 'facebook'
  userId: string
  username: string
  text: string
  timestamp: Date
  liveId?: string
}

// Score calculation
export interface ScoreResult {
  score: number
  category: 'cold' | 'warm' | 'hot'
  label: string
  color: string
}
