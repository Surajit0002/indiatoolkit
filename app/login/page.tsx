"use client";

import Link from "next/link";
import { Github, Mail, Lock, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleQuickLogin = () => {
    setIsLoggingIn(true);
    // Simulate auto-login
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/");
    }, 800);
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
        
        <div className="text-center relative z-10">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-3xl mb-6 shadow-xl shadow-blue-200 rotate-3">
            OT
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-500 font-medium">
            Access your personalized digital toolkit
          </p>
        </div>
        
        <div className="space-y-4 relative z-10">
          <button 
            onClick={handleQuickLogin}
            disabled={isLoggingIn}
            className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 group disabled:opacity-70"
          >
            {isLoggingIn ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Zap className="h-5 w-5 fill-current text-blue-200" />
                Quick One-Tap "Auto" Login
              </>
            )}
          </button>
          
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-2xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all">
              <Github className="h-4 w-4" /> GitHub
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-2xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all">
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg> Google
            </button>
          </div>
        </div>

        <div className="relative z-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-[0.2em] font-black text-gray-300">
            <span className="px-4 bg-white">Or secure email</span>
          </div>
        </div>

        <form className="mt-8 space-y-4 relative z-10">
          <div className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-[38px] h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
              <input
                type="email"
                required
                className="block w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none text-gray-900 rounded-2xl focus:ring-2 focus:ring-blue-600 sm:text-sm transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-[38px] h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Password</label>
              <input
                type="password"
                required
                className="block w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none text-gray-900 rounded-2xl focus:ring-2 focus:ring-blue-600 sm:text-sm transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <label className="flex items-center cursor-pointer group">
              <input type="checkbox" className="hidden" />
              <div className="h-5 w-5 border-2 border-gray-200 rounded-lg mr-2 flex items-center justify-center group-hover:border-blue-400 transition-colors">
                <CheckCircle2 className="h-3 w-3 text-blue-600 opacity-0 group-hover:opacity-20" />
              </div>
              <span className="text-sm font-bold text-gray-500">Remember</span>
            </label>
            <a href="#" className="text-sm font-bold text-blue-600 hover:text-blue-500">Forgot?</a>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center py-4 px-4 bg-gray-900 text-white text-sm font-black rounded-2xl hover:bg-black shadow-xl transition-all"
          >
            Sign In Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </form>
        
        <p className="text-center text-sm font-bold text-gray-500 relative z-10">
          New here?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline decoration-2 underline-offset-4">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
