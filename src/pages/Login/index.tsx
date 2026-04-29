import React, { useState } from 'react';
import { useLoginForm } from '../../features/auth/forms/login-form';
import { Link } from 'react-router-dom';

const EyeIcon = ({ open }: { open: boolean }) =>
  open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { register, handleSubmit, errors, onSubmit } = useLoginForm();

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#FADADD]">

      <nav className="flex items-center justify-end px-9 py-3.5 gap-5">
        <button
          type="button"
          className="flex items-center gap-1 text-sm text-[#c0768a] bg-transparent border-none cursor-pointer"
        >
          English
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        <button
          type="button"
          className="text-sm font-bold text-[#d46080] underline underline-offset-[10px] bg-transparent border-none cursor-pointer"
        >
          Sign In
        </button>
        
      </nav>

      <div className="flex flex-1 items-center justify-center px-12 py-5 gap-20">

        <div className="flex items-center justify-center shrink-0">
          <img
            src="../images/Logo.png"
            alt="Logo"
            className="w-[500px] h-auto"
          />
        </div>

        <div className="flex flex-col w-[340px] gap-3.5">

          <div className={`flex items-center h-[50px] px-3.5 rounded-xl border bg-white/75
            shadow-[0_2px_10px_rgba(200,120,140,0.08)] transition-all
            ${errors?.email ? 'border-[#e06080]' : 'border-white/90 focus-within:border-[#e87aab]'}`}
          >
            <input
              {...register('email')}
              type="email"
              placeholder="Enter Email"
              className="flex-1 h-full bg-transparent outline-none text-sm text-[#5a3045] placeholder:text-[#c0a0ac]"
            />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c0a0ac" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M2 7l10 7 10-7" />
            </svg>
          </div>
          {errors?.email && (
            <span className="text-[#e06080] text-xs -mt-2">{errors.email.message}</span>
          )}

          <div className={`flex items-center h-[50px] px-3.5 rounded-xl border bg-white/75
            shadow-[0_2px_10px_rgba(200,120,140,0.08)] transition-all
            ${errors?.password ? 'border-[#e06080]' : 'border-white/90 focus-within:border-[#e87aab]'}`}
          >
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="flex-1 h-full bg-transparent outline-none text-sm text-[#5a3045] placeholder:text-[#c0a0ac]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="bg-transparent border-none cursor-pointer p-0 flex items-center text-[#c0a0ac] hover:text-[#d46080] transition-colors"
            >
              <EyeIcon open={showPassword} />
            </button>
          </div>
          {errors?.password && (
            <span className="text-[#e06080] text-xs -mt-2">{errors.password.message}</span>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-3.5 h-3.5 accent-[#d46080] cursor-pointer rounded border-[#e8b4c0]"
              />
              <label htmlFor="remember" className="text-[13px] text-[#c0768a] cursor-pointer select-none">
                Remember me
              </label>
            </div>
            <Link
              to="/forget-password"
              className="text-[13px] text-[#c0768a] no-underline opacity-80 hover:opacity-100 transition-opacity"
            >
             Recover Password ?
            </Link>
          </div>

          {/* Sign In button */}
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="w-full h-[50px] rounded-xl border-none text-white text-base font-bold
              tracking-wide cursor-pointer transition-all duration-200
              bg-gradient-to-r from-[#f0a0bc] via-[#e87aab] to-[#f0a0bc]
              shadow-[0_4px_18px_rgba(220,100,150,0.3)]
              hover:shadow-[0_6px_24px_rgba(220,100,150,0.45)] hover:-translate-y-px
              active:scale-[0.98]"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#e8b4c0]/50" />
            <span className="text-[12px] text-[#c0768a] opacity-70 select-none">Hoặc</span>
            <div className="flex-1 h-px bg-[#e8b4c0]/50" />
          </div>

          {/* Google login */}
          <button
            type="button"
            onClick={() => { window.location.href = '/auth/google'; }}
            className="w-full h-[50px] rounded-xl border border-white/90 bg-white/75
              flex items-center justify-center gap-2.5
              shadow-[0_2px_10px_rgba(200,120,140,0.08)]
              text-sm font-semibold text-[#5a3045]
              cursor-pointer transition-all duration-200
              hover:bg-white/90 hover:shadow-[0_4px_16px_rgba(200,120,140,0.15)]
              active:scale-[0.98]"
          >
            <GoogleIcon />
            Continue with Google
          </button>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;