/**
 * ============================================================================
 * SPONSORSHIP ENQUIRY FORM COMPONENT
 * ============================================================================
 * 
 * Lead capture form for prospective sponsors.
 * Handles validation, submission, and feedback.
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
      <div className="bg-green-900/20 border border-green-700 rounded-lg p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Enquiry Submitted!</h3>
        <p className="text-gray-300 mb-4">{successMessage}</p>
        <p className="text-gray-400 text-sm">
          You can also reach us directly at{' '}
          <a href={`mailto:${contactEmail}`} className="text-highlight hover:underline">
            {contactEmail}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {/* General error message */}
      {errors.general && (
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-red-300">{errors.general}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company Name */}
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-2">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            required
            minLength={2}
            maxLength={255}
            className={`
              w-full px-4 py-3 bg-gray-900 border rounded-lg text-white
              placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-highlight
              ${errors.companyName ? 'border-red-500' : 'border-gray-700'}
            `}
            placeholder="Your company name"
          />
          {errors.companyName && (
            <p className="mt-1 text-sm text-red-400">{errors.companyName}</p>
          )}
        </div>

        {/* Contact Name */}
        <div>
          <label htmlFor="contactName" className="block text-sm font-medium text-gray-300 mb-2">
            Contact Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="contactName"
            name="contactName"
            required
            minLength={2}
            maxLength={255}
            className={`
              w-full px-4 py-3 bg-gray-900 border rounded-lg text-white
              placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-highlight
              ${errors.contactName ? 'border-red-500' : 'border-gray-700'}
            `}
            placeholder="Your name"
          />
          {errors.contactName && (
            <p className="mt-1 text-sm text-red-400">{errors.contactName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={`
              w-full px-4 py-3 bg-gray-900 border rounded-lg text-white
              placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-highlight
              ${errors.email ? 'border-red-500' : 'border-gray-700'}
            `}
            placeholder="you@company.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={`
              w-full px-4 py-3 bg-gray-900 border rounded-lg text-white
              placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-highlight
              ${errors.phone ? 'border-red-500' : 'border-gray-700'}
            `}
            placeholder="07xxx xxxxxx"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Package Selection */}
      <div>
        <label htmlFor="package" className="block text-sm font-medium text-gray-300 mb-2">
          Interested Package <span className="text-red-500">*</span>
        </label>
        <select
          id="package"
          name="package"
          required
          defaultValue={selectedPackage}
          className={`
            w-full px-4 py-3 bg-gray-900 border rounded-lg text-white
            focus:outline-none focus:ring-2 focus:ring-highlight
            ${errors.package ? 'border-red-500' : 'border-gray-700'}
          `}
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
          <p className="mt-1 text-sm text-red-400">{errors.package}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={1000}
          className={`
            w-full px-4 py-3 bg-gray-900 border rounded-lg text-white
            placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-highlight
            ${errors.message ? 'border-red-500' : 'border-gray-700'}
          `}
          placeholder="Tell us about your company and any specific requirements..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-400">{errors.message}</p>
        )}
      </div>

      {/* Referral Source */}
      <div>
        <label htmlFor="referralSource" className="block text-sm font-medium text-gray-300 mb-2">
          How did you hear about us?
        </label>
        <select
          id="referralSource"
          name="referralSource"
          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-highlight"
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
          className="mt-1 w-5 h-5 rounded border-gray-700 bg-gray-900 text-highlight focus:ring-highlight focus:ring-2"
        />
        <label htmlFor="consent" className="text-sm text-gray-300">
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
          w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors
          flex items-center justify-center gap-2
          ${isPending 
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
            : 'bg-highlight text-black hover:bg-highlight/90'
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

      <p className="text-center text-sm text-gray-500">
        Prefer to talk directly? Email us at{' '}
        <a href={`mailto:${contactEmail}`} className="text-highlight hover:underline">
          {contactEmail}
        </a>
      </p>
    </form>
  );
}
