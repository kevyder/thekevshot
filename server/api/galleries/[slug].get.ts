import type { Photo, GalleryDetail } from '@@/shared/types/gallery'

interface CmsGalleryItem {
  id: string
  title: string
  slug: string
  status: string
  data: {
    title: string
    presentationImage: string
    order: number
    images: Array<{ photo: string }>
  }
}

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig(event)
    const cmsBaseUrl = config.cmsBaseUrl
    const gallerySlug = event.context.params?.slug

    if (!gallerySlug) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Gallery slug is required',
      })
    }

    // Fetch all galleries and find by slug
    const response = await $fetch<{ data: CmsGalleryItem[] }>(
      `${cmsBaseUrl}/api/collections/galleries/content?limit=12`
    )

    const item = response.data.find((g) => g.slug === gallerySlug)

    if (!item || item.status !== 'published') {
      throw createError({
        statusCode: 404,
        statusMessage: 'Gallery not found',
      })
    }

    const gallery: GalleryDetail = {
      id: item.id,
      title: item.title,
      slug: item.slug,
      presentationImage: `${config.mediaBaseUrl}${item.data.presentationImage}`,
      images: item.data.images.map((img) => ({
        src: `${config.mediaBaseUrl}${img.photo}`,
        alt: item.data.title,
        caption: undefined,
      })),
      order: item.data.order,
    }

    return gallery
  } catch (error) {
    if (error instanceof H3Error) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to load gallery',
    })
  }
})
