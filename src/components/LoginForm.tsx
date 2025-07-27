import React, { useState } from 'react';

interface LoginFormProps {
  onLogin?: (email: string, password: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin) {
      onLogin(email, password);
    }
  };

  return (
    <div className="bg-[rgba(18,20,23,1)] min-h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="w-full max-w-[960px] px-40 py-5 max-md:px-5">
        <div className="w-full max-w-[480px] mx-auto">
          <div className="flex w-full flex-col items-stretch justify-center px-4 py-3">
            <img
              src="https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/7ebecf8e877b65b0a059bbe91af990e047d366c7?placeholderIfAbsent=true"
              className="aspect-[2.9] object-contain w-full min-h-80 rounded-lg"
              alt="Algae Tracker"
            />
          </div>
          
          <div className="min-h-[67px] w-full text-[28px] text-white font-bold text-center leading-none pt-5 pb-3 px-4">
            <h1>Welcome back</h1>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="flex w-full gap-4 text-base flex-wrap px-4 py-3">
              <div className="min-w-40 w-full flex-1 shrink basis-[0%]">
                <label className="w-full text-white font-medium whitespace-nowrap pb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[rgba(41,51,56,1)] flex min-h-14 w-full items-center overflow-hidden text-[rgba(158,173,184,1)] font-normal p-4 rounded-lg border-none outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            
            <div className="flex w-full gap-4 text-base flex-wrap px-4 py-3">
              <div className="min-w-40 w-full flex-1 shrink basis-[0%]">
                <label className="w-full text-white font-medium whitespace-nowrap pb-2 block">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[rgba(41,51,56,1)] flex min-h-14 w-full items-center overflow-hidden text-[rgba(158,173,184,1)] font-normal p-4 rounded-lg border-none outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
            
            <div className="w-full text-sm text-[rgba(158,173,184,1)] font-normal pt-1 pb-3 px-4">
              <a href="#" className="hover:text-white transition-colors">
                Forgot Password?
              </a>
            </div>
            
            <div className="flex w-full text-sm text-white font-bold whitespace-nowrap text-center px-4 py-3">
              <button
                type="submit"
                className="bg-[rgba(26,148,229,1)] flex min-w-[84px] min-h-10 w-full items-center overflow-hidden justify-center px-4 rounded-lg hover:bg-[rgba(26,148,229,0.9)] transition-colors"
              >
                Login
              </button>
            </div>
            
            <div className="w-full text-sm text-[rgba(158,173,184,1)] font-normal text-center pt-1 pb-3 px-4">
              <span>Don't have an account? </span>
              <a href="#" className="text-white hover:text-[rgba(26,148,229,1)] transition-colors">
                Create Account
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
