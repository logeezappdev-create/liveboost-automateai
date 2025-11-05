import Link from 'next/link'
import { Facebook, Instagram, Music2 } from 'lucide-react'

export default function ConnectPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Connecte tes comptes
          </h1>
          <p className="text-xl text-gray-600">
            Choisis tes plateformes pour commencer
          </p>
        </div>

        {/* Platform Cards */}
        <div className="space-y-4">
          {/* TikTok */}
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-blue-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center">
                  <Music2 size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">TikTok</h3>
                  <p className="text-gray-600">Connecte ton compte TikTok</p>
                </div>
              </div>
              <button className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all">
                Connecter
              </button>
            </div>
          </div>

          {/* Instagram */}
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-purple-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center">
                  <Instagram size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Instagram</h3>
                  <p className="text-gray-600">Connecte ton compte Instagram</p>
                </div>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                Connecter
              </button>
            </div>
          </div>

          {/* Facebook */}
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-blue-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Facebook size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Facebook</h3>
                  <p className="text-gray-600">Connecte ta page Facebook</p>
                </div>
              </div>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all">
                Connecter
              </button>
            </div>
          </div>
        </div>

        {/* Skip for now */}
        <div className="text-center mt-8">
          <Link 
            href="/hub"
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            Continuer avec la démo →
          </Link>
        </div>
      </div>
    </div>
  )
}
