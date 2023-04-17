// @ts-ignore
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { articleSlice } from './articleSlice'
import articlesSlice from './articlesSlice'
import articlesBySlug from './articlesBySlug'
import signSlice from './signSlice'
import articleFormSlice from './articleFormSlice'

const rootReducer = combineReducers({
  article: articleSlice,
  articles: articlesSlice,
  articleBySlug: articlesBySlug,
  sign: signSlice,
  articleFormSlice: articleFormSlice,
})
export const store = configureStore({
  reducer: rootReducer,
})
