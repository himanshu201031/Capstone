import { useState, useEffect } from 'react';
import axios from 'axios';
import { getUnsyncedScores, markScoreAsSynced } from '../utils/idb';

export const useOffline = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

export const useSync = () => {
  const isOnline = useOffline();

  useEffect(() => {
    const syncData = async () => {
      if (!isOnline) return;

      try {
        const unsyncedScores = await getUnsyncedScores();
        if (unsyncedScores.length === 0) return;

        const token = localStorage.getItem('token') || 'GUEST_TOKEN_123';

        for (const score of unsyncedScores) {
          // Attempt push to backend
          await axios.post('http://localhost:4000/api/sync', {
            userId: score.userId,
            date: score.date,
            score: score.score,
            timeTaken: score.timeTaken,
            streak: score.streak,
            hintsUsed: score.hintsUsed,
            hintsRemaining: score.hintsRemaining
          }, {
              headers: { Authorization: `Bearer ${token}` }
          });
          
          // Only mark synced if the request succeeds
          if (score.id) await markScoreAsSynced(score.id);
        }
        console.log(`Synced ${unsyncedScores.length} pending records.`);
      } catch (err) {
        console.error('Background sync failed: ', err);
      }
    };

    // Run immediately when status changes to online, and every 30s
    syncData();
    const interval = setInterval(syncData, 30000);
    return () => clearInterval(interval);
  }, [isOnline]);

  return isOnline;
};
