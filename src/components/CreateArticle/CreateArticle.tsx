//@ts-nocheck
import React, { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { validation } from '../../constants/constants'
import { clearFormData, editArticleFetch, postArticleFetch } from '../../store/articleFormSlice'
import SuccessToast from '../SuccessToast'
import ErrorToast from '../ErrorToast'
import LoadingSpinner from '../LoadingSpinner'
import { SlugDataState } from '../../types/statesType'

import style from './CreateArticle.module.scss'

const CreateArticle = () => {
  const dispatch = useDispatch()
  const slugState = (state: SlugDataState) => state.articleBySlug
  const tokenState = (state: any) => state.sign.user.token
  const formArticleState = (state: any) => state.articleFormSlice
  const formArticle = useSelector(formArticleState)
  const slugData = useSelector(slugState)
  const token = useSelector(tokenState)
  const { success, payload, loading } = formArticle

  let defaultValues: any = { tags: [{ name: '' }] }
  let slug: string
  const { editing } = slugData
  let { title = '', description = '', tagList = [], body = '' } = {}
  if (editing) {
    slug = slugData.articleBySlug.article.slug
    ;({ title, description, tagList, body } = slugData.articleBySlug.article)
    let arr: any = []
    tagList.forEach((tag: string) => {
      arr.push({ name: `${tag}` })
    })
    defaultValues.tags = arr
  }
  useEffect(() => {
    if (success) {
      dispatch(clearFormData())
      SuccessToast('Your article has been successfully')
    }
    if (!success && payload !== null) {
      dispatch(clearFormData())
      ErrorToast(payload)
    }
  }, [success, payload])
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<any, any>({ defaultValues: defaultValues })

  const { remove, append, fields } = useFieldArray<any>({
    control,
    name: 'tags',
  })
  const onSubmit = (value: any) => {
    const data = {
      body: {
        article: {
          title: value.title,
          description: value.description,
          body: value.Text,
          tagList: [],
        },
      },
      token: token,
    }
    value.tags.forEach((item: any) => {
      // @ts-ignore
      data.body.article.tagList.push(item.name)
    })
    if (editing) {
      // @ts-ignore
      data.slug = slug
      dispatch(editArticleFetch(data))
    }
    if (!editing) {
      dispatch(postArticleFetch(data))
    }
  }
  return (
    <div className={style['create-article-wrapper']}>
      <ToastContainer />
      <form className={style['create-article']} onSubmit={handleSubmit(onSubmit)}>
        {loading ? LoadingSpinner() : null}
        <h5 className={style['create-article__title']}>{editing ? 'Edit Article' : 'Create new article'}</h5>
        <label className={style['create-article__label']}>
          <span className={style['create-article__input-text']}>Title</span>
          <input
            type="text"
            className={errors.title ? style['create-article__input-invalid'] : style['create-article__input']}
            placeholder={'Title'}
            defaultValue={editing ? title : ''}
            {...register('title', {
              required: validation.emptyField,
              minLength: {
                value: 2,
                message: 'Your title is too short',
              },
              maxLength: { value: 500, message: 'Your title is too long' },
            })}
          />
          {errors?.title && <span className={style['create-article__invalid-text']}>{errors.title.message}</span>}
        </label>
        <label className={style['create-article__label']}>
          <span className={style['create-article__input-text']}>Short description</span>
          <input
            type="text"
            className={errors.description ? style['create-article__input-invalid'] : style['create-article__input']}
            placeholder={'Short description'}
            defaultValue={editing ? description : ''}
            {...register('description', {
              required: validation.emptyField,
              minLength: { value: 5, message: 'Your description is too short' },
              maxLength: { value: 1000, message: 'Your description is too long' },
            })}
          />
          {errors?.description && (
            <span className={style['create-article__invalid-text']}>{errors.description.message}</span>
          )}
        </label>
        <label className={style['create-article__label']}>
          <span className={style['create-article__input-text']}>Text</span>
          <textarea
            placeholder="Text"
            className={errors.Text ? style['create-article__invalid-text-area'] : style['create-article__text-area']}
            defaultValue={editing ? body : ''}
            {...register('Text', {
              required: validation.emptyField,
              minLength: {
                value: 5,
                message: 'Your text is too short',
              },
              maxLength: {
                value: 9000,
                message: 'Your text is too long',
              },
            })}
          />
          {errors?.Text && <span className={style['create-article__invalid-text']}>{errors.Text.message}</span>}
        </label>
        <div className={style['create-article__label']}>
          <span className={style['create-article__input-text']}>Tags</span>
          <ul className={style['create-article__input-text-wrapper']}>
            {fields.map((item, index) => {
              return (
                <li className={style['create-article__list-item']} key={item.id}>
                  <input
                    type="text"
                    className={
                      errors.tags?.[index]?.name
                        ? style['create-article__invalid-input-tag']
                        : style['create-article__input-tag']
                    }
                    placeholder={'Tag'}
                    {...register(`tags.${index}.name`, {
                      required: validation.emptyField,
                      minLength: {
                        value: 2,
                        message: 'пошел нахуй',
                      },
                    })}
                  />
                  <button
                    type="button"
                    className={style['create-article__delete-button']}
                    onClick={() => remove(index)}
                  >
                    Delete
                  </button>
                  {errors.tags?.[index]?.name && (
                    <p className={style['create-article__invalid-text']}>
                      this fields must be filled and be a 2 letters minimal
                    </p>
                  )}
                </li>
              )
            })}
          </ul>
          <button type="button" className={style['create-article__input-add-tag']} onClick={() => append()}>
            Add tag
          </button>
        </div>
        <button type="submit" className={style['create-article__submit-button']}>
          Send
        </button>
      </form>
    </div>
  )
}

export default CreateArticle
