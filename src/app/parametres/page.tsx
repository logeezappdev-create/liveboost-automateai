'use client'

import { useState } from 'react'
import { MessageSquare, Bell, User } from 'lucide-react'

export default function ParametresPage() {
  const [settings, setSettings] = useState({
    tone: 'friendly',
    useEmojis: true,
    signature: '- Sarah 💕',
    autoReplyPrice: true,
    deliveryMessage: 'Livraison sous 24h par email',
    notifyHotLead: true,
    dailyReport: true
  })

  const handleSave = () => {
    alert('✅ Paramètres sauvegardés !')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">⚙️ Paramètres</h1>
          <p className="text-gray-600">Configure ton ton et tes notifications</p>
        </div>

        {/* Tone Settings */}
        <div className="mb-6 p-6 bg-white rounded-xl shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="text-blue-600" size={24} />
            <h2 className="text-xl font-bold">Ton général</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Style de communication
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['pro', 'friendly', 'enthusiastic'].map((tone) => (
                  <button
                    key={tone}
                    onClick={() => setSettings({ ...settings, tone })}
                    className={`p-3 rounded-lg font-medium transition-all ${
                      settings.tone === tone
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tone === 'pro' && '💼 Pro'}
                    {tone === 'friendly' && '😊 Amical'}
                    {tone === 'enthusiastic' && '🔥 Enthousiaste'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-800">Utiliser des emojis</div>
                <div className="text-sm text-gray-600">Ajoute des emojis dans les réponses</div>
              </div>
              <button
                onClick={() => setSettings({ ...settings, useEmojis: !settings.useEmojis })}
                className={`px-4 py-2 rounded-lg font-medium ${
                  settings.useEmojis
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {settings.useEmojis ? '✅ Oui' : '❌ Non'}
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Signature automatique
              </label>
              <input
                type="text"
                value={settings.signature}
                onChange={(e) => setSettings({ ...settings, signature: e.target.value })}
                placeholder="- Sarah 💕"
                className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Auto-reply Settings */}
        <div className="mb-6 p-6 bg-white rounded-xl shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <User className="text-purple-600" size={24} />
            <h2 className="text-xl font-bold">Réponses automatiques</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-800">Réponse auto prix</div>
                <div className="text-sm text-gray-600">Répond automatiquement aux questions de prix</div>
              </div>
              <button
                onClick={() => setSettings({ ...settings, autoReplyPrice: !settings.autoReplyPrice })}
                className={`px-4 py-2 rounded-lg font-medium ${
                  settings.autoReplyPrice
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {settings.autoReplyPrice ? '✅ Oui' : '❌ Non'}
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message livraison personnalisé
              </label>
              <textarea
                value={settings.deliveryMessage}
                onChange={(e) => setSettings({ ...settings, deliveryMessage: e.target.value })}
                placeholder="Livraison sous 24h par email"
                rows={3}
                className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="mb-6 p-6 bg-white rounded-xl shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="text-orange-600" size={24} />
            <h2 className="text-xl font-bold">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-800">Lead chaud détecté</div>
                <div className="text-sm text-gray-600">Notif SMS/push quand lead très intéressé</div>
              </div>
              <button
                onClick={() => setSettings({ ...settings, notifyHotLead: !settings.notifyHotLead })}
                className={`px-4 py-2 rounded-lg font-medium ${
                  settings.notifyHotLead
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {settings.notifyHotLead ? '✅ Oui' : '❌ Non'}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-800">Rapport quotidien</div>
                <div className="text-sm text-gray-600">Email recap chaque matin avec tes stats</div>
              </div>
              <button
                onClick={() => setSettings({ ...settings, dailyReport: !settings.dailyReport })}
                className={`px-4 py-2 rounded-lg font-medium ${
                  settings.dailyReport
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {settings.dailyReport ? '✅ Oui' : '❌ Non'}
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all"
        >
          💾 Sauvegarder les paramètres
        </button>
      </div>
    </div>
  )
}
