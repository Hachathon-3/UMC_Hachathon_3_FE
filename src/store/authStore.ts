import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AuthTokens } from '../types/user';

interface AuthState {
    user: User | null;
    tokens: AuthTokens | null;
    isAuthenticated: boolean;
    setAuth: (user: User, tokens: AuthTokens) => void;
    login: (nickname: string, interest: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            tokens: null,
            isAuthenticated: false,

            setAuth: (user, tokens) => {
                set({
                    user,
                    tokens,
                    isAuthenticated: true,
                });
                // accessToken을 별도로 저장 (인터셉터에서 사용)
                localStorage.setItem('accessToken', tokens.accessToken);
                if (tokens.refreshToken) {
                    localStorage.setItem('refreshToken', tokens.refreshToken);
                }
            },

            login: (nickname, interest) => {
                const mockUser: User = {
                    id: 'user-1', // Fixed ID for testing
                    email: `${nickname}@example.com`,
                    name: nickname,
                    nickname,
                    interest,
                    catnip: 0,
                    provider: undefined,
                };
                const mockTokens: AuthTokens = {
                    accessToken: 'mock-access-token-' + Date.now(),
                    refreshToken: 'mock-refresh-token-' + Date.now(),
                    expiresAt: Date.now() + 3600 * 1000,
                };

                set({
                    user: mockUser,
                    tokens: mockTokens,
                    isAuthenticated: true,
                });

                localStorage.setItem('accessToken', mockTokens.accessToken);
                localStorage.setItem('refreshToken', mockTokens.refreshToken);
            },

            logout: () => {
                set({
                    user: null,
                    tokens: null,
                    isAuthenticated: false,
                });
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);

