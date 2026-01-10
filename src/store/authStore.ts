import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AuthTokens } from '../types/user';

interface AuthState {
    user: User | null;
    tokens: AuthTokens | null;
    isAuthenticated: boolean;
    setAuth: (user: User, tokens: AuthTokens) => void;
    setUser: (user: User | null) => void;
    setTokens: (tokens: AuthTokens | null) => void;
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
                localStorage.setItem('accessToken', tokens.accessToken);
                if (tokens.refreshToken) {
                    localStorage.setItem('refreshToken', tokens.refreshToken);
                }
            },

            setUser: (user) => {
                set({ user, isAuthenticated: !!user });
            },

            setTokens: (tokens) => {
                set({ tokens });
                if (tokens) {
                    localStorage.setItem('accessToken', tokens.accessToken);
                    if (tokens.refreshToken) {
                        localStorage.setItem('refreshToken', tokens.refreshToken);
                    }
                } else {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                }
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

