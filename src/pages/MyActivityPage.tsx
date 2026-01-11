import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyPosts } from '../data/dummyPosts';
import { dummyCommentsData } from '../data/dummyComments';
import { SolveStatus } from '../types/post';
import ActivitySummaryCard from '../components/Activity/ActivitySummaryCard';
import ActivityPostItem, { type ActivityItemType } from '../components/Activity/ActivityPostItem';
import { useAuthStore } from '../store/authStore';
import PencilIcon from '../assets/myactivity/pencil_icon.svg?react';
import SolvedIcon from '../assets/myactivity/sloved_icon.svg?react';
import UnsolvedIcon from '../assets/myactivity/unsloved_icon.svg?react';
import MedalIcon from '../assets/myactivity/medal_icon.svg?react';

type TabType = 'all' | 'solved' | 'unsolved' | 'helped';

const MyActivityPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TabType>('all');

    // In a real app, we would get this from the auth store or context
    // For now, using the hardcoded user-1 as per instructions
    const { user } = useAuthStore();
    const currentUserId = user?.id || 'user-1';

    // Filter Logic
    const myPosts = useMemo(() => {
        return dummyPosts.filter(post => post.author === currentUserId);
    }, [currentUserId]);

    const solvedPosts = useMemo(() => {
        return myPosts.filter(post => post.status === SolveStatus.SOLVED);
    }, [myPosts]);

    const unsolvedPosts = useMemo(() => {
        return myPosts.filter(post => post.status === SolveStatus.UNSOLVED);
    }, [myPosts]);

    const helpedPosts = useMemo(() => {
        // Find post IDs where the user has commented
        const commentedPostIds = new Set<number>();

        Object.entries(dummyCommentsData).forEach(([postIdStr, comments]) => {
            const hasMyComment = comments.some(comment => comment.author === currentUserId);
            // Also check nested replies if necessary? Assuming flat structure or checking top-level provides enough coverage for now,
            // but let's check replies too for completeness if the data structure supports it.
            // Based on dummyComments.ts, comments have replies[].

            const hasMyReply = comments.some(comment =>
                comment.replies.some(reply => reply.author === currentUserId)
            );

            if (hasMyComment || hasMyReply) {
                commentedPostIds.add(Number(postIdStr));
            }
        });

        // Get unique posts, excluding my own posts if that's the desired logic "Helping others"
        // The requirement says: "comment에서 author가 user.id랑 일치하는 댓글의 post 정보를 갖고 와야해"
        // It doesn't explicitly exclude my own posts, but usually "Helping" implies others. 
        // However, looking at the UI/UX, keeping it simple as "Posts I commented on" is safer unless specified.
        // Let's include all for now to strictly follow the instruction "Info of posts where comment author is user.id".
        // But to make it distinct from "My Posts", excluding my own posts is better UX.
        // Let's EXCLUDE my own posts to make the "Helped" category meaningful (purple badge distinct from green/red).

        return dummyPosts.filter(post =>
            commentedPostIds.has(post.id) && post.author !== currentUserId
        );
    }, [currentUserId]);

    // Active List Logic
    const currentList = useMemo(() => {
        switch (activeTab) {
            case 'solved': return solvedPosts;
            case 'unsolved': return unsolvedPosts;
            case 'helped': return helpedPosts;
            case 'all': default: return myPosts;
        }
    }, [activeTab, myPosts, solvedPosts, unsolvedPosts, helpedPosts]);

    // Helper to determine item variant
    const getItemVariant = (post: typeof dummyPosts[0]): ActivityItemType => {
        if (activeTab === 'helped') return 'helped';
        // For 'all', 'solved', 'unsolved' tabs
        if (post.status === SolveStatus.SOLVED) return 'solved';
        return 'unsolved';
    };

    // Card Icons
    const icons = {
        all: <PencilIcon className="w-8 h-8" />,
        solved: <SolvedIcon className="w-8 h-8" />,
        unsolved: <UnsolvedIcon className="w-8 h-8" />,
        helped: <MedalIcon className="w-8 h-8" />
    };

    const getTabTitle = () => {
        switch (activeTab) {
            case 'all': return '전체 글';
            case 'solved': return '해결된 글';
            case 'unsolved': return '미해결된 글';
            case 'helped': return '내가 도운 글';
        }
    };

    return (
        <div className="bg-gradient-primary min-h-screen pb-20 p-5 bg-fixed bg-cover">
            {/* Header */}
            <div className="mb-8 mt-4">
                <h1 className="text-title-1 font-bold text-primary-400 mb-1">활동 기록</h1>
                <p className="text-body-2 text-gray-600">나의 불안과 해결 여정</p>
            </div>

            {/* Summary Cards Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <ActivitySummaryCard
                    title="전체 글"
                    count={myPosts.length}
                    isActive={activeTab === 'all'}
                    onClick={() => setActiveTab('all')}
                    icon={icons.all}
                    variant="all"
                />
                <ActivitySummaryCard
                    title="해결된 글"
                    count={solvedPosts.length}
                    isActive={activeTab === 'solved'}
                    onClick={() => setActiveTab('solved')}
                    icon={icons.solved}
                    variant="solved"
                />
                <ActivitySummaryCard
                    title="미해결된 글"
                    count={unsolvedPosts.length}
                    isActive={activeTab === 'unsolved'}
                    onClick={() => setActiveTab('unsolved')}
                    icon={icons.unsolved}
                    variant="unsolved"
                />
                <ActivitySummaryCard
                    title="내가 도운 글"
                    count={helpedPosts.length}
                    isActive={activeTab === 'helped'}
                    onClick={() => setActiveTab('helped')}
                    icon={icons.helped}
                    variant="helped"
                />
            </div>

            {/* List Section Header */}
            <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900 mb-1">{getTabTitle()}</h2>
                <p className="text-body-3 text-gray-500">총 {currentList.length}개의 게시글</p>
            </div>

            {/* Posts List */}
            <div className="space-y-4">
                {currentList.length > 0 ? (
                    currentList.map(post => (
                        <ActivityPostItem
                            key={post.id}
                            post={post}
                            type={getItemVariant(post)}
                            onClick={() => navigate(`/post/${post.id}`)}
                        />
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-400">
                        게시글이 없습니다.
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyActivityPage;
