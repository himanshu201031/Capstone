import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { tickTimer } from '../store/puzzleSlice';
import { addScore } from '../store/puzzleSlice';
import { finishPuzzle } from '../store/puzzleSlice';
import { RootState } from '../store';

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
        isCorrect = 
            selection.Alex.location === 'Park' && selection.Alex.hobby === 'Chess' &&
            selection.Blake.location === 'Office' &&
            selection.Casey.location === 'Lobby';
    } else {
        isCorrect = 
            selection.Casey.hobby === 'Yoga' &&
            selection.Alex.location === 'Park' &&
            ((selection.Blake.location === 'Lobby' && selection.Blake.hobby === 'Coding') || (selection.Casey.location === 'Lobby' && selection.Casey.hobby === 'Coding'));
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
    setTimeout(validate, 100);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-12 px-6 no-scrollbar selection:bg-brand-orange/20 bg-neutral-50 font-sans">
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-end justify-between mb-12 gap-8">
        <div>
            <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-3">Logical<br/>Deduction<span className="text-brand-orange">.</span></h3>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-text/30">Relational Matrix Sequence Enabled</p>
        </div>
        <div className="bg-white px-8 py-5 rounded-2xl border border-black/5 shadow-xl">
             <span className="text-[10px] font-black uppercase text-brand-text/30 tracking-[0.2em] block mb-1">Cycle Timer</span>
             <span className="text-2xl font-black tabular-nums tracking-tighter text-brand-orange">{Math.floor(puzzle.timer / 60)}:{(puzzle.timer % 60).toString().padStart(2, '0')}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl relative z-10">
        <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white p-10 rounded-[3rem] border border-black/5 shadow-22xl shadow-black/5 h-fit relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 blur-3xl rounded-full" />
            <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-text/20 mb-10 border-b border-black/5 pb-4">Decryption Indices</h4>
            <div className="space-y-8">
                {clues.map((clue, i) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i} 
                        className="flex gap-6 items-start group"
                    >
                        <div className="w-10 h-10 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center text-xs font-black border border-brand-orange/10 group-hover:scale-110 group-hover:bg-brand-orange group-hover:text-white transition-all shadow-lg">
                            {i+1}
                        </div>
                        <p className="text-lg font-bold leading-tight text-brand-text opacity-70 group-hover:opacity-100 transition-opacity">{clue}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>

        <div className="space-y-4">
            {people.map((person, i) => (
                <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.15 }}
                    key={person} 
                    className="bg-white border border-black/5 p-8 rounded-[2.5rem] flex flex-col gap-6 shadow-xl hover:shadow-2xl transition-all group"
                >
                    <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center font-black text-brand-blue text-xs group-hover:bg-brand-blue group-hover:text-white transition-all">{person.charAt(0)}</div>
                         <span className="font-black text-xl tracking-tighter uppercase">{person}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                             <label className="text-[8px] font-black text-brand-text/30 uppercase tracking-widest ml-1">Spatial Node</label>
                             <select 
                                value={selection[person].location} 
                                onChange={(e) => updateSelection(person, 'location', e.target.value)}
                                className="w-full bg-neutral-50 border border-black/5 rounded-xl px-4 py-3.5 text-xs font-bold text-brand-text focus:outline-none focus:border-brand-orange transition-all appearance-none cursor-pointer hover:bg-neutral-100 shadow-inner"
                            >
                                <option value="">Select Location</option>
                                {locations.map(l => <option key={l} value={l}>{l}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                             <label className="text-[8px] font-black text-brand-text/30 uppercase tracking-widest ml-1">Activity Node</label>
                             <select 
                                value={selection[person].hobby} 
                                onChange={(e) => updateSelection(person, 'hobby', e.target.value)}
                                className="w-full bg-neutral-50 border border-black/5 rounded-xl px-4 py-3.5 text-xs font-bold text-brand-text focus:outline-none focus:border-brand-orange transition-all appearance-none cursor-pointer hover:bg-neutral-100 shadow-inner"
                            >
                                <option value="">Select Hobby</option>
                                {hobbies.map(h => <option key={h} value={h}>{h}</option>)}
                            </select>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>

      <div className="mt-20 opacity-20 text-[10px] font-black uppercase tracking-[0.5em] text-brand-text animate-pulse relative z-10">
          Syncing Deductive Mesh...
      </div>
      
      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none opacity-40 overflow-hidden">
          <div className="absolute top-[20%] right-[-5%] w-64 h-64 bg-brand-orange/5 blur-[100px] rounded-full" />
          <div className="absolute bottom-[20%] left-[-5%] w-64 h-64 bg-brand-blue/5 blur-[100px] rounded-full" />
      </div>
    </div>
  );
};
