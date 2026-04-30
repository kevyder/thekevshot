import { defineProvider } from '@nuxt/image/runtime'

interface ImgproxyOptions {
  baseURL?: string
  sourceBaseURL?: string
}

function b64urlEncode(s: string): string {
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

export default defineProvider<ImgproxyOptions>({
  getImage: (src, { modifiers = {}, baseURL = '/', sourceBaseURL }) => {
    if (!src) {
      return { url: '' }
    }

    const {
      width = 0,
      height = 0,
      quality = 100,
      format = 'webp',
    } = modifiers

    const parts: string[] = []
    parts.push(`resize:fit:${width}:${height}:0:0`)
    parts.push(`quality:${quality}`)

    const absoluteSrc = src.startsWith('http') ? src : `${sourceBaseURL}${src}`
    const encodedSrc = b64urlEncode(absoluteSrc)
    const processingPath = `/${parts.join('/')}/${encodedSrc}.${format}`

    const base = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL

    return {
      url: `${base}/insecure${processingPath}`,
    }
  },
})