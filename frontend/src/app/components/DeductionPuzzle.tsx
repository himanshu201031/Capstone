import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { finishPuzzle, tickTimer, useHint } from '../store/puzzleSlice';
import { RootState } from '../store';

/**
 * Deduction Grid Puzzle (Simplified Einstein's Riddle)
 * Match 3 people to 3 locations and 3 hobbies.
 */

interface Clue {
    text: string;
    target: { type: 'person' | 'location' | 'hobby', value: string };
    relation: string;
}

export const DeductionPuzzle: React.FC = () => {
  const dispatch = useDispatch();
  const puzzle = useSelector((state: RootState) => state.puzzle);
  
  const people = ['Alex', 'Blake', 'Casey'];
  const locations = ['Park', 'Lobby', 'Office'];
  const hobbies = ['Yoga', 'Chess', 'Coding'];

  const [selection, setSelection] = useState<Record<string, { location: string, hobby: string }>>({
    Alex: { location: '', hobby: '' },
    Blake: { location: '', hobby: '' },
    Casey: { location: '', hobby: '' }
  });

  const [clues, setClues] = useState<string[]>([]);

  useEffect(() => {
    const seed = new Date(puzzle.date).getDate();
    // Deterministic clues
    if (seed % 2 === 0) {
        setClues([
            "Blake is in the Office.",
            "Alex likes Chess but isn't in the Lobby.",
            "Casey is not in the Park."
        ]);
    } else {
        setClues([
            "Casey loves Yoga.",
            "The person in the Lobby likes Coding.",
            "Alex is in the Park."
        ]);
    }
  }, [puzzle.date]);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(tickTimer());
    }, 1000);
    return () => clearInterval(timer);
  }, [dispatch]);

  const validate = () => {
    const seed = new Date(puzzle.date).getDate();
    let isCorrect = false;

    if (seed % 2 === 0) {
        // Solution for Seed Evens:
        // Alex: Lobby? No, "Alex isn't in the Lobby". Blake is in Office. Alex must be in Park.
        // Casey must be in Lobby.
        // Alex Chess.
        // Blake Yoga/Coding? 
        isCorrect = 
            selection.Alex.location === 'Park' && selection.Alex.hobby === 'Chess' &&
            selection.Blake.location === 'Office' &&
            selection.Casey.location === 'Lobby';
    } else {
        isCorrect = 
            selection.Casey.hobby === 'Yoga' &&
            selection.Alex.location === 'Park' &&
            (selection.Blake.location === 'Lobby' && selection.Blake.hobby === 'Coding' || selection.Casey.location === 'Lobby' && selection.Casey.hobby === 'Coding');
    }

    if (isCorrect) {
        setTimeout(() => dispatch(finishPuzzle()), 500);
    }
  };

  const updateSelection = (person: string, field: 'location' | 'hobby', value: string) => {
    setSelection(prev => ({
        ...prev,
        [person]: { ...prev[person], [field]: value }
    }));
    // After selection, validate (debounced or simple)
    setTimeout(validate, 100);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-16 px-6 relative overflow-hidden">
      <div className="max-w-xl w-full mb-8">
        <h3 className="text-3xl font-black uppercase text-white mb-1">Deduction.</h3>
        <span className="text-xs font-black text-brand-lavender uppercase tracking-[0.2em]">Logic Nexus Cycle-X</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Clues Panel */}
        <div className="bg-neutral-900/60 p-6 rounded-3xl border border-white/5 backdrop-blur-3xl shadow-2xl h-fit">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-6">Analytic Clues</h4>
            <div className="space-y-4">
                {clues.map((clue, i) => (
                    <div key={i} className="flex gap-4 items-start">
                        <div className="w-6 h-6 rounded-full bg-brand-lavender/10 text-brand-lavender flex items-center justify-center text-[10px] font-black border border-brand-lavender/20">
                            {i+1}
                        </div>
                        <p className="text-sm font-medium leading-relaxed opacity-80">{clue}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Selection Grid */}
        <div className="space-y-4">
            {people.map(person => (
                <div key={person} className="bg-neutral-900 border border-white/5 p-5 rounded-2xl flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-brand-lavender shadow-[0_0_10px_brand-lavender]" />
                         <span className="font-black text-sm uppercase tracking-tighter">{person}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                        <select 
                            value={selection[person].location} 
                            onChange={(e) => updateSelection(person, 'location', e.target.value)}
                            className="bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-xs font-bold text-white/60 focus:outline-none focus:border-brand-lavender transition-all"
                        >
                            <option value="">Location</option>
                            {locations.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                        <select 
                            value={selection[person].hobby} 
                            onChange={(e) => updateSelection(person, 'hobby', e.target.value)}
                            className="bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-xs font-bold text-white/60 focus:outline-none focus:border-brand-lavender transition-all"
                        >
                            <option value="">Hobby</option>
                            {hobbies.map(h => <option key={h} value={h}>{h}</option>)}
                        </select>
                    </div>
                </div>
            ))}
        </div>
      </div>

      <div className="mt-12 opacity-30 text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500 animate-pulse">
          Analyzing Selection...
      </div>
    </div>
  );
};
