/**
 * ============================================================================
 * SPONSORSHIP PACKAGES PAGE
 * ============================================================================
 * 
 * Displays available sponsorship packages and enquiry form.
 * Content is managed via Keystatic CMS at /keystatic
 */

import Container from '@/components/Container';
import PackageCard from '@/components/PackageCard';
import SponsorshipForm from '@/components/SponsorshipForm';
import { getSponsorshipPackages, getSiteSettings } from '@/lib/content/reader';
import { Beer, Heart, Users, Award } from 'lucide-react';

export default async function SponsorshipPage() {
  // Fetch data from CMS
  const [packages, settings] = await Promise.all([
    getSponsorshipPackages(false), // Include all packages
    getSiteSettings(),
  ]);

  const availablePackages = packages.filter(p => p.available);

  return (
    <Container>
      <div className="py-16 md:py-24 min-h-screen">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Become a <span className="text-highlight">Sponsor</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Support the Helpston Beer Festival and gain visibility for your business 
            while helping to raise funds for local charities. Choose a sponsorship 
            package that suits your budget and goals.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-lg flex flex-col items-center text-center">
            <Beer className="mb-4 text-highlight" size={40} />
            <h3 className="font-semibold text-lg mb-2 text-white">Brand Visibility</h3>
            <p className="text-gray-400">Your logo displayed to hundreds of festival attendees</p>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-lg flex flex-col items-center text-center">
            <Users className="mb-4 text-highlight" size={40} />
            <h3 className="font-semibold text-lg mb-2 text-white">Community Connection</h3>
            <p className="text-gray-400">Connect with local residents and businesses</p>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-lg flex flex-col items-center text-center">
            <Heart className="mb-4 text-highlight" size={40} />
            <h3 className="font-semibold text-lg mb-2 text-white">Charitable Impact</h3>
            <p className="text-gray-400">Help support Little Miracles and local causes</p>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-lg flex flex-col items-center text-center">
            <Award className="mb-4 text-highlight" size={40} />
            <h3 className="font-semibold text-lg mb-2 text-white">Recognition</h3>
            <p className="text-gray-400">Be part of a beloved annual community event</p>
          </div>
        </div>

        {/* Packages Grid */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Sponsorship Packages
          </h2>
          
          {packages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 items-stretch">
              {packages.map((pkg) => (
                <PackageCard key={pkg.slug} package={pkg} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-900/30 rounded-lg">
              <Beer size={48} className="mx-auto mb-4 text-gray-600" />
              <p className="text-gray-400 text-lg">
                Sponsorship packages coming soon!
              </p>
            </div>
          )}
        </section>

        {/* Enquiry Form Section */}
        <section className="max-w-2xl mx-auto">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-white text-center mb-2">
              Interested in Sponsoring?
            </h2>
            <p className="text-gray-400 text-center mb-8">
              Fill out the form below and we&apos;ll get back to you with more information.
            </p>
            
            <SponsorshipForm 
              packages={availablePackages.map(p => ({
                slug: p.slug,
                tierName: p.tierName,
                available: p.available,
              }))}
              contactEmail={settings.contactEmail}
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                When is the deadline for sponsorship?
              </h3>
              <p className="text-gray-400">
                We accept sponsors up until 2 weeks before the event. However, to ensure 
                your logo appears on all printed materials, we recommend confirming your 
                sponsorship at least 6 weeks in advance.
              </p>
            </div>
            
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Can I create a custom sponsorship package?
              </h3>
              <p className="text-gray-400">
                Absolutely! If our standard packages don&apos;t quite fit your needs, 
                please get in touch and we can discuss a custom arrangement. We&apos;re 
                flexible and happy to work with you.
              </p>
            </div>
            
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                How are the funds used?
              </h3>
              <p className="text-gray-400">
                All proceeds from the Helpston Beer Festival go to local charities, 
                primarily Little Miracles. We publish an annual impact report showing 
                exactly how the funds were distributed.
              </p>
            </div>
            
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                What format should my logo be in?
              </h3>
              <p className="text-gray-400">
                We accept PNG, SVG, or high-resolution JPEG formats. For best results, 
                please provide a vector format (SVG or AI) with a transparent background.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}
