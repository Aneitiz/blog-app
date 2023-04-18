import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import Header from '../Header'
const Layout: React.FC = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/articles')
  }, [])
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Layout
