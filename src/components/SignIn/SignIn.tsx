// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { linkConstants, toastConstants, validation } from '../../constants/constants'
import { signInFetch } from '../../store/signSlice'
import SuccessToast from '../SuccessToast'
import ErrorToast from '../ErrorToast'
import loadingSpinner from '../LoadingSpinner'

import style from './SignIn.module.scss'

const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toastState = (state: any) => state.sign
  const toastData = useSelector(toastState)
  const { logged, loading } = toastData
  useEffect(() => {
    if (toastData.success) {
      SuccessToast(toastConstants.successSignIn)
      if (logged) {
        setTimeout(() => navigate('/'), 800)
      }
    }
    if (toastData.payload !== null && !toastData.success) {
      ErrorToast(toastData.payload)
    }
  }, [toastData.success, toastData.payload])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (value: any) => {
    const data = {
      user: {
        email: value.email,
        password: value.password,
      },
    }
    dispatch(signInFetch(data))
  }

  const formContainer = () => {
    return (
      <div className={style['sign-in-wrapper']}>
        <ToastContainer />
        {loading ? loadingSpinner : null}
        <form action="" className={style['sign-in-form']} onSubmit={handleSubmit(onSubmit)}>
          <h6 className={style['sign-in-form__title']}>Sign In</h6>
          <label className={style['sign-in-form__label']}>
            <p className={style['sign-in-form__paragraph']}>Email address</p>
            <input
              {...register('email', {
                required: validation.emptyField,
                pattern: { value: validation.email, message: 'Please enter a valid email' },
              })}
              type="text"
              className={errors.email ? style['sign-in-form__input--invalid'] : style['sign-in-form__input']}
              placeholder="Email address"
            />
            {errors?.email && <div className={style['sign-in-form__invalid-text']}>{errors.email.message}</div>}
          </label>
          <label className={style['sign-in-form__label']}>
            <p className={style['sign-in-form__paragraph']}>Password</p>
            <input
              {...register('password', {
                required: validation.emptyField,
                minLength: {
                  value: 6,
                  message: validation.passwordMinLength,
                },
                maxLength: {
                  value: 40,
                  message: validation.passwordMaxLength,
                },
                pattern: {
                  value: validation.password,
                  message: validation.passwordNoWhiteSpaceMesage,
                },
              })}
              autoComplete="off"
              type="password"
              className={errors.password ? style['sign-in-form__input--invalid'] : style['sign-in-form__input']}
              placeholder="Password"
            />
            {errors?.password && <div className={style['sign-in-form__invalid-text']}>{errors.password.message}</div>}
          </label>
          <button type="submit" className={style['sign-in-form__button-login']}>
            Login
          </button>
          <p className={style['sign-in-form__to-sign-up']}>
            Don’t have an account?
            <Link to={linkConstants.signUp}>
              <span className={style['sign-in-form__to-sign-up-text']}>Sign Up.</span>
            </Link>
          </p>
        </form>
      </div>
    )
  }
  return loading ? loadingSpinner() : formContainer()
}

export default SignIn
