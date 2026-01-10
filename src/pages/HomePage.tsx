import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import homeCat from '../assets/home_cat.png';

const PHRASES = [
    "오늘 하루도 고생 많았어요.",
    "잠시 쉬어가도 괜찮아요.",
    "당신은 충분히 잘하고 있어요.",
    "불안은 지나가는 구름 같아요.",
    "깊게 숨을 들이마시고 내쉬어보세요.",
    "작은 행복을 찾아보세요.",
    "내일은 더 좋은 날이 될 거예요.",
    "혼자가 아니에요.",
    "맛있는 거 먹고 힘내요!",
    "따뜻한 차 한 잔 어때요?",
    "자신을 믿으세요.",
    "걱정은 잠시 내려놓아요.",
    "오늘의 나를 칭찬해주세요.",
    "천천히 가도 괜찮아요.",
    "당신의 미소는 아름다워요.",
    "힘든 순간도 결국 지나갈 거예요.",
    "지금 이 순간에 집중해보세요.",
    "당신은 소중한 사람이에요.",
    "좋은 일이 생길 거예요.",
    "토닥토닥, 힘내요."
];

export default function HomePage() {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [randomPhrase, setRandomPhrase] = useState('');

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * PHRASES.length);
        setRandomPhrase(PHRASES[randomIndex]);
    }, []);

    return (
        <div className="relative h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-white p-4">
            {/* Catnip Display */}
            <div className="absolute top-4 left-4 bg-gray-200 px-4 py-2 rounded-lg shadow-sm">
                <span className="font-semibold text-gray-700">캣닢 {user?.catnip ?? 0}</span>
            </div>

            <div className="flex flex-col items-center gap-6 w-full max-w-md">
                {/* Link to Feed */}
                <Link
                    to="/feed"
                    className="bg-gray-200 hover:bg-gray-300 transition-colors px-6 py-3 rounded-full text-gray-700 font-medium text-sm shadow-sm"
                >
                    다른 사람의 불안을 해결하러가보세요 &gt;
                </Link>

                {/* Random Phrase Bubble */}
                <div className="bg-gray-100 p-6 rounded-2xl shadow-sm text-center w-full max-w-xs relative">
                    {/* Speech bubble tail could be added with CSS if needed, keeping it simple for now */}
                    <p className="text-gray-800 font-medium leading-relaxed">
                        {randomPhrase}
                    </p>
                </div>

                {/* Cat Image */}
                <div className="w-64 h-64 flex items-center justify-center">
                    <img
                        src={homeCat}
                        alt="Comforting Cat"
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>

            {/* Floating Action Button */}
            <button
                onClick={() => navigate('/add-post')}
                className="absolute bottom-8 right-8 w-14 h-14 bg-gray-300 hover:bg-gray-400 transition-colors rounded-full flex items-center justify-center shadow-lg"
                aria-label="Add Post"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        </div>
    );
}
