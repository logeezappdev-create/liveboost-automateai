'use client'

import { useState, useEffect } from 'react'
import { DollarSign, Users, MessageCircle, TrendingUp } from 'lucide-react'

interface Lead {
  id: string
  username: string
  message: string
  createdAt: string
}

export default function LiveDashboard({ params }: { params: { liveId: string } }) {
  const [stats, setStats] = useState({
    viewers: 247,
    leadsCaptured: 23,
    revenue: 5940,
    conversionRate: 9.3
  })

  const [hotLeads, setHotLeads] = useState<Lead[]>([
    {
      id: '1',
      username: 'MaxPower23',
      message: 'Je veux acheter la formation !',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      username: 'FitSarah',
      message: 'C\'est quoi le code promo ?',
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      username: 'CoachTom',
      message: 'Ça marche vraiment ton truc ?',
      createdAt: new Date().toISOString()
    }
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        viewers: prev.viewers + Math.floor(Math.random() * 10) - 3,
        leadsCaptured: prev.leadsCaptured + (Math.random() > 0.7 ? 1 : 0)
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const sendDM = (lead: Lead) => {
    alert(`DM envoyé à ${lead.username} ! 💌`)
  }

  const handleStopLive = () => {
    if (confirm('Arrêter le live ?')) {
      alert('Live terminé ! ✅ Résumé en cours de génération...')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
              <h1 className="text-3xl font-bold text-gray-800">Live en cours</h1>
            </div>
            <p className="text-gray-600">Dashboard temps réel - ID: {params.liveId}</p>
          </div>
          <button
            onClick={handleStopLive}
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all"
          >
            ⏹️ Arrêter le Live
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-white rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Users className="text-blue-600" size={24} />
              <span className="text-sm text-gray-500">Live</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">{stats.viewers}</div>
            <div className="text-sm text-gray-600">viewers</div>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <MessageCircle className="text-green-600" size={24} />
              <span className="text-sm text-gray-500">Leads</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">{stats.leadsCaptured}</div>
            <div className="text-sm text-gray-600">capturés 🔥</div>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="text-purple-600" size={24} />
              <span className="text-sm text-gray-500">Revenue</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">{stats.revenue}€</div>
            <div className="text-sm text-gray-600">généré 💰</div>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="text-orange-600" size={24} />
              <span className="text-sm text-gray-500">Conversion</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">{stats.conversionRate}%</div>
            <div className="text-sm text-gray-600">taux</div>
          </div>
        </div>

        {/* Hot Leads */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            🔥 Leads chauds
            <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold">
              {hotLeads.length}
            </span>
          </h2>

          <div className="space-y-4">
            {hotLeads.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Aucun lead chaud pour le moment...
              </div>
            ) : (
              hotLeads.map((lead) => (
                <div key={lead.id} className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {lead.username[0].toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-gray-800">{lead.username}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(lead.createdAt).toLocaleTimeString('fr-FR')}
                          </div>
                        </div>
                      </div>
                      <div className="ml-12 p-3 bg-gray-50 rounded-lg">
                        <p className="text-gray-700">{lead.message}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => sendDM(lead)}
                      className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all whitespace-nowrap"
                    >
                      📨 Envoyer DM
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg text-white">
          <h3 className="text-xl font-bold mb-4">🎯 Actions rapides</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <button className="p-4 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all font-medium">
              📢 Relancer la promo
            </button>
            <button className="p-4 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all font-medium">
              ⏱️ +10 min au timer
            </button>
            <button className="p-4 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all font-medium">
              🎁 Drop code promo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
