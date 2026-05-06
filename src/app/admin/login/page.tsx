'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getFirebaseAuth } from '@/lib/firebase';
import { Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
      router.replace('/admin');
    } catch {
      setError('Geçersiz e-posta veya şifre');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080f23', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        {/* Card */}
        <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', padding: '48px 40px' }}>
          {/* Logo */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <Image
              src="/logo-nav-transparent.png"
              alt="Innovest Capital"
              width={150}
              height={42}
              style={{ objectFit: 'contain', height: '42px', width: 'auto' }}
            />
          </div>

          {/* Panel Label */}
          <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', color: '#C9A84C', textAlign: 'center', marginBottom: '36px', textTransform: 'uppercase' }}>
            ADMİN PANELİ
          </p>

          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '12px 16px', color: '#f87171', fontSize: '13px', marginBottom: '20px' }}>
                {error}
              </div>
            )}

            {/* E-posta */}
            <div style={{ marginBottom: '0' }}>
              <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginBottom: '8px', textTransform: 'uppercase' }}>
                E-posta
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@innovest.uk"
                style={{ padding: '14px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: '14px', width: '100%', marginBottom: '16px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            {/* Şifre */}
            <div>
              <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Şifre
              </label>
              <div style={{ position: 'relative', marginBottom: '16px' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  style={{ padding: '14px 48px 14px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: '14px', width: '100%', outline: 'none', boxSizing: 'border-box' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', padding: '0', display: 'flex', alignItems: 'center' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '14px', background: loading ? 'rgba(201,168,76,0.6)' : '#C9A84C', color: '#080f23', borderRadius: '8px', fontWeight: 600, fontSize: '13px', letterSpacing: '0.08em', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '8px', textTransform: 'uppercase' }}
            >
              {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '11px', marginTop: '24px' }}>
          &copy; {new Date().getFullYear()} Innovest Capital. Tüm hakları saklıdır.
        </p>
      </div>
    </div>
  );
}
