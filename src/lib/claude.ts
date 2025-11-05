/**
 * Claude API Integration for intelligent auto-replies
 */

interface Message {
  text: string
  username: string
}

interface UserConfig {
  tone: 'pro' | 'friendly' | 'enthusiastic'
  useEmojis: boolean
  signature?: string
  productInfo?: {
    name: string
    price: number
    description?: string
  }
}

/**
 * Generate intelligent response using Claude API
 */
export async function generateClaudeResponse(
  message: Message,
  config: UserConfig
): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY

  if (!apiKey) {
    console.warn('⚠️ ANTHROPIC_API_KEY not set, using template response')
    return generateTemplateResponse(message, config)
  }

  try {
    const prompt = buildPrompt(message, config)

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    })

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status}`)
    }

    const data = await response.json()
    let reply = data.content[0].text

    // Add signature if configured
    if (config.signature) {
      reply += `\n\n${config.signature}`
    }

    return reply

  } catch (error) {
    console.error('❌ Claude API error:', error)
    // Fallback to template
    return generateTemplateResponse(message, config)
  }
}

/**
 * Build prompt for Claude based on message and config
 */
function buildPrompt(message: Message, config: UserConfig): string {
  const toneDescriptions = {
    pro: 'professional and polished',
    friendly: 'warm and approachable',
    enthusiastic: 'energetic and exciting'
  }

  const productInfo = config.productInfo
    ? `\n\nProduct info:\n- Name: ${config.productInfo.name}\n- Price: ${config.productInfo.price}€\n- Description: ${config.productInfo.description || 'N/A'}`
    : ''

  return `You are helping respond to a potential customer during a live stream. 

Message from ${message.username}: "${message.text}"

Write a short DM response (2-3 sentences max) that is ${toneDescriptions[config.tone]}${config.useEmojis ? ' and uses 1-2 relevant emojis' : ', no emojis'}.${productInfo}

Important:
- Be helpful and encouraging
- If they ask about price, mention it clearly
- If they show buying intent, guide them to purchase
- Keep it conversational and natural
- Don't use the signature (it will be added automatically)

Response:`
}

/**
 * Generate template-based response (fallback when Claude API unavailable)
 */
function generateTemplateResponse(
  message: Message,
  config: UserConfig
): string {
  const text = message.text.toLowerCase()

  let response = ''

  // Price inquiry
  if (text.includes('prix') || text.includes('price') || text.includes('combien')) {
    const price = config.productInfo?.price || 297
    const productName = config.productInfo?.name || 'le produit'
    
    response = config.tone === 'pro'
      ? `Le ${productName} est à ${price}€. Paiement sécurisé disponible.`
      : `${productName} c'est ${price}€ ! Je t'envoie le lien de paiement 💳`
  }
  // Buying intent
  else if (text.includes('acheter') || text.includes('buy') || text.includes('je veux')) {
    response = config.tone === 'pro'
      ? `Parfait ! Je vous envoie le lien de paiement par DM.`
      : `Super ! Je t'envoie ça tout de suite 🚀`
  }
  // Questions about product
  else if (text.includes('comment') || text.includes('marche') || text.includes('how')) {
    response = config.tone === 'pro'
      ? `Je serais ravi de vous expliquer. Puis-je vous appeler ou préférez-vous un message détaillé ?`
      : `Excellente question ! Je te réponds en détail par DM 💬`
  }
  // General engagement
  else {
    response = config.tone === 'pro'
      ? `Merci pour votre intérêt ! Je vous contacte par message privé.`
      : `Merci ! Je te réponds en DM 💌`
  }

  // Add emojis if configured (and not already present)
  if (config.useEmojis && !response.match(/[\u{1F600}-\u{1F64F}]/u)) {
    response += ' ✨'
  }

  // Add signature
  if (config.signature) {
    response += `\n\n${config.signature}`
  }

  return response
}

/**
 * Validate message should get auto-reply
 */
export function shouldAutoReply(message: Message): boolean {
  const text = message.text.toLowerCase()

  // Don't reply to spam
  const spamKeywords = ['spam', 'scam', 'fake', 'bot', 'arnaque']
  if (spamKeywords.some(keyword => text.includes(keyword))) {
    return false
  }

  // Don't reply to very short messages
  if (text.length < 3) {
    return false
  }

  return true
}
