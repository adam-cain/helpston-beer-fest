-- ============================================================================
-- MIGRATION: Create Sponsor Leads Table
-- ============================================================================
-- 
-- This migration creates the sponsor_leads table for storing sponsorship
-- enquiries from the website contact form.
-- 
-- To run this migration:
-- 1. Connect to your Vercel Postgres database
-- 2. Execute this SQL script
-- 
-- Vercel Dashboard: Project → Storage → [Your Database] → Query
-- ============================================================================

-- Enable UUID generation (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- SPONSOR LEADS TABLE
-- ============================================================================
-- Stores all sponsor enquiry form submissions

CREATE TABLE IF NOT EXISTS sponsor_leads (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Contact information
    company_name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    
    -- Enquiry details
    interested_package VARCHAR(100) NOT NULL,
    message TEXT,
    referral_source VARCHAR(100),
    
    -- Status tracking
    status VARCHAR(50) DEFAULT 'new',
    internal_notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    archived_at TIMESTAMP WITH TIME ZONE
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Index for filtering by status
CREATE INDEX IF NOT EXISTS idx_leads_status 
    ON sponsor_leads(status);

-- Index for sorting by creation date
CREATE INDEX IF NOT EXISTS idx_leads_created 
    ON sponsor_leads(created_at DESC);

-- Index for searching by email
CREATE INDEX IF NOT EXISTS idx_leads_email 
    ON sponsor_leads(email);

-- Index for finding archived leads
CREATE INDEX IF NOT EXISTS idx_leads_archived 
    ON sponsor_leads(archived_at) 
    WHERE archived_at IS NOT NULL;

-- ============================================================================
-- LEAD STATUS HISTORY TABLE (Optional - for audit trail)
-- ============================================================================
-- Tracks all status changes for each lead

CREATE TABLE IF NOT EXISTS lead_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES sponsor_leads(id) ON DELETE CASCADE,
    previous_status VARCHAR(50),
    new_status VARCHAR(50) NOT NULL,
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    changed_by VARCHAR(100)
);

-- Index for looking up history by lead
CREATE INDEX IF NOT EXISTS idx_history_lead 
    ON lead_status_history(lead_id);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE sponsor_leads IS 
    'Stores sponsor enquiries from the website contact form';

COMMENT ON COLUMN sponsor_leads.status IS 
    'Lead status: new, contacted, negotiating, confirmed, declined, archived';

COMMENT ON COLUMN sponsor_leads.interested_package IS 
    'The sponsorship package the lead is interested in (e.g., platinum, gold)';

COMMENT ON TABLE lead_status_history IS 
    'Audit trail of all status changes for sponsor leads';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
