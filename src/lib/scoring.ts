/**
 * Calculate lead score based on message content and context
 * Score ranges: 0-100
 * Hot lead threshold: > 60
 */

interface Message {
  text: string
  username: string
  isFirstMessage?: boolean
  duringTimer?: boolean
  previousMessages?: number
}

export function calculateScore(message: Message): number {
  let score = 0

  const text = message.text.toLowerCase()

  // 1. Keywords indicating buying intent (+30 points)
  const buyingKeywords = [
    'acheter', 'buy', 'prix', 'price', 'combien', 'how much',
    'commander', 'order', 'paiement', 'payment', 'carte', 'card',
    'paypal', 'stripe', 'je veux', 'i want', 'intéressé', 'interested'
  ]

  if (buyingKeywords.some(keyword => text.includes(keyword))) {
    score += 30
  }

  // 2. Questions about product (+25 points)
  const questionKeywords = [
    'comment', 'how', 'quand', 'when', 'où', 'where',
    'pourquoi', 'why', 'est-ce que', 'c\'est quoi', 'what is',
    'marche', 'works', 'fonctionne', 'livraison', 'delivery',
    'garantie', 'guarantee', 'résultats', 'results'
  ]

  if (questionKeywords.some(keyword => text.includes(keyword))) {
    score += 25
  }

  // 3. Urgent/FOMO keywords (+20 points)
  const urgencyKeywords = [
    'maintenant', 'now', 'vite', 'quick', 'urgent',
    'aujourd\'hui', 'today', 'promo', 'discount',
    'offre', 'offer', 'deal', 'limité', 'limited'
  ]

  if (urgencyKeywords.some(keyword => text.includes(keyword))) {
    score += 20
  }

  // 4. Message during countdown timer (+25 points)
  if (message.duringTimer) {
    score += 25
  }

  // 5. Repeat messages (+20 points)
  if (message.previousMessages && message.previousMessages > 0) {
    score += 20
  }

  // 6. First-time engagement (+10 points)
  if (message.isFirstMessage) {
    score += 10
  }

  // 7. Emoji usage (shows engagement) (+5 points)
  const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u
  if (emojiRegex.test(text)) {
    score += 5
  }

  // 8. Spam detection (negative score)
  const spamKeywords = ['spam', 'scam', 'fake', 'arnaque', 'bot']
  if (spamKeywords.some(keyword => text.includes(keyword))) {
    score -= 50
  }

  // Cap score between 0-100
  return Math.max(0, Math.min(100, score))
}

/**
 * Determine if lead is "hot" (worth immediate attention)
 */
export function isHotLead(score: number): boolean {
  return score > 60
}

/**
 * Get score category for display
 */
export function getScoreCategory(score: number): {
  category: 'cold' | 'warm' | 'hot'
  label: string
  color: string
} {
  if (score >= 60) {
    return {
      category: 'hot',
      label: '🔥 Lead chaud',
      color: 'red'
    }
  } else if (score >= 30) {
    return {
      category: 'warm',
      label: '⚡ Lead tiède',
      color: 'orange'
    }
  } else {
    return {
      category: 'cold',
      label: '❄️ Lead froid',
      color: 'blue'
    }
  }
}
