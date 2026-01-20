/**
 * ============================================================================
 * SPONSOR LEADS DATABASE FUNCTIONS
 * ============================================================================
 * 
 * CRUD operations for the sponsor_leads table.
 * Uses Vercel Postgres for data storage.
 * 
 * Functions:
 * - getLeads: Fetch all leads with optional filtering
 * - getLeadById: Fetch a single lead by ID
 * - createLead: Insert a new lead
 * - updateLeadStatus: Update lead status and record history
 * - addLeadNote: Add internal notes to a lead
 * - archiveLead: Soft-delete a lead by setting archived_at
 * - getLeadStats: Get summary statistics
 */

import { sql } from '@vercel/postgres';

/**
 * Lead status values
 */
export type LeadStatus = 
  | 'new' 
  | 'contacted' 
  | 'negotiating' 
  | 'confirmed' 
  | 'declined' 
  | 'archived';

/**
 * Lead data structure
 */
export type Lead = {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string | null;
  interested_package: string;
  message: string | null;
  referral_source: string | null;
  status: LeadStatus;
  internal_notes: string | null;
  created_at: Date;
  updated_at: Date;
  archived_at: Date | null;
};

/**
 * New lead input data
 */
export type CreateLeadInput = {
  company_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  interested_package: string;
  message?: string;
  referral_source?: string;
};

/**
 * Filter options for lead queries
 */
export type LeadFilters = {
  status?: LeadStatus | LeadStatus[];
  includeArchived?: boolean;
  search?: string;
  sortBy?: 'created_at' | 'company_name' | 'status';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
};

/**
 * Fetch all leads with optional filtering
 * 
 * @param filters - Optional filter parameters
 * @returns Array of lead objects
 */
export async function getLeads(filters: LeadFilters = {}): Promise<Lead[]> {
  const {
    status,
    includeArchived = false,
    search,
    sortBy = 'created_at',
    sortOrder = 'desc',
    limit = 100,
    offset = 0,
  } = filters;

  // Build the query dynamically
  // Note: In production, consider using a query builder for complex filters
  let query = 'SELECT * FROM sponsor_leads WHERE 1=1';
  const params: (string | number)[] = [];
  let paramIndex = 1;

  // Filter by status
  if (status) {
    if (Array.isArray(status)) {
      const placeholders = status.map(() => `$${paramIndex++}`).join(', ');
      query += ` AND status IN (${placeholders})`;
      params.push(...status);
    } else {
      query += ` AND status = $${paramIndex++}`;
      params.push(status);
    }
  }

  // Exclude archived by default
  if (!includeArchived) {
    query += ' AND archived_at IS NULL';
  }

  // Search by company name, contact name, or email
  if (search) {
    query += ` AND (company_name ILIKE $${paramIndex} OR contact_name ILIKE $${paramIndex} OR email ILIKE $${paramIndex})`;
    params.push(`%${search}%`);
    paramIndex++;
  }

  // Add sorting
  const validSortColumns = ['created_at', 'company_name', 'status'];
  const sortColumn = validSortColumns.includes(sortBy) ? sortBy : 'created_at';
  const order = sortOrder === 'asc' ? 'ASC' : 'DESC';
  query += ` ORDER BY ${sortColumn} ${order}`;

  // Add pagination
  query += ` LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
  params.push(limit, offset);

  const result = await sql.query(query, params);
  return result.rows as Lead[];
}

/**
 * Fetch a single lead by ID
 * 
 * @param id - Lead UUID
 * @returns Lead object or null if not found
 */
export async function getLeadById(id: string): Promise<Lead | null> {
  const result = await sql`
    SELECT * FROM sponsor_leads 
    WHERE id = ${id}
  `;
  
  return result.rows[0] as Lead || null;
}

/**
 * Create a new lead
 * 
 * @param data - Lead input data
 * @returns Created lead object
 */
export async function createLead(data: CreateLeadInput): Promise<Lead> {
  const result = await sql`
    INSERT INTO sponsor_leads (
      company_name,
      contact_name,
      email,
      phone,
      interested_package,
      message,
      referral_source
    ) VALUES (
      ${data.company_name},
      ${data.contact_name},
      ${data.email},
      ${data.phone || null},
      ${data.interested_package},
      ${data.message || null},
      ${data.referral_source || null}
    )
    RETURNING *
  `;

  return result.rows[0] as Lead;
}

/**
 * Update lead status and record in history
 * 
 * @param id - Lead UUID
 * @param newStatus - New status value
 * @param changedBy - User making the change (optional)
 * @returns Updated lead object
 */
export async function updateLeadStatus(
  id: string, 
  newStatus: LeadStatus,
  changedBy?: string
): Promise<Lead | null> {
  // Get current status for history
  const current = await getLeadById(id);
  if (!current) return null;

  // Update the lead
  const result = await sql`
    UPDATE sponsor_leads 
    SET 
      status = ${newStatus},
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `;

  // Record in history
  await sql`
    INSERT INTO lead_status_history (
      lead_id,
      previous_status,
      new_status,
      changed_by
    ) VALUES (
      ${id},
      ${current.status},
      ${newStatus},
      ${changedBy || 'system'}
    )
  `;

  return result.rows[0] as Lead;
}

/**
 * Add or update internal notes on a lead
 * 
 * @param id - Lead UUID
 * @param notes - Notes text to set
 * @returns Updated lead object
 */
export async function addLeadNote(id: string, notes: string): Promise<Lead | null> {
  const result = await sql`
    UPDATE sponsor_leads 
    SET 
      internal_notes = ${notes},
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `;

  return result.rows[0] as Lead || null;
}

/**
 * Archive a lead (soft delete)
 * 
 * @param id - Lead UUID
 * @returns Archived lead object
 */
export async function archiveLead(id: string): Promise<Lead | null> {
  const result = await sql`
    UPDATE sponsor_leads 
    SET 
      archived_at = CURRENT_TIMESTAMP,
      status = 'archived',
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `;

  return result.rows[0] as Lead || null;
}

/**
 * Restore an archived lead
 * 
 * @param id - Lead UUID
 * @returns Restored lead object
 */
export async function restoreLead(id: string): Promise<Lead | null> {
  const result = await sql`
    UPDATE sponsor_leads 
    SET 
      archived_at = NULL,
      status = 'new',
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `;

  return result.rows[0] as Lead || null;
}

/**
 * Get lead statistics summary
 * 
 * @returns Object with counts by status
 */
export async function getLeadStats(): Promise<Record<string, number>> {
  const result = await sql`
    SELECT 
      status,
      COUNT(*) as count
    FROM sponsor_leads 
    WHERE archived_at IS NULL
    GROUP BY status
  `;

  const stats: Record<string, number> = {
    total: 0,
    new: 0,
    contacted: 0,
    negotiating: 0,
    confirmed: 0,
    declined: 0,
  };

  for (const row of result.rows) {
    const status = row.status as string;
    const count = parseInt(row.count as string, 10);
    stats[status] = count;
    stats.total += count;
  }

  return stats;
}

/**
 * Get status change history for a lead
 * 
 * @param leadId - Lead UUID
 * @returns Array of status changes
 */
export async function getLeadHistory(leadId: string) {
  const result = await sql`
    SELECT * FROM lead_status_history 
    WHERE lead_id = ${leadId}
    ORDER BY changed_at DESC
  `;

  return result.rows;
}
