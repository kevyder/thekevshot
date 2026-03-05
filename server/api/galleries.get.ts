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

export interface Gallery {
  id: string
  title: string
  slug: string
  presentationImage: string
  imageCount: number
  order: number
}

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig(event)
    const cmsBaseUrl = config.cmsBaseUrl

    const response = await $fetch<{ data: CmsGalleryItem[] }>(
      `${cmsBaseUrl}/api/collections/galleries/content?sort=order&limit=12`
    )

    const galleries: Gallery[] = response.data
      .filter((item) => item.status === 'published')
      .map((item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        presentationImage: `${config.mediaBaseUrl}${item.data.presentationImage}`,
        imageCount: item.data.images.length,
        order: item.data.order,
      }))
      .sort((a, b) => a.order - b.order)

    return galleries
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to load galleries',
    })
  }
})
