import React from 'react'
import { NavLink } from 'react-router-dom'
const PageNavigation = ({title}) => {
  return (
    <>
    <NavLink to = '/' className='text-orange-400 '>Home</NavLink>/{title}
    </>
  )
}

export default PageNavigation