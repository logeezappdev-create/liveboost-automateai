import Link from 'next/link'
import { Zap, MessageCircle, TrendingUp, Timer, Users, DollarSign } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Live Boost ⚡
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            Booste tes ventes pendant tes lives TikTok
          </p>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Capture automatiquement les leads chauds, envoie des DMs intelligents, 
            et crée l'urgence avec des overlays pro. Tout est automatisé pendant que tu lives ! 🚀
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              href="/connect" 
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Commencer gratuitement
            </Link>
            <Link 
              href="#features" 
              className="px-8 py-4 bg-white text-gray-800 rounded-lg font-semibold text-lg hover:shadow-lg border-2 border-gray-200 transition-all"
            >
              Voir les features
            </Link>
          </div>
        </div>

        {/* Stats Preview */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <DollarSign className="w-12 h-12 mx-auto mb-3 text-green-600" />
            <div className="text-3xl font-bold text-gray-800 mb-2">+210%</div>
            <div className="text-gray-600">Conversions en moyenne</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <Users className="w-12 h-12 mx-auto mb-3 text-blue-600" />
            <div className="text-3xl font-bold text-gray-800 mb-2">23</div>
            <div className="text-gray-600">Leads capturés par live</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <Timer className="w-12 h-12 mx-auto mb-3 text-purple-600" />
            <div className="text-3xl font-bold text-gray-800 mb-2">5 min</div>
            <div className="text-gray-600">Setup complet</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Tout ce dont tu as besoin
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 transition-all">
              <Timer className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Timer d'urgence</h3>
              <p className="text-gray-600">
                Compte à rebours en overlay pour créer la FOMO et pousser à l'action maintenant
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 transition-all">
              <Users className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Social proof live</h3>
              <p className="text-gray-600">
                Affiche en temps réel combien de personnes ont déjà acheté. La preuve sociale qui convertit ! 🔥
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 transition-all">
              <TrendingUp className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Réduction % live</h3>
              <p className="text-gray-600">
                Affiche ta promo en gros. -30% qui claque pour pousser les ventes pendant le live
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 border-2 border-gray-200 rounded-xl hover:border-red-500 transition-all">
              <Zap className="w-10 h-10 text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Places limitées</h3>
              <p className="text-gray-600">
                "Plus que 3 places !" L'urgence qui pousse à l'action immédiate ⚡
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 transition-all">
              <MessageCircle className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Auto-replies IA</h3>
              <p className="text-gray-600">
                DMs automatiques intelligents. Claude répond aux questions pendant que tu lives 🤖
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 transition-all">
              <DollarSign className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Revenue tracking</h3>
              <p className="text-gray-600">
                Suis tes ventes en temps réel. Dashboard qui te montre exactement combien tu génères 💰
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à exploser tes ventes ? 🚀
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Setup en 5 minutes. Premiers résultats dès ton prochain live.
          </p>
          <Link 
            href="/connect" 
            className="inline-block px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all"
          >
            Commencer maintenant
          </Link>
        </div>
      </div>
    </div>
  )
}
