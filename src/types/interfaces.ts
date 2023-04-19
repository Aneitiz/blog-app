export interface ShippingFields {
  userName: string
  email: string
  password: string | number | symbol
  repeatPassword: string | number | symbol
  agreement: string
  validate?: any
}

export interface ArticleInitialState {
  articleData: {}
  loading: boolean
  error: boolean
}

export interface ArticleListProps {
  element: {
    author: {
      bio: string
      following: boolean
      image: string
      username: string
    }
    slug: string
    body: string
    createdAt: string
    description: string
    favorited: boolean
    favoritesCount: number
    tagList: string[]
    title: string
    updatedAt: string
  }
}
