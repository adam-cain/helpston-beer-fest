/**
 * ============================================================================
 * CHARITIES PAGE
 * ============================================================================
 * 
 * Information about charitable beneficiaries.
 * Styled to match the homepage/food-and-drink editorial aesthetic
 * using FeatureSection-style alternating blocks.
 */

import { getCharities } from '@/lib/content/reader';
import Image from 'next/image';
import CTAButton from '@/components/CTAButton';

/**
 * Helper to render document content from YAML
 * Inputs: content (unknown) — raw YAML document content
 * Outputs: JSX paragraph/list elements
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
    <main className="pt-16 min-h-screen">
      {/* Page Header */}
      <div className="py-12 text-center">
        <h1 className="text-5xl lg:text-6xl text-display mb-6">Supporting Local Charities</h1>
        <p className="text-xl text-body text-white/60 max-w-3xl mx-auto px-4">
          The Helpston Beer Festival exists to raise funds for charities and 
          community projects that make a real difference in our area.
        </p>
      </div>

      {/* Charity Sections — alternating FeatureSection-style blocks */}
      {charities.length > 0 && charities.map((charity, index) => {
        const isReversed = index % 2 !== 0;

        return (
          <div key={charity.slug} className={!isReversed ? "bg-white text-black" : ""}>
            <div className="container mx-auto px-4 py-12 lg:px-32 xl:px-48">
              <div className={`grid gap-10 items-start ${charity.logo ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
                {isReversed ? (
                  <>
                    {/* Visual first when reversed */}
                    {charity.logo && (
                      <div className="hidden sm:flex size-full items-center justify-center overflow-hidden m-auto">
                        <div className="w-48 h-48 relative bg-white p-4">
                          <Image
                            src={charity.logo}
                            alt={charity.name}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                      </div>
                    )}

                    {/* Text content */}
                    <div className="flex flex-col gap-5">
                      <p className="text-label">Charity</p>
                      <h3 className="text-4xl lg:text-5xl text-title text-balance">{charity.name}</h3>

                      {/* Mobile visual */}
                      {charity.logo && (
                        <div className="flex sm:hidden size-full items-center justify-center overflow-hidden m-auto">
                          <div className="w-48 h-48 relative bg-white p-4">
                            <Image
                              src={charity.logo}
                              alt={charity.name}
                              fill
                              className="object-contain p-2"
                            />
                          </div>
                        </div>
                      )}

                      <div className="text-[clamp(1rem,0.442vw+0.896rem,1.25rem)] text-body text-balance">
                        <RenderContent content={charity.description} />
                      </div>
                      {charity.website && (
                        <div>
                          <CTAButton href={charity.website} reverse={isReversed}>
                            Visit {charity.name}
                          </CTAButton>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Text content first when not reversed */}
                    <div className="flex flex-col gap-5">
                      <p className="text-label">Charity</p>
                      <h3 className="text-4xl lg:text-5xl text-title text-balance">{charity.name}</h3>

                      {/* Mobile visual */}
                      {charity.logo && (
                        <div className="flex sm:hidden size-full items-center justify-center overflow-hidden m-auto">
                          <div className="w-48 h-48 relative p-4">
                            <Image
                              src={charity.logo}
                              alt={charity.name}
                              fill
                              className="object-contain p-2"
                            />
                          </div>
                        </div>
                      )}

                      <div className="text-[clamp(1rem,0.442vw+0.896rem,1.25rem)] text-body text-balance">
                        <RenderContent content={charity.description} />
                      </div>
                      {charity.website && (
                        <div>
                          <CTAButton href={charity.website} reverse={!isReversed}>
                            Visit {charity.name}
                          </CTAButton>
                        </div>
                      )}
                    </div>

                    {/* Visual second */}
                    {charity.logo && (
                      <div className="hidden sm:flex size-full items-center justify-center overflow-hidden m-auto">
                        <div className="w-48 h-48 relative p-4">
                          <Image
                            src={charity.logo}
                            alt={charity.name}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* No Charities State */}
      {charities.length === 0 && (
        <div className="bg-white text-black">
          <div className="container mx-auto px-4 py-20 lg:px-32 xl:px-48 text-center">
            <h2 className="text-4xl text-title mb-4">Charity Information Coming Soon</h2>
            <p className="text-body text-black/60 max-w-md mx-auto">
              Details about this year&apos;s beneficiaries will be announced shortly.
            </p>
          </div>
        </div>
      )}

      {/* Impact Link Section */}
      <div className={charities.length % 2 !== 0 ? "bg-white text-black" : ""}>
        <div className="container mx-auto px-4 py-12 lg:px-32 xl:px-48">
          <div className="flex flex-col gap-5">
            <p className="text-label">Our Story</p>
            <h3 className="text-4xl lg:text-5xl text-title text-balance">See Our Impact</h3>
            <div className="text-[clamp(1rem,0.442vw+0.896rem,1.25rem)] text-body text-balance">
              Curious about how previous festival proceeds have been distributed? 
              Check out our detailed impact reports to see how your support 
              has made a real difference in our community.
            </div>
            <div>
              <CTAButton href="/impact" reverse={charities.length % 2 !== 0}>
                View Impact Reports
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
