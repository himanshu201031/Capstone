import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useHint } from '../store/puzzleSlice';
import { RootState } from '../store';

export const HintButton: React.FC<{ onUseHint?: () => void }> = ({ onUseHint }) => {
    const dispatch = useDispatch();
    const hintsRemaining = useSelector((state: RootState) => state.puzzle.hintsRemaining);

    const handleHint = () => {
        if (hintsRemaining > 0) {
            dispatch(useHint());
            if (onUseHint) onUseHint();
        }
    };

    return (
        <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleHint}
            disabled={hintsRemaining === 0}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all ${
                hintsRemaining > 0 
                ? 'bg-neutral-50/50 border-black/5 hover:bg-brand-orange hover:text-white hover:border-brand-orange hover:shadow-brand-shadow-orange text-brand-text group' 
                : 'bg-neutral-100 border-neutral-200 text-neutral-400 cursor-not-allowed'
            }`}
        >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm transition-colors ${
                hintsRemaining > 0 ? 'bg-white text-brand-orange group-hover:bg-white/20 group-hover:text-white' : 'bg-neutral-200 text-neutral-400'
            }`}>
                {hintsRemaining}
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                {hintsRemaining > 0 ? 'Use Hint' : 'Depleted'}
            </span>
        </motion.button>
    );
};
