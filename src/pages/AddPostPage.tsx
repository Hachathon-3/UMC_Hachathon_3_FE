import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InterestCategory, SolveStatus } from '../types/post';
import Dropdown from '../components/Dropdown';
import Button from '../components/Button';

export default function AddPostPage() {
    const navigate = useNavigate();
    const [category, setCategory] = useState<InterestCategory | null>(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const isFormValid = category !== null && title.trim().length > 0 && content.trim().length > 0;

    const handlePublish = () => {
        // Logic cleared as requested
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
