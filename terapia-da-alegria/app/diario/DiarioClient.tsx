"use client"

import { useState, useCallback } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'

export default function DiarioClient() {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [error, setError] = useState<string | null>(null)

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setError(null)
  }, [])

  const onDocumentLoadError = useCallback((error: Error) => {
    setError(`Failed to load PDF: ${error.message}`)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[--terapia-cream] to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-[--terapia-gray] hover:text-[--terapia-red] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Voltar</span>
            </Link>
            <div className="flex-1 text-center">
              <h1 className="text-2xl font-bold text-[--terapia-gray]">
                Diário da Terapia da Alegria
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Document
          file="/diario.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          className="flex justify-center"
        >
          {numPages && (
            <div className="flex flex-col items-center space-y-6">
              {Array.from(new Array(numPages), (_, index) => (
                <div key={`page_${index + 1}`} className="shadow-2xl rounded-lg overflow-hidden bg-white">
                  <Page
                    pageNumber={index + 1}
                    width={600}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="border"
                  />
                  <div className="bg-gray-100 px-4 py-2 text-center text-sm text-gray-600">
                    Página {index + 1} de {numPages}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Document>

        {!numPages && !error && (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[--terapia-red] mx-auto mb-4"></div>
              <p className="text-xl text-[--terapia-gray]">Carregando o diário...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <p className="text-red-600 text-lg mb-4">{error}</p>
              <p className="text-[--terapia-gray]">Verifique se o arquivo PDF está disponível.</p>
              <Link
                href="/"
                className="inline-block mt-4 px-6 py-2 bg-[--terapia-red] text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Voltar ao início
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}