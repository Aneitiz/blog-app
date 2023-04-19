import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as createKey } from 'uuid'
import { Pagination } from 'antd'

import ArticleCard from '../ArticleCard'
import LoadingSpinner from '../LoadingSpinner'
import { NotFoundedPage } from '../NotFoundedPage/NotFoundedPage'
import { articleListFetch, onPaginationClick } from '../../store/articlesSlice'

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
    // @ts-ignore
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
  const onChange = (page: any) => {
    dispatch(onPaginationClick(page))
    const data = {
      offset: (page - 1) * 5,
      token: token || localStorage.token,
    }
    // @ts-ignore
    dispatch(articleListFetch(data))
  }
  const pagination: JSX.Element = (
    <li>
      <Pagination
        current={currentPage}
        onChange={onChange}
        pageSize={5}
        total={articlesCount}
        defaultCurrent={1}
        showSizeChanger={false}
        hideOnSinglePage
      />
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
