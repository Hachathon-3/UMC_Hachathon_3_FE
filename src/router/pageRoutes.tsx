import LoginPage from '../pages/LoginPage';
import AddPostPage from '../pages/AddPostPage';
import HomePage from '../pages/HomePage';
import FeedPage from '../pages/FeedPage';
import PostDetailPage from '../pages/PostDetailPage';
import ProfilePage from '../pages/ProfilePage';

export const pageRoutes = [
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/feed',
        element: <FeedPage />,
    },
    {
        path: '/post/:id',
        element: <PostDetailPage />,
    },
    {
        path: '/profile',
        element: <ProfilePage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/add-post',
        element: <AddPostPage />,
    },
];
