import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { finishPuzzle, tickTimer, useHint } from '../store/puzzleSlice';
import { RootState } from '../store';

type GateType = 'AND' | 'OR' | 'XOR' | 'NOT';

interface Gate {
    id: string;
    type: GateType;
    inputs: (string | number)[];
    output: number;
}

export const BinaryLogicPuzzle: React.FC = () => {
  const dispatch = useDispatch();
  const puzzle = useSelector((state: RootState) => state.puzzle);
  
  const [inputs, setInputs] = useState<number[]>([0, 0, 0]);
  const [target, setTarget] = useState(1);
  const [gates, setGates] = useState<Gate[]>([]);
  
  useEffect(() => {
    const seed = new Date(puzzle.date).getDate();
    const config = [
        { id: 'G1', type: 'AND' as GateType, inputs: [0, 1] },
        { id: 'G2', type: 'OR' as GateType, inputs: [1, 2] },
        { id: 'FINAL', type: 'XOR' as GateType, inputs: ['G1', 'G2'] }
    ];
    
    if (seed % 3 === 1) {
        config[0].type = 'OR';
        config[1].type = 'AND';
        config[2].type = 'AND';
    } else if (seed % 3 === 2) {
        config[2].type = 'OR';
    }

    setGates(config.map(g => ({ ...g, output: 0 })));
  }, [puzzle.date]);

  const evalGate = (type: GateType, vals: number[]) => {
    switch (type) {
        case 'AND': return vals.every(v => v === 1) ? 1 : 0;
        case 'OR': return vals.some(v => v === 1) ? 1 : 0;
        case 'XOR': return (vals[0] !== vals[1]) ? 1 : 0;
        case 'NOT': return vals[0] === 0 ? 1 : 0;
        default: return 0;
    }
  };

  const currentOutput = React.useMemo(() => {
    const outputs: Record<string, number> = {};
    gates.forEach(g => {
        const inputVals = g.inputs.map(inp => typeof inp === 'number' ? inputs[inp] : outputs[inp]);
        outputs[g.id] = evalGate(g.type, inputVals);
    });
    return outputs['FINAL'] || 0;
  }, [inputs, gates]);

  useEffect(() => {
    if (currentOutput === target) {
        setTimeout(() => dispatch(finishPuzzle()), 500);
    }
  }, [currentOutput, target, dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(tickTimer());
    }, 1000);
    return () => clearInterval(timer);
  }, [dispatch]);

  const toggleInput = (idx: number) => {
    const newInputs = [...inputs];
    newInputs[idx] = newInputs[idx] === 1 ? 0 : 1;
    setInputs(newInputs);
  };

  const handleHint = () => {
    if (puzzle.hintsRemaining <= 0) return;
    dispatch(useHint());
    for (let i = 0; i < 8; i++) {
        const testInputs = [i & 1, (i >> 1) & 1, (i >> 2) & 1];
        const outputs: Record<string, number> = {};
        gates.forEach(g => {
            const inputVals = g.inputs.map(inp => typeof inp === 'number' ? testInputs[inp] : outputs[inp]);
            outputs[g.id] = evalGate(g.type, inputVals);
        });
        if (outputs['FINAL'] === target) {
            setInputs(testInputs);
            return;
        }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-16 px-6 relative overflow-hidden bg-neutral-50">
      <div className="max-w-md w-full mb-8 relative z-10 text-center md:text-left font-black tracking-tighter">
        <h3 className="text-3xl uppercase text-brand-text mb-1">Logic.</h3>
        <span className="text-xs font-black text-brand-blue uppercase tracking-[0.2em]">Quantum Gate Level 0{new Date(puzzle.date).getDate() % 9}</span>
      </div>

      <div className="w-full max-w-sm bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-2xl relative mb-12 z-10">
        <div className="flex flex-col gap-10">
            {/* Inputs */}
            <div className="flex justify-between px-4">
                {inputs.map((val, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                         <span className="text-[10px] font-black text-brand-text/30 uppercase tracking-widest leading-none mb-1">In_{i}</span>
                         <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleInput(i)}
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black transition-all ${
                                val === 1 ? 'bg-brand-blue text-white shadow-brand-shadow-blue' : 'bg-neutral-50 text-neutral-300 border border-black/5'
                            }`}
                         >
                             {val}
                         </motion.button>
                    </div>
                ))}
            </div>

            {/* Schematic Flow */}
            <div className="flex flex-col items-center gap-4 py-2">
                <div className="h-6 w-[2px] bg-brand-text/10 rounded-full" />
                <div className="px-6 py-3 bg-neutral-50 rounded-2xl border border-black/5 font-black text-[10px] uppercase tracking-widest text-brand-text/40 shadow-inner">
                    Logic Gate Processing
                </div>
                <div className="h-6 w-[2px] bg-brand-text/10 rounded-full" />
            </div>

            {/* Target Output */}
            <div className="flex flex-col items-center gap-3">
                 <span className="text-[10px] font-black text-brand-text/30 uppercase tracking-widest leading-none mb-1">Output State</span>
                 <div className={`w-[120px] h-[120px] rounded-[3rem] border-4 flex flex-col items-center justify-center transition-all duration-700 ${
                     currentOutput === target ? 'bg-brand-orange/5 border-brand-orange text-brand-orange shadow-brand-shadow-orange animate-pulse' : 'bg-neutral-50 border-neutral-100 text-neutral-200 grayscale shadow-inner'
                 }`}>
                     <span className="text-5xl font-black tabular-nums tracking-tighter leading-none mb-1">{currentOutput}</span>
                     <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Resolved</span>
                 </div>
                 <span className="text-[10px] font-black uppercase text-brand-orange tracking-[0.3em] mt-2">Target Requirement: {target}</span>
            </div>
        </div>
      </div>

      <button 
          onClick={handleHint}
          disabled={puzzle.hintsRemaining <= 0}
          className="bg-brand-orange text-white px-10 py-4 rounded-xl shadow-brand-shadow-orange font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 disabled:opacity-30 disabled:grayscale transition-all relative z-10"
      >
          Recursive Hack ({puzzle.hintsRemaining})
      </button>
    </div>
  );
};
