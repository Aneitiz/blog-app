import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { apiConstants } from '../constants/constants'

export const getArticlesBySlug = createAsyncThunk<ArticlesBySlug, any>(
  'article/getArticleBySlug',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(apiConstants.rootApi + apiConstants.getArticleBySlug + String(data.slug), {
        method: 'GET',
        headers: {
          Authorization: `Token ${data.token}`,
        },
      })
      if (!response.ok) {
        throw new Error('Error fetch')
      }
      return response.json()
    } catch (error) {
      return rejectWithValue
    }
  }
)

export const favoritedFetch = createAsyncThunk<ArticlesBySlug, any>(
  'article/getArticleBySlug/favorited',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        apiConstants.rootApi + apiConstants.getArticleBySlug + data.slug + apiConstants.favorite,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Token ${data.token}`,
          },
        }
      )
      if (response.status === 422) {
        let res = await response.json()
        res = res.errors
        throw new Error(JSON.stringify(res))
      }
      if (!response.ok) throw new Error('Something goes wrong')
      return response.json()
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const deleteFavoritedFetch = createAsyncThunk<ArticlesBySlug, any>(
  'article/deleteArticleBySlug/favorited',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        apiConstants.rootApi + apiConstants.getArticleBySlug + data.slug + apiConstants.favorite,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Token ${data.token}`,
          },
        }
      )
      if (response.status === 422) {
        let res = await response.json()
        res = res.errors
        throw new Error(JSON.stringify(res))
      }
      if (!response.ok) throw new Error('Something goes wrong')
      return response.json()
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

interface ArticlesBySlug {
  loading: boolean
  error: boolean
  success: boolean
  editing: boolean
  articleBySlug: {
    slug: string
    title: string
    description: string
    body: string
    tagList: string[]
    createdAt: string
    updatedAt: string
    favorited: boolean
    favoritesCount: number | string
    author: {
      username: string
      bio: string
      image: string
      following: boolean
    }
  }
}
const initialState: ArticlesBySlug = {
  loading: true,
  error: false,
  success: false,
  editing: false,
  articleBySlug: {
    slug: '',
    title: '',
    description: '',
    body: '',
    tagList: [],
    createdAt: '',
    updatedAt: '',
    favorited: false,
    favoritesCount: 0,
    author: {
      username: '',
      bio: '',
      image: '',
      following: false,
    },
  },
}

const articleBySlugSLice = createSlice({
  name: 'articleBySlug',
  initialState,
  reducers: {
    toggleEditing: (state) => {
      state.editing = !state.editing
    },
    clearEditing: (state) => {
      state.editing = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticlesBySlug.pending, (state) => {
        state.loading = true
        state.error = false
        state.success = false
      })
      .addCase(getArticlesBySlug.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        // @ts-ignore
        state.articleBySlug = action.payload
        state.success = true
      })
      .addCase(getArticlesBySlug.rejected, (state) => {
        state.loading = false
        state.error = true
        state.success = false
      })
      .addCase(favoritedFetch.pending, (state) => {
        state.error = false
        state.loading = true
      })
      .addCase(favoritedFetch.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = false
        // @ts-ignore
        state.articleBySlug = action.payload
      })
      .addCase(favoritedFetch.rejected, (state) => {
        state.success = false
        state.error = true
        state.loading = false
      })
      .addCase(deleteFavoritedFetch.pending, (state) => {
        state.error = false
        state.loading = true
      })
      .addCase(deleteFavoritedFetch.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = false
        // @ts-ignore
        state.articleBySlug = action.payload
      })
      .addCase(deleteFavoritedFetch.rejected, (state) => {
        state.success = false
        state.error = false
        state.loading = false
      })
  },
})

export const { toggleEditing, clearEditing } = articleBySlugSLice.actions
export default articleBySlugSLice.reducer
