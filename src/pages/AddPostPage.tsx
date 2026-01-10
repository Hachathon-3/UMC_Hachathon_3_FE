import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InterestCategory, SolveStatus } from '../types/post';
import Dropdown from '../components/Dropdown';
import Button from '../components/Button';
import { useAuthStore } from '../store/authStore';
import { dummyPosts } from '../data/dummyPosts';

export default function AddPostPage() {
    const navigate = useNavigate();
    const [category, setCategory] = useState<InterestCategory | null>(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const isFormValid = category !== null && title.trim().length > 0 && content.trim().length > 0;

    const { user } = useAuthStore();
    // Assuming user-1 for now if not logged in, but better to use store
    const currentUserId = user?.id || 'user-1';

    const handlePublish = () => {
        if (!isFormValid || !category) return;

        const newPost: any = { // Using any temporarily to bypass strict type check if needed, but better to match Post type
            id: Date.now(), // Simple unique ID
            title: title,
            content: content,
            createdAt: new Date().toLocaleString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }).replace(/\. /g, '-').replace('.', ''), // Format: YYYY-MM-DD HH:mm
            author: currentUserId,
            likeCount: 0,
            commentCount: 0,
            status: SolveStatus.UNSOLVED,
            category: category,
            isLiked: false
        };

        // Add to dummy data (in-memory only)
        // Since dummyPosts is imported as a reference, modifying it affects the in-memory data
        dummyPosts.unshift(newPost);

        // Show success alert? or just navigate
        // alert('게시글이 등록되었습니다.');
        // alert('게시글이 등록되었습니다.');
        navigate(`/post/${newPost.id}`);
    };

    return (
        <div className="min-h-screen bg-white p-5 flex flex-col">
            {/* Header */}
            <h1 className="text-title-1 font-bold mb-8 mt-4">나의 불안 작성하기</h1>

            {/* Form */}
            <div className="flex flex-col gap-6 flex-1">
                {/* Category */}
                <Dropdown
                    options={Object.values(InterestCategory)}
                    value={category}
                    onChange={setCategory}
                    placeholder="카테고리를 선택해주세요"
                />

                {/* Title */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="제목"
                        value={title}
                        onChange={(e) => {
                            if (e.target.value.length <= 30) setTitle(e.target.value);
                        }}
                        className="w-full p-4 rounded-lg border border-gray-200 outline-none focus:border-primary-400 text-body-2 placeholder-gray-400"
                    />
                    <div className="text-right mt-1 text-detail text-gray-400">
                        {title.length}/30
                    </div>
                </div>

                {/* Content */}
                <div className="relative flex-1 flex flex-col">
                    <textarea
                        placeholder="어떤 점이 불안하신가요? 자유롭게 작성해보세요."
                        value={content}
                        onChange={(e) => {
                            if (e.target.value.length <= 500) setContent(e.target.value);
                        }}
                        className="w-full p-4 rounded-lg border border-gray-200 outline-none focus:border-primary-400 text-body-2 placeholder-gray-400 resize-none flex-1 min-h-[300px]"
                    />
                    <div className="text-right mt-1 text-detail text-gray-400">
                        {content.length}/500
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
                <div className="flex-1">
                    <Button
                        label="취소하기"
                        onClick={() => navigate(-1)}
                        variant="outline"
                        size="lg"
                        className="bg-gray-200 border-none text-gray-600 hover:bg-gray-300 font-bold"
                    />
                </div>
                <div className="flex-1">
                    <Button
                        label="게시하기"
                        onClick={handlePublish}
                        disabled={!isFormValid}
                        size="lg"
                    />
                </div>
            </div>
        </div>
    );
}
