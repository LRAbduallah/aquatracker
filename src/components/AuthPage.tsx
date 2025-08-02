import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

interface AuthPageProps {
  onAuth: (user: any) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitchToRegister = () => {
    setIsLogin(false);
  };

  const handleSwitchToLogin = () => {
    setIsLogin(true);
  };

  if (isLogin) {
    return (
      <LoginForm 
        onLogin={onAuth}
        onSwitchToRegister={handleSwitchToRegister}
      />
    );
  }

  return (
    <RegisterForm 
      onRegister={onAuth}
      onSwitchToLogin={handleSwitchToLogin}
    />
  );
};