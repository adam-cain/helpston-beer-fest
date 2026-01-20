/**
 * ============================================================================
 * SPONSORS PAGE
 * ============================================================================
 * 
 * Displays all active sponsors from the CMS.
 * Content is managed via Keystatic at /keystatic
 * 
 * Features:
 * - Dynamic sponsor grid from CMS content
 * - Sponsor cards with logos and links
 * - Call-to-action for new sponsors
 */

import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import { Beer } from "lucide-react";
import { getSponsors, getSiteSettings, type Sponsor } from "@/lib/content/reader";

/**
 * Sponsor Card Component
 * Displays a single sponsor with logo, name, and link
 */
const SponsorCard = ({ sponsor }: { sponsor: Sponsor }) => (
  <Link 
    href={sponsor.url || '#'} 
    target={sponsor.url ? "_blank" : undefined}
    rel="noopener noreferrer"
    className={`flex flex-col items-center p-6 rounded-lg shadow-lg 
               ${sponsor.displayColor === 'dark' ? 'bg-black' : 'bg-white'} 
               backdrop-blur-sm 
               hover:${sponsor.displayColor === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} 
               transition-all duration-300 
               transform hover:-translate-y-1 hover:shadow-xl
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
              sponsor.displayColor === 'dark' ? 'text-white' : 'text-gray-400'
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
        sponsor.displayColor === 'dark' ? 'text-gray-300' : 'text-gray-700'
      }`}>
        <span className="text-sm underline">Visit Website</span>
      </div>
    )}
  </Link>
);

/**
 * Sponsors Page Component
 * Fetches sponsors from CMS and displays them in a grid
 */
export default async function Sponsors() {
  // Fetch data from CMS
  const [sponsors, settings] = await Promise.all([
    getSponsors(true), // Only active sponsors
    getSiteSettings(),
  ]);

  return (
    <Container>
      <div className="flex flex-col items-center py-24 md:py-24 min-h-screen">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl text-title mb-6">Our Valued Partners</h2>
              <p className="text-xl text-body mb-4 max-w-4xl mx-auto">
                Each of our sponsors plays an equal and crucial role in making the Helpston Beer Festival happen. 
                Without their generous support, this beloved community event would not be possible. 
                Please take a moment to explore our sponsors and support their businesses as they have supported us.
              </p>
            </div>
            
            {sponsors.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {sponsors.map((sponsor) => (
                  <SponsorCard key={sponsor.slug} sponsor={sponsor} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Beer size={64} className="mx-auto mb-4 text-gray-500" />
                <p className="text-xl text-gray-500">
                  Sponsor announcements coming soon!
                </p>
              </div>
            )}
          </div>

          <div className="bg-highlight text-white rounded-lg p-8 shadow-xl max-w-4xl mx-auto mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10">
              <Beer size={200} />
            </div>
            <h2 className="text-4xl text-title mb-6 relative z-10">Become a Sponsor</h2>
            <p className="text-xl text-body mb-8 relative z-10">
              Interested in becoming a sponsor for next year&apos;s Helpston Beer Festival? 
              Join our community of supporters and gain visibility while helping to make
              this beloved community event a success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 relative z-10">
              <Link 
                href="/sponsorship" 
                className="bg-white text-highlight hover:bg-gray-100 px-6 py-3 font-medium text-center transition-colors"
              >
                View Sponsorship Packages
              </Link>
              <a 
                href={`mailto:${settings.contactEmail}`} 
                className="bg-stone-900 text-highlight hover:bg-stone-800 px-6 py-3 font-medium text-center transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
