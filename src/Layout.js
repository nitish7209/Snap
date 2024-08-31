import React from 'react'
import NavBar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout