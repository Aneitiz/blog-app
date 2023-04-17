export interface DataForArticlesSlug {
  slug: string
  token: string
}

export interface DataForArticlesList {
  token: string
  offset: number
}

export interface DataForEditArticleFetch {
  body: {
    article: {
      title: string
      description: string
      body: string
      tagList: string[]
    }
  }
  token: string
}
