import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { finishPuzzle, tickTimer, useHint } from '../store/puzzleSlice';
import { RootState } from '../store';

/**
 * Number Matrix (Sudoku-lite)
 * 4x4 Grid where each row and column must contain digits 1-4 exactly once.
 * Difficulty scales with user totalPoints.
 */

export const NumberMatrixPuzzle: React.FC = () => {
  const dispatch = useDispatch();
  const puzzle = useSelector((state: RootState) => state.puzzle);
  const totalPoints = useSelector((state: RootState) => state.user.totalPoints);
  
  const [grid, setGrid] = useState<number[][]>([]);
  const [initialGrid, setInitialGrid] = useState<boolean[][]>([]); // true if fixed
  const [solution, setSolution] = useState<number[][]>([]);
  
  // Levels auto-adjust based on performance (totalPoints)
  const difficultyLevel = Math.min(8, Math.floor(totalPoints / 1500));

  useEffect(() => {
    // Generate a deterministic 4x4 Latin Square based on date seed
    const seed = new Date(puzzle.date).getDate();
    
    // Simple shift-based Latin Square generation
    const sol = [
      [1, 2, 3, 4],
      [3, 4, 1, 2],
      [2, 3, 4, 1],
      [4, 1, 2, 3]
    ];
    
    // Shuffle logic
    const shuffle = (arr: any[], s: number) => {
        const result = [...arr];
        for (let i = result.length - 1; i > 0; i--) {
            const j = (s + i * 17) % (i + 1);
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    };

    const rowOrder = shuffle([0, 1, 2, 3], seed);
    const colOrder = shuffle([0, 1, 2, 3], seed + 1);
    
    const shuffledSol = rowOrder.map(r => colOrder.map(c => sol[r][c]));
    setSolution(shuffledSol);

    // Progressive hiding based on difficultyLevel
    // Higher level = more cells hidden
    const threshold = 4 + (difficultyLevel / 2);

    const pGrid = shuffledSol.map((row, r) => 
        row.map((val, c) => {
            const valSeed = (seed + r * 7 + c * 13) % 10;
            const hide = valSeed < threshold;
            return hide ? 0 : val;
        })
    );
    setGrid(pGrid);
    setInitialGrid(pGrid.map(row => row.map(val => val !== 0)));
  }, [puzzle.date, difficultyLevel]);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(tickTimer());
    }, 1000);
    return () => clearInterval(timer);
  }, [dispatch]);

  const handleCellClick = (r: number, c: number) => {
    if (initialGrid[r][c]) return;
    
    const newGrid = grid.map(row => [...row]);
    newGrid[r][c] = (newGrid[r][c] % 4) + 1;
    setGrid(newGrid);

    // Validation
    if (JSON.stringify(newGrid) === JSON.stringify(solution)) {
        setTimeout(() => dispatch(finishPuzzle()), 500);
    }
  };

  const handleHint = () => {
    if (puzzle.hintsRemaining <= 0) return;
    
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (grid[r][c] !== solution[r][c]) {
                const newGrid = grid.map(row => [...row]);
                newGrid[r][c] = solution[r][c];
                setGrid(newGrid);
                dispatch(useHint());
                
                if (JSON.stringify(newGrid) === JSON.stringify(solution)) {
                    setTimeout(() => dispatch(finishPuzzle()), 500);
                }
                return;
            }
        }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-16 px-6 relative overflow-hidden">
      <div className="max-w-md w-full flex justify-between items-end mb-8">
        <div className="text-left">
          <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-1">Matrix.</h3>
          <span className="text-xs font-black text-brand-yellow uppercase tracking-[0.2em]">Neural Sync Lvl {difficultyLevel + 1}</span>
        </div>
        <div className="text-right">
          <div className="text-4xl font-black tabular-nums tracking-tighter">
            {Math.floor(puzzle.timeElapsed / 60).toString().padStart(2, '0')}:
            {(puzzle.timeElapsed % 60).toString().padStart(2, '0')}
          </div>
        </div>
      </div>

      <div className="bg-neutral-900/60 p-4 rounded-3xl border border-white/5 backdrop-blur-2xl shadow-2xl grid grid-cols-4 gap-2 mb-8 relative">
          {/* Difficulty Indicator glow */}
          <div className={`absolute inset-0 rounded-3xl opacity-10 blur-2xl transition-all duration-1000 bg-brand-lavender`} />
        
        {grid.map((row, r) => 
          row.map((val, c) => (
            <motion.button
              key={`${r}-${c}`}
              whileHover={!initialGrid[r][c] ? { scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' } : {}}
              whileTap={!initialGrid[r][c] ? { scale: 0.95 } : {}}
              onClick={() => handleCellClick(r, c)}
              className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-2xl font-black rounded-xl transition-all relative z-10 ${
                initialGrid[r][c] ? 'bg-neutral-800 text-neutral-500' : 'bg-neutral-900 border border-white/10 text-brand-lavender'
              } ${val === 0 ? 'text-transparent' : ''}`}
            >
              {val || ""}
            </motion.button>
          ))
        )}
      </div>

      <div className="flex gap-4">
        <button 
            onClick={handleHint}
            disabled={puzzle.hintsRemaining <= 0}
            className="bg-neutral-900/80 px-8 py-3 rounded-2xl border border-white/10 text-white font-black uppercase tracking-widest text-xs hover:bg-neutral-800 disabled:opacity-30 transition-all"
        >
            Hint ({puzzle.hintsRemaining})
        </button>
      </div>
    </div>
  );
};
