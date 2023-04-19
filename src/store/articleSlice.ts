import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { apiConstants } from '../constants/constants'
import { ArticleInitialState } from '../types/interfaces'

export const fetchArticleBySlug = createAsyncThunk('article/fetchArticleBySlug', async (slug, { rejectWithValue }) => {
  try {
    const response = await fetch(apiConstants.rootApi + apiConstants.getArticleBySlug + String(slug))
    if (!response.ok) {
      throw new Error('article Slice error')
    }
    return response.json()
  } catch (error) {
    return rejectWithValue(error)
  }
})

const initialState: ArticleInitialState = {
  articleData: {},
  loading: true,
  error: false,
}
const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleBySlug.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(fetchArticleBySlug.rejected, (state) => {
        state.loading = false
        state.error = false
      })
      .addCase(fetchArticleBySlug.fulfilled, (state, action) => {
        state.loading = false
        state.articleData = action.payload.article
      })
  },
})

export default articleSlice.reducer
