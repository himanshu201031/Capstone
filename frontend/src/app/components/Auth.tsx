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

  const handleGuestLogin = () => {
    localStorage.setItem('token', 'guest_token_session');
    localStorage.setItem('userId', 'guest_user_alpha');
    window.location.reload();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen pt-12 px-6 no-scrollbar selection:bg-brand-ruby/30"
    >
      <div className="w-full max-w-sm bg-neutral-900 border border-white/5 rounded-2xl p-6 md:p-8 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative overflow-hidden">
        
        {/* Multicolored Glow Accents */}
        <div className="absolute top-[-10%] right-[-10%] w-24 h-24 bg-brand-lavender/10 blur-3xl rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-24 h-24 bg-brand-ruby/10 blur-3xl rounded-full" />
        
        <div className="text-center mb-6 relative z-10">
            <h2 className="text-xl font-black mb-1 text-white tracking-tighter leading-tight uppercase">
                {isLogin ? (
                    <>Identity<br/>Vouch</>
                ) : (
                    <>New<br/>Node</>
                )}
            </h2>
            <p className="text-neutral-500 text-[10px] font-black uppercase tracking-widest mt-1">
                {isLogin ? 'Access training matrix' : 'Sync evolution'}
            </p>
        </div>

        {/* Google Login Section - Simplified & Professional */}
        <div className="mb-6 relative z-10 flex flex-col items-center gap-4">
             <div className="w-full flex justify-center scale-90">
                 <GoogleLogin 
                    onSuccess={handleGoogleSuccess}
                    onError={() => setError('Google Sign-In Error')}
                    useOneTap
                    theme="filled_black"
                    shape="pill"
                    text={isLogin ? "continue_with" : "signup_with"}
                 />
             </div>
             
             <div className="flex items-center gap-3 w-full opacity-20">
                 <div className="h-[1px] bg-white flex-1" />
                 <span className="text-[10px] font-black tracking-widest uppercase text-center">Encryption</span>
                 <div className="h-[1px] bg-white flex-1" />
             </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div className="space-y-1.5">
                <label className="text-[10px] font-black text-neutral-500 uppercase ml-1 tracking-widest">Credentials</label>
                <input 
                    type="email" 
                    placeholder="email@vault.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-neutral-800/50 border border-white/5 p-3 rounded-lg text-white focus:outline-none focus:border-brand-lavender transition-all placeholder:text-neutral-600 font-bold text-xs"
                />
            </div>

            <div className="space-y-1.5">
                <label className="text-[10px] font-black text-neutral-500 uppercase ml-1 tracking-widest">Access Code</label>
                <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-neutral-800/50 border border-white/5 p-3 rounded-lg text-white focus:outline-none focus:border-brand-lavender transition-all placeholder:text-neutral-600 font-bold text-xs"
                />
            </div>

            <AnimatePresence>
                {error && (
                    <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-brand-ruby/10 border border-brand-ruby/20 p-3 rounded-lg text-brand-ruby text-xs font-black uppercase tracking-widest text-center"
                    >
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="space-y-3 pt-2">
                <motion.button 
                    whileHover={{ scale: 1.02, backgroundColor: isLogin ? '#FFF500' : '#00F0FF' }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    className={`w-full ${isLogin ? 'bg-brand-yellow' : 'bg-brand-cyan'} text-black font-black py-3.5 rounded-lg text-xs shadow-lg transition-colors disabled:opacity-50 tracking-widest uppercase`}
                >
                    {loading ? 'PROCESSING...' : isLogin ? 'Authorize Access' : 'Initialize Node'}
                </motion.button>
                
                <button 
                   type="button"
                   onClick={handleGuestLogin}
                   className="w-full border border-dashed border-white/10 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:bg-white/5 transition-all"
                >
                    Guest Access Bypass
                </button>
            </div>
        </form>

        <div className="mt-6 text-center relative z-10">
            <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-neutral-600 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
            >
                {isLogin ? "Need a new identity?" : "Already exist?"}
            </button>
        </div>

      </div>
      
      <div className="mt-6 text-center opacity-20">
          <p className="text-[9px] font-black uppercase tracking-widest">Secure Tunnel 256-bit Encrypted</p>
      </div>
    </motion.div>
  );
};
