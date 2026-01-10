import { useState, useMemo } from 'react';
import { dummyPosts } from '../data/dummyPosts';
import { SolveStatus } from '../types/post';
import { useNavigate } from 'react-router-dom';

type SortOption = 'LATEST' | 'LIKES' | 'COMMENTS';
type FilterStatus = 'ALL' | 'SOLVED' | 'UNSOLVED';

const CommunityPage = () => {
    const navigate = useNavigate();
    const [filterStatus, setFilterStatus] = useState<FilterStatus>('ALL');
    const [sortBy, setSortBy] = useState<SortOption>('LATEST');
    const [searchKeyword, setSearchKeyword] = useState('');

    const filteredAndSortedPosts = useMemo(() => {
        return dummyPosts
            .filter((post) => {
                // 1. Status Filter
                if (filterStatus === 'SOLVED' && post.status !== SolveStatus.SOLVED) return false;
                if (filterStatus === 'UNSOLVED' && post.status !== SolveStatus.UNSOLVED) return false;

                // 2. Search Filter
                if (searchKeyword) {
                    const keyword = searchKeyword.toLowerCase();
                    const titleMatch = post.title.toLowerCase().includes(keyword);
                    const contentMatch = post.content.toLowerCase().includes(keyword);
                    if (!titleMatch && !contentMatch) return false;
                }

                return true;
            })
            .sort((a, b) => {
                // 3. Sort
                switch (sortBy) {
                    case 'LATEST':
                        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                    case 'LIKES':
                        return b.likeCount - a.likeCount;
                    case 'COMMENTS':
                        return b.commentCount - a.commentCount;
                    default:
                        return 0;
                }
            });
    }, [filterStatus, searchKeyword, sortBy]);

    return (
        <div className="p-4 bg-white min-h-screen pb-20 relative">
            <h1 className="text-2xl font-bold mb-6">지금, 불안한 이야기</h1>

            {/* Interest Cards (Placeholder based on image) */}
            <div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="min-w-[140px] h-[140px] bg-gray-200 rounded-lg flex items-center justify-center p-4 text-center text-sm font-medium text-gray-700 flex-shrink-0">
                        나의 관심사에<br />맞는 게시글
                    </div>
                ))}
            </div>

            {/* Status Filter Buttons */}
            <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
                <button
                    onClick={() => setFilterStatus('ALL')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filterStatus === 'ALL' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    전체
                </button>
                <button
                    onClick={() => setFilterStatus('UNSOLVED')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filterStatus === 'UNSOLVED' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    불안 해결책 필요
                </button>
                <button
                    onClick={() => setFilterStatus('SOLVED')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filterStatus === 'SOLVED' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    해결된 게시글
                </button>
            </div>

            {/* Search and Sort */}
            <div className="flex gap-2 mb-6">
                <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2 flex items-center">
                    <input
                        type="text"
                        placeholder="키워드 기반 검색"
                        className="bg-transparent w-full outline-none text-sm placeholder-gray-500"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                </div>
                <select
                    className="bg-gray-200 rounded-lg px-3 py-2 text-sm font-medium outline-none"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                >
                    <option value="LATEST">최신순</option>
                    <option value="LIKES">공감순</option>
                    <option value="COMMENTS">댓글순</option>
                </select>
            </div>

            {/* Post List */}
            <div className="flex flex-col gap-4">
                {filteredAndSortedPosts.length > 0 ? (
                    filteredAndSortedPosts.map((post) => (
                        <div
                            key={post.id}
                            className="flex bg-gray-100 p-4 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => navigate(`/post/${post.id}`)}
                        >
                            {/* Avatar Placeholder */}
                            <div className="w-12 h-12 bg-gray-400 rounded-full mr-4 flex-shrink-0"></div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-lg mb-1 truncate">{post.title}</h3>
                                <p className="text-gray-600 text-sm line-clamp-2 mb-1">
                                    {post.content}
                                </p>
                            </div>

                            {/* Right Side Info */}
                            <div className="flex flex-col items-end justify-between ml-2 flex-shrink-0">
                                <span className="text-xs text-gray-500">
                                    {post.createdAt.split(' ')[1]}
                                </span>
                                <div className="bg-gray-300 text-xs px-2 py-1 rounded text-gray-700 font-medium">
                                    공감 {post.likeCount} / 댓글 {post.commentCount}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-500">
                        검색 결과가 없습니다.
                    </div>
                )}
            </div>

            {/* Floating Action Button */}
            <button
                onClick={() => navigate('/add-post')}
                className="fixed bottom-20 right-4 w-14 h-14 bg-gray-600 rounded-full shadow-lg flex items-center justify-center text-white text-3xl font-light hover:bg-gray-700 transition-colors z-50"
            >
                +
            </button>
        </div>
    );
};

export default CommunityPage;
