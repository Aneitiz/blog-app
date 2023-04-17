import React from 'react'
import { toast, ToastContainer } from 'react-toastify'

import { toastConstants } from '../../constants/constants'

import 'react-toastify/dist/ReactToastify.css'

const ErrorToast: React.FC<any> = ({ message }) => {
  try {
    let res = JSON.parse(message)
    for (let key in res) {
      // @ts-ignore
      toast.error(key + ' ' + res[key], toastConstants.params)
    }
  } catch {
    // @ts-ignore
    toast.error(toastConstants.defaultErrMessage, toastConstants.params)
  }
  return <ToastContainer />
}
export default ErrorToast
