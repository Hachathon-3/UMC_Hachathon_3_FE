import type { SocialProvider } from './api';

export interface User {
    id: string;
    email: string;
    name: string;
    profileImage?: string;
    provider?: SocialProvider;
    catnip: number;
    nickname: string;
    interest: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    expiresAt?: number;
}