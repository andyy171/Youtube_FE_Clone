import React from 'react';
import { VideoCard } from '../VideoCard/VideoCard';
import { Video } from '../../types';
import styles from './VideoGrid.module.css';

interface VideoGridProps {
  videos: Video[];
  onVideoClick: (videoId: string) => void;
}

export const VideoGrid: React.FC<VideoGridProps> = ({ videos, onVideoClick }) => {
  // Handle empty videos array
  if (!videos || videos.length === 0) {
    return (
      <div className={styles.videoGrid}>
        <div className={styles.emptyState}>
          <p>No videos found</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.videoGrid}>
      {videos.map((video) => (
        <VideoCard 
          key={video.id} 
          video={video} 
          onClick={onVideoClick}
        />
      ))}
    </div>
  );
};