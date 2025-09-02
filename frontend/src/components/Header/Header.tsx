import React, { useState } from 'react';
import { Search, Upload, User } from 'lucide-react';
import styles from './Header.module.css';

interface HeaderProps {
  onSearch: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>▶️</span>
        DevTube
      </div>
      
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className={styles.searchBtn} onClick={handleSearch}>
          <Search size={20} />
        </button>
      </div>
      
      <div className={styles.userActions}>
        <button className={styles.btn}>
          <Upload size={20} />
          Upload
        </button>
        <button className={styles.btn}>
          <User size={20} />
          Profile
        </button>
      </div>
    </header>
  );
};