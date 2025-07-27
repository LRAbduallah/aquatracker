import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onLogin?: (email: string, password: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    if (onLogin) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onLogin(data.email, data.password);
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
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="Enter your email"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                placeholder="Enter your password"
                disabled={isSubmitting}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>
            
            <div className="w-full text-sm text-muted-foreground font-normal pt-1 pb-3 px-4">
              <a href="#" className="hover:text-foreground transition-colors">
                Forgot Password?
              </a>
            </div>
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Login'}
            </Button>
            
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
