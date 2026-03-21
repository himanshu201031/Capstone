import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { finishPuzzle, tickTimer, useHint } from '../store/puzzleSlice';
import { RootState } from '../store';

/**
 * Binary Logic Puzzle
 * Level consists of logic gates (AND, OR, XOR, NOT).
 * Goal: Toggle inputs (0/1) to reach target output (1).
 */

type GateType = 'AND' | 'OR' | 'XOR' | 'NOT';

interface Gate {
    id: string;
    type: GateType;
    inputs: (string | number)[]; // ID of input gate or bit value
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
    
    // Deterministic gate configuration
    const config = [
        { id: 'G1', type: 'AND' as GateType, inputs: [0, 1] },
        { id: 'G2', type: 'OR' as GateType, inputs: [1, 2] },
        { id: 'FINAL', type: 'XOR' as GateType, inputs: ['G1', 'G2'] }
    ];
    
    // Vary based on seed
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
    
    // Find a correct input combination
    // Brute force 3 bits (8 combos)
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
    <div className="flex flex-col items-center justify-center min-h-screen pt-16 px-6 relative overflow-hidden">
      <div className="max-w-md w-full mb-8">
        <h3 className="text-3xl font-black uppercase text-white mb-1">Logic Node.</h3>
        <span className="text-xs font-black text-brand-cyan uppercase tracking-[0.2em]">Quantum Gate Level 0{new Date(puzzle.date).getDate() % 9}</span>
      </div>

      <div className="w-full max-w-sm bg-neutral-900/60 p-8 rounded-3xl border border-white/5 backdrop-blur-3xl shadow-2xl relative mb-12">
        <div className="flex flex-col gap-10">
            {/* Inputs */}
            <div className="flex justify-between px-4">
                {inputs.map((val, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                         <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">In_{i}</span>
                         <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleInput(i)}
                            className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black transition-all ${
                                val === 1 ? 'bg-brand-cyan text-black shadow-lg shadow-brand-cyan/25' : 'bg-neutral-800 text-neutral-500 border border-white/5'
                            }`}
                         >
                             {val}
                         </motion.button>
                    </div>
                ))}
            </div>

            {/* Schematic Flow */}
            <div className="flex flex-col items-center gap-6 py-4">
                <div className="h-4 w-[2px] bg-neutral-800" />
                <div className="px-6 py-3 bg-neutral-800 rounded-lg border border-white/5 font-black text-xs uppercase tracking-widest text-neutral-400">
                    Neural Processing Unit
                </div>
                <div className="h-4 w-[2px] bg-neutral-800" />
            </div>

            {/* Target Output */}
            <div className="flex flex-col items-center gap-3">
                 <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">Output Resonance</span>
                 <div className={`w-20 h-20 rounded-full border-2 flex items-center justify-center text-3xl font-black transition-all duration-700 ${
                     currentOutput === target ? 'bg-brand-yellow/10 border-brand-yellow text-brand-yellow shadow-[0_0_30px_rgba(255,215,0,0.2)] animate-pulse' : 'bg-neutral-900 border-neutral-800 text-neutral-800 grayscale'
                 }`}>
                     {currentOutput}
                 </div>
                 <span className="text-[10px] font-black uppercase text-brand-yellow tracking-[0.3em]">Requirement: {target}</span>
            </div>
        </div>
      </div>

      <button 
          onClick={handleHint}
          disabled={puzzle.hintsRemaining <= 0}
          className="bg-neutral-900 px-8 py-3 rounded-xl border border-white/5 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-white transition-all disabled:opacity-30"
      >
          Recursive Hack ({puzzle.hintsRemaining})
      </button>
    </div>
  );
};
