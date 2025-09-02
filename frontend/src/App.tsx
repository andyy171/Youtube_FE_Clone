import React, { useState } from 'react';
import { Header } from './components/Header/Header';
import { VideoGrid } from './components/VideoGrid/VideoGrid';
import { Stats } from './components/Stats/Stats';
import { mockVideos } from './data/mockData';
import { Video } from './types';
import './styles/globals.css'; 

function App() {
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>(mockVideos);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredVideos(videos);
      return;
    }

    const filtered = videos.filter(
      (video) =>
        video.title.toLowerCase().includes(query.toLowerCase()) ||
        video.channel.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredVideos(filtered);
  };

  const handleVideoClick = (videoId: string) => {
    console.log(`Playing video ${videoId}`);
    alert(`Playing video ${videoId} - DevTube Player (Demo)`);
  };

  return (
    <div className="App">
      <Header onSearch={handleSearch} />
      <main className="main-container">
        <Stats />
        <VideoGrid videos={filteredVideos} onVideoClick={handleVideoClick} />
      </main>
    </div>
  );
}

export default App;