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
    <div className="bg-background min-h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="w-full max-w-[960px] px-40 py-5 max-md:px-5">
        <div className="w-full max-w-[480px] mx-auto">
          <div className="flex w-full flex-col items-stretch justify-center px-4 py-3">
            <div className="w-full min-h-80 rounded-lg bg-primary/10 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-primary-foreground rounded"></div>
                </div>
                <h2 className="text-2xl font-bold text-foreground">Algae Tracker</h2>
                <p className="text-muted-foreground mt-2">Environmental monitoring platform</p>
              </div>
            </div>
          </div>
          
          <div className="min-h-[67px] w-full text-[28px] text-foreground font-bold text-center leading-none pt-5 pb-3 px-4">
            <h1>Welcome back</h1>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="flex w-full gap-4 text-base flex-wrap px-4 py-3">
              <div className="min-w-40 w-full flex-1 shrink basis-[0%]">
                <label className="w-full text-foreground font-medium whitespace-nowrap pb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-secondary flex min-h-14 w-full items-center overflow-hidden text-muted-foreground font-normal p-4 rounded-lg border border-border outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            
            <div className="flex w-full gap-4 text-base flex-wrap px-4 py-3">
              <div className="min-w-40 w-full flex-1 shrink basis-[0%]">
                <label className="w-full text-foreground font-medium whitespace-nowrap pb-2 block">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-secondary flex min-h-14 w-full items-center overflow-hidden text-muted-foreground font-normal p-4 rounded-lg border border-border outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
            
            <div className="w-full text-sm text-muted-foreground font-normal pt-1 pb-3 px-4">
              <a href="#" className="hover:text-foreground transition-colors">
                Forgot Password?
              </a>
            </div>
            
            <div className="flex w-full text-sm text-primary-foreground font-bold whitespace-nowrap text-center px-4 py-3">
              <button
                type="submit"
                className="bg-primary flex min-w-[84px] min-h-10 w-full items-center overflow-hidden justify-center px-4 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Login
              </button>
            </div>
            
            <div className="w-full text-sm text-muted-foreground font-normal text-center pt-1 pb-3 px-4">
              <span>Don't have an account? </span>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Create Account
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
