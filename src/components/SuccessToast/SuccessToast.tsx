import React from 'react'
import { toast, ToastContainer } from 'react-toastify'

import { toastConstants } from '../../constants/constants'

import 'react-toastify/dist/ReactToastify.css'

const SuccessToast = (message: string) => {
  // @ts-ignore
  toast.success(message, toastConstants.params)
  return <ToastContainer />
}
export default SuccessToast
