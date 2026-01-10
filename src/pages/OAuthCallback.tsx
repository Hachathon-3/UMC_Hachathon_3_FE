import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { SocialProvider } from '../types/api';

const OAuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { handleSocialCallback } = useAuth();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const errorParam = searchParams.get('error');

        // 에러가 있는 경우
        if (errorParam) {
            setError('로그인에 실패했습니다.');
            setTimeout(() => navigate('/login'), 2000);
            return;
        }

        // code가 없는 경우
        if (!code) {
            setError('인증 코드를 받지 못했습니다.');
            setTimeout(() => navigate('/login'), 2000);
            return;
        }

        // state에서 provider 확인
        const provider: SocialProvider = state === 'kakao' ? 'kakao' : 'naver';

        // 소셜 로그인 콜백 처리
        handleSocialCallback(provider, code, state || undefined).then((result) => {
            if (result.success) {
                navigate('/');
            } else {
                setError(result.error || '로그인에 실패했습니다.');
                setTimeout(() => navigate('/login'), 2000);
            }
        });
    }, [searchParams, handleSocialCallback, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                {error ? (
                    <>
                        <p className="text-red-500 mb-4">{error}</p>
                        <p className="text-gray-500">로그인 페이지로 이동합니다...</p>
                    </>
                ) : (
                    <>
                        <p className="text-lg mb-2">로그인 처리 중...</p>
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                    </>
                )}
            </div>
        </div>
    );
};

export default OAuthCallback;
