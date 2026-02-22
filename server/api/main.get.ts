interface CmsMainPageItem {
  id: string
  status: string
  data: {
    title: string
    photo: string
    altText?: string
    status: 'draft' | 'published' | 'archived'
  }
}

interface CmsResponse {
  data: CmsMainPageItem[]
}

export interface Photo {
  src: string
  alt: string
  caption: string
}

export default defineEventHandler(async (event): Promise<Photo[]> => {
  const config = useRuntimeConfig(event)
  const cmsBaseUrl = config.cmsBaseUrl
  const mediaBaseUrl = config.mediaBaseUrl

  try {
    const response = await $fetch<CmsResponse>(
      `${cmsBaseUrl}/api/collections/main-page/content?limit=12&status=published`
    )

    if (!response?.data) {
      return []
    }

    return response.data
      .filter((item) => item.data.status === 'published')
      .map((item) => ({
        src: `${mediaBaseUrl}${item.data.photo}`,
        alt: item.data.altText || item.data.title,
        caption: item.data.title
      }))
  } catch (error) {
    console.error('Failed to fetch photos from CMS:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch photos'
    })
  }
})
