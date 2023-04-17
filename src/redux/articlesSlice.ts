import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { apiConstants } from '../constants/constants'
import { DataForArticlesList } from '../types/becoimngDataTypes'

export const articleListFetch = createAsyncThunk<InitialArticlesState, DataForArticlesList>(
  'articles/fetchArticles',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        apiConstants.rootApi +
          apiConstants.getArticles +
          apiConstants.limit +
          apiConstants.offset +
          String(data.offset),
        {
          method: 'GET',
          headers: {
            Authorization: `Token ${data.token}`,
          },
        }
      )
      if (!response.ok) {
        throw new Error('artticleListFetch error')
      }
      return response.json()
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
interface InitialArticlesState {
  articles: any[]
  currentPage: number
  articlesCount: number
  loading: boolean
  error: boolean
}
const initialState: InitialArticlesState = {
  articles: [],
  currentPage: 1,
  articlesCount: 25,
  loading: false,
  error: false,
}
const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    onPaginationClick: (state, action) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(articleListFetch.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(articleListFetch.fulfilled, (state, action) => {
        state.loading = false
        state.articles = action.payload.articles
        state.articlesCount = action.payload.articlesCount
        state.error = false
      })
      .addCase(articleListFetch.rejected, (state) => {
        state.loading = false
        state.error = true
      })
  },
})

export const { onPaginationClick } = articlesSlice.actions
export default articlesSlice.reducer
