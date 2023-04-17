import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { linkConstants, toastConstants, validation } from '../../constants/constants'
import { ShippingFields } from '../../types/interfaces'
import { clearData, logOut, signUpFetch } from '../../redux/signSlice'
import ErrorToast from '../ErrorToast'
import SuccessToast from '../SuccessToast'

import style from './SignUp.module.scss'
const SignUp = () => {
  const dispatch = useDispatch()
  const toastState = (state: any) => state.sign
  const toastData = useSelector(toastState)
  useEffect(() => {
    if (toastData.success) {
      SuccessToast(toastConstants.successSignUp)
    }
    if (toastData.payload !== null && !toastData.success) {
      ErrorToast(toastData.payload)
    }
  }, [toastData.success, toastData.payload])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFields>()
  const onSubmit: SubmitHandler<ShippingFields> = (value) => {
    const data = {
      user: {
        username: value.userName,
        email: value.email,
        password: value.password,
      },
    }
    dispatch(signUpFetch(data))
    dispatch(clearData())
    dispatch(logOut())
  }

  return (
    <div className={style['sign-up-form-wrapper']}>
      <form onSubmit={handleSubmit(onSubmit)} className={style['sign-up-form']}>
        <h6 className={style['sign-up-form__title']}>Create new account</h6>
        <label className={style['sign-up-form__input-label']}>
          <ToastContainer />
          <span className={style['sign-up-form__input-label--inner']}>Username</span>
          <input
            {...register('userName', {
              required: validation.emptyField,
              minLength: {
                value: 4,
                message: validation.usernameMinLength,
              },
              maxLength: {
                value: 20,
                message: validation.usernameMaxLength,
              },
            })}
            type="text"
            className={errors.userName ? style['sign-up-form__invalid-input-field'] : style['sign-up-form__input']}
            placeholder="Write your username here :)"
          />
          {errors?.userName && <div className={style['sign-up-form__invalid-input']}>{errors.userName.message}</div>}
        </label>
        <label className={style['sign-up-form__input-label']}>
          <span className={style['sign-up-form__input-label--inner']}>Email address</span>
          <input
            {...register('email', {
              required: validation.emptyField,
              pattern: {
                value: validation.email,
                message: 'Please enter a valid email',
              },
            })}
            type="text"
            className={errors.email ? style['sign-up-form__invalid-input-field'] : style['sign-up-form__input']}
            placeholder="some-email adress"
          />
          {errors?.email && <div className={style['sign-up-form__invalid-input']}>{errors.email.message}</div>}
        </label>
        <label className={style['sign-up-form__input-label']}>
          <span className={style['sign-up-form__input-label--inner']}>Password</span>
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
            type="password"
            className={errors.password ? style['sign-up-form__invalid-input-field'] : style['sign-up-form__input']}
            placeholder="Write your password"
            autoComplete="on"
          />
          {errors?.password && <div className={style['sign-up-form__invalid-input']}>{errors.password.message}</div>}
        </label>
        <label className={style['sign-up-form__input-label']}>
          <span className={style['sign-up-form__input-label--inner']}>Repeat Password</span>
          <input
            {...register('repeatPassword', {
              required: validation.emptyField,
              validate: (value: any, formValues: any) => {
                if (value !== formValues.password) {
                  return false
                }
              },
            })}
            type="password"
            className={
              errors.repeatPassword ? style['sign-up-form__invalid-input-field'] : style['sign-up-form__input']
            }
            placeholder="Please repeat your password"
            autoComplete="off"
          />
          {errors?.repeatPassword && <div className={style['sign-up-form__invalid-input']}>Passwords must match</div>}
        </label>
        <label className={style['sign-up-form__input-label--checkbox']}>
          <div className={style['sign-up-form__checkbox-wrapper']}>
            <input
              {...register('agreement', {
                required: validation.agreementMessage,
              })}
              type="checkbox"
              className={style['sign-up-form__checkbox']}
            />
            <p className={style['sign-up-form__input-label--paragraph']}>
              I agree to the processing of my personal information
            </p>
          </div>
          {errors?.agreement && <p className={style['sign-up-form__invalid-input']}>{errors.agreement.message}</p>}
        </label>

        <button type="submit" className={style['sign-up-form__button-create']}>
          Create
        </button>
        <p className={style['sign-up-form__to-sign-in']}>
          Already have an account?
          <Link to={linkConstants.signIn}>
            <span className={style['sign-up-form__to-sign-in--link']}>Sign In</span>.
          </Link>
        </p>
      </form>
    </div>
  )
}

export default SignUp
