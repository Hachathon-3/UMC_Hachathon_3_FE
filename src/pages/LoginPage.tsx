import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
    const { startSocialLogin } = useAuth();

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-8">로그인</h1>
                
                <div className="space-y-4">
                    <button
                        onClick={() => startSocialLogin('kakao')}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-4 rounded-lg transition-colors"
                    >
                        카카오로 로그인
                    </button>
                    
                    <button
                        onClick={() => startSocialLogin('naver')}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                    >
                        네이버로 로그인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
