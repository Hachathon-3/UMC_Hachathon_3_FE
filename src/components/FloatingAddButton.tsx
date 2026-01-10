import { useNavigate } from 'react-router-dom';

interface FloatingAddButtonProps {
    className?: string;
}

export default function FloatingAddButton({ className = '' }: FloatingAddButtonProps) {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate('/add-post')}
            className={`w-14 h-14 bg-secondary-700 hover:bg-secondary-800 text-white rounded-full shadow-lg flex items-center justify-center transition-colors z-50 ${className}`}
            aria-label="게시글 작성"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </button>
    );
}
