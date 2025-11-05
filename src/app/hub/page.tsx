import Link from 'next/link'
import { MessageCircle, Package, Settings, Zap } from 'lucide-react'

export default function HubPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🚀 Dashboard</h1>
          <p className="text-gray-600">Bienvenue sur AutomateAI</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link
            href="/live/config"
            className="p-6 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg hover:shadow-2xl transition-all text-white group"
          >
            <Zap size={32} className="mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-1">Démarrer Live</h3>
            <p className="text-white/80 text-sm">Configure et lance ton live boost</p>
          </Link>

          <Link
            href="/produits"
            className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all group"
          >
            <Package size={32} className="mb-3 text-blue-600 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-gray-800 mb-1">Produits</h3>
            <p className="text-gray-600 text-sm">Gère tes produits et prix</p>
          </Link>

          <Link
            href="/hub"
            className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all group"
          >
            <MessageCircle size={32} className="mb-3 text-green-600 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-gray-800 mb-1">Messages</h3>
            <p className="text-gray-600 text-sm">Inbox unifié (bientôt)</p>
          </Link>

          <Link
            href="/parametres"
            className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all group"
          >
            <Settings size={32} className="mb-3 text-purple-600 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-gray-800 mb-1">Paramètres</h3>
            <p className="text-gray-600 text-sm">Configure ton compte</p>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white rounded-xl shadow-lg">
            <div className="text-sm text-gray-600 mb-1">Leads ce mois</div>
            <div className="text-4xl font-bold text-gray-800">247</div>
            <div className="text-sm text-green-600 mt-1">+23% vs mois dernier</div>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-lg">
            <div className="text-sm text-gray-600 mb-1">Revenue généré</div>
            <div className="text-4xl font-bold text-gray-800">15,840€</div>
            <div className="text-sm text-green-600 mt-1">+45% vs mois dernier</div>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-lg">
            <div className="text-sm text-gray-600 mb-1">Temps économisé</div>
            <div className="text-4xl font-bold text-gray-800">24h</div>
            <div className="text-sm text-blue-600 mt-1">Ce mois-ci</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Activité récente</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 border-2 border-gray-100 rounded-lg hover:border-blue-500 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-800">Live TikTok - {i} nov 2025</div>
                    <div className="text-sm text-gray-600">23 leads • 5,940€ généré</div>
                  </div>
                  <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Terminé
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
