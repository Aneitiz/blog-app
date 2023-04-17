import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as createKey } from 'uuid'

import ArticleCard from '../ArticleCard'
import MyPagination from '../MyPagination/MyPagination'
import LoadingSpinner from '../LoadingSpinner'
import { NotFoundedPage } from '../NotFoundedPage/NotFoundedPage'
import { articleListFetch } from '../../redux/articlesSlice'

import style from './ArticleList.module.scss'

const ArticleList: React.FC = () => {
  const dispatch = useDispatch()
  const articlesState = (state: any) => state.articles
  const signState = (state: any) => state.sign
  const signData = useSelector(signState)
  const { token } = signData.user
  const { articles, currentPage, loading, error, articlesCount } = useSelector(articlesState)
  useEffect(() => {
    const data = {
      token: token || localStorage.token,
      offset: (currentPage - 1) * 5,
    }
    dispatch(articleListFetch(data))
  }, [token])
  const renderingList = () => {
    if (loading) {
      return (
        <div>
          <LoadingSpinner />
        </div>
      )
    }
    if (error) {
      return NotFoundedPage()
    }
    if (!loading && !error) {
      return articles.map((element: any) => {
        return <ArticleCard key={createKey()} element={element} />
      })
    }
  }
  const pagination: JSX.Element = (
    <li>
      <MyPagination articlesCount={articlesCount} />
    </li>
  )
  return (
    <ul className={style['article-list']}>
      {renderingList()}
      {!loading ? pagination : null}
    </ul>
  )
}

export default ArticleList
