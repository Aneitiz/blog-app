import React from 'react'
import format from 'date-fns/format'
import { v4 as createKey } from 'uuid'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import inactiveLike from '../../assets/images/inactiveLike.svg'
import standardUserImage from '../../assets/images/standardUserImage.svg'
import activeLike from '../../assets/images/activeLike.svg'
import { deleteFavoritedFetch, favoritedFetch } from '../../redux/articlesBySlug'
import { linkConstants } from '../../constants/constants'
import { articleListFetch } from '../../redux/articlesSlice'
import { clippingText } from '../../helpers/clippingText'
import { ArticleListProps } from '../../types/interfaces'

import style from './ArticleCard.module.scss'

const ArticleCard: React.FC<ArticleListProps> = ({ element }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const signState = (state: any) => state.sign
  const articlesState = (state: any) => state.articles
  const articlesData = useSelector(articlesState)
  const signData = useSelector(signState)
  const { token } = signData.user
  const { currentPage } = articlesData
  const { title, description, updatedAt, favoritesCount, tagList, author, slug, favorited } = element
  const { username, image } = author
  const date = format(new Date(updatedAt), 'MMMM dd, yyyy')
  const userSlug = String(slug)
  const renderingTags = tagList.map((tag: string) => {
    return (
      <li key={createKey()} className={style['article__tags-item']}>
        {clippingText(tag, 20)}
      </li>
    )
  })
  const likeToggle = (e: any, favorited: boolean) => {
    e.stopPropagation()
    e.preventDefault()
    if (token === '' && localStorage.token === '') {
      navigate(linkConstants.signIn)
      return
    }
    const data: { slug: string; token: string } = {
      slug: slug,
      token: token,
    }
    const dataList = {
      token: token,
      offset: (currentPage - 1) * 5,
    }
    if (!favorited) {
      dispatch(favoritedFetch(data))
      setTimeout(() => dispatch(articleListFetch(dataList)), 500)
    }
    if (favorited) {
      dispatch(deleteFavoritedFetch(data))
      setTimeout(() => dispatch(articleListFetch(dataList)), 500)
    }
  }
  return (
    <li className={style['article-card']}>
      <article className={style.article}>
        <div className={style['article__title-likes-user-wrapper']}>
          <div className={style['article__title-likes']}>
            <Link to={`/articles/${userSlug}/`}>
              <h5 className={style.article__title}>{clippingText(title, 40)}</h5>
            </Link>
            <div className={style.article__likes}>
              <button
                type="button"
                onClick={(e) => likeToggle(e, favorited)}
                className={style['article__likes-button']}
              >
                <img
                  src={favorited ? activeLike : inactiveLike}
                  alt="кнопка лайк"
                  className={style['article__likes-image']}
                />
                <span className={style['article__likes-count']}>{favoritesCount}</span>
              </button>
            </div>
          </div>
          <div className={style['article__user-create-time']}>
            <div className={style['article__user-create-time--inner']}>
              <p className={style['article__user-name']}>{username}</p>
              <p className={style['article__create-time']}>{date}</p>
            </div>
            <div className={style['article__image-wrapper']}>
              <img src={image ? image : standardUserImage} alt="Аватар профиля" className={style.article__image} />
            </div>
          </div>
        </div>
        <ul className={style.article__tags}>{renderingTags}</ul>
        <p className={style.article__text}>{description}</p>
      </article>
    </li>
  )
}

export default ArticleCard
