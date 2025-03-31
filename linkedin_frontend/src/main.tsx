import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import './index.css'
import { Feed } from './features/feed/pages/Feed'
import { Login } from './features/authentication/pages/Login/Login'
import { Signup } from './features/authentication/pages/Signup/Signup'
import { ResetPassword } from './features/authentication/pages/ResetPassword/ResetPassword'
import { VerifyEmail } from './features/authentication/pages/VerifyEmail/VerifyEmail'
import { AuthenticationContextProvider } from './features/authentication/contexts/AuthenticationContextProvider'
import { AuthenticationLayout } from './features/authentication/components/AuthenticationLayout/AuthenticationLayout'
import { ApplicationLayout } from './components/ApplicationLayout/ApplicationLayout'
import { Network } from './features/feed/pages/Network'

const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/" />
  },

  {
    element: <AuthenticationContextProvider />,
    children: [
      {
        path: "/authentication",
        element: <AuthenticationLayout />,
        children: [
          {
            path: "login",
            element: <Login />
          },
          {
            path: "signup",
            element: <Signup />
          },
          {
            path: "request-password-reset",
            element: <ResetPassword />
          },
          {
            path: "verify-email",
            element: <VerifyEmail />
          }
        ]
      },

      {
        path: "/",
        element: <ApplicationLayout />,
        children: [
          {
            index: true,
            element: <Feed />
          },
          {
            path: "network",
            element: <Network />
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
