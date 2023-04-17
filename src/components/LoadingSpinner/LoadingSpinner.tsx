import React from 'react'
import { Spin } from 'antd'

import style from './LoadingSpinner.module.scss'
const LoadingSpinner = () => {
  return <Spin className={style['loading-spinner']} size={'large'}></Spin>
}

export default LoadingSpinner
