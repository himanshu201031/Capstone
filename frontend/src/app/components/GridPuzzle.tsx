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
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);

  useEffect(() => {
    const seed = new Date(puzzle.date).getDate();
    const baseSet = [...GLYPHS, ...GLYPHS];
    const shuffled = baseSet
        .map((emoji, i) => ({ emoji, id: i, isFlipped: false, isMatched: false, sort: (seed + i * 13) % 17 }))
        .sort((a, b) => a.sort - b.sort);

    setCards(shuffled);
  }, [puzzle.date]);

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
        // MATCH FOUND
        setCombo(c => {
            const next = c + 1;
            if (next > maxCombo) setMaxCombo(next);
            return next;
        });
        
        setTimeout(() => {
            const matchedCards = [...cards];
            matchedCards[first].isMatched = true;
            matchedCards[second].isMatched = true;
            setCards(matchedCards);
            setFlippedIndices([]);
            
            if (matchedCards.every(c => c.isMatched)) {
                setTimeout(() => dispatch(finishPuzzle()), 500);
            }
        }, 500);
      } else {
        // MISS
        setCombo(0);
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
    <div className="flex flex-col items-center justify-center min-h-screen pt-16 px-6 md:px-12 select-none no-scrollbar relative overflow-hidden bg-neutral-50 font-sans">
      
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-end justify-between mb-12 gap-8 relative z-10 px-4">
        <div>
            <h3 className="text-4xl md:text-6xl font-black text-brand-text uppercase tracking-tighter leading-tight mb-2 italic">Grid<br/>Matrix<span className="text-brand-orange">.</span></h3>
            <div className="flex items-center gap-3">
                <span className="text-brand-orange font-black text-[10px] uppercase tracking-[0.4em]">Spatial Sync Node Alpha-7</span>
            </div>
        </div>

        <div className="flex flex-col items-center md:items-end">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-2 opacity-30">Synaptic Velocity</span>
            <span className="text-5xl font-black tabular-nums tracking-tighter leading-none text-brand-text">{formatTime(puzzle.timer)}</span>
        </div>
      </div>

      <div className="relative">
          {/* Combo Indicator Popup */}
          <AnimatePresence>
              {combo > 1 && (
                  <motion.div 
                    initial={{ scale: 0, x: -50, rotate: -20 }}
                    animate={{ scale: 1, x: 0, rotate: 12 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute top-[-40px] right-[-20px] bg-brand-orange text-white px-6 py-2 rounded-2xl font-black italic shadow-brand-shadow-orange z-50 text-xl"
                  >
                      {combo}X COMBO!
                  </motion.div>
              )}
          </AnimatePresence>

          <div className="max-w-md md:max-w-lg w-full grid grid-cols-4 gap-4 bg-white p-6 rounded-[3.5rem] border border-black/5 shadow-2xl relative z-10 group">
            {cards.map((card, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleFlip(i)}
                className={`aspect-square flex items-center justify-center text-3x transition-all duration-700 relative overflow-hidden ${
                    card.isMatched ? 'bg-brand-orange text-white shadow-brand-shadow-orange rounded-[1.5rem] border-transparent' : 
                    card.isFlipped ? 'bg-brand-blue/5 text-brand-blue rounded-[1.5rem] border border-brand-blue/30' : 'bg-neutral-50 border border-black/5 rounded-[1.5rem] hover:bg-white shadow-inner'
                }`}
              >
                {(card.isFlipped || card.isMatched) && (
                    <motion.span 
                        initial={{ rotateY: 180, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        className="font-black text-3xl"
                    >
                        {card.emoji}
                    </motion.span>
                )}
                {!card.isMatched && !card.isFlipped && (
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-text/10" />
                )}
              </motion.button>
            ))}
          </div>
      </div>

      <div className="mt-12 flex gap-4 relative z-10 flex-wrap justify-center">
          <div className="bg-white px-8 py-5 rounded-[2rem] border border-black/5 flex flex-col items-center min-w-[140px] shadow-xl">
              <span className="text-[9px] font-black text-brand-text/20 uppercase tracking-[0.3em] mb-2">Sync Moves</span>
              <span className="text-3xl font-black tabular-nums tracking-tighter text-brand-text">{moves}</span>
          </div>
          <div className="bg-white px-8 py-5 rounded-[2rem] border border-black/5 flex flex-col items-center min-w-[140px] shadow-xl">
              <span className="text-[9px] font-black text-brand-text/20 uppercase tracking-[0.3em] mb-2">Peak Chain</span>
              <span className="text-3xl font-black tabular-nums tracking-tighter text-brand-orange">{maxCombo}X</span>
          </div>
          <div className="bg-white px-8 py-5 rounded-[2rem] border border-black/5 flex flex-col items-center min-w-[140px] shadow-xl">
              <span className="text-[9px] font-black text-brand-text/20 uppercase tracking-[0.3em] mb-2">Completion</span>
              <span className="text-3xl font-black tabular-nums tracking-tighter text-brand-blue">{progress.toFixed(0)}%</span>
          </div>
      </div>
      
      {/* Background Ornaments */}
      <div className="fixed inset-0 pointer-events-none opacity-40 overflow-hidden">
          <div className="absolute top-[10%] left-[-2%] w-64 h-64 bg-brand-orange/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-2%] w-64 h-64 bg-brand-blue/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
};
