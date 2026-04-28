import React, { useEffect, useState, useContext } from 'react';
import { Play, Plus } from 'lucide-react';
import { api } from '../services/api';
import { ToastContext } from '../context/ToastContext';

export const MainContent = ({ playlists, searchQuery }: { playlists: any[], searchQuery: string }) => {
  const [musics, setMusics] = useState<any[]>([]);
  const { addToast } = useContext(ToastContext);

  useEffect(() => {
    const loadData = async () => {
      try {
        const musicsData = await api('/musics');
        setMusics(musicsData);
      } catch (err) {
        console.error(err);
      }
    };
    loadData();
  }, []);

  const handleAddToPlaylist = async (musicId: number, playlistId: string) => {
    if (!playlistId) return;
    try {
      await api(`/playlists/${playlistId}/musics`, {
        method: 'POST',
        body: JSON.stringify({ musicId })
      });
      addToast('Música adicionada com sucesso!', 'success');
    } catch (err: any) {
      addToast(err.message || 'Erro ao adicionar música', 'error');
    }
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToast('musica sendo tocada!! 🎧🎵', 'success');
  };

  const filteredMusics = musics.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>Músicas Populares</h2>
      
      {filteredMusics.length === 0 && searchQuery && (
        <p style={{ color: 'var(--text-subdued)' }}>Nenhuma música encontrada para "{searchQuery}"</p>
      )}

      <div className="card-grid">
        {filteredMusics.map(music => (
          <div key={music.id} className="music-card">
            <img src={music.url || "https://misc.scdn.co/liked-songs/liked-songs-300.png"} alt={music.title} />
            <h3>{music.title}</h3>
            <p>{music.artist}</p>
            
            <div className="play-btn" onClick={handlePlay}>
              <Play fill="#000" size={24} />
            </div>

            <div style={{ marginTop: '12px' }} onClick={(e) => e.stopPropagation()}>
              <select 
                className="input-field" 
                style={{ padding: '8px', fontSize: '12px' }}
                onChange={(e) => {
                  handleAddToPlaylist(music.id, e.target.value);
                  e.target.value = "";
                }}
              >
                <option value="">+ Add à Playlist</option>
                {playlists.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
