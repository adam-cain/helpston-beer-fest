/**
 * ============================================================================
 * ADMIN DASHBOARD HOME
 * ============================================================================
 * 
 * Overview page showing lead statistics and quick actions.
 */

import Link from 'next/link';
import { getLeadStats, getLeads } from '@/lib/db/leads';
import LeadStatusBadge from '@/components/admin/LeadStatusBadge';
import { 
  Users, 
  UserPlus, 
  CheckCircle, 
  Clock,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export default async function AdminDashboard() {
  // Fetch stats and recent leads
  const defaultStats = { total: 0, new: 0, contacted: 0, negotiating: 0, confirmed: 0, declined: 0 };
  let stats: typeof defaultStats = defaultStats;
  let recentLeads: Awaited<ReturnType<typeof getLeads>> = [];
  let dbConnected = true;

  try {
    const [fetchedStats, fetchedLeads] = await Promise.all([
      getLeadStats(),
      getLeads({ limit: 5 }),
    ]);
    stats = { ...defaultStats, ...fetchedStats };
    recentLeads = fetchedLeads;
  } catch (error) {
    console.error('Database error:', error);
    dbConnected = false;
  }

  const statCards = [
    { label: 'Total Leads', value: stats.total, icon: Users, color: 'text-blue-400' },
    { label: 'New', value: stats.new, icon: UserPlus, color: 'text-green-400' },
    { label: 'In Progress', value: stats.contacted + stats.negotiating, icon: Clock, color: 'text-yellow-400' },
    { label: 'Confirmed', value: stats.confirmed, icon: CheckCircle, color: 'text-highlight' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Overview of sponsor lead activity</p>
      </div>

      {!dbConnected && (
        <div className="mb-8 p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg">
          <h3 className="font-semibold text-yellow-400 mb-2">Database Not Connected</h3>
          <p className="text-yellow-300/80 text-sm">
            To see lead data, you need to:
          </p>
          <ol className="list-decimal list-inside text-yellow-300/80 text-sm mt-2 space-y-1">
            <li>Create a Vercel Postgres database in your project dashboard</li>
            <li>Run the migration script in <code className="bg-yellow-900/50 px-1 rounded">src/lib/db/migrations/</code></li>
            <li>Set the environment variables locally or in Vercel</li>
          </ol>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.label}
              className="bg-gray-900 border border-gray-800 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={stat.color} size={24} />
                <TrendingUp size={16} className="text-gray-600" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Leads */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg">
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Recent Leads</h2>
          <Link 
            href="/admin/leads" 
            className="text-highlight hover:underline flex items-center gap-1 text-sm"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>
        
        {recentLeads.length > 0 ? (
          <div className="divide-y divide-gray-800">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="p-4 hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white">{lead.company_name}</div>
                    <div className="text-sm text-gray-400">{lead.contact_name} • {lead.email}</div>
                  </div>
                  <LeadStatusBadge status={lead.status} size="sm" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-gray-500">
            <Users size={48} className="mx-auto mb-4 opacity-50" />
            <p>No leads yet</p>
            <p className="text-sm mt-2">
              Leads will appear here when sponsors submit enquiries
            </p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link 
          href="/admin/leads"
          className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors"
        >
          <Users className="text-highlight mb-3" size={24} />
          <h3 className="font-semibold text-white mb-1">Manage Leads</h3>
          <p className="text-sm text-gray-400">View and update sponsor enquiries</p>
        </Link>
        
        <Link 
          href="/keystatic"
          className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors"
        >
          <TrendingUp className="text-highlight mb-3" size={24} />
          <h3 className="font-semibold text-white mb-1">Edit Content</h3>
          <p className="text-sm text-gray-400">Update website content via CMS</p>
        </Link>
        
        <Link 
          href="/sponsorship"
          target="_blank"
          className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors"
        >
          <CheckCircle className="text-highlight mb-3" size={24} />
          <h3 className="font-semibold text-white mb-1">View Sponsorship Page</h3>
          <p className="text-sm text-gray-400">See the public sponsorship form</p>
        </Link>
      </div>
    </div>
  );
}
