# Helpston Beer Festival - CMS & Lead Management System
## Project Requirements Document

**Version:** 1.0  
**Date:** January 20, 2026  
**Author:** Adam Cain  
**Stakeholders:** Ben (Content Manager), Stuart Bunn (Festival Organiser)

---

## 1. Executive Summary

### 1.1 Project Overview
Transform the existing hard-coded Helpston Beer Festival website into a content-manageable platform that enables non-developers to update event information, manage sponsorship content, capture sponsor leads, and maintain a historical archive of past festivals.

### 1.2 Key Constraints
- **Self-Contained:** The entire solution must be hostable on Vercel without external third-party services (no Contentful, Sanity, HubSpot, etc.)
- **User Experience:** Ben has 20+ years of CMS experience (Optimizely/Episerver, WordPress) and expects a visual editing interface
- **Technical Continuity:** Maintain the existing Next.js 15 + React 19 + Tailwind CSS architecture

### 1.3 Primary Goals
1. Enable content editing without code changes
2. Implement sponsor lead capture and management
3. Create a gallery for past festival images
4. Publish fund allocation/impact reports
5. Streamline year-to-year event updates

---

## 2. Stakeholder Requirements

### 2.1 Content Requirements (from Ben)

| Requirement | Description | Priority |
|-------------|-------------|----------|
| **Sponsorship Packages** | Create and edit sponsorship tiers with pricing, inclusions, and benefits | High |
| **Sponsor Sign-up Form** | Lead capture form for prospective sponsors | High |
| **Past Festival Gallery** | Image gallery organised by year | Medium |
| **Fund Allocation Updates** | Publish how previous proceeds were distributed to charities | Medium |
| **Social Media Integration** | Link social accounts (Facebook, Instagram) site-wide | Low |
| **Event Date Management** | Easily update next year's event date across the site | High |

### 2.2 Technical Requirements

| Requirement | Specification |
|-------------|---------------|
| Hosting Platform | Vercel (required) |
| External Services | None (self-contained) |
| Framework | Next.js 15 (App Router) |
| Content Storage | Git repository (Markdown/JSON) |
| Lead Data Storage | Vercel Postgres or file-based JSON |
| Authentication | Simple password protection for admin |
| Deployment | Automated via GitHub commits |

---

## 3. Functional Specifications

### 3.1 Content Management System (CMS)

#### 3.1.1 Editable Content Areas

**Homepage**
- Hero section: Event date, title, tagline
- Featured charity information
- Live music details
- Food and drink highlights
- Call-to-action buttons

**Sponsors Page**
- Sponsor cards (name, logo, URL, category)
- "Become a Sponsor" section text
- Contact email

**Charities Page**
- Current year's beneficiary
- Historical fund allocation reports
- Impact stories and testimonials

**New: Sponsorship Packages Page**
- Package tiers (e.g., Platinum, Gold, Silver, Bronze)
- Price per tier
- Inclusions list per tier
- Sign-up/enquiry call-to-action

**New: Gallery Page**
- Albums organised by year
- Image uploads with captions
- Lightbox viewing

### 3.1.2 Content Types (Schema)

```
CONTENT COLLECTIONS:

1. Site Settings (Singleton)
   ├── eventDate: Date
   ├── eventTitle: String
   ├── contactEmail: String
   ├── socialLinks: Object
   │   ├── facebook: URL
   │   ├── instagram: URL
   │   └── twitter: URL
   └── ticketLink: URL

2. Sponsors (Collection)
   ├── name: String (required)
   ├── url: URL
   ├── logo: Image
   ├── tier: Enum [platinum, gold, silver, bronze, supporter]
   ├── displayColor: Enum [dark, light]
   └── active: Boolean

3. Sponsorship Packages (Collection)
   ├── tierName: String
   ├── price: Number
   ├── sortOrder: Number
   ├── inclusions: Rich Text
   ├── featured: Boolean
   └── available: Boolean

4. Gallery Albums (Collection)
   ├── year: Number
   ├── title: String
   ├── description: Text
   ├── coverImage: Image
   └── images: Image[]

5. Impact Reports (Collection)
   ├── year: Number
   ├── totalRaised: Number
   ├── beneficiaries: Object[]
   │   ├── name: String
   │   ├── amount: Number
   │   └── description: Text
   └── content: Rich Text

6. Charities (Collection)
   ├── name: String
   ├── description: Rich Text
   ├── logo: Image
   ├── website: URL
   ├── yearFeatured: Number
   └── isPrimary: Boolean
```

### 3.2 Lead Management System (CRM)

#### 3.2.1 Sponsor Enquiry Form Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Company Name | Text | Yes | Min 2 chars |
| Contact Name | Text | Yes | Min 2 chars |
| Email Address | Email | Yes | Valid email format |
| Phone Number | Tel | No | UK phone format |
| Interested Package | Select | Yes | From available packages |
| Message | Textarea | No | Max 1000 chars |
| How Did You Hear About Us | Select | No | Predefined options |
| Submitted At | DateTime | Auto | Timestamp |

#### 3.2.2 Lead Management Features

| Feature | Description |
|---------|-------------|
| Lead List View | Table view of all enquiries with sorting/filtering |
| Lead Status | Track status: New, Contacted, Negotiating, Confirmed, Declined |
| Export to CSV | Download all leads for external processing |
| Email Notifications | Send notification when new lead is submitted |
| Notes Field | Add internal notes to each lead |
| Archive Function | Archive old leads without deleting |

### 3.3 User Roles & Authentication

| Role | Permissions |
|------|-------------|
| **Admin** | Full access: edit all content, manage leads, site settings |
| **Editor** | Edit content only, view leads (read-only) |
| **Public** | View published content only |

---

## 4. Technology Stack Recommendation

### 4.1 CMS Solution: **Keystatic** (Primary) or **TinaCMS** (Alternative)

After extensive research, **Keystatic** is recommended as the primary CMS solution:

#### Why Keystatic?

| Criteria | Keystatic | TinaCMS |
|----------|-----------|---------|
| **True Self-Hosted** | ✅ 100% in your repo | ⚠️ Requires TinaCloud for GitHub auth |
| **Visual Editing** | ✅ Admin UI at `/keystatic` | ✅ On-page editing |
| **Next.js 15 Support** | ✅ Native App Router | ✅ Supported |
| **Content Storage** | Git (YAML/JSON/Markdown) | Git (Markdown/JSON) |
| **External Dependencies** | None | TinaCloud (free tier) |
| **Learning Curve** | Low | Medium |
| **Open Source** | ✅ Fully | Partial |

#### Keystatic Architecture
```
┌─────────────────────────────────────────────────────┐
│                    VERCEL                           │
├─────────────────────────────────────────────────────┤
│  Next.js App                                        │
│  ├── /keystatic (Admin UI - password protected)    │
│  ├── /api/keystatic (Content API)                  │
│  └── /public pages (SSG from content files)        │
├─────────────────────────────────────────────────────┤
│  Content Storage                                    │
│  └── /content (YAML/JSON/Markdown files in repo)   │
├─────────────────────────────────────────────────────┤
│  Vercel Postgres (Optional - for leads)            │
│  └── sponsor_leads table                           │
└─────────────────────────────────────────────────────┘
```

### 4.2 Lead Storage Solution

#### Option A: Vercel Postgres (Recommended)
**Pros:**
- Native Vercel integration
- SQL queries for complex filtering
- Scalable and reliable
- Built-in connection pooling

**Cons:**
- Technically an "external service" (but Vercel-native)
- Requires database setup

#### Option B: File-Based JSON (Fully Self-Contained)
**Pros:**
- Truly self-contained (no external services)
- Simple implementation
- Content stored in Git

**Cons:**
- No concurrent write safety
- Limited querying capabilities
- Git history includes all submissions

#### Recommendation
Use **Vercel Postgres** for leads. While technically a service, it's:
- Integrated into Vercel dashboard
- Billed under one account
- Managed within the same deployment pipeline
- The industry-standard approach for form data

### 4.3 Complete Technology Stack

```
┌────────────────────────────────────────────────────────┐
│                   PRODUCTION STACK                      │
├────────────────────────────────────────────────────────┤
│  FRONTEND                                               │
│  ├── Next.js 15.1 (App Router)                         │
│  ├── React 19                                          │
│  ├── TypeScript 5                                      │
│  └── Tailwind CSS 3.4                                  │
├────────────────────────────────────────────────────────┤
│  CMS                                                    │
│  ├── Keystatic (Git-based content)                     │
│  └── Content: YAML/Markdown in /content directory      │
├────────────────────────────────────────────────────────┤
│  DATA STORAGE                                           │
│  ├── Vercel Postgres (leads database)                  │
│  ├── Vercel Blob (image uploads - optional)            │
│  └── Git Repository (content files)                    │
├────────────────────────────────────────────────────────┤
│  AUTHENTICATION                                         │
│  └── Keystatic built-in (local mode) +                 │
│      Environment variable password for production       │
├────────────────────────────────────────────────────────┤
│  HOSTING                                                │
│  └── Vercel (automatic deployments from GitHub)        │
└────────────────────────────────────────────────────────┘
```

---

## 5. Database Schema (Vercel Postgres)

### 5.1 Lead Management Tables

```sql
-- Sponsor Leads Table
CREATE TABLE sponsor_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    interested_package VARCHAR(100) NOT NULL,
    message TEXT,
    referral_source VARCHAR(100),
    status VARCHAR(50) DEFAULT 'new',
    internal_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    archived_at TIMESTAMP WITH TIME ZONE
);

-- Lead Status History (optional audit trail)
CREATE TABLE lead_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES sponsor_leads(id) ON DELETE CASCADE,
    previous_status VARCHAR(50),
    new_status VARCHAR(50),
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    changed_by VARCHAR(100)
);

-- Indexes
CREATE INDEX idx_leads_status ON sponsor_leads(status);
CREATE INDEX idx_leads_created ON sponsor_leads(created_at DESC);
CREATE INDEX idx_leads_email ON sponsor_leads(email);
```

### 5.2 Status Enum Values
- `new` - Just submitted
- `contacted` - Initial contact made
- `negotiating` - In discussion
- `confirmed` - Sponsorship confirmed
- `declined` - Not proceeding
- `archived` - Historical record

---

## 6. Content Directory Structure

```
/content
├── site-settings.yaml          # Global site configuration
├── sponsors/
│   ├── oakham-ales.yaml
│   ├── village-tribune.yaml
│   └── ...
├── sponsorship-packages/
│   ├── platinum.yaml
│   ├── gold.yaml
│   ├── silver.yaml
│   └── bronze.yaml
├── charities/
│   ├── little-miracles.yaml
│   └── ...
├── impact-reports/
│   ├── 2024.yaml
│   ├── 2023.yaml
│   └── ...
├── gallery/
│   ├── 2024/
│   │   ├── album.yaml
│   │   └── images/
│   ├── 2023/
│   └── ...
└── pages/
    ├── home.yaml
    ├── about.yaml
    └── ...
```

### 6.1 Example Content Files

**site-settings.yaml**
```yaml
eventTitle: "Helpston Beer Festival"
eventDate: "2026-03-21"
eventEndDate: "2026-03-22"
contactEmail: "stuartbunn59@hotmail.com"
ticketLink: ""
social:
  facebook: "https://facebook.com/helpstonbeerfest"
  instagram: ""
  twitter: ""
```

**sponsors/oakham-ales.yaml**
```yaml
name: "Oakham Ales"
url: "https://www.oakhamales.com/"
logo: "/images/sponsors/Oakham.svg"
tier: "gold"
displayColor: "light"
active: true
```

**sponsorship-packages/gold.yaml**
```yaml
tierName: "Gold Sponsor"
price: 250
sortOrder: 2
available: true
featured: false
inclusions: |
  - Logo on festival website
  - Logo on printed materials
  - Social media recognition
  - 4 complimentary festival tickets
  - Mention in press release
```

---

## 7. Page Routes & Structure

```
ROUTE STRUCTURE:

/                           # Homepage (editable via CMS)
├── /food-and-drink        # Food & drink info
├── /getting-here          # Location & transport
├── /sponsors              # Current sponsors list
├── /sponsorship           # NEW: Package tiers & sign-up form
├── /charities             # Charity information
├── /impact                # NEW: Fund allocation reports
├── /gallery               # NEW: Past festival photos
│   └── /gallery/[year]    # Year-specific album
├── /keystatic             # Admin CMS interface
└── /admin                 # Lead management dashboard
    └── /admin/leads       # View/manage sponsor enquiries
```

---

## 8. Implementation Phases

### Phase 1: Foundation (Week 1-2)
- [ ] Install and configure Keystatic
- [ ] Define content schemas
- [ ] Migrate existing hard-coded content to YAML/Markdown files
- [ ] Set up authentication for admin routes
- [ ] Create basic admin layout

### Phase 2: Content Migration (Week 2-3)
- [ ] Convert sponsors array to individual content files
- [ ] Create site settings configuration
- [ ] Update existing pages to read from content files
- [ ] Test content editing workflow

### Phase 3: New Features (Week 3-4)
- [ ] Build sponsorship packages page
- [ ] Implement sponsor enquiry form
- [ ] Set up Vercel Postgres for leads
- [ ] Create lead management dashboard
- [ ] Build gallery page structure

### Phase 4: Polish & Launch (Week 4-5)
- [ ] Add impact reports section
- [ ] Implement image upload workflow
- [ ] Add email notifications for new leads
- [ ] User acceptance testing with Ben
- [ ] Documentation and training

---

## 9. Security Considerations

### 9.1 Authentication
- Keystatic admin: Environment variable `KEYSTATIC_SECRET`
- Lead dashboard: Separate admin password or same credential
- No public registration allowed

### 9.2 Data Protection
- Form submissions sanitized and validated
- Rate limiting on form submissions (5 per minute per IP)
- Email addresses stored encrypted at rest (Vercel Postgres default)
- GDPR compliance: Include consent checkbox and privacy policy link

### 9.3 Access Control
```typescript
// middleware.ts - Protect admin routes
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Check authentication
  }
}
```

---

## 10. Success Criteria

| Metric | Target |
|--------|--------|
| Ben can update event date | < 2 minutes |
| Ben can add new sponsor | < 5 minutes |
| Ben can publish impact report | < 10 minutes |
| Form submission to database | < 500ms |
| Page load time | < 2 seconds |
| Lighthouse score | > 90 |
| Zero external service dependencies | ✅ |

---

## 11. Appendix

### A. Keystatic Configuration Example

```typescript
// keystatic.config.ts
import { config, collection, singleton, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local', // or 'github' for production
  },
  singletons: {
    settings: singleton({
      label: 'Site Settings',
      path: 'content/site-settings',
      schema: {
        eventTitle: fields.text({ label: 'Event Title' }),
        eventDate: fields.date({ label: 'Event Date' }),
        contactEmail: fields.text({ label: 'Contact Email' }),
      },
    }),
  },
  collections: {
    sponsors: collection({
      label: 'Sponsors',
      path: 'content/sponsors/*',
      slugField: 'name',
      schema: {
        name: fields.slug({ name: { label: 'Sponsor Name' } }),
        url: fields.url({ label: 'Website URL' }),
        logo: fields.image({ label: 'Logo', directory: 'public/images/sponsors' }),
        tier: fields.select({
          label: 'Sponsorship Tier',
          options: [
            { label: 'Platinum', value: 'platinum' },
            { label: 'Gold', value: 'gold' },
            { label: 'Silver', value: 'silver' },
            { label: 'Bronze', value: 'bronze' },
          ],
          defaultValue: 'bronze',
        }),
        active: fields.checkbox({ label: 'Active', defaultValue: true }),
      },
    }),
  },
});
```

### B. Lead Capture Server Action

```typescript
// app/actions/submit-sponsor-lead.ts
'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export async function submitSponsorLead(formData: FormData) {
  const data = {
    company_name: formData.get('companyName') as string,
    contact_name: formData.get('contactName') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    interested_package: formData.get('package') as string,
    message: formData.get('message') as string,
    referral_source: formData.get('referralSource') as string,
  };

  try {
    await sql`
      INSERT INTO sponsor_leads 
        (company_name, contact_name, email, phone, interested_package, message, referral_source)
      VALUES 
        (${data.company_name}, ${data.contact_name}, ${data.email}, 
         ${data.phone}, ${data.interested_package}, ${data.message}, ${data.referral_source})
    `;
    
    revalidatePath('/admin/leads');
    return { success: true };
  } catch (error) {
    console.error('Failed to submit lead:', error);
    return { success: false, error: 'Failed to submit enquiry' };
  }
}
```

### C. References & Resources

- **Keystatic Documentation:** https://keystatic.com/docs
- **TinaCMS (Alternative):** https://tina.io/docs
- **Vercel Postgres:** https://vercel.com/docs/storage/vercel-postgres
- **Next.js App Router:** https://nextjs.org/docs/app
- **Vercel Blob Storage:** https://vercel.com/docs/storage/vercel-blob

---

## 12. Approval & Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Developer | Adam Cain | | |
| Content Manager | Ben | | |
| Festival Organiser | Stuart Bunn | | |

---

*This document serves as the technical specification for the Helpston Beer Festival website enhancement project. All implementations should adhere to the requirements outlined herein.*
