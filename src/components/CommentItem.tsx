import type { Comment } from '../types/post';
import CommentIcon from '../assets/community/comment_icon.svg?react';
import HeartIcon from '../assets/community/heart_icon.svg?react';
import CheckIcon from '../assets/community/check_icon.svg?react';

interface CommentItemProps {
    comment: Comment;
    onReply: (commentId: string, authorName: string) => void;
    onLike: (commentId: string) => void;
    onAdopt?: (commentId: string) => void;
    isReply?: boolean;
    isPostAuthor?: boolean;
    hasAdoptedComment?: boolean;
}

const CommentItem = ({
    comment,
    onReply,
    onLike,
    onAdopt,
    isReply = false,
    isPostAuthor = false,
    hasAdoptedComment = false
}: CommentItemProps) => {
    // Show check icon if:
    // 1. Current user is the post author
    // 2. This comment is NOT by the post author (assuming '나' is current user, logic handled in parent)
    // 3. No comment has been adopted yet
    // 4. This is not a reply (usually only top-level comments are adopted, but user didn't specify. Assuming top-level for now based on UI)
    const showCheckIcon = isPostAuthor && !hasAdoptedComment && !isReply && comment.author !== '나';

    return (
        <div className={`flex flex-col ${isReply ? 'ml-12 mt-2' : 'border-b border-gray-100 py-4'} ${comment.isAdopted ? 'border border-primary-400 rounded-lg p-4 bg-purple-50/10' : ''}`}>
            <div className="flex gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 bg-black rounded-full flex-shrink-0"></div>

                <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex flex-col">
                            {comment.isAdopted && (
                                <span className="text-detail font-bold text-primary-400 mb-1">해결책으로 채택됨</span>
                            )}
                            <div className="flex items-center gap-2">
                                <span className="text-body-3 font-bold text-gray-900">{comment.author}</span>
                                <span className="text-detail text-gray-400">{comment.createdAt}</span>
                            </div>
                        </div>
                        {comment.isAdopted && (
                            <div className="w-6 h-6 rounded-full bg-primary-400 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <p className="text-body-3 text-gray-800 mb-2 whitespace-pre-wrap leading-relaxed">
                        {comment.content}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {!isReply && (
                                <button
                                    onClick={() => onReply(comment.id, comment.author)}
                                    className="flex items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <CommentIcon className="w-4 h-4" />
                                </button>
                            )}
                            <button
                                onClick={() => onLike(comment.id)}
                                className={`flex items-center gap-1 transition-colors p-1 rounded-full hover:bg-purple-100 ${comment.isLiked ? 'text-primary-400' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <HeartIcon className="w-4 h-4" />
                                <span className="text-detail">{comment.likeCount}</span>
                            </button>
                        </div>

                        {/* Adoption Check Icon (Only for author to click) */}
                        {showCheckIcon && onAdopt && (
                            <button
                                onClick={() => onAdopt(comment.id)}
                                className="text-gray-300 hover:text-primary-400 transition-colors"
                            >
                                <CheckIcon className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Replies */}
            {comment.replies && comment.replies.length > 0 && (
                <div className="flex flex-col gap-2 mt-2">
                    {comment.replies.map((reply) => (
                        <CommentItem
                            key={reply.id}
                            comment={reply}
                            onReply={onReply}
                            onLike={onLike}
                            isReply={true}
                        // Replies don't show adoption UI usually
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentItem;
