/**
 * ============================================================================
 * NEXT.JS CONFIGURATION
 * ============================================================================
 * 
 * Configuration for Next.js 15 with Keystatic CMS integration.
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Keystatic external to server bundles to avoid React context issues
  serverExternalPackages: ['@keystatic/core', '@keystatic/next'],
};

export default nextConfig;
