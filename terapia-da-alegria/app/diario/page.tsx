"use client"

import dynamic from 'next/dynamic'

const DiarioPage = dynamic(() => import('./DiarioClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-b from-[--terapia-cream] to-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[--terapia-red] mx-auto mb-4"></div>
        <p className="text-xl text-[--terapia-gray]">Carregando...</p>
      </div>
    </div>
  )
})

export default DiarioPage