export const InterestCategory = {
    CAREER: "진로",
    LOVE: "연애",
    DAILY: "일상",
    ANY: "상관없음",
} as const;
export type InterestCategory = typeof InterestCategory[keyof typeof InterestCategory];

export const SolveStatus = {
    SOLVED: "해결",
    UNSOLVED: "해결안됨",
} as const;
export type SolveStatus = typeof SolveStatus[keyof typeof SolveStatus];

export interface Comment {
    id: string;
    author: string;
    content: string;
    createdAt: string;
    likeCount: number;
    replyCount: number;
    replies: Comment[];
    isLiked: boolean;
    isAdopted?: boolean;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    author: string;
    likeCount: number;
    commentCount: number;
    status: SolveStatus;
    category: InterestCategory;
    isLiked?: boolean;
}
