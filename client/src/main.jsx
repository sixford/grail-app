import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Root component (assumed to be the main layout)

// Style components
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import './styles/main.scss'

// Page components
import Auth from './components/pages/Auth.jsx'
import Home from './components/pages/Home.jsx'
import HomeFeed from './components/pages/HomeFeed.jsx'
import CartPage from './components/pages/CartPage.jsx'
import SingleItem from './components/pages/SingleItem.jsx'
import SearchPage from './components/pages/SearchPage.jsx'
import AddItem from './components/pages/AddItem.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'auth',
        element: <Auth />
      },
      {
        path: 'homefeed',
        element: <HomeFeed />
      },
      {
        path: 'cart',
        element: <CartPage />
      },
      {
        path: 'items/:itemId',
        element: <SingleItem />
      },
      {
        path: 'search',
        element: <SearchPage />
      },
      {
        path: 'search/:query',
        element: <SearchPage />
      },
      {
        path: 'add-item',
        element: <AddItem/>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
