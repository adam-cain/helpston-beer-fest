/**
 * ============================================================================
 * ADMIN LAYOUT
 * ============================================================================
 * 
 * Layout wrapper for all admin pages.
 * The login page is excluded from this layout via route structure.
 */

// import AdminLayout from '@/components/admin/AdminLayout';

export const metadata = {
  title: 'Admin Dashboard - Helpston Beer Festival',
  robots: 'noindex, nofollow', // Don't index admin pages
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
