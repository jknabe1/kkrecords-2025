"use client"

import { useEffect, useRef, useState, useCallback } from "react"

const ASCII_CHARS = " .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$"

interface AsciiImageProps {
  imageUrl: string
}

export function AsciiImage({ imageUrl }: AsciiImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [ascii, setAscii] = useState<string>("")
  const [fontSize, setFontSize] = useState(4)
  const [loaded, setLoaded] = useState(false)
  const imageDataRef = useRef<{
    canvas: HTMLCanvasElement
    width: number
    height: number
  } | null>(null)

  useEffect(() => {
    if (!imageUrl) return

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")
      if (!ctx) return
      ctx.drawImage(img, 0, 0)
      imageDataRef.current = {
        canvas,
        width: img.width,
        height: img.height,
      }
      setLoaded(true)
    }
    img.src = imageUrl
  }, [imageUrl])

  const generateAscii = useCallback(() => {
    if (!imageDataRef.current || !containerRef.current) return

    const { canvas: srcCanvas, width: imgW, height: imgH } = imageDataRef.current
    const ctx = srcCanvas.getContext("2d")
    if (!ctx) return

    const container = containerRef.current
    const containerW = container.clientWidth
    const containerH = container.clientHeight

    if (containerW === 0 || containerH === 0) return

    const charAspect = 0.5
    const cellW = fontSize * charAspect
    const cellH = fontSize

    const maxCols = Math.floor(containerW / cellW)
    const maxRows = Math.floor(containerH / cellH)

    if (maxCols === 0 || maxRows === 0) return

    const imgAspect = imgW / imgH
    const containerAspect = maxCols / maxRows

    let cols, rows

    if (imgAspect > containerAspect) {
      cols = maxCols
      rows = Math.floor(cols / imgAspect)
    } else {
      rows = maxRows
      cols = Math.floor(rows * imgAspect)
    }

    if (cols <= 0 || rows <= 0) return

    const sampleCanvas = document.createElement("canvas")
    sampleCanvas.width = cols
    sampleCanvas.height = rows
    const sampleCtx = sampleCanvas.getContext("2d")
    if (!sampleCtx) return

    sampleCtx.drawImage(srcCanvas, 0, 0, imgW, imgH, 0, 0, cols, rows)
    const imageData = sampleCtx.getImageData(0, 0, cols, rows)
    const pixels = imageData.data

    let result = ""
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const idx = (y * cols + x) * 4
        const r = pixels[idx]
        const g = pixels[idx + 1]
        const b = pixels[idx + 2]
        const a = pixels[idx + 3]

        if (a < 10) {
          result += " "
          continue
        }

        const brightness = 0.299 * r + 0.587 * g + 0.114 * b
        const charIdx = Math.floor(
          (brightness / 255) * (ASCII_CHARS.length - 1)
        )
        result += ASCII_CHARS[charIdx]
      }
      result += "\n"
    }

    setAscii(result)
  }, [fontSize])

  useEffect(() => {
    if (!loaded) return
    const timer = setTimeout(() => {
      generateAscii()
    }, 100)
    return () => clearTimeout(timer)
  }, [loaded, generateAscii])

  useEffect(() => {
    if (!loaded) return

    const handleResize = () => {
      if (!containerRef.current) return
      const containerW = containerRef.current.clientWidth
      
      if (containerW < 300) setFontSize(2.5)
      else if (containerW < 400) setFontSize(3)
      else if (containerW < 600) setFontSize(3.5)
      else setFontSize(4)

      generateAscii()
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [loaded, generateAscii])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      {!loaded && (
        <div className="text-black/50 font-mono text-sm animate-pulse">
          Loading...
        </div>
      )}

      {loaded && ascii && (
        <pre
          className="ascii-art select-none text-black/70 leading-none"
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: 1,
            letterSpacing: "0px",
            whiteSpace: "pre",
            fontFamily: "'Courier New', Courier, monospace",
            fontWeight: 400,
          }}
          aria-hidden="true"
        >
          {ascii}
        </pre>
      )}
    </div>
  )
}