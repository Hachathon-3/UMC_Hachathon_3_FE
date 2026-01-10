import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';

import HomePage from '../pages/HomePage';
import SignupPage from '../pages/SignupPage';
import CollectionPage from '../pages/CollectionPage';
import CommunityPage from '../pages/CommunityPage';
import DecoratePage from '../pages/DecoratePage';
import PostDetailPage from '../pages/PostDetailPage';
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
                element: <HomePage />,
            },
            {
                path: 'collection',
                element: <CollectionPage />,
            },
            {
                path: 'community',
                element: <CommunityPage />,
            },
            {
                path: 'decorate',
                element: <DecoratePage />,
            },
            {
                path: 'post/:id',
                element: <PostDetailPage />,
            },
            {
                path: 'add-post',
                element: <AddPostPage />,
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
