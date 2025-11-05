'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react'

interface Product {
  id: string
  name: string
  price: number
  isActive: boolean
  autoReply?: string
  promoPercent?: number
  promoMessage?: string
}

export default function ProduitsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    isActive: true,
    autoReply: '',
    promoPercent: 0,
    promoMessage: ''
  })

  // Mock data pour démo
  useEffect(() => {
    setProducts([
      {
        id: '1',
        name: 'Formation Instagram',
        price: 297,
        isActive: true,
        autoReply: 'C\'est 297€, paiement sécurisé via Stripe. Je t\'envoie le lien ! 💳',
        promoPercent: 30,
        promoMessage: '-30% jusqu\'à dimanche ⚡'
      },
      {
        id: '2',
        name: 'Coaching 1:1',
        price: 497,
        isActive: true,
        autoReply: 'Le coaching c\'est 497€ pour 4 sessions. On prend rendez-vous ? 📅'
      }
    ])
  }, [])

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price) {
      setProducts([...products, { 
        ...newProduct as Product, 
        id: Date.now().toString() 
      }])
      setNewProduct({
        name: '',
        price: 0,
        isActive: true,
        autoReply: '',
        promoPercent: 0,
        promoMessage: ''
      })
      setIsAddingProduct(false)
    }
  }

  const toggleActive = (id: string) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, isActive: !p.isActive } : p
    ))
  }

  const deleteProduct = (id: string) => {
    if (confirm('Supprimer ce produit ?')) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📦 Mes Produits</h1>
          <p className="text-gray-600">Configure tes produits et leurs messages automatiques</p>
        </div>

        {/* Add Product Button */}
        {!isAddingProduct && (
          <button
            onClick={() => setIsAddingProduct(true)}
            className="mb-6 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            <Plus size={20} />
            Ajouter un produit
          </button>
        )}

        {/* Add Product Form */}
        {isAddingProduct && (
          <div className="mb-6 p-6 bg-white rounded-xl shadow-lg border-2 border-blue-200">
            <h3 className="text-lg font-bold mb-4">Nouveau produit</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du produit
                </label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="Ex: Formation Instagram"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prix (€)
                </label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                  placeholder="297"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message prix personnalisé (optionnel)
                </label>
                <textarea
                  value={newProduct.autoReply}
                  onChange={(e) => setNewProduct({ ...newProduct, autoReply: e.target.value })}
                  placeholder="C'est 297€, paiement sécurisé. Je t'envoie le lien !"
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Promo % (optionnel)
                  </label>
                  <input
                    type="number"
                    value={newProduct.promoPercent || 0}
                    onChange={(e) => setNewProduct({ ...newProduct, promoPercent: parseInt(e.target.value) })}
                    placeholder="30"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message promo (optionnel)
                  </label>
                  <input
                    type="text"
                    value={newProduct.promoMessage}
                    onChange={(e) => setNewProduct({ ...newProduct, promoMessage: e.target.value })}
                    placeholder="-30% jusqu'à dimanche"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleAddProduct}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Check size={18} />
                Ajouter
              </button>
              <button
                onClick={() => setIsAddingProduct(false)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                <X size={18} />
                Annuler
              </button>
            </div>
          </div>
        )}

        {/* Products List */}
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="p-6 bg-white rounded-xl shadow-lg border-2 border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      {product.price}€
                    </span>
                    {product.promoPercent && product.promoPercent > 0 && (
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                        -{product.promoPercent}%
                      </span>
                    )}
                  </div>

                  {product.autoReply && (
                    <div className="mb-2 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1 font-medium">Message auto:</p>
                      <p className="text-gray-800">{product.autoReply}</p>
                    </div>
                  )}

                  {product.promoMessage && (
                    <div className="mb-2">
                      <p className="text-sm text-red-600 font-medium">🔥 {product.promoMessage}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-sm text-gray-600">Disponible:</span>
                    <button
                      onClick={() => toggleActive(product.id)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        product.isActive 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {product.isActive ? '✅ Oui' : '❌ Non'}
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {/* TODO: Edit functionality */}}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && !isAddingProduct && (
          <div className="text-center py-12 text-gray-500">
            Aucun produit. Ajoute ton premier produit pour commencer ! 🚀
          </div>
        )}
      </div>
    </div>
  )
}
