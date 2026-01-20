/**
 * ============================================================================
 * SUBMIT SPONSOR LEAD SERVER ACTION
 * ============================================================================
 * 
 * Handles sponsor enquiry form submissions.
 * Validates input, creates lead record, and optionally sends notification.
 */

'use server';

import { createLead, type CreateLeadInput } from '@/lib/db/leads';
import { revalidatePath } from 'next/cache';

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
  // Note: In server actions, we don't have direct access to IP
  // This is a simplified version - in production use headers or edge middleware
  const rateLimitKey = email.toLowerCase(); // Use email as rate limit key
  if (isRateLimited(rateLimitKey)) {
    return {
      success: false,
      errors: {
        general: 'Too many submissions. Please try again later.',
      },
    };
  }

  // Create the lead
  try {
    const leadData: CreateLeadInput = {
      company_name: companyName.trim(),
      contact_name: contactName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim() || undefined,
      interested_package: packageType,
      message: message?.trim() || undefined,
      referral_source: referralSource || undefined,
    };

    await createLead(leadData);

    // Revalidate admin pages to show new lead
    revalidatePath('/admin/leads');

    // TODO: Send email notification (implement when email service is configured)
    // await sendNotificationEmail(leadData);

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
