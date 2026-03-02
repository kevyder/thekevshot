interface CmsLinksItem {
  id: string
  status: string
  data: {
    title: string
    url: string
    order: number
  }
}

interface CmsResponse {
  data: CmsLinksItem[]
}

export interface Link {
  id: string
  title: string
  url: string
  order: number
}

export default defineEventHandler(async (event): Promise<Link[]> => {
  const config = useRuntimeConfig(event)
  const cmsBaseUrl = config.cmsBaseUrl

  try {
    const response = await $fetch<CmsResponse>(
      `${cmsBaseUrl}/api/collections/links/content?limit=12`
    )

    if (!response?.data) {
      return []
    }

    return response.data
      .filter((item) => item.status === 'published')
      .map((item) => ({
        id: item.id,
        title: item.data.title,
        url: item.data.url,
        order: item.data.order
      }))
      .sort((a, b) => a.order - b.order)
  } catch (error) {
    console.error('Failed to fetch links from CMS:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch links'
    })
  }
})
