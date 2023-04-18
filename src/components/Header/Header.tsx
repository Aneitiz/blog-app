import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import standardUserImage from '../../assets/images/standardUserImage.svg'
import { linkConstants } from '../../constants/constants'
import { clearData, logOut } from '../../redux/signSlice'
import LoadingSpinner from '../LoadingSpinner'
import { clearEditing } from '../../redux/articlesBySlug'

import style from './Header.module.scss'

const Header = () => {
  const dispatch = useDispatch()
  const signState = (state: any) => state.sign
  const signData = useSelector(signState)
  const { logged, loading } = signData
  const user = signData.user
  const { username, image } = user

  const onLogout = () => {
    dispatch(logOut())
    dispatch(clearData())
  }
  const headerLogIn = () => {
    return (
      <header className={style['header--log-in']}>
        <Link className={style['header__link-main']} to={'/articles'}>
          Realworld Blog
        </Link>
        <div className={style['header--log-in-inner']}>
          <Link className={style['header__button-create-article']} to={linkConstants.newArticle}>
            <button onClick={() => dispatch(clearEditing())} type="button" className={style.header__button}>
              Create article
            </button>
          </Link>
          <div className={style['header__account-logo-wrapper']}>
            <Link className={style['header__account-logo-wrapper']} to={linkConstants.profile}>
              <span className={style.header__username}>{username}</span>
              <img className={style.header__image} src={image ? image : standardUserImage} alt="Бородатый человечек" />
            </Link>
          </div>
          <button type="button" className={style['header__log-out-button']} onClick={onLogout}>
            Log Out
          </button>
        </div>
      </header>
    )
  }
  const headerUnregistered = () => {
    return (
      <header className={style.header}>
        <Link className={style['header__link-main']} to={'/articles'}>
          Realworld Blog
        </Link>
        <div>
          <Link to={linkConstants.signIn}>
            <button onClick={() => dispatch(clearData())} type="button" className={style['header__button-sign-in']}>
              Sign In
            </button>
          </Link>
          <Link to={linkConstants.signUp}>
            <button type="button" className={style['header__button-sign-up']}>
              Sign Up
            </button>
          </Link>
        </div>
      </header>
    )
  }

  const rendering = () => {
    if (logged) {
      return headerLogIn()
    }
    if (loading) {
      return LoadingSpinner()
    }
    return headerUnregistered()
  }

  return rendering()
}
export default Header
