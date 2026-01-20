/**
 * ============================================================================
 * KEYSTATIC CMS LAYOUT
 * ============================================================================
 * 
 * Layout wrapper for Keystatic CMS pages.
 * Adds a marker element that triggers CSS to hide the main site navigation.
 */

export default function KeystaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-keystatic-cms="true" className="keystatic-cms-wrapper">
      {children}
    </div>
  );
}
