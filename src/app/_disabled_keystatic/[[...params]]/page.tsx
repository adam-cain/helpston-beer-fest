/**
 * ============================================================================
 * KEYSTATIC ADMIN PAGE
 * ============================================================================
 * 
 * This page renders the Keystatic CMS admin interface.
 * Access via: /keystatic
 * 
 * Uses dynamic import to avoid SSR issues with React contexts.
 */

'use client';

import dynamic from 'next/dynamic';

// Dynamically import Keystatic page with no SSR
const KeystaticApp = dynamic(
  () => import('./keystatic-app'),
  { ssr: false, loading: () => <div className="min-h-screen bg-gray-950 flex items-center justify-center"><span className="text-white">Loading CMS...</span></div> }
);

export default function Page() {
  return <KeystaticApp />;
}
