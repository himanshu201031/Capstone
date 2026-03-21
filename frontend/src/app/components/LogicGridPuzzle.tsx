import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addScore } from '../store/userSlice';

const COLORS = ['#FF5C00', '#005FFF', '#FF00C1']; // Orange, Blue, Pink
const SHAPES = ['circle', 'square', 'triangle'];
const VALUES = ['1', '2', '3'];

interface Cell {
    id: string;
    color: string;
    shape: string;
    value: string;
}

export const LogicGridPuzzle: React.FC = () => {
    const dispatch = useDispatch();
    const [target, setTarget] = useState<Cell | null>(null);
    const [options, setOptions] = useState<Cell[]>([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(20);
    const [streak, setStreak] = useState(0);
    const [feedback, setFeedback] = useState<string | null>(null);

    const generateRound = () => {
        const createCell = (id: string) => ({
            id,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
            value: VALUES[Math.floor(Math.random() * VALUES.length)]
        });

        const newTarget = createCell('target');
        let newOptions = [newTarget];
        
        while (newOptions.length < 4) {
            const opt = createCell(`opt-${newOptions.length}`);
            if (!newOptions.find(o => o.color === opt.color && o.shape === opt.shape && o.value === opt.value)) {
                newOptions.push(opt);
            }
        }

        setTarget(newTarget);
        setOptions(newOptions.sort(() => Math.random() - 0.5));
    };

    useEffect(() => {
        generateRound();
        const timer = setInterval(() => setTimeLeft(prev => Math.max(0, prev - 1)), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleSelect = (cell: Cell) => {
        if (!target) return;
        if (cell.color === target.color && cell.shape === target.shape && cell.value === target.value) {
            setScore(prev => prev + 100 + (streak * 20));
            setStreak(prev => prev + 1);
            setFeedback('CALIBRATED');
            dispatch(addScore({ score: 100 + (streak * 20), date: new Date().toISOString().split('T')[0] }));
            generateRound();
        } else {
            setStreak(0);
            setFeedback('SYNC ERROR');
        }
        setTimeout(() => setFeedback(null), 800);
    };

    const renderShape = (shape: string, color: string) => {
        const props = { className: "w-10 h-10", fill: color };
        if (shape === 'circle') return <svg {...props} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>;
        if (shape === 'square') return <svg {...props} viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>;
        return <svg {...props} viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2z"/></svg>;
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-12 bg-white rounded-[4rem] border border-black/5 shadow-2xl relative overflow-hidden font-sans">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 blur-3xl rounded-full" />
            
            <div className="flex justify-between items-center mb-12 relative z-10">
                <div>
                    <h3 className="text-4xl font-black tracking-tighter uppercase italic">Cortex Multi-Link<span className="text-brand-orange">.</span></h3>
                    <p className="text-[10px] font-black opacity-30 tracking-[0.4em] uppercase">Triple Constraint Protocol</p>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-black tabular-nums tracking-tighter">{score}</div>
                    <div className="text-[10px] font-black text-brand-orange uppercase tracking-widest">Score Matrix</div>
                </div>
            </div>

            <div className="mb-16 flex flex-col items-center">
                <span className="text-[9px] font-black uppercase text-brand-text/30 tracking-[0.5em] mb-6 inline-block">Find exact match</span>
                {target && (
                    <motion.div 
                        key={target.id}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-32 h-32 bg-neutral-50 rounded-[2.5rem] border border-black/5 flex items-center justify-center relative shadow-inner"
                    >
                         <div className="absolute -top-3 -right-3 w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center text-white font-black shadow-lg">?</div>
                         <div className="flex flex-col items-center gap-2">
                            {renderShape(target.shape, target.color)}
                            <span className="text-lg font-black" style={{ color: target.color }}>{target.value}</span>
                         </div>
                    </motion.div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-6 relative z-10">
                {options.map((opt, i) => (
                    <motion.button
                        key={opt.id}
                        whileHover={{ y: -5, scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSelect(opt)}
                        className="bg-white border border-black/5 p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-brand-orange/20 transition-all flex flex-col items-center gap-4"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 flex items-center justify-center">{renderShape(opt.shape, opt.color)}</div>
                            <div className="w-[1px] h-10 bg-neutral-100" />
                            <span className="text-2xl font-black" style={{ color: opt.color }}>{opt.value}</span>
                        </div>
                    </motion.button>
                ))}
            </div>

            <AnimatePresence>
                {feedback && (
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className={`absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm pointer-events-none rounded-[4rem] ${
                            feedback.includes('ERROR') ? 'bg-red-500/10' : 'bg-emerald-500/10'
                        }`}
                    >
                        <span className={`text-6xl font-black tracking-tighter italic ${
                            feedback.includes('ERROR') ? 'text-red-500' : 'text-emerald-500'
                        }`}>{feedback}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-16 pt-8 border-t border-black/5 flex justify-between items-center opacity-40">
                <span className="text-[9px] font-black uppercase tracking-[0.4em]">Calibrating... {timeLeft}s</span>
                <span className="text-[9px] font-black uppercase tracking-[0.4em]">Streak: {streak}x</span>
            </div>
        </div>
    );
};
