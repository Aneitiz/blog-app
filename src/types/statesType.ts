export interface SlugDataState {
  articleBySlug: {
    articleBySlug: {
      author: {
        username: string
        bio: string
        image: string
        following: boolean
      }
      body: string
      createdAt: string
      description: string
      favorited: boolean
      favoritesCount: number
      slug: string
      tagList: string[]
      title: string
      updatedAt: string
      article?: any
    }
    editing: boolean
    error: boolean
    loading: boolean
    success: boolean
  }
}
