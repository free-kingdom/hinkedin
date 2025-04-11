import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import './index.css';
import { Feed } from './features/feed/pages/Feed';
import { Login } from './features/authentication/pages/Login/Login';
import { Signup } from './features/authentication/pages/Signup/Signup';
import { ResetPassword } from './features/authentication/pages/ResetPassword/ResetPassword';
import { VerifyEmail } from './features/authentication/pages/VerifyEmail/VerifyEmail';
import { AuthenticationContextProvider } from './features/authentication/contexts/AuthenticationContextProvider';
import { AuthenticationLayout } from './features/authentication/components/AuthenticationLayout/AuthenticationLayout';
import { ApplicationLayout } from './components/ApplicationLayout/ApplicationLayout';
import { Network } from './features/feed/pages/Network';
import { Jobs } from './features/feed/pages/Jobs';
import { Notifications } from './features/feed/pages/Notifications';
import { Messaging } from './features/messaging/pages/Messaging/Messaging';
import { PostPage } from './features/feed/pages/PostPage';
import { Conversation } from './features/messaging/pages/Conversation/Conversation';
import { NewConversation } from './features/messaging/pages/NewConversation/NewConversation';

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
            path: "posts/:id",
            element: <PostPage />
          },
          {
            path: "jobs",
            element: <Jobs />
          },
          {
            path: "messaging",
            element: <Messaging />,
            children: [
              {
                path: "conversations/:id",
                element: <Conversation />
              },
              {
                path: "conversations/new",
                element: <NewConversation />
              }
            ]
          },
          {
            path: "network",
            element: <Network />
          },
          {
            path: "notifications",
            element: <Notifications />
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
