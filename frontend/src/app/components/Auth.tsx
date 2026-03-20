import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setStatus } from '../store/puzzleSlice';

export const Auth: React.FC = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
        const { data } = await axios.post(`http://localhost:4000${endpoint}`, { email, password });
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        dispatch(setStatus('idle'));
    } catch (err: any) {
        setError(err.response?.data?.error || 'Authentication failed');
    } finally {
        setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen pt-20 px-6 no-scrollbar"
    >
      <div className="w-full max-w-md bg-neutral-900 border border-white/5 rounded-5xl p-10 shadow-2xl relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-lavender/10 blur-3xl rounded-full" />
        
        <div className="text-center mb-10 relative z-10">
            <h2 className="text-4xl font-black mb-3 text-white tracking-tighter">
                {isLogin ? 'Welcome' : 'Join Us'}
            </h2>
            <p className="text-neutral-500 text-sm font-bold uppercase tracking-widest">
                {isLogin ? 'Access your matrix' : 'Start your journey'}
            </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-500 uppercase ml-1 tracking-widest">Identity / Email</label>
                <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-800 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-brand-lavender/50 transition-all font-bold placeholder:text-neutral-600"
                    placeholder="name@matrix.com"
                />
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-500 uppercase ml-1 tracking-widest">Secret / Password</label>
                <input 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-neutral-800 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-brand-lavender/50 transition-all font-bold placeholder:text-neutral-600"
                    placeholder="••••••••"
                />
            </div>

            <AnimatePresence>
                {error && (
                    <motion.p 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-red-400 text-[10px] font-black uppercase tracking-widest ml-1"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>

            <button 
                type="submit" 
                disabled={loading}
                className={`w-full ${isLogin ? 'bg-brand-yellow text-black' : 'bg-brand-lavender text-black'} font-black py-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-50 text-lg`}
            >
                {loading ? 'SYNCING...' : (isLogin ? 'SIGN IN' : 'INITIALIZE')}
            </button>
        </form>

        <div className="mt-10 text-center relative z-10">
            <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-neutral-500 hover:text-white text-xs font-black uppercase tracking-widest transition-colors"
            >
                {isLogin ? "New sequence? Create account" : 'Existing entity? Login'}
            </button>
        </div>
      </div>

      <button 
        onClick={() => dispatch(setStatus('idle'))}
        className="mt-10 text-neutral-600 hover:text-brand-lavender text-[10px] font-black tracking-[0.3em] uppercase transition-colors"
      >
        Continue as Anonymous
      </button>
    </motion.div>
  );
};
