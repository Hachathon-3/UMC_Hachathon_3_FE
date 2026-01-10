import SignupPage from '../pages/SignupPage';
import AddPostPage from '../pages/AddPostPage';
import HomePage from '../pages/HomePage';
import CommunityPage from '../pages/CommunityPage';
import PostDetailPage from '../pages/PostDetailPage';

import CollectionPage from '../pages/CollectionPage';
import DecoratePage from '../pages/DecoratePage';

export const pageRoutes = [
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/collection',
        element: <CollectionPage />,
    },
    {
        path: '/community',
        element: <CommunityPage />,
    },
    {
        path: '/decorate',
        element: <DecoratePage />,
    },
    {
        path: '/post/:id',
        element: <PostDetailPage />,
    },

    {
        path: '/signup',
        element: <SignupPage />,
    },
    {
        path: '/add-post',
        element: <AddPostPage />,
    },
];
