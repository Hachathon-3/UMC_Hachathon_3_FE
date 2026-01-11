import { useState, useMemo } from 'react';
import { dummyPosts } from '../data/dummyPosts';
import { SolveStatus } from '../types/post';
import { useNavigate } from 'react-router-dom';
import FloatingAddButton from '../components/FloatingAddButton';
import Button from '../components/Button';
import CommentIcon from '../assets/community/comment_icon.svg?react';
import HeartIcon from '../assets/community/heart_icon.svg?react';
import SearchIcon from '../assets/community/search_icon.svg?react';
import { useAuthStore } from '../store/authStore';

type SortOption = 'LATEST' | 'LIKES' | 'COMMENTS';
type FilterStatus = 'ALL' | 'SOLVED' | 'UNSOLVED';

const CommunityPage = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const [filterStatus, setFilterStatus] = useState<FilterStatus>('ALL');
    const [sortBy, setSortBy] = useState<SortOption>('LATEST');
    const [searchKeyword, setSearchKeyword] = useState('');

    const interestPosts = useMemo(() => {
        if (!user?.interest) return [];
        return dummyPosts.filter(post => post.category === user.interest).slice(0, 3);
    }, [user]);

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
        <div className="p-4 bg-gradient-primary min-h-screen pb-20 relative bg-fixed bg-cover">
            <h1 className="text-title-1 font-semibold text-primary-600 mb-6">지금, 불안한 이야기</h1>

            <h2 className="text-title-3 text-gray-900 mb-3">나의 관심사에 맞는 이야기</h2>
            {/* Interest Cards */}
            <div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
                {interestPosts.length > 0 ? (
                    interestPosts.map((post) => (
                        <div
                            key={post.id}
                            className="min-w-[140px] h-[140px] bg-white rounded-2xl p-4 flex flex-col justify-between shadow-sm flex-shrink-0 border border-gray-100 cursor-pointer hover:border-primary-400 transition-colors"
                            onClick={() => navigate(`/post/${post.id}`)}
                        >
                            <p className="text-body-3 font-medium text-gray-900 text-left leading-relaxed line-clamp-3">
                                {post.title}
                            </p>
                            <div className="flex justify-end gap-2">
                                <div className="flex items-center gap-1">
                                    <CommentIcon className="w-4 h-4" />
                                    <span className="text-detail text-gray-500">{post.commentCount}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <HeartIcon className="w-4 h-4" />
                                    <span className="text-detail text-gray-500">{post.likeCount}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="w-full text-center py-4 text-gray-500 text-body-3">
                        관심사에 맞는 게시글이 없습니다.
                    </div>
                )}
            </div>

            {/* Status Filter Buttons */}
            <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide px-1 justify-center">
                <div className="min-w-fit">
                    <Button
                        label="전체"
                        onClick={() => setFilterStatus('ALL')}
                        variant={filterStatus === 'ALL' ? 'primary' : 'outline'}
                        size="sm"
                        width="w-auto"
                        className="px-4 py-2 rounded-lg"
                    />
                </div>
                <div className="min-w-fit">
                    <Button
                        label="불안 해결책 필요"
                        onClick={() => setFilterStatus('UNSOLVED')}
                        variant={filterStatus === 'UNSOLVED' ? 'primary' : 'outline'}
                        size="sm"
                        width="w-auto"
                        className="px-4 py-2 rounded-lg"
                    />
                </div>
                <div className="min-w-fit">
                    <Button
                        label="불안 해결된 게시글"
                        onClick={() => setFilterStatus('SOLVED')}
                        variant={filterStatus === 'SOLVED' ? 'primary' : 'outline'}
                        size="sm"
                        width="w-auto"
                        className="px-4 py-2 rounded-lg"
                    />
                </div>
            </div>

            {/* Search and Sort */}
            <div className="flex gap-2 mb-6">
                <div className="flex-1 bg-white border border-gray-200 rounded-lg px-4 flex items-center gap-2 h-[48px]">
                    <SearchIcon className="w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="키워드 기반 검색"
                        className="bg-transparent w-full outline-none text-body-5 placeholder-gray-400"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                </div>
                <div className="relative h-[48px]">
                    <select
                        className="appearance-none bg-gray-400 text-white rounded-lg pl-4 pr-8 h-full text-body-3 font-medium outline-none cursor-pointer flex items-center"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                    >
                        <option value="LATEST">최신순</option>
                        <option value="LIKES">공감순</option>
                        <option value="COMMENTS">댓글순</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Post List */}
            <div className="flex flex-col gap-4">
                {filteredAndSortedPosts.length > 0 ? (
                    filteredAndSortedPosts.map((post) => (
                        <div
                            key={post.id}
                            className="flex flex-col bg-white p-5 rounded-2xl shadow-sm cursor-pointer hover:bg-gray-50 transition-colors gap-3"
                            onClick={() => navigate(`/post/${post.id}`)}
                        >
                            <div className="flex gap-3">
                                {/* Avatar Placeholder */}
                                <div className="w-10 h-10 bg-black rounded-full flex-shrink-0"></div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-body-2 mb-1 truncate text-gray-900">{post.title}</h3>
                                    <p className="text-gray-600 text-detail line-clamp-2 mb-2 leading-relaxed">
                                        {post.content}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <span className="text-detail text-gray-400">
                                            10분 전 {/* Mock time for design match */}
                                        </span>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1">
                                                <CommentIcon className="w-4 h-4" />
                                                <span className="text-detail text-gray-500">{post.commentCount}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <HeartIcon className="w-4 h-4" />
                                                <span className="text-detail text-gray-500">{post.likeCount}</span>
                                            </div>
                                        </div>
                                    </div>
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
            <div className="sticky bottom-8 w-full flex justify-end px-4 pointer-events-none mt-auto">
                <FloatingAddButton className="pointer-events-auto shadow-xl" />
            </div>
        </div>
    );
};

export default CommunityPage;
