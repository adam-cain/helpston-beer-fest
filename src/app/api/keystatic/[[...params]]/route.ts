/**
 * ============================================================================
 * KEYSTATIC API ROUTE HANDLER
 * ============================================================================
 * 
 * This API route handles all Keystatic CMS operations.
 * Uses fully dynamic imports to avoid bundling Keystatic with other pages.
 */

// Export route handlers with fully dynamic imports
export async function GET(request: Request) {
  const { makeRouteHandler } = await import('@keystatic/next/route-handler');
  const keystatic = await import('../../../../../keystatic.config');
  const handler = makeRouteHandler({ config: keystatic.default });
  return handler.GET(request);
}

export async function POST(request: Request) {
  const { makeRouteHandler } = await import('@keystatic/next/route-handler');
  const keystatic = await import('../../../../../keystatic.config');
  const handler = makeRouteHandler({ config: keystatic.default });
  return handler.POST(request);
}
