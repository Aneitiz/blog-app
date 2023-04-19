//@ts-nocheck
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { toastConstants, validation } from '../../constants/constants'
import { editProfileFetch } from '../../store/signSlice'
import SuccessToast from '../SuccessToast'
import ErrorToast from '../ErrorToast'

import style from './EditProfile.module.scss'

const EditProfile: React.FC = () => {
  const dispatch = useDispatch()
  const signState = (state: any) => state.sign
  const toastSuccess = useSelector(signState)
  const { editingSuccess, payload } = toastSuccess
  useEffect(() => {
    if (editingSuccess) {
      SuccessToast(toastConstants.editingSuccessMessage)
    }
    if (!editingSuccess && payload) {
      ErrorToast(payload)
    }
  }, [editingSuccess, payload])
  const signData = useSelector(signState)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (value: any) => {
    const data = {
      body: {
        user: {
          username: value.username.trim(),
          email: value.email.trim(),
          password: value.password,
          image: null,
        },
      },
      token: signData.user.token,
    }
    if (value.image.trim() !== '') {
      data.body.user.image = value.image.trim()
    }
    dispatch(editProfileFetch(data))
  }
  return (
    <div className={style['edit-profile-wrapper']}>
      <div className={style['edit-profile']}>
        <p className={style['edit-profile__title']}>Edit Profile</p>
        <form onSubmit={handleSubmit(onSubmit)} className={style['edit-profile__form']}>
          <label className={style['edit-profile__label']}>
            <span className={style['edit-profile__input-text']}>Username</span>
            <input
              type="text"
              className={errors?.username ? style['edit-profile__input-invalid'] : style['edit-profile__input']}
              placeholder="Type your new username here!"
              {...register('username', {
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
            />
            {errors?.username && <div className={style['edit-profile__invalid-text']}>{errors.username.message}</div>}
          </label>

          <label className={style['edit-profile__label']}>
            <span className={style['edit-profile__input-text']}>Email address</span>
            <input
              {...register('email', {
                required: validation.emptyField,
                pattern: {
                  value: validation.email,
                  message: 'Please enter a valid email',
                },
              })}
              type="text"
              className={errors?.email ? style['edit-profile__input-invalid'] : style['edit-profile__input']}
              placeholder="Type your email here"
            />
            {errors?.email && <div className={style['edit-profile__invalid-text']}>{errors.email.message}</div>}
          </label>
          <label className={style['edit-profile__label']}>
            <span className={style['edit-profile__input-text']}>New password</span>
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
              className={errors?.password ? style['edit-profile__input-invalid'] : style['edit-profile__input']}
              placeholder="Type your new password here!"
            />
            {errors?.password && <div className={style['edit-profile__invalid-text']}>{errors.password.message}</div>}
          </label>
          <label className={style['edit-profile__label']}>
            <span className={style['edit-profile__input-text']}>Avatar image (url)</span>
            <input
              {...register('image', {
                required: validation.emptyField,
              })}
              type="text"
              className={errors?.image ? style['edit-profile__input-invalid'] : style['edit-profile__input']}
              placeholder="Type your image url here!"
            />
            {errors?.image && <div className={style['edit-profile__invalid-text']}>{errors.image.message}</div>}
          </label>
          <button type="submit" className={style['edit-profile__button-save']}>
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
