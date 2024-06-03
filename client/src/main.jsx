import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Root component (assumed to be the main layout)
import Root from './Root.jsx'

// Style components
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import './styles/main.scss'

// Page components
import Auth from './components/pages/Auth.jsx'
import HomeFeed from './components/pages/HomeFeed.jsx'
import CartPage from './components/pages/CartPage.jsx'
import SingleItem from './components/pages/SingleItem.jsx'
// import ProfilePage from './components/pages/ProfilePage.jsx'
import SearchPage from './components/pages/SearchPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
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
      // {
      //   path: 'profile/:userId',
      //   element: <ProfilePage />
      // },
      {
        path: 'search/:query',
        element: <SearchPage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
