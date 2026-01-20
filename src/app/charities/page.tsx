/**
 * ============================================================================
 * CHARITIES PAGE
 * ============================================================================
 * 
 * Information about charitable beneficiaries.
 */

import Container from '@/components/Container';
import { getCharities, getPrimaryCharity } from '@/lib/content/reader';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ExternalLink, Star } from 'lucide-react';

/**
 * Helper to render document content from YAML
 */
function RenderContent({ content }: { content: unknown }) {
  if (!content || !Array.isArray(content)) return null;
  
  return (
    <>
      {content.map((block, idx) => {
        if (block.type === 'paragraph' && Array.isArray(block.children)) {
          const text = block.children.map((c: { text?: string }) => c.text || '').join('');
          return <p key={idx}>{text}</p>;
        }
        if (block.type === 'unordered-list' && Array.isArray(block.children)) {
          return (
            <ul key={idx}>
              {block.children.map((item: { children?: Array<{ children?: Array<{ children?: Array<{ text?: string }> }> }> }, liIdx: number) => {
                const text = item.children?.[0]?.children?.[0]?.children?.[0]?.text || '';
                return text ? <li key={liIdx}>{text}</li> : null;
              })}
            </ul>
          );
        }
        return null;
      })}
    </>
  );
}

export default async function CharitiesPage() {
  const [charities, primaryCharity] = await Promise.all([
    getCharities(),
    getPrimaryCharity(),
  ]);

  // Separate primary from others
  const otherCharities = charities.filter(c => !c.isPrimary);

  return (
    <Container>
      <div className="py-16 md:py-24 min-h-screen">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Supporting <span className="text-highlight">Local Charities</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            The Helpston Beer Festival exists to raise funds for charities and 
            community projects that make a real difference in our area.
          </p>
        </div>

        {/* Primary Charity */}
        {primaryCharity && (
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6 justify-center">
              <Star className="text-highlight fill-highlight" size={24} />
              <h2 className="text-2xl font-bold text-white">This Year&apos;s Primary Beneficiary</h2>
            </div>
            
            <div className="bg-gradient-to-br from-highlight/10 to-amber-900/10 border border-highlight/30 rounded-xl overflow-hidden">
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Logo */}
                  {primaryCharity.logo && (
                    <div className="shrink-0">
                      <div className="w-48 h-48 relative bg-white rounded-xl p-4">
                        <Image
                          src={primaryCharity.logo}
                          alt={primaryCharity.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl font-bold text-white mb-4">
                      {primaryCharity.name}
                    </h3>
                    
                    <div className="prose prose-invert prose-gray max-w-none [&_p]:text-gray-300 [&_ul]:text-gray-300 [&_li]:text-gray-300 mb-6">
                      <RenderContent content={primaryCharity.description} />
                    </div>
                    
                    {primaryCharity.website && (
                      <a
                        href={primaryCharity.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-highlight text-black font-semibold rounded-lg hover:bg-highlight/90 transition-colors"
                      >
                        Visit {primaryCharity.name}
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Other Charities */}
        {otherCharities.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Previous Beneficiaries
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherCharities.map((charity) => (
                <div 
                  key={charity.slug}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
                >
                  {charity.logo && (
                    <div className="w-24 h-24 relative bg-white rounded-lg mx-auto mb-4">
                      <Image
                        src={charity.logo}
                        alt={charity.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-white text-center mb-2">
                    {charity.name}
                  </h3>
                  {charity.yearFeatured && (
                    <p className="text-gray-500 text-sm text-center mb-4">
                      Featured in {charity.yearFeatured}
                    </p>
                  )}
                  {charity.website && (
                    <a
                      href={charity.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 text-highlight hover:underline text-sm"
                    >
                      Visit Website <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* No Charities State */}
        {charities.length === 0 && (
          <div className="text-center py-20 bg-gray-900/30 rounded-xl">
            <Heart size={64} className="mx-auto mb-6 text-gray-600" />
            <h2 className="text-2xl font-bold text-white mb-3">Charity Information Coming Soon</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              Details about this year&apos;s beneficiaries will be announced shortly.
            </p>
          </div>
        )}

        {/* Impact Link */}
        <div className="mt-12 text-center bg-gray-900/50 border border-gray-800 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-3">See Our Impact</h3>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            Curious about how previous festival proceeds have been distributed? 
            Check out our detailed impact reports.
          </p>
          <Link
            href="/impact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-highlight text-black font-semibold rounded-lg hover:bg-highlight/90 transition-colors"
          >
            <Heart size={20} />
            View Impact Reports
          </Link>
        </div>
      </div>
    </Container>
  );
}
