/**
 * ============================================================================
 * SPONSORS PAGE
 * ============================================================================
 * 
 * Displays all active sponsors from the CMS.
 * Styled to match the homepage editorial aesthetic.
 * 
 * Features:
 * - Dynamic sponsor grid from CMS content
 * - Sponsor cards with logos and links
 * - Call-to-action for new sponsors
 */

import Image from "next/image";
import Link from "next/link";
import CTAButton from "@/components/CTAButton";
import { Beer } from "lucide-react";
import { getSponsors, getSiteSettings, type Sponsor } from "@/lib/content/reader";

/**
 * Sponsor Card Component
 * Displays a single sponsor with logo, name, and link.
 * Sharp corners, no shadows — matches editorial design system.
 */
const SponsorCard = ({ sponsor }: { sponsor: Sponsor }) => (
  <Link 
    href={sponsor.url || '#'} 
    target={sponsor.url ? "_blank" : undefined}
    rel="noopener noreferrer"
    className={`flex flex-col items-center p-6
               ${sponsor.displayColor === 'dark' ? 'bg-black' : 'bg-white'} 
               hover:opacity-80
               transition-opacity duration-300 
               group`}
  >
    <div className="h-40 w-full flex items-center justify-center mb-4 relative">
      <div className="relative h-full w-full flex items-center justify-center">
        <div className="h-32 w-full relative">
          {sponsor.logo ? (
            <Image 
              src={sponsor.logo} 
              alt={sponsor.name} 
              fill
              style={{ objectFit: 'contain' }}
              className="transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center ${
              sponsor.displayColor === 'dark' ? 'text-white' : 'text-black/30'
            }`}>
              <Beer size={64} />
            </div>
          )}
        </div>
      </div>
    </div>
    <h3 className={`text-lg text-cta normal-case text-center ${
      sponsor.displayColor === 'dark' ? 'text-white' : 'text-black'
    }`}>
      {sponsor.name}
    </h3>
    {sponsor.url && (
      <div className={`mt-2 opacity-0 group-hover:opacity-100 transition-opacity ${
        sponsor.displayColor === 'dark' ? 'text-white/60' : 'text-black/60'
      }`}>
        <span className="text-sm underline">Visit Website</span>
      </div>
    )}
  </Link>
);

/**
 * Sponsors Page Component
 * Fetches sponsors from CMS and displays them in a grid.
 */
export default async function Sponsors() {
  // Fetch data from CMS
  const [sponsors, settings] = await Promise.all([
    getSponsors(true), // Only active sponsors
    getSiteSettings(),
  ]);

  return (
    <main className="pt-16 min-h-screen">
      {/* Page Header */}
      <div className="py-12 text-center">
        <h1 className="text-5xl lg:text-6xl text-display mb-6">Our Valued Partners</h1>
        <p className="text-xl text-body text-white/60 max-w-3xl mx-auto px-4">
          Each of our sponsors plays an equal and crucial role in making the Helpston Beer Festival happen. 
          Without their generous support, this beloved community event would not be possible. 
          Please take a moment to explore our sponsors and support their businesses as they have supported us.
        </p>
      </div>

      {/* Sponsors Grid */}
      <div className="bg-white text-black">
        <div className="container mx-auto px-4 py-12 lg:px-32 xl:px-48">
          {sponsors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10">
              {sponsors.map((sponsor) => (
                <SponsorCard key={sponsor.slug} sponsor={sponsor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Beer size={64} className="mx-auto mb-4 text-black/20" />
              <p className="text-xl text-body text-black/60">
                Sponsor announcements coming soon!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Become a Sponsor — dark section */}
      <div className="container mx-auto px-4 py-12 lg:px-32 xl:px-48">
        <div className="grid gap-10 items-start">
          <div className="flex flex-col gap-5">
            <p className="text-label">Get Involved</p>
            <h3 className="text-4xl lg:text-5xl text-title text-balance">Become a Sponsor</h3>
            <div className="text-[clamp(1rem,0.442vw+0.896rem,1.25rem)] text-body text-balance text-white/60">
              Interested in becoming a sponsor for next year&apos;s Helpston Beer Festival? 
              Join our community of supporters and gain visibility while helping to make
              this beloved community event a success.
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <CTAButton href="/sponsorship" reverse={false}>
                View Sponsorship Packages
              </CTAButton>
              <CTAButton href={`mailto:${settings.contactEmail}`} reverse={false}>
                Contact Us
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
