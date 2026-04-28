import React, { useEffect, useState, useContext } from 'react';
import { api } from '../services/api';
import { Trash2 } from 'lucide-react';
import { ToastContext } from '../context/ToastContext';

export const PlaylistView = ({ 
  playlistId, 
  refreshPlaylists, 
  onGoHome 
}: { 
  playlistId: number, 
  refreshPlaylists: () => void,
  onGoHome: () => void
}) => {
  const [playlist, setPlaylist] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addToast } = useContext(ToastContext);

  const fetchPlaylist = async () => {
    try {
      setLoading(true);
      const data = await api(`/playlists/${playlistId}`);
      setPlaylist(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, [playlistId]);

  const handleRemoveMusic = async (musicId: number) => {
    if (!window.confirm('Tem certeza que deseja remover esta música?')) return;
    
    try {
      await api(`/playlists/${playlistId}/musics/${musicId}`, {
        method: 'DELETE'
      });
      fetchPlaylist();
      addToast('Música removida com sucesso!', 'success');
    } catch (err: any) {
      addToast(err.message || 'Erro ao remover música', 'error');
    }
  };

  const handleDeletePlaylist = async () => {
    if (!window.confirm('Excluir esta playlist para sempre?')) return;
    
    try {
      await api(`/playlists/${playlistId}`, {
        method: 'DELETE'
      });
      addToast('Playlist deletada com sucesso!', 'success');
      refreshPlaylists();
      onGoHome();
    } catch (err: any) {
      addToast(err.message || 'Erro ao deletar playlist', 'error');
    }
  };

  if (loading) return <div style={{ padding: '24px' }}><div className="loader" /></div>;
  if (!playlist) return <div style={{ padding: '24px' }}>Playlist não encontrada</div>;

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '24px', marginBottom: '32px' }}>
        <div style={{ width: '232px', height: '232px', backgroundColor: '#282828', boxShadow: '0 8px 24px rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '64px', color: '#b3b3b3' }}>🎵</span>
        </div>
        <div>
          <span style={{ fontSize: '14px', fontWeight: 700 }}>Playlist</span>
          <h1 style={{ fontSize: '96px', fontWeight: 900, letterSpacing: '-0.04em', margin: '0.08em 0' }}>
            {playlist.name}
          </h1>
          <button onClick={handleDeletePlaylist} style={{ color: '#e22134', fontWeight: 700, padding: '8px 0' }}>
            Deletar Playlist
          </button>
        </div>
      </div>

      <div style={{ marginTop: '24px' }}>
        {playlist.musics?.length === 0 ? (
          <p style={{ color: 'var(--text-subdued)' }}>Esta playlist está vazia. Volte ao Início para adicionar músicas!</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ color: 'var(--text-subdued)', textAlign: 'left', borderBottom: '1px solid #2a2a2a' }}>
                <th style={{ padding: '8px 16px', fontWeight: 400 }}>#</th>
                <th style={{ padding: '8px 16px', fontWeight: 400 }}>Música ID</th>
                <th style={{ padding: '8px 16px', fontWeight: 400 }}></th>
              </tr>
            </thead>
            <tbody>
              {playlist.musics?.map((relation: any, index: number) => (
                <tr key={relation.id} className="list-item" style={{ borderBottom: '1px solid transparent' }}>
                  <td style={{ padding: '8px 16px', color: 'var(--text-subdued)', width: '40px' }}>{index + 1}</td>
                  <td style={{ padding: '8px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={relation.music.url || "https://misc.scdn.co/liked-songs/liked-songs-300.png"} alt={relation.music.title} style={{ width: '40px', height: '40px', borderRadius: '4px' }} />
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ color: 'var(--text-base)', fontWeight: 600 }}>{relation.music.title}</span>
                        <span style={{ color: 'var(--text-subdued)', fontSize: '14px' }}>{relation.music.artist}</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '8px 16px', textAlign: 'right' }}>
                    <button 
                      onClick={() => handleRemoveMusic(relation.musicId)}
                      style={{ color: 'var(--text-subdued)', padding: '8px' }}
                      title="Remover da Playlist"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
