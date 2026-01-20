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
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Beer size={48} className="mx-auto text-highlight mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">CMS Login</h1>
          <p className="text-gray-400">
            Enter the password to access the content management system
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-900/20 border border-red-700 rounded-lg flex items-center gap-2 text-red-400">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-highlight"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !password}
            className={`
              w-full py-3 px-4 rounded-lg font-semibold transition-colors
              flex items-center justify-center gap-2
              ${isLoading || !password
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
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
