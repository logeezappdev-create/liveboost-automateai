'use client'

import { useState } from 'react'
import { Timer, Users, Tag, MessageSquare, TrendingUp, Eye } from 'lucide-react'
import Link from 'next/link'

export default function LiveConfigPage() {
  const [config, setConfig] = useState({
    featuredProduct: '1',
    discount: 30,
    limitedPlaces: 10,
    overlayMessage: '🔥 Offre spéciale LIVE !',
    timerEnabled: true,
    timerDuration: 30,
    socialProof: true,
  })

  const [showPreview, setShowPreview] = useState(false)

  // Mock products
  const products = [
    { id: '1', name: 'Formation Instagram', price: 297 },
    { id: '2', name: 'Coaching 1:1', price: 497 },
  ]

  const handleStartLive = () => {
    // TODO: Call API to create live event
    alert('Live démarré ! 🚀 Ouvre l\'overlay dans OBS')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🔴 Config Live Boost</h1>
          <p className="text-gray-600">Configure ton overlay et tes paramètres avant de lancer le live</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Config */}
          <div className="space-y-6">
            {/* Product Selection */}
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="text-blue-600" size={24} />
                <h2 className="text-xl font-bold">Produit à pousser</h2>
              </div>

              <select
                value={config.featuredProduct}
                onChange={(e) => setConfig({ ...config, featuredProduct: e.target.value })}
                className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} - {p.price}€
                  </option>
                ))}
              </select>
            </div>

            {/* Discount */}
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="text-green-600" size={24} />
                <h2 className="text-xl font-bold">Réduction live</h2>
              </div>

              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={config.discount}
                  onChange={(e) => setConfig({ ...config, discount: parseInt(e.target.value) })}
                  className="w-24 px-4 py-3 border-2 rounded-lg text-center text-2xl font-bold focus:ring-2 focus:ring-green-500"
                />
                <span className="text-3xl font-bold text-green-600">%</span>
                <div className="flex-1 text-right">
                  <div className="text-2xl font-bold text-gray-800">
                    {Math.round(297 * (1 - config.discount / 100))}€
                  </div>
                  <div className="text-sm text-gray-500 line-through">297€</div>
                </div>
              </div>
            </div>

            {/* Limited Places */}
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Users className="text-red-600" size={24} />
                <h2 className="text-xl font-bold">Places limitées</h2>
              </div>

              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={config.limitedPlaces || 0}
                  onChange={(e) => setConfig({ ...config, limitedPlaces: parseInt(e.target.value) })}
                  className="w-24 px-4 py-3 border-2 rounded-lg text-center text-2xl font-bold focus:ring-2 focus:ring-red-500"
                />
                <span className="text-gray-600">places disponibles</span>
              </div>
            </div>

            {/* Overlay Message */}
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="text-purple-600" size={24} />
                <h2 className="text-xl font-bold">Message overlay</h2>
              </div>

              <input
                type="text"
                value={config.overlayMessage}
                onChange={(e) => setConfig({ ...config, overlayMessage: e.target.value })}
                placeholder="🔥 Offre spéciale LIVE !"
                className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Timer Settings */}
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Timer className="text-orange-600" size={24} />
                <h2 className="text-xl font-bold">Timer urgence</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setConfig({ ...config, timerEnabled: !config.timerEnabled })}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      config.timerEnabled
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {config.timerEnabled ? '✅ Activé' : '❌ Désactivé'}
                  </button>
                </div>

                {config.timerEnabled && (
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      value={config.timerDuration}
                      onChange={(e) => setConfig({ ...config, timerDuration: parseInt(e.target.value) })}
                      className="w-24 px-4 py-3 border-2 rounded-lg text-center text-2xl font-bold focus:ring-2 focus:ring-orange-500"
                    />
                    <span className="text-gray-600">minutes</span>
                  </div>
                )}
              </div>
            </div>

            {/* Social Proof */}
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-1">Social proof</h2>
                  <p className="text-sm text-gray-600">Afficher "X personnes ont acheté"</p>
                </div>
                <button
                  onClick={() => setConfig({ ...config, socialProof: !config.socialProof })}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    config.socialProof
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {config.socialProof ? '✅ Activé' : '❌ Désactivé'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Preview & Actions */}
          <div className="space-y-6">
            {/* Preview Overlay */}
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Eye className="text-blue-600" size={24} />
                  <h2 className="text-xl font-bold">Aperçu overlay</h2>
                </div>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200"
                >
                  {showPreview ? 'Masquer' : 'Voir'}
                </button>
              </div>

              {showPreview && (
                <div className="relative bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg p-8 text-white overflow-hidden">
                  {/* Overlay Preview */}
                  <div className="text-center space-y-4">
                    <div className="text-2xl font-bold">{config.overlayMessage}</div>
                    
                    {config.discount > 0 && (
                      <div className="text-6xl font-black text-yellow-300">
                        -{config.discount}%
                      </div>
                    )}

                    {config.timerEnabled && (
                      <div className="p-4 bg-black/30 rounded-lg backdrop-blur-sm">
                        <div className="text-sm mb-1">Offre expire dans</div>
                        <div className="text-5xl font-mono font-bold">
                          {String(config.timerDuration).padStart(2, '0')}:00
                        </div>
                      </div>
                    )}

                    {config.limitedPlaces && config.limitedPlaces > 0 && (
                      <div className="text-xl font-bold text-red-300">
                        ⚡ Plus que {config.limitedPlaces} places !
                      </div>
                    )}

                    {config.socialProof && (
                      <div className="text-sm text-white/80">
                        ✅ 23 personnes ont acheté aujourd'hui
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Start Live Button */}
            <div className="p-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-lg text-white">
              <h2 className="text-2xl font-bold mb-4">🚀 Prêt à démarrer ?</h2>
              <p className="mb-6">
                Clique sur "Démarrer" puis ajoute l'overlay dans OBS avec le lien qui s'affiche
              </p>
              <button
                onClick={handleStartLive}
                className="w-full px-6 py-4 bg-white text-blue-600 rounded-lg font-bold text-xl hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                🔴 Démarrer le Live
              </button>
            </div>

            {/* Links */}
            <div className="space-y-3">
              <Link
                href="/produits"
                className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all text-center font-medium text-gray-700"
              >
                📦 Gérer mes produits
              </Link>
              <Link
                href="/parametres"
                className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all text-center font-medium text-gray-700"
              >
                ⚙️ Paramètres généraux
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
