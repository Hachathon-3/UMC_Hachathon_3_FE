import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomNav() {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { label: '홈', path: '/' },
        { label: '불안모음', path: '/collection' },
        { label: '게시판', path: '/community' },
        { label: '꾸미기', path: '/decorate' },
    ];

    return (
        <nav className="flex justify-around p-4 bg-white border-t border-gray-200 sticky bottom-0">
            {navItems.map((item) => (
                <button
                    key={item.path}
                    className={`bg-transparent border-none p-2 text-sm cursor-pointer transition-colors ${location.pathname === item.path
                            ? 'text-black font-bold'
                            : 'text-gray-500'
                        }`}
                    onClick={() => navigate(item.path)}
                >
                    {item.label}
                </button>
            ))}
        </nav>
    );
}
