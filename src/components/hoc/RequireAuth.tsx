import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { linkConstants } from '../../constants/constants'
const RequireAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const navigate = useNavigate()
  const signState = (state: any) => state.sign
  const signData = useSelector(signState)
  const { logged } = signData
  useEffect(() => {
    if (!logged) {
      return navigate(linkConstants.signIn)
    }
  }, [logged])
  return children
}

export default RequireAuth
