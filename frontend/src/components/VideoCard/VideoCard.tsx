import React from 'react';
import { Play } from 'lucide-react';
import { Video } from '../../types';
import styles from './VideoCard.module.css';

interface VideoCardProps {
  video: Video;
  onClick: (videoId: string) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  return (
    <div className={styles.videoCard} onClick={() => onClick(video.id)}>
      <div className={styles.thumbnail}>
        <div className={styles.playBtn}>
          <Play size={24} fill="white" />
        </div>
        <div className={styles.duration}>{video.duration}</div>
      </div>
      
      <div className={styles.videoInfo}>
        <h3 className={styles.title}>{video.title}</h3>
        <p className={styles.meta}>{video.views} • {video.uploaded}</p>
        <p className={styles.channel}>{video.channel}</p>
      </div>
    </div>
  );
};