import { useState, useEffect } from 'react';
import { Stats } from '../types';

export const useStats = (): Stats => {
  const [stats, setStats] = useState<Stats>({
    totalVideos: 6,
    totalViews: '156K',
    activeUsers: '2.3K',
    hoursWatched: '45K',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prevStats) => {
        const viewsNum = parseInt(prevStats.totalViews.replace('K', '')) * 1000;
        const newViews = viewsNum + Math.floor(Math.random() * 10) + 1;
        
        const usersNum = parseFloat(prevStats.activeUsers.replace('K', '')) * 1000;
        const newUsers = usersNum + Math.floor(Math.random() * 5) - 2;

        return {
          ...prevStats,
          totalViews: `${Math.floor(newViews / 1000)}K`,
          activeUsers: `${(Math.max(newUsers, 1000) / 1000).toFixed(1)}K`,
        };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return stats;
};