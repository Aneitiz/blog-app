import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { apiConstants } from '../constants/constants'
export const signUpFetch = createAsyncThunk<SignState, any>(
  'signSlice/fetchSignUp',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(apiConstants.rootApi + apiConstants.signUp, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
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

export const signInFetch = createAsyncThunk('signSlice/fetchSignIn', async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(apiConstants.rootApi + apiConstants.signIn, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    })
    if (response.status === 422) {
      let res = await response.json()
      res = res.errors
      throw new Error(JSON.stringify(res))
    }
    if (!response.ok) {
      throw new Error('Something goes wrong')
    }
    return response.json()
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const loginFetch = createAsyncThunk<SignState, string | null>(
  'sign/fetchLogin',
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(apiConstants.rootApi + apiConstants.login, {
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      if (response.status === 422) {
        let res = await response.json()
        res = res.errors
        throw new Error(JSON.stringify(res))
      }
      if (response.status === 401) {
        throw new Error('Please login')
      }
      if (!response.ok) throw new Error('Something goes wrong')
      return response.json()
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const editProfileFetch = createAsyncThunk<any, any>(
  'sign/editProfile',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await fetch(apiConstants.rootApi + apiConstants.login, {
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
      return await response.json()
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

interface SignState {
  loading: boolean
  error: boolean
  user: {
    email: string
    token: string
    username: string
    bio: string
    image: string
  }
  logged: boolean | null
  payload: any
  success: boolean
  editingSuccess?: boolean | null
}
const initialState: SignState = {
  loading: false,
  error: false,
  user: {
    email: '',
    token: '',
    username: '',
    bio: '',
    image: '',
  },
  logged: null,
  payload: null,
  success: false,
  editingSuccess: null,
}

const signSlice = createSlice({
  name: 'sign',
  initialState,
  reducers: {
    logOut: (state: any) => {
      state.logged = null
      for (let key in state.user) {
        state.user[key] = ''
      }
    },
    clearData: (state: any) => {
      state.payload = null
      state.loading = false
      state.success = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpFetch.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(signUpFetch.fulfilled, (state) => {
        state.loading = false
        state.success = true
      })
      .addCase(signUpFetch.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.success = false
        state.payload = action.payload
      })
      .addCase(signInFetch.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(signInFetch.fulfilled, (state, action) => {
        const { email, token, username, bio, image } = action.payload.user
        state.user.email = email
        state.user.token = token
        state.user.username = username
        state.user.bio = bio
        state.user.image = image
        state.payload = null
        state.success = true
        state.logged = true
        state.loading = false
      })
      .addCase(signInFetch.rejected, (state, action) => {
        state.success = false
        state.payload = action.payload
        state.loading = false
      })
      .addCase(loginFetch.pending, (state) => {
        state.payload = null
        state.loading = true
      })
      .addCase(loginFetch.fulfilled, (state, action) => {
        const { email, token, username, bio, image } = action.payload.user
        state.user.email = email
        state.user.token = token
        state.user.username = username
        state.user.bio = bio
        state.user.image = image
        state.payload = null
        state.success = true
        state.logged = true
        state.loading = false
      })
      .addCase(loginFetch.rejected, (state, action) => {
        state.success = false
        state.payload = action.payload
        state.loading = false
      })
      .addCase(editProfileFetch.fulfilled, (state, action) => {
        state.success = true
        state.loading = false
        const { email, token, username, bio, image } = action.payload.user
        state.user.email = email
        state.user.token = token
        state.user.username = username
        state.user.bio = bio
        state.user.image = image
        state.editingSuccess = true
      })
      .addCase(editProfileFetch.rejected, (state, action) => {
        state.success = false
        state.loading = false
        state.payload = action.payload
        state.editingSuccess = false
      })
  },
})
export const { logOut, clearData } = signSlice.actions

export default signSlice.reducer
