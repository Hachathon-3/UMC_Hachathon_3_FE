import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InterestCategory } from '../types/post';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import { useAuthStore } from '../store/authStore';

const SignupPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<InterestCategory | null>(null);

  const { login } = useAuthStore();

  // Mock validation logic
  const isNicknameLengthValid = nickname.length > 0 && nickname.length <= 8;
  // For demonstration, let's say "admin" is already taken
  const isNicknameTaken = nickname === 'admin';
  const isNicknameValid = isNicknameLengthValid && !isNicknameTaken;

  const isFormValid = isNicknameValid && selectedCategory !== null;

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 8) {
      setNickname(value);
    }
  };

  const handleSubmit = () => {
    if (isFormValid && selectedCategory) {
      login(nickname, selectedCategory);
      // Navigate to home or feed after signup
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background p-5 flex flex-col">
      {/* Header */}
      <div className="mt-10 mb-10">
        <h1 className="text-title-1 text-gray-900 mb-2">
          <span className="text-primary-400">해결캣</span>에 오신걸 환영해요!
        </h1>
        <p className="text-body-3 text-gray-600">
          기본 회원 정보를 입력해주세요
        </p>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex flex-col gap-8">
        {/* Nickname Input */}
        <div className="flex flex-col gap-2">
          <label className="text-body-2 text-gray-900">닉네임</label>
          <input
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={handleNicknameChange}
            className={`w-full p-4 rounded-lg border text-body-2 outline-none transition-colors placeholder-gray-400
                            ${nickname.length === 0
                ? 'border-gray-200 focus:border-primary-400'
                : isNicknameValid
                  ? 'border-status-positive'
                  : 'border-status-alert'
              }`}
          />
          <div className="text-detail h-4">
            {nickname.length > 0 && (
              <span className={isNicknameValid ? 'text-status-positive' : 'text-status-alert'}>
                {isNicknameValid
                  ? '사용할 수 있는 닉네임이에요'
                  : isNicknameTaken
                    ? '이미 존재하는 닉네임이에요'
                    : '닉네임은 최대 8글자까지 가능해요'}
              </span>
            )}
            {nickname.length === 0 && (
              <span className="text-gray-400">닉네임은 최대 8글자까지 가능해요</span>
            )}
          </div>
        </div>

        {/* Interest Dropdown */}
        <div className="flex flex-col gap-2 relative">
          <label className="text-body-2 text-gray-900">불안 요소</label>
          <Dropdown
            options={Object.values(InterestCategory)}
            value={selectedCategory}
            onChange={setSelectedCategory}
            placeholder="요즘 나의 관심사는?"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-auto mb-4">
        <Button
          label="시작하기"
          onClick={handleSubmit}
          disabled={!isFormValid}
        />
      </div>
    </div>
  );
};

export default SignupPage;
