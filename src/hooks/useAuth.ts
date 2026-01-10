import { useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import * as authApi from '../api/auth';
import type { SocialProvider } from '../types/api';

export const useAuth = () => {
    const { user, tokens, isAuthenticated, setAuth, logout: setLogout, setUser } = useAuthStore();

    // 소셜 로그인 시작
    const startSocialLogin = useCallback((provider: SocialProvider) => {
        if (provider === 'kakao') {
            window.location.href = authApi.getKakaoLoginUrl();
        } else if (provider === 'naver') {
            window.location.href = authApi.getNaverLoginUrl();
        }
    }, []);

    // 소셜 로그인 콜백 처리
    const handleSocialCallback = useCallback(
        async (provider: SocialProvider, code: string, state?: string) => {
            try {
                // 네이버 state 검증
                if (provider === 'naver') {
                    const savedState = sessionStorage.getItem('naver_state');
                    if (state !== savedState) {
                        throw new Error('Invalid state parameter');
                    }
                    sessionStorage.removeItem('naver_state');
                }

                const { user, tokens } = await authApi.handleSocialCallback(provider, code, state);
                setAuth(user, tokens);
                return { success: true, user };
            } catch (error) {
                console.error('Social login callback error:', error);
                return {
                    success: false,
                    error: error instanceof Error ? error.message : '로그인에 실패했습니다.',
                };
            }
        },
        [setAuth]
    );

    // 로그아웃
    const logout = useCallback(async () => {
        try {
            await authApi.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setLogout();
            window.location.href = '/login';
        }
    }, [setLogout]);

    // 현재 사용자 정보 조회
    const fetchCurrentUser = useCallback(async () => {
        try {
            const user = await authApi.getCurrentUser();
            setUser(user);
            return { success: true, user };
        } catch (error) {
            console.error('Fetch user error:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : '사용자 정보를 가져오는데 실패했습니다.',
            };
        }
    }, [setUser]);

    return {
        user,
        tokens,
        isAuthenticated,
        startSocialLogin,
        handleSocialCallback,
        logout,
        fetchCurrentUser,
    };
};

