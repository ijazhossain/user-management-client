import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AllUsers from './components/AllUsers.jsx'
import UpdateUser from './components/UpdateUser.jsx'
import AddUser from './components/AddUser.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      {
        path: '/',
        element: <AllUsers></AllUsers>,
        loader: () => fetch('http://localhost:5000/users')
      },
      {
        path: '/user',
        element: <AddUser></AddUser>
      },
      {
        path: '/update/:id',
        element: <UpdateUser></UpdateUser>,
        loader: ({ params }) => fetch(`http://localhost:5000/user/${params.id}`)
      }
    ]
  },


])
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}></RouterProvider>
)
