import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyPosts } from '../data/dummyPosts';
import { dummyCommentsData } from '../data/dummyComments';
import type { Post, Comment } from '../types/post';
import CommentItem from '../components/CommentItem';
import Modal from '../components/Modal';
import CommentIcon from '../assets/community/comment_icon.svg?react';
import HeartIcon from '../assets/community/heart_icon.svg?react';
import SendIcon from '../assets/community/send_icon.svg?react';
import { useAuthStore } from '../store/authStore';

export default function PostDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [inputText, setInputText] = useState('');
    const [replyingTo, setReplyingTo] = useState<{ id: string, author: string } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [commentToAdopt, setCommentToAdopt] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const foundPost = dummyPosts.find(p => p.id === Number(id));
        if (foundPost) {
            setPost(foundPost);
            // Fetch comments for this post, fallback to empty array
            setComments(dummyCommentsData[Number(id)] || []);
        }
    }, [id]);

    const handleLikeComment = (commentId: string) => {
        setComments(prev => prev.map(comment => {
            if (comment.id === commentId) {
                if (comment.isLiked) {
                    alert('이미 좋아요를 눌렀습니다.');
                    return comment;
                }
                return { ...comment, isLiked: true, likeCount: comment.likeCount + 1 };
            }
            if (comment.replies) {
                return {
                    ...comment,
                    replies: comment.replies.map(reply =>
                        reply.id === commentId
                            ? (reply.isLiked ? (alert('이미 좋아요를 눌렀습니다.'), reply) : { ...reply, isLiked: true, likeCount: reply.likeCount + 1 })
                            : reply
                    )
                };
            }
            return comment;
        }));
    };

    const handleReplyClick = (commentId: string, authorName: string) => {
        setReplyingTo({ id: commentId, author: authorName });
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handlePostLike = () => {
        if (post) {
            if (post.isLiked) {
                alert('이미 좋아요를 눌렀습니다.');
                return;
            }
            setPost({
                ...post,
                isLiked: true,
                likeCount: post.likeCount + 1
            });
        }
    };

    const handlePostCommentClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleAdoptClick = (commentId: string) => {
        setCommentToAdopt(commentId);
        setIsModalOpen(true);
    };

    const handleConfirmAdopt = () => {
        if (commentToAdopt) {
            setComments(prev => prev.map(comment =>
                comment.id === commentToAdopt
                    ? { ...comment, isAdopted: true }
                    : comment
            ));
            setIsModalOpen(false);
            setCommentToAdopt(null);
        }
    };

    const handleSubmit = () => {
        if (!inputText.trim()) return;

        const newComment: Comment = {
            id: `new-${Date.now()}`,
            author: '나', // Mock current user
            content: inputText,
            createdAt: '방금 전',
            likeCount: 0,
            replyCount: 0,
            replies: [],
            isLiked: false
        };

        if (replyingTo) {
            // Add as reply
            setComments(prev => prev.map(comment => {
                if (comment.id === replyingTo.id) {
                    return { ...comment, replies: [...comment.replies, newComment], replyCount: comment.replyCount + 1 };
                }
                return comment;
            }));
            setReplyingTo(null);
        } else {
            // Add as top-level comment
            setComments(prev => [...prev, newComment]);
        }

        setInputText('');
    };

    // Sort comments: Adopted first, then original order
    const sortedComments = useMemo(() => {
        return [...comments].sort((a, b) => {
            if (a.isAdopted) return -1;
            if (b.isAdopted) return 1;
            return 0;
        });
    }, [comments]);

    const hasAdoptedComment = useMemo(() => {
        return comments.some(c => c.isAdopted);
    }, [comments]);

    // Check if current user is the author of the post
    // post.author is now an ID, so we compare it with user.id
    const isPostAuthor = user && post?.author === user.id;

    if (!post) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-body-1 text-gray-500 mb-4">게시글을 찾을 수 없습니다.</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-primary-400 font-bold hover:underline"
                    >
                        뒤로가기
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pb-24 relative flex flex-col">
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 px-4 py-3 flex items-center border-b border-gray-100">
                <button onClick={() => navigate(-1)} className="mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto">
                {/* Post Content */}
                <div className="p-5 border-b border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-black rounded-full"></div>
                        <div>
                            <div className="font-bold text-body-2">{post.author}</div>
                            <div className="text-detail text-gray-400">10분 전</div>
                        </div>
                    </div>

                    <h1 className="text-title-2 font-bold mb-3">{post.title}</h1>
                    <p className="text-body-5 text-text-primary leading-relaxed whitespace-pre-wrap mb-6">
                        {post.content}
                    </p>

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={handlePostCommentClick}
                            className="flex items-center gap-1 hover:opacity-70 transition-opacity"
                        >
                            <CommentIcon className="w-5 h-5 text-gray-400" />
                            <span className="text-body-3 text-gray-500">{comments.length}</span>
                        </button>
                        <button
                            onClick={handlePostLike}
                            className={`flex items-center gap-1 transition-colors p-1 rounded-full hover:bg-purple-100 ${post.isLiked ? 'text-primary-400' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <HeartIcon className="w-5 h-5" />
                            <span className="text-body-3 text-gray-500">{post.likeCount}</span>
                        </button>
                    </div>
                </div>

                {/* Comments List */}
                <div className="p-5">
                    {sortedComments.map(comment => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            onReply={handleReplyClick}
                            onLike={handleLikeComment}
                            onAdopt={handleAdoptClick}
                            isPostAuthor={isPostAuthor}
                            hasAdoptedComment={hasAdoptedComment}
                        />
                    ))}
                </div>
            </div>

            {/* Sticky Input Area */}
            <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 w-full">
                {replyingTo && (
                    <div className="flex justify-between items-center mb-2 px-1">
                        <span className="text-detail text-gray-500">
                            @{replyingTo.author}님에게 답글 남기는 중
                        </span>
                        <button
                            onClick={() => setReplyingTo(null)}
                            className="text-detail text-gray-400"
                        >
                            취소
                        </button>
                    </div>
                )}
                <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2">
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={replyingTo ? "답글을 입력하세요..." : "댓글을 입력하세요..."}
                        className="flex-1 bg-transparent outline-none text-body-3 placeholder-gray-400"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                                handleSubmit();
                            }
                        }}
                    />
                    <button
                        onClick={handleSubmit}
                        disabled={!inputText.trim()}
                        className={`p-1 transition-colors ${inputText.trim() ? 'text-primary-400' : 'text-gray-300'}`}
                    >
                        <SendIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Adoption Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmAdopt}
                title="해결책으로 채택할까요?"
            />
        </div>
    );
}
