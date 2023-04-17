import React, { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import format from 'date-fns/format'
import { Popconfirm } from 'antd'
import { v4 as createKey } from 'uuid'

import { deleteFavoritedFetch, favoritedFetch, getArticlesBySlug, toggleEditing } from '../../redux/articlesBySlug'
import inactiveLike from '../../assets/images/inactiveLike.svg'
import standardUserImage from '../../assets/images/standardUserImage.svg'
import activeLike from '../../assets/images/activeLike.svg'
import LoadingSpinner from '../LoadingSpinner'
import { clearFormData, deleteArticleFetch } from '../../redux/articleFormSlice'
import { linkConstants } from '../../constants/constants'

import style from './FullArticle.module.scss'
const FullArticle = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    const data = {
      token: localStorage.token,
      slug: slug,
    }
    dispatch(getArticlesBySlug(data))
  }, [])

  const articleBySlugState = (state: any) => state.articleBySlug
  const signState = (state: any) => state.sign
  const signData = useSelector(signState)
  const token = signData.user.token
  const Myusername = signData.user.username
  const successChecker = useSelector(articleBySlugState)
  const onEdit = (slug: any) => {
    dispatch(toggleEditing())
    navigate(`/articles/${slug}/edit`)
  }
  const onDelete = (slug: any) => {
    const data = {
      slug: slug,
      token: token,
    }
    dispatch(clearFormData())
    dispatch(deleteArticleFetch(data))
    setTimeout(() => navigate('/'), 400)
  }
  if (successChecker.success) {
    const { articleBySlug } = successChecker
    const { article } = articleBySlug

    const { title, author, body, description, favoritesCount, tagList, updatedAt, favorited } = article
    const { image, username } = author
    const date = format(new Date(updatedAt), 'MMMM dd, yyyy')
    let isEditing = null
    if (Myusername === username) {
      isEditing = (
        <div className={style['full-article__editing-delete-wrapper']}>
          <button type="button" onClick={onEdit} className={style['full-article__editing-button']}>
            Edit
          </button>
          <Popconfirm
            title="Are you sure to delete this article?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => onDelete(slug)}
            placement="right"
          >
            <button type="button" className={style['full-article__delete-button']}>
              Delete
            </button>
          </Popconfirm>
        </div>
      )
    }
    const tags = tagList.map((tag: string) => {
      return (
        <div className={style['full-article__tag']} key={createKey()}>
          {tag}
        </div>
      )
    })
    const likeToggle = (e: any, favorited: boolean) => {
      e.stopPropagation()
      e.preventDefault()
      if (token === '' && localStorage.token === '') {
        navigate(linkConstants.signIn)
        return
      }
      const data = {
        slug: slug,
        token: token,
      }
      if (!favorited) {
        dispatch(favoritedFetch(data))
      }
      if (favorited) {
        dispatch(deleteFavoritedFetch(data))
      }
    }
    return (
      <article className={style['full-article-wrapper']}>
        <div className={style['full-article']}>
          <div className={style['full-article__inner']}>
            <div className={style['full-article__title-user-wrapper']}>
              <div className={style['full-article__title-likes']}>
                <h5 className={style['full-article__title']}>{title}</h5>
                <button
                  onClick={(e) => likeToggle(e, favorited)}
                  type="button"
                  className={style['full-article__likes-wrapper']}
                >
                  <img src={favorited ? activeLike : inactiveLike} alt="Лайк" className={style['full-article__like']} />
                  <span className={style['full-article__likes-count']}>{favoritesCount}</span>
                </button>
              </div>
              <div className={style['full-article__outer-wrapper']}>
                <div className={style['full-article__user-wrapper']}>
                  <div className={style['full-article__user-info-wrapper']}>
                    <p className={style['full-article__username']}>{username}</p>
                    <p className={style['full-article__date']}>{date}</p>
                  </div>
                  <img src={image ? image : standardUserImage} alt="" className={style['full-article__image']} />
                </div>
                {isEditing}
              </div>
            </div>
            <div className={style['full-article__tags-wrapper']}>{tags}</div>
            <span className={style['full-article__description']}>{description}</span>
            <div className={style['full-article__markdown']}>
              <ReactMarkdown>{body}</ReactMarkdown>
            </div>
          </div>
        </div>
      </article>
    )
  }
  return <LoadingSpinner />
}

export default FullArticle
