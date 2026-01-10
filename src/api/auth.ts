import client from './client';
import type { ApiResponse } from '../types/api';
import type { User, AuthTokens } from '../types/user';
import type { SocialProvider } from '../types/api';

// 소셜 로그인 응답 타입
export interface SocialLoginResponse {
    user: User;
    tokens: AuthTokens;
}

// 카카오 로그인 URL 생성
export const getKakaoLoginUrl = (): string => {
    const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const redirectUri = encodeURIComponent(import.meta.env.VITE_REDIRECT_URI || `${window.location.origin}/oauth/callback`);
    return `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&state=kakao`;
};

// 네이버 로그인 URL 생성
export const getNaverLoginUrl = (): string => {
    const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
    const redirectUri = encodeURIComponent(import.meta.env.VITE_REDIRECT_URI || `${window.location.origin}/oauth/callback`);
    const state = Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('naver_state', state);
    return `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;
};

// 소셜 로그인 콜백 처리
export const handleSocialCallback = async (
    provider: SocialProvider,
    code: string,
    state?: string
): Promise<SocialLoginResponse> => {
    const response = await client.post<ApiResponse<SocialLoginResponse>>('/auth/social/callback', {
        provider,
        code,
        state,
    });
    return response.data.data;
};

// 로그아웃
export const logout = async (): Promise<void> => {
    await client.post('/auth/logout');
};

// 현재 사용자 정보 조회
export const getCurrentUser = async (): Promise<User> => {
    const response = await client.get<ApiResponse<User>>('/auth/me');
    return response.data.data;
};

