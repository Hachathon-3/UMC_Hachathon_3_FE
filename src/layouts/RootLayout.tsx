import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const RootLayout = () => {
    const location = useLocation();
    const isSignup = location.pathname === '/login' || location.pathname === '/signup'; // Check both for safety

    return (
        <>
            {/* Desktop Warning Overlay */}
            <div className="fixed inset-0 z-[100] hidden md:flex items-center justify-center bg-gray-900 text-white p-8 text-center">
                <div className="max-w-md">
                    <h2 className="text-2xl font-bold mb-4">📱 모바일 뷰 최적화</h2>
                    <p className="text-lg mb-6 text-gray-300">
                        이 서비스는 모바일 환경에 최적화되어 제작되었습니다.<br />
                        브라우저 창 너비를 줄이거나, 모바일 기기로 접속해 주세요.
                    </p>
                    <div className="inline-block px-4 py-2 bg-white text-gray-900 rounded-lg font-medium">
                        권장 너비: 375px 이하
                    </div>
                </div>
            </div>

            {/* Mobile App Container */}
            <div className="max-w-[375px] h-screen mx-auto bg-white shadow-lg relative flex flex-col text-gray-800 md:hidden lg:flex overflow-hidden">
                <header className="sticky top-0 z-10 p-4 bg-gray-50 border-b border-gray-200">
                    <nav>
                        <h1 className="text-2xl font-semibold m-0 text-gray-800">Anxiety Community</h1>
                    </nav>
                </header>

                <main className="flex-1 overflow-y-auto">
                    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                        <Outlet />
                    </Suspense>
                </main>

                {!isSignup && <BottomNav />}
            </div>
        </>
    );
};

export default RootLayout;