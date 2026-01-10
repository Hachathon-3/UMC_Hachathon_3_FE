import type { Comment } from '../types/post';



export const dummyCommentsData: Record<number, Comment[]> = {
    1: [
        {
            id: 'c1',
            author: '취업성공자',
            content: '저도 비슷한 경험이 있었어요. 포트폴리오를 좀 더 구체적으로 작성하니까 도움이 됐어요!',
            createdAt: '5분 전',
            likeCount: 0,
            replyCount: 1,
            isLiked: false,
            replies: [
                {
                    id: 'c1-r1',
                    author: '글쓴이',
                    content: '오 그렇군요! 포트폴리오 팁 좀 더 주실 수 있나요?',
                    createdAt: '3분 전',
                    likeCount: 0,
                    replyCount: 0,
                    isLiked: false,
                    replies: []
                }
            ]
        },
        {
            id: 'c2',
            author: '지나가던행인',
            content: '힘내세요! 좋은 결과 있을 거예요.',
            createdAt: '10분 전',
            likeCount: 2,
            replyCount: 0,
            isLiked: true,
            replies: []
        }
    ],
    2: [
        {
            id: 'c3',
            author: '고양이집사',
            content: '고양이는 정말 귀엽죠...',
            createdAt: '1시간 전',
            likeCount: 5,
            replyCount: 0,
            isLiked: false,
            replies: []
        }
    ]
};
