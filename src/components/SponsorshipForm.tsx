/**
 * ============================================================================
 * SPONSORSHIP ENQUIRY FORM COMPONENT
 * ============================================================================
 * 
 * Lead capture form for prospective sponsors.
 * Handles validation, submission, and feedback.
 * Styled with sharp corners and the editorial design system.
 * 
 * Note: This form is rendered inside a white-background section,
 * so inputs use dark-on-light styling to match.
 */

'use client';

import { useState, useTransition } from 'react';
import { submitSponsorLead, type FormErrors } from '@/lib/actions/submit-lead';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

type SponsorshipFormProps = {
  packages: Array<{ slug: string; tierName: string; available: boolean }>;
  selectedPackage?: string;
  contactEmail: string;
};

/**
 * SponsorshipForm — renders the enquiry form for prospective sponsors
 * Inputs: packages (array of package options), selectedPackage (default slug), contactEmail
 * Outputs: Form with validation, submission feedback, and success state
 */
export default function SponsorshipForm({ 
  packages, 
  selectedPackage = '',
  contactEmail,
}: SponsorshipFormProps) {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (formData: FormData) => {
    setErrors({});
    
    startTransition(async () => {
      const result = await submitSponsorLead(formData);
      
      if (result.success) {
        setSubmitted(true);
        setSuccessMessage(result.message || 'Thank you for your interest!');
      } else {
        setErrors(result.errors || {});
      }
    });
  };

  // Show success message after submission
  if (submitted) {
    return (
      <div className="border-2 border-highlight p-8 text-center">
        <CheckCircle className="w-16 h-16 text-highlight mx-auto mb-4" />
        <h3 className="text-2xl text-title mb-2">Enquiry Submitted!</h3>
        <p className="text-body text-black/60 mb-4">{successMessage}</p>
        <p className="text-meta text-black/40">
          You can also reach us directly at{' '}
          <a href={`mailto:${contactEmail}`} className="text-highlight hover:underline">
            {contactEmail}
          </a>
        </p>
      </div>
    );
  }

  /* Shared input classes — sharp corners, light bg, dark border */
  const inputBase = "w-full px-4 py-3 bg-black/5 border text-black placeholder-black/30 focus:outline-none focus:ring-2 focus:ring-highlight";
  const inputValid = "border-black/20";
  const inputError = "border-red-500";

  return (
    <form action={handleSubmit} className="space-y-6">
      {/* General error message */}
      {errors.general && (
        <div className="border-2 border-red-500 p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-red-600 text-body">{errors.general}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company Name */}
        <div>
          <label htmlFor="companyName" className="text-label block mb-2 text-black/60">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            required
            minLength={2}
            maxLength={255}
            className={`${inputBase} ${errors.companyName ? inputError : inputValid}`}
            placeholder="Your company name"
          />
          {errors.companyName && (
            <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>
          )}
        </div>

        {/* Contact Name */}
        <div>
          <label htmlFor="contactName" className="text-label block mb-2 text-black/60">
            Contact Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="contactName"
            name="contactName"
            required
            minLength={2}
            maxLength={255}
            className={`${inputBase} ${errors.contactName ? inputError : inputValid}`}
            placeholder="Your name"
          />
          {errors.contactName && (
            <p className="mt-1 text-sm text-red-500">{errors.contactName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="text-label block mb-2 text-black/60">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={`${inputBase} ${errors.email ? inputError : inputValid}`}
            placeholder="you@company.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="text-label block mb-2 text-black/60">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={`${inputBase} ${errors.phone ? inputError : inputValid}`}
            placeholder="07xxx xxxxxx"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Package Selection */}
      <div>
        <label htmlFor="package" className="text-label block mb-2 text-black/60">
          Interested Package <span className="text-red-500">*</span>
        </label>
        <select
          id="package"
          name="package"
          required
          defaultValue={selectedPackage}
          className={`${inputBase} ${errors.package ? inputError : inputValid}`}
        >
          <option value="">Select a package...</option>
          {packages.map((pkg) => (
            <option 
              key={pkg.slug} 
              value={pkg.slug}
              disabled={!pkg.available}
            >
              {pkg.tierName} {!pkg.available && '(Sold Out)'}
            </option>
          ))}
        </select>
        {errors.package && (
          <p className="mt-1 text-sm text-red-500">{errors.package}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="text-label block mb-2 text-black/60">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={1000}
          className={`${inputBase} ${errors.message ? inputError : inputValid}`}
          placeholder="Tell us about your company and any specific requirements..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message}</p>
        )}
      </div>

      {/* Referral Source */}
      <div>
        <label htmlFor="referralSource" className="text-label block mb-2 text-black/60">
          How did you hear about us?
        </label>
        <select
          id="referralSource"
          name="referralSource"
          className={`${inputBase} ${inputValid}`}
        >
          <option value="">Select an option...</option>
          <option value="previous-sponsor">Previous Sponsor</option>
          <option value="word-of-mouth">Word of Mouth</option>
          <option value="social-media">Social Media</option>
          <option value="local-press">Local Press</option>
          <option value="website">Website Search</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Consent Checkbox */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          required
          className="mt-1 w-5 h-5 border-black/20 bg-black/5 text-highlight focus:ring-highlight focus:ring-2"
        />
        <label htmlFor="consent" className="text-sm text-body text-black/60">
          I agree to be contacted about sponsorship opportunities for the Helpston Beer Festival. 
          Your information will only be used for this purpose and will not be shared with third parties.
          <span className="text-red-500"> *</span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className={`
          w-full py-4 px-6 text-cta text-lg transition-colors
          flex items-center justify-center gap-2
          ${isPending 
            ? 'bg-black/20 text-black/40 cursor-not-allowed' 
            : 'bg-black text-white hover:bg-black/80'
          }
        `}
      >
        {isPending ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Enquiry'
        )}
      </button>

      <p className="text-center text-meta text-black/40">
        Prefer to talk directly? Email us at{' '}
        <a href={`mailto:${contactEmail}`} className="text-highlight hover:underline">
          {contactEmail}
        </a>
      </p>
    </form>
  );
}
