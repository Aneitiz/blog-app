import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import SignUp from '../SignUp'
import SignIn from '../SignIn'
import Layout from '../Layout'
import ArticleList from '../ArticleList'
import { apiConstants, linkConstants } from '../../constants/constants'
import FullArticle from '../FullArticle'
import { loginFetch } from '../../redux/signSlice'
import EditProfile from '../EditProfile'
import CreateArticle from '../CreateArticle'
import RequireAuth from '../hoc'

import style from './App.module.scss'
const App: React.FC = () => {
  const dispatch = useDispatch()
  const signState = (state: any) => state.sign
  const signData = useSelector(signState)
  const token = signData.user.token
  useEffect(() => {
    if (!localStorage.getItem(apiConstants.token)) return
    if (localStorage.getItem(apiConstants.token) !== '') {
      const token = localStorage.getItem(apiConstants.token)
      dispatch(loginFetch(token))
    }
  }, [])
  useEffect(() => {
    localStorage.setItem(apiConstants.token, token)
  }, [token])
  return (
    <section className={style.main}>
      <Routes>
        <Route path={'/'} element={<Layout />}>
          <Route index element={<ArticleList />} />
          <Route path={linkConstants.signIn} element={<SignIn />} />

          <Route path={linkConstants.signUp} element={<SignUp />} />

          <Route path={linkConstants.articleBySlug} element={<FullArticle />} />

          <Route
            path={linkConstants.profile}
            element={
              <RequireAuth>
                <EditProfile />
              </RequireAuth>
            }
          />

          <Route
            path={linkConstants.newArticle}
            element={
              <RequireAuth>
                <CreateArticle />
              </RequireAuth>
            }
          />

          <Route
            path={linkConstants.articleEdit}
            element={
              <RequireAuth>
                <CreateArticle />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </section>
  )
}

export default App
