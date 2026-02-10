/**
 * ============================================================================
 * LOGIN PAGE
 * ============================================================================
 * 
 * Simple password-based authentication for the CMS.
 * Redirects to Keystatic on successful login.
 */

'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Beer, Loader2, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        router.push('/keystatic');
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error || 'Invalid password');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <Beer size={56} className="mx-auto text-highlight mb-6" />
          <h1 className="text-4xl text-title mb-3">CMS Login</h1>
          <p className="text-label text-gray-400">
            Enter the password to access the content management system
          </p>
        </div>

        <form onSubmit={handleSubmit} className="border border-white/10 p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-900/20 border border-red-700 flex items-center gap-2 text-red-400">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="password" className="block text-label text-gray-400 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="w-full px-4 py-3 bg-transparent border-b border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-highlight transition-colors"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !password}
            className={`
              w-full py-3 px-4 font-semibold transition-colors
              flex items-center justify-center gap-2 text-cta
              ${isLoading || !password
                ? 'bg-white/10 text-gray-500 cursor-not-allowed'
                : 'bg-highlight text-black hover:bg-highlight/90'
              }
            `}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
