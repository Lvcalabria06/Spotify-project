import React, { useState, useContext } from 'react';
import { Home, Search as SearchIcon, Library, Plus, ListMusic } from 'lucide-react';
import { api } from '../services/api';
import { ToastContext } from '../context/ToastContext';

export const Sidebar = ({ 
  onSelectPlaylist, 
  onGoHome, 
  playlists, 
  refreshPlaylists 
}: { 
  onSelectPlaylist: (id: number) => void, 
  onGoHome: () => void,
  playlists: any[],
  refreshPlaylists: () => void
}) => {
  const [loading, setLoading] = useState(false);
  const { addToast } = useContext(ToastContext);

  const handleCreatePlaylist = async () => {
    const name = prompt('Nome da nova playlist:');
    if (!name) return;
    
    setLoading(true);
    try {
      await api('/playlists', {
        method: 'POST',
        body: JSON.stringify({ name })
      });
      refreshPlaylists();
      addToast('Playlist criada com sucesso!', 'success');
    } catch (err: any) {
      console.error(err);
      addToast(err.message || 'Erro ao criar playlist', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-panel">
        <div style={{ padding: '8px 12px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" style={{ color: 'var(--text-base)' }}>
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-base)' }}>Spotify</span>
        </div>

        <div className="list-item" onClick={onGoHome}>
          <Home size={24} color="var(--text-base)" />
          <span style={{ fontWeight: 700, color: 'var(--text-base)' }}>Início</span>
        </div>
        <div className="list-item">
          <SearchIcon size={24} color="var(--text-subdued)" />
          <span style={{ fontWeight: 700, color: 'var(--text-subdued)' }}>Buscar</span>
        </div>
      </div>

      <div className="sidebar-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', padding: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <Library size={24} color="var(--text-subdued)" />
            <span style={{ fontWeight: 700, color: 'var(--text-subdued)' }}>Sua Biblioteca</span>
          </div>
          <button onClick={handleCreatePlaylist} disabled={loading} style={{ color: 'var(--text-subdued)' }}>
            <Plus size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
          {playlists.map(playlist => (
            <div key={playlist.id} className="list-item" onClick={() => onSelectPlaylist(playlist.id)}>
              <div className="list-item-icon">
                <ListMusic size={24} color="var(--text-subdued)" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: 'var(--text-base)', fontWeight: 600 }}>{playlist.name}</span>
                <span style={{ color: 'var(--text-subdued)', fontSize: '14px' }}>Playlist</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
