import { InterestCategory, SolveStatus } from '../types/post';
import type { Post } from '../types/post';

export const dummyPosts: Post[] = [
    {
        id: 1,
        title: "취업 준비 때문에 너무 불안해요",
        content: "매일매일 자소서 쓰고 면접 준비하는데 끝이 안 보이는 것 같아서 숨이 막혀요. 다들 어떻게 버티시나요?",
        createdAt: "2024-01-10 14:30",
        author: "취준생1",
        likeCount: 15,
        commentCount: 5,
        status: SolveStatus.UNSOLVED,
        category: InterestCategory.CAREER
    },
    {
        id: 2,
        title: "친구 관계가 예전 같지 않아서 고민입니다",
        content: "가장 친했던 친구랑 요즘 서먹해진 것 같아요. 제가 실수한 건지 아니면 그냥 멀어지는 시기인 건지 모르겠어요.",
        createdAt: "2024-01-10 13:15",
        author: "고민많은사람",
        likeCount: 8,
        commentCount: 2,
        status: SolveStatus.UNSOLVED,
        category: InterestCategory.DAILY
    },
    {
        id: 3,
        title: "건강 염려증이 심해진 것 같아요",
        content: "조금만 어디가 아파도 큰 병일까 봐 밤새 검색해보고 잠을 못 자요. 병원에서는 이상 없다는데 계속 불안해요.",
        createdAt: "2024-01-10 12:00",
        author: "건강지킴이",
        likeCount: 23,
        commentCount: 10,
        status: SolveStatus.SOLVED,
        category: InterestCategory.DAILY
    },
    {
        id: 4,
        title: "시험 기간만 되면 배가 아파요",
        content: "중요한 시험을 앞두고 있는데 긴장해서 그런지 소화도 안 되고 계속 배가 아프네요. 컨디션 조절 어떻게 하시나요?",
        createdAt: "2024-01-10 11:45",
        author: "시험기간",
        likeCount: 5,
        commentCount: 1,
        status: SolveStatus.UNSOLVED,
        category: InterestCategory.CAREER
    },
    {
        id: 5,
        title: "면접에서 또 떨어졌어요...",
        content: "이번에는 진짜 잘 봤다고 생각했는데 결과가 좋지 않네요. 자존감이 너무 떨어져요.",
        createdAt: "2024-01-09 18:20",
        author: "다시도전",
        likeCount: 42,
        commentCount: 8,
        status: SolveStatus.UNSOLVED,
        category: InterestCategory.CAREER
    },
    {
        id: 6,
        title: "직장 상사 때문에 스트레스 받아요",
        content: "사소한 걸로 계속 트집 잡으시는데 어떻게 대처해야 할지 모르겠어요. 퇴사하고 싶은 마음뿐입니다.",
        createdAt: "2024-01-09 15:10",
        author: "직장인A",
        likeCount: 12,
        commentCount: 4,
        status: SolveStatus.SOLVED,
        category: InterestCategory.CAREER
    },
    {
        id: 7,
        title: "불면증이 너무 심해요",
        content: "새벽 3시가 넘었는데도 잠이 안 와요. 내일 출근해야 하는데 걱정입니다. 잠 잘 오는 방법 좀 알려주세요.",
        createdAt: "2024-01-09 03:30",
        author: "잠못드는밤",
        likeCount: 7,
        commentCount: 3,
        status: SolveStatus.UNSOLVED,
        category: InterestCategory.DAILY
    },
    {
        id: 8,
        title: "발표 공포증 극복하고 싶어요",
        content: "다음 주에 전공 발표가 있는데 사람들 앞에만 서면 머리가 하얘지고 목소리가 떨려요.",
        createdAt: "2024-01-08 20:00",
        author: "발표왕",
        likeCount: 19,
        commentCount: 6,
        status: SolveStatus.SOLVED,
        category: InterestCategory.CAREER
    },
    {
        id: 9,
        title: "나만 뒤처지는 것 같은 기분",
        content: "SNS 보면 다들 행복하고 성공하는 것 같은데 저만 제자리걸음인 것 같아서 우울해요.",
        createdAt: "2024-01-08 14:50",
        author: "비교금지",
        likeCount: 35,
        commentCount: 12,
        status: SolveStatus.UNSOLVED,
        category: InterestCategory.CAREER
    },
    {
        id: 10,
        title: "부모님과의 갈등",
        content: "진로 문제로 부모님과 계속 부딪혀요. 제 의견을 존중해주셨으면 좋겠는데 대화가 안 통하네요.",
        createdAt: "2024-01-08 10:10",
        author: "효녀심청",
        likeCount: 9,
        commentCount: 2,
        status: SolveStatus.UNSOLVED,
        category: InterestCategory.DAILY
    }
];
