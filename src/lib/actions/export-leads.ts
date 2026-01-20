/**
 * ============================================================================
 * EXPORT LEADS SERVER ACTION
 * ============================================================================
 * 
 * Generates CSV export of sponsor leads for download.
 */

'use server';

import { getLeads, type LeadFilters } from '@/lib/db/leads';

/**
 * CSV escape helper
 * Wraps fields containing commas, quotes, or newlines in quotes
 */
function escapeCSV(value: string | null | undefined): string {
  if (value === null || value === undefined) return '';
  
  const stringValue = String(value);
  
  // If contains comma, newline, or quote, wrap in quotes
  if (stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('"')) {
    // Escape quotes by doubling them
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  
  return stringValue;
}

/**
 * Format date for CSV
 */
function formatDate(date: Date | string | null): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0]; // YYYY-MM-DD format
}

/**
 * Export leads to CSV format
 * 
 * @param filters - Optional filters for the export
 * @returns CSV string
 */
export async function exportLeadsToCSV(filters?: LeadFilters): Promise<string> {
  try {
    // Fetch leads with high limit for export
    const leads = await getLeads({
      ...filters,
      limit: 10000, // Allow larger exports
    });

    // CSV headers
    const headers = [
      'ID',
      'Company Name',
      'Contact Name',
      'Email',
      'Phone',
      'Interested Package',
      'Message',
      'Referral Source',
      'Status',
      'Internal Notes',
      'Created At',
      'Updated At',
    ];

    // Build CSV rows
    const rows = leads.map(lead => [
      escapeCSV(lead.id),
      escapeCSV(lead.company_name),
      escapeCSV(lead.contact_name),
      escapeCSV(lead.email),
      escapeCSV(lead.phone),
      escapeCSV(lead.interested_package),
      escapeCSV(lead.message),
      escapeCSV(lead.referral_source),
      escapeCSV(lead.status),
      escapeCSV(lead.internal_notes),
      escapeCSV(formatDate(lead.created_at)),
      escapeCSV(formatDate(lead.updated_at)),
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');

    return csvContent;
  } catch (error) {
    console.error('Failed to export leads:', error);
    throw new Error('Failed to export leads');
  }
}

/**
 * Get leads count for export preview
 * 
 * @param filters - Optional filters
 * @returns Count of leads matching filters
 */
export async function getLeadsCountForExport(filters?: LeadFilters): Promise<number> {
  try {
    // Get all leads matching the filter to count them
    const allLeads = await getLeads({
      ...filters,
      limit: 10000,
    });
    
    return allLeads.length;
  } catch (error) {
    console.error('Failed to count leads:', error);
    return 0;
  }
}
