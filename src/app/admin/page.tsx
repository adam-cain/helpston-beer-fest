/**
 * ============================================================================
 * ADMIN DASHBOARD HOME
 * ============================================================================
 * 
 * Overview page with quick links to content management.
 * Leads are now managed through Keystatic CMS.
 */

import Link from 'next/link';
import { 
  Users, 
  FileEdit,
  ExternalLink,
} from 'lucide-react';

export default async function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Manage festival content and sponsor leads</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link 
          href="/keystatic/collection/sponsor-leads"
          className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-highlight/50 transition-colors group"
        >
          <Users className="text-highlight mb-4" size={32} />
          <h3 className="font-semibold text-white text-lg mb-2">Sponsor Leads</h3>
          <p className="text-sm text-gray-400 mb-4">
            View and manage sponsorship enquiries
          </p>
          <span className="text-highlight text-sm group-hover:underline flex items-center gap-1">
            Open in CMS <ExternalLink size={14} />
          </span>
        </Link>
        
        <Link 
          href="/keystatic"
          className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-highlight/50 transition-colors group"
        >
          <FileEdit className="text-highlight mb-4" size={32} />
          <h3 className="font-semibold text-white text-lg mb-2">Content Management</h3>
          <p className="text-sm text-gray-400 mb-4">
            Edit sponsors, charities, galleries, and site settings
          </p>
          <span className="text-highlight text-sm group-hover:underline flex items-center gap-1">
            Open Keystatic <ExternalLink size={14} />
          </span>
        </Link>
        
        <Link 
          href="/sponsorship"
          target="_blank"
          className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-highlight/50 transition-colors group"
        >
          <ExternalLink className="text-highlight mb-4" size={32} />
          <h3 className="font-semibold text-white text-lg mb-2">Sponsorship Page</h3>
          <p className="text-sm text-gray-400 mb-4">
            View the public sponsorship enquiry form
          </p>
          <span className="text-highlight text-sm group-hover:underline flex items-center gap-1">
            Open in new tab <ExternalLink size={14} />
          </span>
        </Link>
      </div>

      {/* Info Panel */}
      <div className="mt-8 p-6 bg-gray-900/50 border border-gray-800 rounded-lg">
        <h3 className="font-semibold text-white mb-2">💡 Quick Tip</h3>
        <p className="text-gray-400 text-sm">
          All content is now managed through the Keystatic CMS. Sponsor leads are automatically 
          created when visitors submit the sponsorship enquiry form on the website.
        </p>
      </div>
    </div>
  );
}
