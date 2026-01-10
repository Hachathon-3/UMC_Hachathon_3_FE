import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import FeedPage from '../pages/FeedPage';
import PostDetailPage from '../pages/PostDetailPage';
import AddPostPage from '../pages/AddPostPage';
import OAuthCallback from '../pages/OAuthCallback';
import NotFound from '../pages/NotFound';
import MyActivityPage from '../pages/MyActivityPage';
import CommunityPage from '../pages/CommunityPage';
import CustomizePage from '../pages/CustomizePage';

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
                path: 'my-activity',
                element: (
                    <ProtectedRoute>
                        <MyActivityPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'community',
                element: (
                    <ProtectedRoute>
                        <CommunityPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'customize',
                element: (
                    <ProtectedRoute>
                        <CustomizePage />
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
                path: 'signup',
                element: <SignupPage />,
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
