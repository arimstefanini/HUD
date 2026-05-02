"use client"

import { useState, useCallback } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import Image from 'next/image'
import { X } from 'lucide-react'

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'

interface PDFBookReaderProps {
  isOpen: boolean
  onClose: () => void
}

export function PDFBookReader({ isOpen, onClose }: PDFBookReaderProps) {
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>

        {/* PDF Viewer */}
        <div className="p-6">
          <Document
            file="/diario.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            className="flex justify-center"
          >
            {numPages && (
              <div className="flex flex-col items-center">
                {Array.from(new Array(numPages), (_, index) => (
                  <div key={`page_${index + 1}`} className="mb-4 shadow-lg">
                    <Page
                      pageNumber={index + 1}
                      width={400}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  </div>
                ))}
              </div>
            )}
          </Document>

          {!numPages && !error && (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Carregando o diário...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <p className="text-red-600 mb-4">{error}</p>
                <p className="text-gray-600">Verifique se o arquivo PDF está disponível.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}