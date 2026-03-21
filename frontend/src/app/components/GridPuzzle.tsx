import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { finishPuzzle, tickTimer } from '../store/puzzleSlice';
import { RootState } from '../store';

const GLYPHS = ['Δ', 'Φ', 'Ω', 'Ψ', 'Σ', 'Π', 'Ξ', 'Λ'];

export const GridPuzzle: React.FC = () => {
  const dispatch = useDispatch();
  const puzzle = useSelector((state: RootState) => state.puzzle);
  
  const [cards, setCards] = useState<{emoji: string, id: number, isFlipped: boolean, isMatched: boolean}[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  // Initialize board from seed
  useEffect(() => {
    const seed = new Date(puzzle.date).getDate();
    // Deterministic shuffle logic
    const baseSet = [...GLYPHS, ...GLYPHS];
    const shuffled = baseSet
        .map((emoji, i) => ({ emoji, id: i, isFlipped: false, isMatched: false, sort: (seed + i * 13) % 17 }))
        .sort((a, b) => a.sort - b.sort);

    setCards(shuffled);
  }, [puzzle.date]);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(tickTimer());
    }, 1000);
    return () => clearInterval(timer);
  }, [dispatch]);

  const handleFlip = (index: number) => {
    if (cards[index].isFlipped || cards[index].isMatched || flippedIndices.length === 2) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;

      if (cards[first].emoji === cards[second].emoji) {
        // Match!
        setTimeout(() => {
            const matchedCards = [...cards];
            matchedCards[first].isMatched = true;
            matchedCards[second].isMatched = true;
            setCards(matchedCards);
            setFlippedIndices([]);
            
            // Check win
            if (matchedCards.every(c => c.isMatched)) {
                setTimeout(() => dispatch(finishPuzzle()), 500);
            }
        }, 500);
      } else {
        // No match - Flip back
        setTimeout(() => {
            const resetCards = [...cards];
            resetCards[first].isFlipped = false;
            resetCards[second].isFlipped = false;
            setCards(resetCards);
            setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = (cards.filter(c => c.isMatched).length / 16) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-16 px-6 md:px-12 select-none no-scrollbar relative overflow-hidden">
      {/* Immersive Holographic Background Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(193,153,255,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-3xl w-full flex flex-col md:flex-row items-center justify-between mb-8 gap-8 relative z-10">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-tight mb-2">Grid Matrix.</h3>
            <div className="flex items-center gap-2">
                <span className="text-brand-yellow font-black text-xs uppercase tracking-widest mb-1">Matrix Level 0{new Date(puzzle.date).getDate() % 9}</span>
                <div className="h-[1px] w-8 bg-neutral-800 rounded-full" />
            </div>
        </div>

        <div className="flex flex-col items-center md:items-end">
            <span className="text-4xl md:text-[4rem] font-black tabular-nums tracking-tighter leading-none">{formatTime(puzzle.timeElapsed)}</span>
            <div className="w-[120px] h-1.5 bg-neutral-900 border border-white/5 rounded-full mt-3 overflow-hidden relative shadow-inner">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="bg-brand-lavender h-full shadow-lg shadow-brand-lavender/40"
                />
                <div className="absolute right-1 top-0 text-xs font-black leading-none h-full flex items-center text-white/40">{progress.toFixed(0)}%</div>
            </div>
        </div>
      </div>

      <div className="max-w-md md:max-w-xl w-full grid grid-cols-4 gap-3 md:gap-4 bg-neutral-900/60 p-4 md:p-6 rounded-3xl border border-white/5 backdrop-blur-3xl shadow-xl relative z-10 group overflow-hidden">
         {/* Subtle Hover Glow */}
        <div className="absolute inset-0 bg-brand-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none blur-3xl" />
        
        {cards.map((card, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05, rotate: card.isMatched ? 0 : 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleFlip(i)}
            className={`aspect-square flex items-center justify-center text-2xl md:text-3xl transition-all duration-700 overflow-hidden relative ${
                card.isMatched ? 'bg-brand-yellow opacity-100 scale-95 shadow-lg rounded-xl' : 
                card.isFlipped ? 'bg-brand-lavender rounded-xl' : 'bg-neutral-800 border border-white/5 rounded-lg hover:bg-neutral-700 active:bg-brand-lavender/40 shadow-inner'
            }`}
          >
            {(card.isFlipped || card.isMatched) && (
                <motion.span 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={card.isMatched ? 'filter-none drop-shadow-lg' : 'grayscale-0'}
                >
                    {card.emoji}
                </motion.span>
            )}
            {!card.isMatched && !card.isFlipped && (
                <div className="w-2 h-2 rounded-full bg-neutral-700 opacity-20 border border-white/10" />
            )}
          </motion.button>
        ))}
      </div>

      <div className="mt-8 flex gap-4 relative z-10">
          <div className="bg-neutral-900/80 px-6 py-4 rounded-xl border border-white/5 flex flex-col items-center min-w-[110px] shadow-lg backdrop-blur-3xl">
              <span className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-2">Moves</span>
              <span className="text-xl md:text-2xl font-black tabular-nums tracking-tighter">{moves}</span>
          </div>
          <div className="bg-neutral-900/80 px-6 py-4 rounded-xl border border-white/5 flex flex-col items-center min-w-[110px] shadow-lg backdrop-blur-3xl">
              <span className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-2">Rate</span>
              <span className="text-xl md:text-2xl font-black tabular-nums tracking-tighter text-brand-yellow">
                  {moves > 0 ? (Math.max(0, 100 - (moves - 8) * 10)).toFixed(0) : '100'}%
              </span>
          </div>
      </div>
    </div>
  );
};
