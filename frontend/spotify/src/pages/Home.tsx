import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { MainContent } from '../components/MainContent';
import { PlaylistView } from '../components/PlaylistView';
import { api } from '../services/api';

export const Home = () => {   
  const [currentView, setCurrentView] = useState<'home' | 'playlist'>('home');
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<number | null>(null);
  
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPlaylists = async () => {
    try {
      const data = await api('/playlists');
      setPlaylists(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const handleSelectPlaylist = (id: number) => {
    setSelectedPlaylistId(id);
    setCurrentView('playlist');
  };

  const handleGoHome = () => {
    setCurrentView('home');
    setSelectedPlaylistId(null);
  };

  return (
    <div className="app-container">
      <Sidebar 
        onSelectPlaylist={handleSelectPlaylist} 
        onGoHome={handleGoHome} 
        playlists={playlists}
        refreshPlaylists={fetchPlaylists}
      />

      <div className="main-view">
        <Topbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {currentView === 'home' && (
          <MainContent playlists={playlists} searchQuery={searchQuery} />
        )}
        {currentView === 'playlist' && selectedPlaylistId && (
          <PlaylistView 
            playlistId={selectedPlaylistId} 
            refreshPlaylists={fetchPlaylists}
            onGoHome={handleGoHome}
          />
        )}
      </div>
    </div>
  );
};
