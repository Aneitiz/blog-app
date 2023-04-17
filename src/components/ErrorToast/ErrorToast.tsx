import React from 'react'
import { toast, ToastContainer } from 'react-toastify'

import { toastConstants } from '../../constants/constants'

const ErrorToast= ({ message }) => {
  try {
    let res = JSON.parse(message)
    for (let key in res) {
      toast.error(key + ' ' + res[key], toastConstants.params)
    }
  } catch {
    toast.error(toastConstants.defaultErrMessage, toastConstants.params)
  }
  return <ToastContainer />
}

export default ErrorToast
