
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type AuthMode = 'login' | 'signup';

interface AuthFormProps {
  mode: AuthMode;
}

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, signUp } = useAuth();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const activeForm = mode === 'login' ? loginForm : signupForm;

  const onSubmit = async (values: LoginFormValues | SignupFormValues) => {
    setIsSubmitting(true);
    try {
      if (mode === 'login') {
        const loginValues = values as LoginFormValues;
        await login(loginValues.email, loginValues.password);
        toast.success('Successfully logged in!');
      } else {
        const signupValues = values as SignupFormValues;
        await signUp(signupValues.name, signupValues.email, signupValues.password);
        toast.success('Account created successfully!');
      }
      navigate('/travel-rooms');
    } catch (error) {
      toast.error(mode === 'login' ? 'Failed to login' : 'Failed to create account');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="glass-card max-w-md w-full mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        {mode === 'login' ? 'Welcome Back' : 'Create an Account'}
      </h2>
      
      <Form {...activeForm}>
        <form onSubmit={activeForm.handleSubmit(onSubmit)} className="space-y-5">
          {mode === 'signup' && (
            <FormField
              control={signupForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" className="input-field" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          <FormField
            control={activeForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" type="email" className="input-field" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={activeForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      placeholder="Enter your password" 
                      type={showPassword ? 'text' : 'password'} 
                      className="input-field pr-10" 
                      {...field} 
                    />
                    <button 
                      type="button"
                      tabIndex={-1}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {mode === 'signup' && (
            <FormField
              control={signupForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Confirm your password" 
                      type={showPassword ? 'text' : 'password'} 
                      className="input-field" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          <Button 
            type="submit" 
            className="w-full btn-primary" 
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === 'login' ? 'Login' : 'Create Account'}
          </Button>
          
          <p className="text-center text-sm text-muted-foreground mt-4">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <Link 
              to={mode === 'login' ? '/signup' : '/login'} 
              className="text-primary hover:underline"
            >
              {mode === 'login' ? 'Sign up' : 'Login'}
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default AuthForm;
