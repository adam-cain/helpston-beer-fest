/**
 * ============================================================================
 * ADMIN LEADS PAGE
 * ============================================================================
 * 
 * Full lead management interface with filtering and export.
 */

import { getLeads, type LeadStatus } from '@/lib/db/leads';
import LeadTable from '@/components/admin/LeadTable';
import { exportLeadsToCSV } from '@/lib/actions/export-leads';
import { Download, Filter, Users } from 'lucide-react';

type SearchParams = {
  status?: string;
  search?: string;
  archived?: string;
};

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  
  // Parse filters from search params
  const statusFilter = params.status as LeadStatus | undefined;
  const searchFilter = params.search;
  const includeArchived = params.archived === 'true';

  // Fetch leads with filters
  let leads: Awaited<ReturnType<typeof getLeads>> = [];
  let dbConnected = true;

  try {
    leads = await getLeads({
      status: statusFilter,
      search: searchFilter,
      includeArchived,
      limit: 100,
    });
  } catch (error) {
    console.error('Database error:', error);
    dbConnected = false;
  }

  // Generate CSV data for client-side download
  let csvData = '';
  try {
    csvData = await exportLeadsToCSV();
  } catch {
    // Ignore export errors
  }

  const statusOptions: { value: string; label: string }[] = [
    { value: '', label: 'All Statuses' },
    { value: 'new', label: 'New' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'negotiating', label: 'Negotiating' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'declined', label: 'Declined' },
  ];

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Sponsor Leads</h1>
          <p className="text-gray-400">
            {leads.length} lead{leads.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <a
          href={`data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`}
          download={`sponsor-leads-${new Date().toISOString().split('T')[0]}.csv`}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Download size={18} />
          Export CSV
        </a>
      </div>

      {!dbConnected && (
        <div className="mb-8 p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg">
          <h3 className="font-semibold text-yellow-400 mb-2">Database Not Connected</h3>
          <p className="text-yellow-300/80 text-sm">
            Please set up your Vercel Postgres database and run the migration script.
          </p>
        </div>
      )}

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4 items-center bg-gray-900 border border-gray-800 rounded-lg p-4">
        <div className="flex items-center gap-2 text-gray-400">
          <Filter size={18} />
          <span className="text-sm font-medium">Filters:</span>
        </div>

        <form className="flex flex-wrap gap-4 items-center flex-1">
          {/* Status Filter */}
          <select
            name="status"
            defaultValue={statusFilter || ''}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-highlight"
            onChange={(e) => {
              const url = new URL(window.location.href);
              if (e.target.value) {
                url.searchParams.set('status', e.target.value);
              } else {
                url.searchParams.delete('status');
              }
              window.location.href = url.toString();
            }}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Search Input */}
          <div className="flex-1 min-w-[200px]">
            <input
              type="search"
              name="search"
              defaultValue={searchFilter || ''}
              placeholder="Search by company, name, or email..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-highlight"
            />
          </div>

          {/* Include Archived */}
          <label className="flex items-center gap-2 text-gray-400 text-sm">
            <input
              type="checkbox"
              name="archived"
              value="true"
              defaultChecked={includeArchived}
              className="rounded border-gray-700 bg-gray-800 text-highlight focus:ring-highlight"
              onChange={(e) => {
                const url = new URL(window.location.href);
                if (e.target.checked) {
                  url.searchParams.set('archived', 'true');
                } else {
                  url.searchParams.delete('archived');
                }
                window.location.href = url.toString();
              }}
            />
            Show archived
          </label>

          <button
            type="submit"
            className="px-4 py-2 bg-highlight text-black rounded-lg text-sm font-medium hover:bg-highlight/90 transition-colors"
          >
            Apply Filters
          </button>
        </form>
      </div>

      {/* Lead Table */}
      {leads.length > 0 ? (
        <LeadTable leads={leads} />
      ) : (
        <div className="text-center py-16 bg-gray-900 border border-gray-800 rounded-lg">
          <Users size={48} className="mx-auto mb-4 text-gray-600" />
          <h3 className="text-xl font-semibold text-white mb-2">No Leads Found</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            {statusFilter || searchFilter
              ? 'Try adjusting your filters to see more results.'
              : 'When sponsors submit enquiries on the website, they will appear here.'}
          </p>
        </div>
      )}
    </div>
  );
}
