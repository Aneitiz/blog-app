import React from 'react'
import { Alert } from 'antd'

export const NotFoundedPage = () => {
  return (
    <div>
      <Alert
        message="Что то явно пошло не так"
        description="Попробуйте перезагрузить страницу, сервер прилег отдохнуть, но мы скоро это исправим!"
        type="warning"
        showIcon
      />
    </div>
  )
}
