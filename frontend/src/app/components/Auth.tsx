import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setStatus } from '../store/puzzleSlice';
import { GoogleLogin } from '@react-oauth/google';

export const Auth: React.FC = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setLoading(true);
    setError('');
    try {
        const { data } = await axios.post(`http://localhost:4000/api/auth/google`, { 
            token: credentialResponse.credential 
        });
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        
        // Force state refresh to App to pick up token
        window.location.reload(); 
    } catch (err: any) {
        setError(err.response?.data?.error || 'Google Login failed');
    } finally {
        setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
        const { data } = await axios.post(`http://localhost:4000${endpoint}`, { email, password });
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        
        // Force state refresh to App to pick up token
        window.location.reload();
    } catch (err: any) {
        setError(err.response?.data?.error || 'Authentication failed');
    } finally {
        setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen pt-20 px-6 no-scrollbar selection:bg-brand-ruby/30"
    >
      <div className="w-full max-w-lg bg-neutral-900 border border-white/5 rounded-[4rem] p-12 md:p-20 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative overflow-hidden">
        
        {/* Multicolored Glow Accents */}
        <div className="absolute top-[-10%] right-[-10%] w-48 h-48 bg-brand-lavender/10 blur-3xl rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 bg-brand-ruby/10 blur-3xl rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-cyan/5 blur-[120px] rounded-full" />
        
        <div className="text-center mb-16 relative z-10">
            <h2 className="text-5xl font-black mb-4 text-white tracking-tighter leading-none">
                {isLogin ? 'IDENTITY<br/>VOUCH' : 'NEW<br/>NEURAL NODE'}
            </h2>
            <p className="text-neutral-500 text-xs font-black uppercase tracking-[0.4em] mt-6">
                {isLogin ? 'Access your training matrix' : 'Sync your cognitive evolution'}
            </p>
        </div>

        {/* Google Login Section - Simplified & Professional */}
        <div className="mb-14 relative z-10 flex flex-col items-center gap-8">
             <div className="w-full flex justify-center scale-110">
                 <GoogleLogin 
                    onSuccess={handleGoogleSuccess}
                    onError={() => setError('Google Sign-In Error')}
                    useOneTap
                    theme="filled_black"
                    shape="pill"
                    text={isLogin ? "continue_with" : "signup_with"}
                 />
             </div>
             
             <div className="flex items-center gap-6 w-full opacity-30">
                 <div className="h-px bg-white flex-1" />
                 <span className="text-[10px] font-black tracking-widest uppercase">Encryption Gate</span>
                 <div className="h-px bg-white flex-1" />
             </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="space-y-3">
                <label className="text-[10px] font-black text-neutral-500 uppercase ml-2 tracking-[0.3em]">Credentials / Node ID</label>
                <input 
                    type="email" 
                    placeholder="email@vault.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-neutral-800/50 border border-white/5 p-6 rounded-[2rem] text-white focus:outline-none focus:border-brand-lavender transition-all placeholder:text-neutral-600 font-bold"
                />
            </div>

            <div className="space-y-3">
                <label className="text-[10px] font-black text-neutral-500 uppercase ml-2 tracking-[0.3em]">Access Code</label>
                <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-neutral-800/50 border border-white/5 p-6 rounded-[2rem] text-white focus:outline-none focus:border-brand-lavender transition-all placeholder:text-neutral-600 font-bold"
                />
            </div>

            <AnimatePresence>
                {error && (
                    <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-brand-ruby/10 border border-brand-ruby/20 p-5 rounded-2xl text-brand-ruby text-[10px] font-black uppercase tracking-widest text-center"
                    >
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: isLogin ? '#FFF500' : '#00F0FF' }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className={`w-full ${isLogin ? 'bg-brand-yellow' : 'bg-brand-cyan'} text-black font-black py-7 rounded-[2rem] text-lg shadow-2xl transition-colors disabled:opacity-50 tracking-tighter`}
            >
                {loading ? 'PROCESSING...' : isLogin ? 'AUTHORIZE ACCESS' : 'INITIALIZE NODE'}
            </motion.button>
        </form>

        <div className="mt-14 text-center relative z-10">
            <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-neutral-600 text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-colors"
            >
                {isLogin ? "Need a new identity? Initialize" : "Already exist? Authorize"}
            </button>
        </div>

        {/* Removed Anonymous Option for Strict Policy */}

      </div>
      
      <div className="mt-12 text-center opacity-30">
          <p className="text-[10px] font-black uppercase tracking-[0.3em]">Secure Tunnel 256-bit Encrypted</p>
      </div>
    </motion.div>
  );
};
