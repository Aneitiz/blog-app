import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { apiConstants } from '../constants/constants'

export const postArticleFetch = createAsyncThunk<ArticleFormSliceState, any>(
  'article/postArticleFetch',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(apiConstants.rootApi + apiConstants.postNewArticle, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${data.token}`,
        },
        body: JSON.stringify(data.body),
      })
      if (response.status === 422) {
        let res = await response.json()
        res = res.errors
        throw new Error(JSON.stringify(res))
      }
      if (!response.ok) throw new Error('Something went wrong')
      return response.json()
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const editArticleFetch = createAsyncThunk<ArticleFormSliceState, any>(
  'article/editArticleFetch',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(apiConstants.rootApi + apiConstants.getArticleBySlug + data.slug, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${data.token}`,
        },
        body: JSON.stringify(data.body),
      })
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

export const deleteArticleFetch = createAsyncThunk<any, any>(
  'article/deleteArticleFetch',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(apiConstants.rootApi + apiConstants.getArticleBySlug + data.slug, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${data.token}`,
        },
      })
      if (response.status === 204) return
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
interface ArticleFormSliceState {
  payload: null | any
  success: null | boolean
  loading: null | boolean
  error: null | boolean
}
const initialState: ArticleFormSliceState = {
  success: null,
  loading: null,
  error: null,
  payload: null,
}
const articleFormSlice = createSlice({
  name: 'articleFormSlice',
  initialState,
  reducers: {
    clearFormData: (state) => {
      state.success = null
      state.payload = null
      state.error = null
      state.loading = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postArticleFetch.pending, (state: ArticleFormSliceState) => {
        state.loading = true
        state.error = false
      })
      .addCase(postArticleFetch.fulfilled, (state) => {
        state.loading = false
        state.error = true
        state.success = true
      })
      .addCase(postArticleFetch.rejected, (state) => {
        state.loading = false
        state.error = true
        state.success = false
      })
      .addCase(editArticleFetch.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(editArticleFetch.fulfilled, (state) => {
        state.loading = false
        state.error = false
        state.success = true
      })
      .addCase(editArticleFetch.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.success = false
        state.payload = action.payload
      })
      .addCase(deleteArticleFetch.pending, (state) => {
        state.loading = false
        state.error = false
      })
      .addCase(deleteArticleFetch.fulfilled, (state) => {
        state.loading = false
        state.error = false
      })
      .addCase(deleteArticleFetch.rejected, (state) => {
        state.loading = false
        state.error = true
        state.success = false
      })
  },
})

export const { clearFormData } = articleFormSlice.actions
export default articleFormSlice.reducer
