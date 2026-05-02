"use client"

import { useState, useCallback, useEffect, useRef, type TouchEvent } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { ArrowLeft, ChevronLeft, ChevronRight, Menu } from 'lucide-react'
import Link from 'next/link'

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'

export default function DiarioClient() {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [pageWidth, setPageWidth] = useState(600)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    const updatePageWidth = () => {
      const isMobile = window.innerWidth < 768
      const horizontalPadding = isMobile ? 24 : 80
      const maxWidth = isMobile ? 480 : 800
      setPageWidth(Math.min(window.innerWidth - horizontalPadding, maxWidth))
    }

    updatePageWidth()
    window.addEventListener('resize', updatePageWidth)
    return () => window.removeEventListener('resize', updatePageWidth)
  }, [])

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setPageNumber(1)
    setError(null)
  }, [])

  const onDocumentLoadError = useCallback((error: Error) => {
    setError(`Falha ao carregar PDF: ${error.message}`)
  }, [])

  const goToPreviousPage = () => {
    setPageNumber((currentPage) => Math.max(currentPage - 1, 1))
  }

  const goToNextPage = () => {
    setPageNumber((currentPage) => Math.min(currentPage + 1, numPages || 1))
  }

  const readingProgress = numPages ? Math.round((pageNumber / numPages) * 100) : 0

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null
  }

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return

    const touchEndX = event.changedTouches[0]?.clientX
    if (typeof touchEndX !== 'number') return

    const distance = touchEndX - touchStartX.current
    const minSwipeDistance = 40

    if (distance <= -minSwipeDistance) goToNextPage()
    if (distance >= minSwipeDistance) goToPreviousPage()

    touchStartX.current = null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[--terapia-cream] to-white pb-24">
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm shadow-sm border-b">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-[--terapia-gray] hover:text-[--terapia-red] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium hidden sm:inline">Voltar</span>
            </Link>

            <div className="flex-1">
              <p className="text-xs uppercase tracking-wide text-gray-500">Diário da Terapia da Alegria</p>
              <h1 className="text-base sm:text-lg font-semibold text-[--terapia-gray] flex items-center gap-2">
                Leitor de PDF
                <Menu className="w-4 h-4 text-gray-400" />
              </h1>
            </div>

            {numPages && (
              <div className="text-right">
                <p className="text-sm font-medium text-[--terapia-gray]">
                  {pageNumber}/{numPages}
                </p>
                <p className="text-xs text-gray-500">{readingProgress}% lido</p>
              </div>
            )}
          </div>

          {numPages && (
            <div className="mt-3 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[--terapia-red] transition-all duration-300"
                style={{ width: `${readingProgress}%` }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-3 sm:px-6 py-5 sm:py-8">
        <Document
          file="/diario.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          className="flex justify-center"
        >
          {numPages && (
            <div
              className="w-full flex flex-col items-center"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div className="shadow-2xl rounded-xl overflow-hidden bg-white border">
                <Page
                  key={`page_${pageNumber}`}
                  pageNumber={pageNumber}
                  width={pageWidth}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="bg-white"
                />
              </div>
              <p className="mt-3 text-sm text-gray-600">Deslize para o lado ou use os botões para trocar de página.</p>
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

      {numPages && (
        <div className="fixed bottom-0 left-0 right-0 z-30 border-t bg-white/95 backdrop-blur-sm p-3">
          <div className="max-w-md mx-auto grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={goToPreviousPage}
              disabled={pageNumber === 1}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gray-100 text-[--terapia-gray] font-medium disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Anterior
            </button>

            <button
              type="button"
              onClick={goToNextPage}
              disabled={pageNumber === numPages}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[--terapia-red] text-white font-medium disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Próxima
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
