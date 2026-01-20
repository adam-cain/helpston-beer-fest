/**
 * ============================================================================
 * SUBMIT SPONSOR LEAD SERVER ACTION
 * ============================================================================
 * 
 * Handles sponsor enquiry form submissions.
 * Validates input and creates a YAML file in the content/leads directory.
 */

'use server';

import { revalidatePath } from 'next/cache';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

/**
 * Form validation errors
 */
export type FormErrors = {
  companyName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  package?: string;
  message?: string;
  general?: string;
};

/**
 * Server action response
 */
export type SubmitLeadResponse = {
  success: boolean;
  errors?: FormErrors;
  message?: string;
};

/**
 * Rate limiting store (in-memory for simplicity)
 * In production, consider using Redis or Vercel KV
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT = 5; // Max submissions
const RATE_WINDOW = 10 * 60 * 1000; // 10 minutes in ms

/**
 * Check if IP is rate limited
 */
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }

  if (now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }

  if (record.count >= RATE_LIMIT) {
    return true;
  }

  record.count++;
  return false;
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate UK phone format (optional field, so allow empty)
 */
function isValidPhone(phone: string): boolean {
  if (!phone) return true; // Optional field
  // Accepts various UK formats: 07xxx, +44, etc.
  const phoneRegex = /^(\+44|0)[\d\s-]{9,13}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Generate a URL-safe slug from a string
 */
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars
    .replace(/[\s_-]+/g, '-') // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Generate unique slug by appending number if needed
 */
async function getUniqueSlug(baseSlug: string, leadsDir: string): Promise<string> {
  let slug = baseSlug;
  let counter = 1;
  
  while (existsSync(path.join(leadsDir, `${slug}.yaml`))) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return slug;
}

/**
 * Escape YAML string values
 */
function escapeYamlString(value: string | undefined): string {
  if (!value) return '""';
  // If contains special chars, wrap in quotes and escape internal quotes
  if (value.includes(':') || value.includes('#') || value.includes('\n') || value.includes('"') || value.includes("'")) {
    return `"${value.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
  }
  return value;
}

/**
 * Submit sponsor lead form
 * 
 * @param formData - Form data from the submission
 * @returns Response object with success status and any errors
 */
export async function submitSponsorLead(formData: FormData): Promise<SubmitLeadResponse> {
  // Extract form data
  const companyName = formData.get('companyName') as string;
  const contactName = formData.get('contactName') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const packageType = formData.get('package') as string;
  const message = formData.get('message') as string;
  const referralSource = formData.get('referralSource') as string;
  const consent = formData.get('consent');

  // Validate required fields
  const errors: FormErrors = {};

  if (!companyName || companyName.length < 2) {
    errors.companyName = 'Company name is required (minimum 2 characters)';
  }

  if (!contactName || contactName.length < 2) {
    errors.contactName = 'Contact name is required (minimum 2 characters)';
  }

  if (!email) {
    errors.email = 'Email address is required';
  } else if (!isValidEmail(email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (phone && !isValidPhone(phone)) {
    errors.phone = 'Please enter a valid UK phone number';
  }

  if (!packageType) {
    errors.package = 'Please select a sponsorship package';
  }

  if (message && message.length > 1000) {
    errors.message = 'Message must be less than 1000 characters';
  }

  if (!consent) {
    errors.general = 'You must agree to be contacted about sponsorship';
  }

  // Return validation errors if any
  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  // Check rate limiting
  const rateLimitKey = email.toLowerCase();
  if (isRateLimited(rateLimitKey)) {
    return {
      success: false,
      errors: {
        general: 'Too many submissions. Please try again later.',
      },
    };
  }

  // Create the lead as a YAML file
  try {
    const leadsDir = path.join(process.cwd(), 'content', 'leads');
    
    // Ensure leads directory exists
    if (!existsSync(leadsDir)) {
      await mkdir(leadsDir, { recursive: true });
    }

    // Generate unique slug from company name
    const baseSlug = generateSlug(companyName);
    const slug = await getUniqueSlug(baseSlug, leadsDir);
    
    // Format today's date as YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    // Build YAML content (slug is the filename, not a field)
    const yamlContent = `companyName: ${escapeYamlString(companyName.trim())}
contactName: ${escapeYamlString(contactName.trim())}
email: ${escapeYamlString(email.toLowerCase().trim())}
phone: ${escapeYamlString(phone?.trim())}
interestedPackage: ${packageType}
message: ${escapeYamlString(message?.trim())}
referralSource: ${escapeYamlString(referralSource)}
status: new
internalNotes: ""
createdAt: ${today}
isArchived: false
`;

    // Write the YAML file
    const filePath = path.join(leadsDir, `${slug}.yaml`);
    await writeFile(filePath, yamlContent, 'utf-8');

    // Revalidate pages
    revalidatePath('/keystatic');

    return {
      success: true,
      message: 'Thank you for your interest! We will be in touch soon.',
    };
  } catch (error) {
    console.error('Failed to create lead:', error);
    
    return {
      success: false,
      errors: {
        general: 'An error occurred. Please try again or contact us directly.',
      },
    };
  }
}
