import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Search } from 'lucide-react';

export const Topbar = ({ searchQuery, setSearchQuery }: { searchQuery: string, setSearchQuery: (q: string) => void }) => {
  const { logout, user } = useContext(AuthContext);

  return (
    <div className="topbar">
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.5)', cursor: 'pointer' }} />
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.5)', cursor: 'pointer' }} />
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          backgroundColor: '#242424', 
          borderRadius: '500px', 
          padding: '8px 16px',
          marginLeft: '16px',
          gap: '8px'
        }}>
          <Search size={20} color="var(--text-subdued)" />
          <input 
            type="text" 
            placeholder="O que você quer ouvir?" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              backgroundColor: 'transparent', 
              border: 'none', 
              color: 'var(--text-base)', 
              outline: 'none',
              width: '250px',
              fontSize: '14px'
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button 
          style={{ 
            backgroundColor: '#fff', 
            color: '#000', 
            padding: '8px 16px', 
            borderRadius: '500px', 
            fontWeight: 700,
            fontSize: '14px'
          }}
        >
          Explorar Premium
        </button>
        <button 
          onClick={logout}
          style={{ 
            backgroundColor: 'rgba(0,0,0,0.5)', 
            padding: '8px', 
            borderRadius: '50%', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title="Sair"
        >
          <LogOut size={20} color="#fff" />
        </button>
      </div>
    </div>
  );
};
