import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '../assets/Nav/home_icon.svg?react';
import CommunityIcon from '../assets/Nav/community_icon.svg?react';
import InboxIcon from '../assets/Nav/inbox_icon.svg?react';

export default function BottomNav() {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { label: '홈', path: '/', Icon: HomeIcon },
        { label: '게시판', path: '/community', Icon: CommunityIcon },
        { label: '불안모음', path: '/my-activity', Icon: InboxIcon }, // Renamed '내 활동' to '불안모음' based on image
    ];

    return (
        <nav className="flex justify-around p-2 bg-white border-t border-gray-200 sticky bottom-0 z-50 pb-6">
            {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <button
                        key={item.path}
                        className={`flex flex-col items-center justify-center p-2 cursor-pointer transition-colors w-full gap-1
                            ${isActive ? 'text-primary-400' : 'text-gray-400'}`}
                        onClick={() => navigate(item.path)}
                    >
                        <item.Icon className="w-6 h-6" />
                        <span className={`text-[10px] font-medium ${isActive ? 'text-primary-400' : 'text-gray-400'}`}>
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </nav>
    );
}
