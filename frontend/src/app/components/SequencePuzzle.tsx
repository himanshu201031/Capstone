import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { finishPuzzle, tickTimer } from '../store/puzzleSlice';
import { RootState } from '../store';

const COLORS = ['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500'];

export const SequencePuzzle: React.FC = () => {
  const dispatch = useDispatch();
  const puzzle = useSelector((state: RootState) => state.puzzle);
  
  const [sequence, setSequence] = useState<number[]>([]);
  const [userInput, setUserInput] = useState<number[]>([]);
  const [isPlayingSeq, setIsPlayingSeq] = useState(true);
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [round, setRound] = useState(1);
  const targetRounds = 5;

  // Generate sequence based on date seed (Mock)
  useEffect(() => {
    const seed = new Date(puzzle.date).getDate();
    const newSeq = Array.from({length: targetRounds}, (_, i) => (seed + i * 7) % 4);
    setSequence(newSeq);
  }, [puzzle.date]);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(tickTimer());
    }, 1000);
    return () => clearInterval(timer);
  }, [dispatch]);

  // Playback effect
  useEffect(() => {
    if (isPlayingSeq && sequence.length > 0) {
      let i = 0;
      const interval = setInterval(() => {
        setActiveButton(sequence[i]);
        setTimeout(() => setActiveButton(null), 600);
        i++;
        if (i >= round) {
          clearInterval(interval);
          setTimeout(() => setIsPlayingSeq(false), 800);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlayingSeq, sequence, round]);

  const handleInput = (index: number) => {
    if (isPlayingSeq) return;

    setActiveButton(index);
    setTimeout(() => setActiveButton(null), 200);

    const newInput = [...userInput, index];
    setUserInput(newInput);

    // Validate
    if (newInput[newInput.length - 1] !== sequence[newInput.length - 1]) {
      // Failed round - reset input
      setUserInput([]);
      setIsPlayingSeq(true);
      return;
    }

    if (newInput.length === round) {
      if (round === targetRounds) {
        setTimeout(() => dispatch(finishPuzzle()), 500);
      } else {
        setRound(r => r + 1);
        setUserInput([]);
        setTimeout(() => setIsPlayingSeq(true), 1000);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen pt-20 px-4"
    >
      <div className="w-full max-w-sm bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl text-center">
        <h3 className="text-xl font-bold mb-2">Memory Sequence</h3>
        <p className="text-sm text-neutral-400 mb-8">Round {round} of {targetRounds}</p>

        <div className="grid grid-cols-2 gap-4 p-4">
          {COLORS.map((color, idx) => (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleInput(idx)}
              className={`aspect-square rounded-2xl border-4 border-black/20 shadow-lg transition-all duration-300 ${
                activeButton === idx ? `${color} scale-105 shadow-${color.split('-')[1]}-500/50` : 'bg-neutral-800'
              }`}
            />
          ))}
        </div>
        
        <div className="mt-8 text-xs font-mono text-neutral-500">
           {isPlayingSeq ? "WATCH CAREFULLY..." : "YOUR TURN!"}
        </div>
      </div>
    </motion.div>
  );
};
