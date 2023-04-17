import React from 'react'
import { Pagination } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { articleListFetch, onPaginationClick } from '../../redux/articlesSlice'

const MyPagination: React.FC<{ articlesCount: number }> = ({ articlesCount }) => {
  const dispatch = useDispatch()
  const signState = (state: any) => state.sign
  const articlesState = (state: any) => state.articles
  const signData = useSelector(signState)
  const articlesData = useSelector(articlesState)
  const currentPage = articlesData.currentPage
  const token = signData.user.token
  const onChange = (page: any) => {
    dispatch(onPaginationClick(page))
    const data = {
      offset: (page - 1) * 5,
      token: token || localStorage.token,
    }
    dispatch(articleListFetch(data))
  }
  return (
    <Pagination
      current={currentPage}
      onChange={onChange}
      pageSize={5}
      total={articlesCount}
      defaultCurrent={1}
      showSizeChanger={false}
      hideOnSinglePage
    />
  )
}

export default MyPagination
