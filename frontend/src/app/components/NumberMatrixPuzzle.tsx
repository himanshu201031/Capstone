import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { finishPuzzle, tickTimer, useHint } from '../store/puzzleSlice';
import { RootState } from '../store';

export const NumberMatrixPuzzle: React.FC = () => {
  const dispatch = useDispatch();
  const puzzle = useSelector((state: RootState) => state.puzzle);
  const totalPoints = useSelector((state: RootState) => state.user.totalPoints);
  
  const [grid, setGrid] = useState<number[][]>([]);
  const [initialGrid, setInitialGrid] = useState<boolean[][]>([]); // true if fixed
  const [solution, setSolution] = useState<number[][]>([]);
  
  const difficultyLevel = Math.min(8, Math.floor(totalPoints / 1500));

  useEffect(() => {
    const seed = new Date(puzzle.date).getDate();
    const sol = [
      [1, 2, 3, 4],
      [3, 4, 1, 2],
      [2, 3, 4, 1],
      [4, 1, 2, 3]
    ];
    
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
    <div className="flex flex-col items-center justify-center min-h-screen pt-16 px-6 relative overflow-hidden bg-neutral-50">
      <div className="max-w-md w-full flex justify-between items-end mb-8 relative z-10">
        <div className="text-left">
          <h3 className="text-3xl font-black uppercase tracking-tighter text-brand-text mb-1">Matrix.</h3>
          <span className="text-xs font-black text-brand-orange uppercase tracking-[0.2em]">Neural Sync Lvl {difficultyLevel + 1}</span>
        </div>
        <div className="text-right">
          <div className="text-4xl font-black tabular-nums tracking-tighter text-brand-text">
            {Math.floor(puzzle.timeElapsed / 60).toString().padStart(2, '0')}:
            {(puzzle.timeElapsed % 60).toString().padStart(2, '0')}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[2.5rem] border border-black/5 shadow-2xl grid grid-cols-4 gap-3 mb-8 relative z-10">
        {grid.map((row, r) => 
          row.map((val, c) => (
            <motion.button
              key={`${r}-${c}`}
              whileHover={!initialGrid[r][c] ? { scale: 1.05, border: '1px solid #FF5C00' } : {}}
              whileTap={!initialGrid[r][c] ? { scale: 0.95 } : {}}
              onClick={() => handleCellClick(r, c)}
              className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-3xl font-black rounded-2xl transition-all relative z-10 ${
                initialGrid[r][c] ? 'bg-neutral-50 text-neutral-300' : 'bg-white border-2 border-brand-blue/10 text-brand-blue shadow-inner'
              } ${val === 0 ? 'text-transparent' : ''}`}
            >
              {val || ""}
            </motion.button>
          ))
        )}
      </div>

      <div className="flex gap-4 relative z-10">
        <button 
            onClick={handleHint}
            disabled={puzzle.hintsRemaining <= 0}
            className="bg-brand-orange text-white px-10 py-4 rounded-xl shadow-brand-shadow-orange font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 disabled:opacity-30 disabled:grayscale transition-all"
        >
            Hint ({puzzle.hintsRemaining})
        </button>
      </div>
    </div>
  );
};
