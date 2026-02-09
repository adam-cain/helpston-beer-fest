/**
 * ============================================================================
 * CHARITIES PAGE
 * ============================================================================
 * 
 * Information about charitable beneficiaries.
 */

import Container from '@/components/Container';
import { getCharities } from '@/lib/content/reader';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ExternalLink } from 'lucide-react';

/**
 * Helper to render document content from YAML
 */
function RenderContent({ content }: { content: unknown }) {
  if (!content || !Array.isArray(content)) return null;
  
  return (
    <div className="space-y-2">
      {content.map((block, idx) => {
        if (block.type === 'paragraph' && Array.isArray(block.children)) {
          const text = block.children.map((c: { text?: string }) => c.text || '').join('');
          return <p key={idx}>{text}</p>;
        }
        if (block.type === 'unordered-list' && Array.isArray(block.children)) {
          return (
            <ul key={idx} className="list-disc list-inside">
              {block.children.map((item: { children?: Array<{ children?: Array<{ children?: Array<{ text?: string }> }> }> }, liIdx: number) => {
                const text = item.children?.[0]?.children?.[0]?.children?.[0]?.text || '';
                return text ? <li key={liIdx}>{text}</li> : null;
              })}
            </ul>
          );
        }
        return null;
      })}
    </div>
  );
}

export default async function CharitiesPage() {
  const charities = await getCharities();

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

        {/* All Charities */}
        {charities.length > 0 && (
          <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {charities.map((charity) => (
                <div
                  key={charity.slug}
                  className="bg-gradient-to-br from-highlight/10 to-amber-900/10 border border-highlight/30 rounded-xl overflow-hidden"
                >
                  <div className="p-8">
                    <div className="flex flex-col items-center gap-6">
                      {/* Logo */}
                      {charity.logo && (
                        <div className="shrink-0">
                          <div className="w-40 h-40 relative bg-white rounded-xl p-4">
                            <Image
                              src={charity.logo}
                              alt={charity.name}
                              fill
                              className="object-contain p-2"
                            />
                          </div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">
                          {charity.name}
                        </h3>

                        <div className="prose prose-invert prose-gray max-w-none [&_p]:text-gray-300 [&_ul]:text-gray-300 [&_li]:text-gray-300 mb-6 text-left">
                          <RenderContent content={charity.description} />
                        </div>

                        {charity.website && (
                          <a
                            href={charity.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-highlight text-black font-semibold rounded-lg hover:bg-highlight/90 transition-colors"
                          >
                            Visit {charity.name}
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
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
