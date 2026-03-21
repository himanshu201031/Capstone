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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen pt-12 px-6 no-scrollbar selection:bg-brand-orange/30 bg-neutral-50"
    >
      <div className="w-full max-w-sm bg-white border border-black/5 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
        
        <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-brand-orange/5 blur-3xl rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-32 h-32 bg-brand-blue/5 blur-3xl rounded-full" />
        
        <div className="text-center mb-10 relative z-10">
            <h2 className="text-4xl font-black mb-2 text-brand-text tracking-tighter leading-none uppercase">
                {isLogin ? (
                    <>Identity<br/>Vouch<span className="text-brand-orange">.</span></>
                ) : (
                    <>New<br/>Node<span className="text-brand-blue">.</span></>
                )}
            </h2>
            <p className="text-brand-text/20 text-[10px] font-black uppercase tracking-[0.3em] mt-2">
                {isLogin ? 'Access training matrix' : 'Sync evolution'}
            </p>
        </div>

        <div className="mb-8 relative z-10 flex flex-col items-center gap-6">
             <div className="w-full flex justify-center transform scale-110">
                 <GoogleLogin 
                    onSuccess={handleGoogleSuccess}
                    onError={() => setError('Google Sign-In Error')}
                    useOneTap
                    theme="outline"
                    shape="pill"
                    text={isLogin ? "signin_with" : "signup_with"}
                 />
             </div>
             
             <div className="flex items-center gap-3 w-full opacity-10">
                 <div className="h-[1px] bg-black flex-1" />
                 <span className="text-[10px] font-black tracking-widest uppercase text-center leading-none">Secure</span>
                 <div className="h-[1px] bg-black flex-1" />
             </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-2">
                <label className="text-[10px] font-black text-brand-text/30 uppercase ml-1 tracking-widest">Credentials</label>
                <input 
                    type="email" 
                    placeholder="email@vault.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-neutral-50 border border-black/5 p-4 rounded-xl text-brand-text focus:outline-none focus:border-brand-orange transition-all placeholder:text-neutral-300 font-bold text-sm shadow-inner"
                />
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-black text-brand-text/30 uppercase ml-1 tracking-widest">Access Code</label>
                <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-neutral-50 border border-black/5 p-4 rounded-xl text-brand-text focus:outline-none focus:border-brand-orange transition-all placeholder:text-neutral-300 font-bold text-sm shadow-inner"
                />
            </div>

            <AnimatePresence>
                {error && (
                    <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-red-50 border border-red-100 p-4 rounded-xl text-red-500 text-[10px] font-black uppercase tracking-widest text-center"
                    >
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="space-y-3 pt-2">
                <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    className={`w-full ${isLogin ? 'bg-brand-orange' : 'bg-brand-blue'} text-white font-black py-5 rounded-xl text-xs shadow-brand-shadow-orange transition-colors disabled:opacity-50 tracking-[0.2em] uppercase`}
                >
                    {loading ? 'PROCESSING...' : isLogin ? 'Authorize Access' : 'Initialize Node'}
                </motion.button>
                
                <button 
                   type="button"
                   onClick={handleGuestLogin}
                   className="w-full border border-dashed border-black/10 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-brand-text/30 hover:bg-neutral-50 transition-all font-inter"
                >
                    Guest Access Bypass
                </button>
            </div>
        </form>

        <div className="mt-8 text-center relative z-10">
            <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-brand-text/40 text-[10px] font-black uppercase tracking-widest hover:text-brand-orange transition-colors"
            >
                {isLogin ? "Need a new identity?" : "Already exist?"}
            </button>
        </div>

      </div>
      
      <div className="mt-8 text-center opacity-10">
          <p className="text-[10px] font-black uppercase tracking-widest">Secure Tunnel Established</p>
      </div>
    </motion.div>
  );
};
