/**
 * ============================================================================
 * LEAD TABLE COMPONENT
 * ============================================================================
 * 
 * Sortable, filterable table for displaying sponsor leads.
 */

'use client';

import { useState, useTransition } from 'react';
import { type Lead, type LeadStatus } from '@/lib/db/leads';
import LeadStatusBadge from './LeadStatusBadge';
import { updateLeadStatus, addLeadNote, archiveLead } from '@/lib/actions/update-lead-status';
import { 
  ChevronDown, 
  ChevronUp, 
  MoreVertical,
  Mail,
  Phone,
  Building2,
  User,
  Calendar,
  MessageSquare,
  Trash2,
  Edit,
  X,
  Check,
  Loader2,
} from 'lucide-react';

type LeadTableProps = {
  leads: Lead[];
};

type SortField = 'created_at' | 'company_name' | 'status';
type SortDirection = 'asc' | 'desc';

export default function LeadTable({ leads: initialLeads }: LeadTableProps) {
  const [leads, setLeads] = useState(initialLeads);
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editNotes, setEditNotes] = useState('');
  const [isPending, startTransition] = useTransition();

  // Sort leads
  const sortedLeads = [...leads].sort((a, b) => {
    let comparison = 0;
    
    if (sortField === 'created_at') {
      comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    } else if (sortField === 'company_name') {
      comparison = a.company_name.localeCompare(b.company_name);
    } else if (sortField === 'status') {
      comparison = a.status.localeCompare(b.status);
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    startTransition(async () => {
      const result = await updateLeadStatus(leadId, newStatus);
      if (result.success) {
        setLeads(prev => prev.map(l => 
          l.id === leadId ? { ...l, status: newStatus } : l
        ));
        if (selectedLead?.id === leadId) {
          setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
        }
      }
    });
  };

  const handleSaveNotes = () => {
    if (!selectedLead) return;
    
    startTransition(async () => {
      const result = await addLeadNote(selectedLead.id, editNotes);
      if (result.success) {
        setLeads(prev => prev.map(l => 
          l.id === selectedLead.id ? { ...l, internal_notes: editNotes } : l
        ));
        setSelectedLead(prev => prev ? { ...prev, internal_notes: editNotes } : null);
        setIsEditing(false);
      }
    });
  };

  const handleArchive = (leadId: string) => {
    if (!confirm('Are you sure you want to archive this lead?')) return;
    
    startTransition(async () => {
      const result = await archiveLead(leadId);
      if (result.success) {
        setLeads(prev => prev.filter(l => l.id !== leadId));
        setSelectedLead(null);
      }
    });
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const statusOptions: LeadStatus[] = [
    'new', 'contacted', 'negotiating', 'confirmed', 'declined'
  ];

  return (
    <div className="flex gap-6">
      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th 
                className="text-left py-3 px-4 text-gray-400 font-medium cursor-pointer hover:text-white"
                onClick={() => handleSort('company_name')}
              >
                <span className="flex items-center gap-1">
                  Company <SortIcon field="company_name" />
                </span>
              </th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Contact</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Package</th>
              <th 
                className="text-left py-3 px-4 text-gray-400 font-medium cursor-pointer hover:text-white"
                onClick={() => handleSort('status')}
              >
                <span className="flex items-center gap-1">
                  Status <SortIcon field="status" />
                </span>
              </th>
              <th 
                className="text-left py-3 px-4 text-gray-400 font-medium cursor-pointer hover:text-white"
                onClick={() => handleSort('created_at')}
              >
                <span className="flex items-center gap-1">
                  Date <SortIcon field="created_at" />
                </span>
              </th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {sortedLeads.map((lead) => (
              <tr 
                key={lead.id} 
                className={`
                  border-b border-gray-800 cursor-pointer transition-colors
                  ${selectedLead?.id === lead.id ? 'bg-gray-800/50' : 'hover:bg-gray-900/50'}
                `}
                onClick={() => setSelectedLead(lead)}
              >
                <td className="py-4 px-4">
                  <div className="font-medium text-white">{lead.company_name}</div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-white">{lead.contact_name}</div>
                  <div className="text-sm text-gray-400">{lead.email}</div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-gray-300 capitalize">{lead.interested_package}</span>
                </td>
                <td className="py-4 px-4">
                  <LeadStatusBadge status={lead.status} size="sm" />
                </td>
                <td className="py-4 px-4 text-gray-400">
                  {formatDate(lead.created_at)}
                </td>
                <td className="py-4 px-4">
                  <button 
                    className="p-2 text-gray-400 hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLead(lead);
                    }}
                  >
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sortedLeads.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No leads found
          </div>
        )}
      </div>

      {/* Detail Panel */}
      {selectedLead && (
        <div className="w-96 bg-gray-900 border border-gray-800 rounded-lg p-6 sticky top-6 self-start">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">{selectedLead.company_name}</h3>
              <LeadStatusBadge status={selectedLead.status} />
            </div>
            <button 
              onClick={() => setSelectedLead(null)}
              className="text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3 text-gray-300">
              <User size={18} className="text-gray-500" />
              {selectedLead.contact_name}
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Mail size={18} className="text-gray-500" />
              <a href={`mailto:${selectedLead.email}`} className="hover:text-highlight">
                {selectedLead.email}
              </a>
            </div>
            {selectedLead.phone && (
              <div className="flex items-center gap-3 text-gray-300">
                <Phone size={18} className="text-gray-500" />
                <a href={`tel:${selectedLead.phone}`} className="hover:text-highlight">
                  {selectedLead.phone}
                </a>
              </div>
            )}
            <div className="flex items-center gap-3 text-gray-300">
              <Building2 size={18} className="text-gray-500" />
              <span className="capitalize">{selectedLead.interested_package} Package</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Calendar size={18} className="text-gray-500" />
              {formatDate(selectedLead.created_at)}
            </div>
          </div>

          {selectedLead.message && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                <MessageSquare size={14} />
                Message
              </h4>
              <p className="text-gray-300 text-sm bg-gray-800/50 rounded p-3">
                {selectedLead.message}
              </p>
            </div>
          )}

          {/* Status Change */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-400 mb-2">Update Status</h4>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(selectedLead.id, status)}
                  disabled={isPending || selectedLead.status === status}
                  className={`
                    px-3 py-1 rounded text-sm capitalize transition-colors
                    ${selectedLead.status === status 
                      ? 'bg-highlight text-black' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }
                    ${isPending ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Internal Notes */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center justify-between">
              <span>Internal Notes</span>
              {!isEditing && (
                <button 
                  onClick={() => {
                    setEditNotes(selectedLead.internal_notes || '');
                    setIsEditing(true);
                  }}
                  className="text-gray-500 hover:text-white"
                >
                  <Edit size={14} />
                </button>
              )}
            </h4>
            {isEditing ? (
              <div>
                <textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white text-sm resize-none"
                  rows={4}
                  placeholder="Add internal notes..."
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={handleSaveNotes}
                    disabled={isPending}
                    className="flex items-center gap-1 px-3 py-1 bg-highlight text-black rounded text-sm hover:bg-highlight/90"
                  >
                    {isPending ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded text-sm hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-400 text-sm bg-gray-800/50 rounded p-3">
                {selectedLead.internal_notes || 'No notes yet'}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-gray-800">
            <button
              onClick={() => handleArchive(selectedLead.id)}
              disabled={isPending}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm"
            >
              <Trash2 size={14} />
              Archive Lead
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
