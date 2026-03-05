export interface Photo {
  src: string
  alt: string
  caption?: string
}

export interface GalleryDetail {
  id: string
  title: string
  slug: string
  presentationImage: string
  images: Photo[]
  order: number
}
