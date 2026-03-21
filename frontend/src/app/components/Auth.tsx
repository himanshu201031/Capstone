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
        window.location.reload();
    } catch (err: any) {
        setError(err.response?.data?.error || 'Authentication failed');
    } finally {
        setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    localStorage.setItem('token', 'guest_token_session');
    localStorage.setItem('userId', 'guest_user_alpha');
    window.location.reload();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen pt-12 px-6 no-scrollbar selection:bg-brand-orange/30 bg-neutral-50 relative overflow-hidden font-sans"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#005FFF 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white border border-black/5 rounded-[4rem] p-10 md:p-14 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] relative z-10 group"
      >
        <div className="text-center mb-12">
            <motion.div 
                key={isLogin ? 'login' : 'signup'}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-4"
            >
                <h2 className="text-6xl font-black mb-2 text-brand-text tracking-tighter leading-[0.85] uppercase italic">
                    {isLogin ? 'Identity.' : 'Registry.'}
                </h2>
                <div className="flex items-center justify-center gap-3 mt-4">
                    <span className="text-brand-orange text-[10px] font-black uppercase tracking-[0.4em]">Protocol Node 7.0</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping" />
                </div>
            </motion.div>
        </div>

        <div className="mb-10 flex flex-col items-center gap-8">
             <div className="w-full transform hover:scale-[1.02] transition-transform flex justify-center">
                 <GoogleLogin 
                    onSuccess={handleGoogleSuccess}
                    onError={() => setError('Google Sign-In Error')}
                    useOneTap
                    theme="filled_blue"
                    shape="pill"
                    text={isLogin ? "signin_with" : "signup_with"}
                 />
             </div>
             
             <div className="flex items-center gap-4 w-full px-4">
                 <div className="h-[1px] bg-black/5 flex-1" />
                 <span className="text-[9px] font-black tracking-widest uppercase text-brand-text/20 leading-none">Cortex Sync Enabled</span>
                 <div className="h-[1px] bg-black/5 flex-1" />
             </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3 relative group">
                <label className="text-[10px] font-black text-brand-text/30 uppercase ml-2 tracking-widest block transition-colors group-focus-within:text-brand-orange">Secure Email</label>
                <div className="relative">
                    <input 
                        type="email" 
                        placeholder="email@vault.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-neutral-50 border border-black/5 p-5 rounded-2xl text-brand-text focus:outline-none focus:border-brand-orange focus:bg-white transition-all placeholder:text-neutral-200 font-bold text-sm shadow-inner group-hover:border-black/10"
                    />
                    <div className="absolute right-5 top-5 opacity-10">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                </div>
            </div>

            <div className="space-y-3 relative group">
                <label className="text-[10px] font-black text-brand-text/30 uppercase ml-2 tracking-widest block transition-colors group-focus-within:text-brand-orange">Access Cipher</label>
                <div className="relative">
                    <input 
                        type="password" 
                        placeholder="••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full bg-neutral-50 border border-black/5 p-5 rounded-2xl text-brand-text focus:outline-none focus:border-brand-orange focus:bg-white transition-all placeholder:text-neutral-200 font-bold text-sm shadow-inner group-hover:border-black/10"
                    />
                    <div className="absolute right-5 top-5 opacity-10">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {error && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-red-50 border border-red-100 p-4 rounded-2xl text-red-500 text-[10px] font-black uppercase tracking-widest text-center shadow-lg"
                    >
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="space-y-4 pt-4">
                <motion.button 
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    className={`w-full ${isLogin ? 'bg-brand-orange shadow-brand-shadow-orange' : 'bg-brand-blue shadow-brand-shadow-blue'} text-white font-black py-6 rounded-2xl text-xs transition-all disabled:opacity-50 tracking-[0.3em] uppercase border-b-4 border-b-black/10`}
                >
                    {loading ? 'PROCESSING...' : isLogin ? 'Authorize Access' : 'Create Node'}
                </motion.button>
                
                <button 
                   type="button"
                   onClick={handleGuestLogin}
                   className="w-full border border-dashed border-black/10 py-4 rounded-2xl text-[9px] font-black uppercase tracking-[0.4em] text-brand-text/20 hover:bg-neutral-50 transition-all hover:text-brand-orange hover:border-brand-orange/40"
                >
                    Guest Bypass
                </button>
            </div>
        </form>

        <div className="mt-12 text-center pb-4">
            <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-brand-text/30 text-[10px] font-black uppercase tracking-[0.3em] hover:text-brand-orange transition-colors"
            >
                {isLogin ? "Generate New Node?" : "Recall Existing Node?"}
            </button>
        </div>
      </motion.div>
      
      <div className="mt-12 text-center opacity-10 flex items-center gap-6">
          <div className="w-12 h-[1px] bg-brand-text" />
          <p className="text-[10px] font-black uppercase tracking-[0.6em]">Secure Tunnel 0xFEAL</p>
          <div className="w-12 h-[1px] bg-brand-text" />
      </div>
    </motion.div>
  );
};
