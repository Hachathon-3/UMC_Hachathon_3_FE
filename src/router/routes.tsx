import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import FeedPage from '../pages/FeedPage';
import PostDetailPage from '../pages/PostDetailPage';
import ProfilePage from '../pages/ProfilePage';
import AddPostPage from '../pages/AddPostPage';
import OAuthCallback from '../pages/OAuthCallback';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: (
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'feed',
                element: (
                    <ProtectedRoute>
                        <FeedPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'post/:id',
                element: (
                    <ProtectedRoute>
                        <PostDetailPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'profile',
                element: (
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'add-post',
                element: (
                    <ProtectedRoute>
                        <AddPostPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'oauth/callback',
                element: <OAuthCallback />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
]);

