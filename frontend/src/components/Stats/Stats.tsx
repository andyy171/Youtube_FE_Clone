import React from 'react';
import { useStats } from '../../hooks/useStats';
import styles from './Stats.module.css';

export const Stats: React.FC = () => {
  const stats = useStats();

  return (
    <div className={styles.stats}>
      <h2>Platform Statistics</h2>
      <div className={styles.statsGrid}>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>{stats.totalVideos}</div>
          <div className={styles.statLabel}>Total Videos</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>{stats.totalViews}</div>
          <div className={styles.statLabel}>Total Views</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>{stats.activeUsers}</div>
          <div className={styles.statLabel}>Active Users</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>{stats.hoursWatched}</div>
          <div className={styles.statLabel}>Hours Watched</div>
        </div>
      </div>
    </div>
  );
};