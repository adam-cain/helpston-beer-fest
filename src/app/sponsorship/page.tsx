/**
 * ============================================================================
 * SPONSORSHIP PACKAGES PAGE
 * ============================================================================
 * 
 * Displays available sponsorship packages and enquiry form.
 * Styled to match the homepage editorial aesthetic with alternating sections.
 */

import PackageCard from '@/components/PackageCard';
import SponsorshipForm from '@/components/SponsorshipForm';
import { getSponsorshipPackages, getSiteSettings } from '@/lib/content/reader';

export default async function SponsorshipPage() {
  // Fetch data from CMS
  const [packages, settings] = await Promise.all([
    getSponsorshipPackages(false),
    getSiteSettings(),
  ]);

  const availablePackages = packages.filter(p => p.available);

  return (
    <main className="pt-16 min-h-screen">
      {/* Page Header */}
      <div className="py-12 text-center">
        <h1 className="text-5xl lg:text-6xl text-display mb-6">Become a Sponsor</h1>
        <p className="text-xl text-body text-white/60 max-w-3xl mx-auto px-4">
          Support the Helpston Beer Festival and gain visibility for your business 
          while helping to raise funds for local charities. Choose a sponsorship 
          package that suits your budget and goals.
        </p>
      </div>

      {/* Benefits Section — white background */}
      <div className="bg-white text-black">
        <div className="container mx-auto px-4 py-12 lg:px-32 xl:px-48">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="flex flex-col gap-3">
              <p className="text-label">Benefit</p>
              <h3 className="text-2xl text-title">Brand Visibility</h3>
              <p className="text-body text-black/60">Your logo displayed to hundreds of festival attendees</p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-label">Benefit</p>
              <h3 className="text-2xl text-title">Community Connection</h3>
              <p className="text-body text-black/60">Connect with local residents and businesses</p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-label">Benefit</p>
              <h3 className="text-2xl text-title">Charitable Impact</h3>
              <p className="text-body text-black/60">Help support local charities and community causes</p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-label">Benefit</p>
              <h3 className="text-2xl text-title">Recognition</h3>
              <p className="text-body text-black/60">Be part of a beloved annual community event</p>
            </div>
          </div>
        </div>
      </div>

      {/* Packages Section — dark background */}
      <div className="container mx-auto px-4 py-12 lg:px-32 xl:px-48">
        <div className="mb-10">
          <p className="text-label mb-4">Packages</p>
          <h2 className="text-4xl lg:text-5xl text-title">Sponsorship Packages</h2>
        </div>
        
        {packages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 items-stretch">
            {packages.map((pkg) => (
              <PackageCard key={pkg.slug} package={pkg} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-body text-white/40 text-lg">
              Sponsorship packages coming soon!
            </p>
          </div>
        )}
      </div>

      {/* Enquiry Form — white background */}
      <div className="bg-white text-black">
        <div className="container mx-auto px-4 py-12 lg:px-32 xl:px-48">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <p className="text-label mb-4">Get In Touch</p>
              <h2 className="text-4xl text-title mb-3">Interested in Sponsoring?</h2>
              <p className="text-body text-black/60">
                Fill out the form below and we&apos;ll get back to you with more information.
              </p>
            </div>
            
            <SponsorshipForm 
              packages={availablePackages.map(p => ({
                slug: p.slug,
                tierName: p.tierName,
                available: p.available,
              }))}
              contactEmail={settings.contactEmail}
            />
          </div>
        </div>
      </div>

      {/* FAQ Section — dark background */}
      <div className="container mx-auto px-4 py-12 lg:px-32 xl:px-48">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <p className="text-label mb-4">Questions</p>
            <h2 className="text-4xl lg:text-5xl text-title">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-8">

            
            <div className="border-t border-white/10 pt-6">
              <h3 className="text-xl text-title mb-3">
                Can I create a custom sponsorship package?
              </h3>
              <p className="text-body text-white/60">
                Absolutely! If our standard packages don&apos;t quite fit your needs, 
                please get in touch and we can discuss a custom arrangement. We&apos;re 
                flexible and happy to work with you.
              </p>
            </div>
            
            <div className="border-t border-white/10 pt-6">
              <h3 className="text-xl text-title mb-3">
                How are the funds used?
              </h3>
              <p className="text-body text-white/60">
                All proceeds from the Helpston Beer Festival go to local charities. 
                We publish an annual impact report showing 
                exactly how the funds were distributed.
              </p>
            </div>
            
            <div className="border-t border-white/10 pt-6">
              <h3 className="text-xl text-title mb-3">
                What format should my logo be in?
              </h3>
              <p className="text-body text-white/60">
                We accept PNG, SVG, or high-resolution JPEG formats. 
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
