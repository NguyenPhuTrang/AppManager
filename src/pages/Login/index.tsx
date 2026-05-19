import React, { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useLoginForm } from '../../features/auth/forms/login-form';
import { Link, useNavigate } from 'react-router-dom';

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

type ToastVariant = 'success' | 'error';

interface ToastState {
    show: boolean;
    visible: boolean;
    variant: ToastVariant;
    sub?: string;
}

const TOAST_MESSAGES: Record<ToastVariant, string> = {
    success: 'Login successfully !',
    error: 'Laogin failed !',
};

const LoginToast = ({ visible, variant, sub }: Omit<ToastState, 'show'>) => {
    const message = TOAST_MESSAGES[variant];
    const isSuccess = variant === 'success';

    const el = (
        <>
            <style>{`
                @keyframes toastSlideDown {
                    from { transform: translateX(-50%) translateY(-120%); opacity: 0; }
                    to   { transform: translateX(-50%) translateY(0);     opacity: 1; }
                }
                @keyframes toastSlideUp {
                    from { transform: translateX(-50%) translateY(0);     opacity: 1; }
                    to   { transform: translateX(-50%) translateY(-120%); opacity: 0; }
                }
                .login-toast-enter { animation: toastSlideDown 0.38s cubic-bezier(0.34,1.56,0.64,1) forwards; }
                .login-toast-exit  { animation: toastSlideUp   0.30s cubic-bezier(0.4,0,1,1) forwards; }
            `}</style>
            <div
                className={`fixed top-5 left-1/2 z-[9999] flex items-center gap-3
                    bg-white rounded-2xl px-5 py-3.5
                    shadow-[0_8px_32px_rgba(220,100,150,0.22),0_2px_8px_rgba(0,0,0,0.08)]
                    border border-[#fce8ee] min-w-[260px] max-w-[380px]
                    ${visible ? 'login-toast-enter' : 'login-toast-exit'}`}
                style={{ transform: 'translateX(-50%)' }}
                role="status"
                aria-live="polite"
            >
                <div className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center
                    bg-gradient-to-br from-[#f0a0bc] to-[#c04060]
                    shadow-[0_4px_10px_rgba(220,100,150,0.35)]">
                    {isSuccess ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5" />
                        </svg>
                    ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    )}
                </div>

                <div className="flex flex-col min-w-0">
                    <span className="text-[13px] font-[700] text-[#3d1a2b] leading-tight">
                        {message}
                    </span>
                    {sub && (
                        <span className="text-[11px] text-[#c0768a] leading-tight truncate">
                            {sub}
                        </span>
                    )}
                </div>


            </div>
        </>
    );

    return createPortal(el, document.body);
};
const DISPLAY_MS = 1500; 
const EXIT_MS = 320;

const LoginPage: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { register, handleSubmit, errors, onSubmit } = useLoginForm();
    const navigate = useNavigate();

    const [toastState, setToastState] = useState<ToastState>({
        show: false, visible: false, variant: 'success',
    });

    const triggerToast = useCallback((variant: ToastVariant, sub?: string, onDone?: () => void) => {
        setToastState(prev => ({ ...prev, visible: false, show: false }));
        setTimeout(() => {
            setToastState({ show: true, visible: true, variant, sub });
            setTimeout(() => {
                setToastState(prev => ({ ...prev, visible: false }));
                setTimeout(() => {
                    setToastState(prev => ({ ...prev, show: false }));
                    onDone?.(); 
                }, EXIT_MS);
            }, DISPLAY_MS);
        }, 50);
    }, []);

    const handleLogin = handleSubmit(async (data: any) => {
        try {
            await onSubmit(data);
            triggerToast('success', undefined, () => navigate('/product'));
        } catch (err: any) {
            triggerToast('error', err?.message || 'Vui lòng kiểm tra lại thông tin.');
        }
    });

    return (
        <div className="w-full min-h-screen flex flex-col bg-[#FADADD]">

            {toastState.show && (
                <LoginToast
                    visible={toastState.visible}
                    variant={toastState.variant}
                    sub={toastState.sub}
                />
            )}

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
                    <img src="../images/Logo.png" alt="Logo" className="w-[500px] h-auto" />
                </div>

                <div className="flex flex-col w-[340px] gap-3.5 mt-[30px]">

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

                    <button
                        type="button"
                        onClick={handleLogin}
                        className="w-full h-[50px] rounded-xl border-none text-white text-base font-bold mt-5
                            tracking-wide cursor-pointer transition-all duration-200
                            bg-gradient-to-r from-[#f0a0bc] via-[#e87aab] to-[#f0a0bc]
                            shadow-[0_4px_18px_rgba(220,100,150,0.3)]
                            hover:shadow-[0_6px_24px_rgba(220,100,150,0.45)] hover:-translate-y-px
                            active:scale-[0.98]"
                    >
                        Sign In
                    </button>

                </div>
            </div>
        </div>
    );
};

export default LoginPage;