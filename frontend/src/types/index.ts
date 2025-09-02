export interface Video {
  id: string;
  title: string;
  channel: string;
  views: string;
  uploaded: string;
  duration: string;
  thumbnail?: string;
}

export interface Stats {
  totalVideos: number;
  totalViews: string;
  activeUsers: string;
  hoursWatched: string;
}