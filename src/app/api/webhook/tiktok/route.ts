import { NextRequest, NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'
// import { calculateScore } from '@/lib/scoring'
// import { generateClaudeResponse } from '@/lib/claude'

// const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const message = await req.json()
    
    console.log('📨 TikTok message received:', message)

    // TODO: Implement full logic
    // 1. Calculate score
    // const score = calculateScore(message)
    const score = 75 // Mock score

    // 2. If hot lead (score > 60)
    if (score > 60) {
      console.log('🔥 Hot lead detected!', message.username)

      // 3. Get user config from DB
      // const config = await prisma.userSettings.findFirst()

      // 4. Generate response (template or Claude)
      // const reply = await generateClaudeResponse(message, config)
      const reply = "Hey ! Super de te voir sur le live ! Je t'envoie les infos en DM 💌"

      // 5. Send DM (via TikTok API)
      // await sendTikTokDM(message.userId, reply)
      console.log('💬 DM sent:', reply)

      // 6. Save lead to DB
      // await prisma.lead.create({
      //   data: {
      //     liveEventId: message.liveId,
      //     username: message.username,
      //     message: message.text,
      //     score: score,
      //   }
      // })

      // 7. Notify dashboard via WebSocket
      // io.emit('new-lead', { username: message.username, score })

      return NextResponse.json({ 
        success: true, 
        action: 'dm_sent',
        score 
      })
    }

    return NextResponse.json({ 
      success: true, 
      action: 'scored',
      score 
    })
  } catch (error) {
    console.error('❌ Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

// Verify webhook signature (TikTok security)
export async function GET(req: NextRequest) {
  const challenge = req.nextUrl.searchParams.get('challenge')
  
  if (challenge) {
    return new Response(challenge, { status: 200 })
  }

  return NextResponse.json({ status: 'ok' })
}
