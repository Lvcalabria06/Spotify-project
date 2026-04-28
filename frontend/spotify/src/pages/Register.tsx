import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api('/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Falha ao registrar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-base)' }}>
      <div style={{ width: '100%', maxWidth: '400px', backgroundColor: 'var(--bg-base)', padding: '32px', borderRadius: '8px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>Inscreva-se grátis</h1>
        </div>

        {error && (
          <div style={{ backgroundColor: '#e22134', color: '#fff', padding: '12px', borderRadius: '4px', marginBottom: '16px', fontSize: '14px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>Nome</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Como devemos chamar você?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>E-mail</label>
            <input 
              type="email" 
              className="input-field" 
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>Crie uma senha</label>
            <input 
              type="password" 
              className="input-field" 
              placeholder="Crie uma senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ marginTop: '16px', width: '100%', padding: '14px', fontSize: '16px' }}
            disabled={loading}
          >
            {loading ? <div className="loader" style={{ width: '20px', height: '20px', margin: 'auto' }} /> : 'Inscrever-se'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '32px', paddingTop: '32px', borderTop: '1px solid #2a2a2a' }}>
          <span style={{ color: 'var(--text-subdued)' }}>Já tem uma conta? </span>
          <Link to="/login" style={{ color: 'var(--text-base)', fontWeight: 700, textDecoration: 'none' }}>Faça login</Link>
        </div>
      </div>
    </div>
  );
};
