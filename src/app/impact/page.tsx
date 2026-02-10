/**
 * ============================================================================
 * IMPACT REPORTS PAGE
 * ============================================================================
 * 
 * Shows how funds from previous festivals were distributed.
 * Styled to match the homepage editorial aesthetic with alternating sections.
 */

import CTAButton from '@/components/CTAButton';
import ImpactChart from '@/components/ImpactChart';
import { getImpactReports } from '@/lib/content/reader';

/**
 * Helper to render document content from YAML
 * Inputs: content (unknown) — raw YAML document content
 * Outputs: JSX paragraph/heading elements
 */
function RenderContent({ content }: { content: unknown }) {
  if (!content || !Array.isArray(content)) return <p>Report details coming soon.</p>;
  
  return (
    <>
      {content.map((block, idx) => {
        if (block.type === 'paragraph' && Array.isArray(block.children)) {
          const text = block.children.map((c: { text?: string }) => c.text || '').join('');
          return <p key={idx}>{text}</p>;
        }
        if (block.type === 'heading' && Array.isArray(block.children)) {
          const text = block.children.map((c: { text?: string }) => c.text || '').join('');
          return <h3 key={idx} className="text-title text-xl mt-4 mb-2">{text}</h3>;
        }
        return null;
      })}
    </>
  );
}

export default async function ImpactPage() {
  const reports = await getImpactReports();

  // Calculate totals across all years
  const totalAllTime = reports.reduce((sum, r) => sum + r.totalRaised, 0);
  const yearsActive = reports.length;
  const orgsSupported = reports.reduce((sum, r) => sum + r.beneficiaries.length, 0);

  return (
    <main className="pt-16 min-h-screen">
      {/* Page Header */}
      <div className="py-12 text-center">
        <h1 className="text-5xl lg:text-6xl text-display mb-6">Our Impact</h1>
        <p className="text-xl text-body text-white/60 max-w-3xl mx-auto px-4">
          The Helpston Beer Festival is more than just a great day out — it&apos;s 
          a community effort that makes a real difference. Here&apos;s how your 
          support has helped local charities and causes.
        </p>
      </div>

      {/* Summary Stats — white background */}
      {reports.length > 0 && (
        <div className="bg-white text-black">
          <div className="container mx-auto px-4 py-12 lg:px-32 xl:px-48">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
              <div className="flex flex-col gap-2">
                <p className="text-label">Total Raised</p>
                <p className="text-5xl text-display text-highlight">
                  £{totalAllTime.toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-label">Years of Festivals</p>
                <p className="text-5xl text-display">
                  {yearsActive}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-label">Organisations Supported</p>
                <p className="text-5xl text-display">
                  {orgsSupported}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Impact Reports by Year — alternating sections */}
      {reports.length > 0 ? (
        reports.map((report, index) => {
          /* First report follows the white stats section, so starts dark */
          const isWhiteSection = index % 2 !== 0;

          return (
            <div key={report.slug} className={isWhiteSection ? "bg-white text-black" : ""}>
              <div className="container mx-auto px-4 py-12 lg:px-32 xl:px-48">
                {/* Year header */}
                <div className="mb-8">
                  <p className="text-label mb-4">Impact Report</p>
                  <h2 className="text-4xl lg:text-5xl text-title">{report.year} Festival</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  {/* Report Content */}
                  <div className={`text-[clamp(1rem,0.442vw+0.896rem,1.25rem)] text-body text-balance ${isWhiteSection ? 'text-black/60' : 'text-white/60'}`}>
                    <RenderContent content={report.content} />
                  </div>

                  {/* Fund Distribution */}
                  {report.beneficiaries.length > 0 && (
                    <div>
                      <ImpactChart 
                        beneficiaries={report.beneficiaries} 
                        totalRaised={report.totalRaised}
                        lightMode={isWhiteSection}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="bg-white text-black">
          <div className="container mx-auto px-4 py-20 lg:px-32 xl:px-48 text-center">
            <h2 className="text-4xl text-title mb-4">Impact Reports Coming Soon</h2>
            <p className="text-body text-black/60 max-w-md mx-auto">
              After each festival, we&apos;ll publish a detailed report showing exactly 
              how funds were distributed to local charities and community projects.
            </p>
          </div>
        </div>
      )}

      {/* Looking Ahead — alternating section continues */}
      {(() => {
        const isWhite = reports.length > 0 ? reports.length % 2 !== 0 : true;
        return (
          <div className={isWhite ? "bg-white text-black" : ""}>
            <div className="container mx-auto px-4 py-12 lg:px-32 xl:px-48">
              <div className="flex flex-col gap-5">
                <p className="text-label">Looking Ahead</p>
                <h3 className="text-4xl lg:text-5xl text-title text-balance">Join the Next Festival</h3>
                <div className={`text-[clamp(1rem,0.442vw+0.896rem,1.25rem)] text-body text-balance ${isWhite ? 'text-black/60' : 'text-white/60'}`}>
                  Every pint poured at the Helpston Beer Festival helps support vital local 
                  causes. Join us at our next event to continue making a positive impact 
                  in our community.
                </div>
                <div>
                  <CTAButton href="/" reverse={isWhite}>
                    Join the Next Festival
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </main>
  );
}
