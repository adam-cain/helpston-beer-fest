/**
 * ============================================================================
 * UPDATE LEAD STATUS SERVER ACTIONS
 * ============================================================================
 * 
 * Server actions for managing lead status and notes.
 * Used by the admin dashboard.
 */

'use server';

import { 
  updateLeadStatus as dbUpdateStatus, 
  addLeadNote as dbAddNote,
  archiveLead as dbArchive,
  restoreLead as dbRestore,
  type LeadStatus 
} from '@/lib/db/leads';
import { revalidatePath } from 'next/cache';

/**
 * Response type for admin actions
 */
export type AdminActionResponse = {
  success: boolean;
  error?: string;
};

/**
 * Update the status of a lead
 * 
 * @param leadId - Lead UUID
 * @param newStatus - New status value
 * @returns Response object
 */
export async function updateLeadStatus(
  leadId: string, 
  newStatus: LeadStatus
): Promise<AdminActionResponse> {
  try {
    // Validate status
    const validStatuses: LeadStatus[] = [
      'new', 'contacted', 'negotiating', 'confirmed', 'declined', 'archived'
    ];
    
    if (!validStatuses.includes(newStatus)) {
      return { success: false, error: 'Invalid status value' };
    }

    const result = await dbUpdateStatus(leadId, newStatus, 'admin');
    
    if (!result) {
      return { success: false, error: 'Lead not found' };
    }

    revalidatePath('/admin/leads');
    return { success: true };
  } catch (error) {
    console.error('Failed to update lead status:', error);
    return { success: false, error: 'Failed to update status' };
  }
}

/**
 * Add or update internal notes on a lead
 * 
 * @param leadId - Lead UUID
 * @param notes - Notes text
 * @returns Response object
 */
export async function addLeadNote(
  leadId: string, 
  notes: string
): Promise<AdminActionResponse> {
  try {
    if (notes.length > 5000) {
      return { success: false, error: 'Notes must be less than 5000 characters' };
    }

    const result = await dbAddNote(leadId, notes);
    
    if (!result) {
      return { success: false, error: 'Lead not found' };
    }

    revalidatePath('/admin/leads');
    return { success: true };
  } catch (error) {
    console.error('Failed to add lead note:', error);
    return { success: false, error: 'Failed to add note' };
  }
}

/**
 * Archive a lead (soft delete)
 * 
 * @param leadId - Lead UUID
 * @returns Response object
 */
export async function archiveLead(leadId: string): Promise<AdminActionResponse> {
  try {
    const result = await dbArchive(leadId);
    
    if (!result) {
      return { success: false, error: 'Lead not found' };
    }

    revalidatePath('/admin/leads');
    return { success: true };
  } catch (error) {
    console.error('Failed to archive lead:', error);
    return { success: false, error: 'Failed to archive lead' };
  }
}

/**
 * Restore an archived lead
 * 
 * @param leadId - Lead UUID
 * @returns Response object
 */
export async function restoreLead(leadId: string): Promise<AdminActionResponse> {
  try {
    const result = await dbRestore(leadId);
    
    if (!result) {
      return { success: false, error: 'Lead not found' };
    }

    revalidatePath('/admin/leads');
    return { success: true };
  } catch (error) {
    console.error('Failed to restore lead:', error);
    return { success: false, error: 'Failed to restore lead' };
  }
}
