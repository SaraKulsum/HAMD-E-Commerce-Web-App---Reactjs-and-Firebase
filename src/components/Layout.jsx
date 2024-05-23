import React from 'react'
import NavBar from './navBar'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <>
      <NavBar />
       <div className = 'page-content mt-[70px]'>
           {children}
       </div>
       <Footer />
    </>
  )
}

export default Layout