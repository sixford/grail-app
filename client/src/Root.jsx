// Root.jsx
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { isLoggedIn } from './lib/auth'

import Navbar from './components/subcomponents/Navbar'
import Footer from './components/pages/Footer.jsx'

export default function Root({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn())

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      <main className='flex-grow-1 d-flex flex-column'>
        {children || <Outlet context={{ isAuthenticated, setIsAuthenticated }} />}
      </main>

      <Footer />
    </>
  )
}