/**
 * ============================================================================
 * IMPACT REPORTS PAGE
 * ============================================================================
 * 
 * Shows how funds from previous festivals were distributed.
 */

import Container from '@/components/Container';
import ImpactChart from '@/components/ImpactChart';
import { getImpactReports } from '@/lib/content/reader';
import Link from 'next/link';
import { Heart, TrendingUp, Users, Calendar } from 'lucide-react';

/**
 * Helper to render document content from YAML
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
          return <h3 key={idx}>{text}</h3>;
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

  return (
    <Container>
      <div className="py-16 md:py-24 min-h-screen">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our <span className="text-highlight">Impact</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            The Helpston Beer Festival is more than just a great day out – it&apos;s 
            a community effort that makes a real difference. Here&apos;s how your 
            support has helped local charities and causes.
          </p>
        </div>

        {/* Summary Stats */}
        {reports.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-gradient-to-br from-highlight/20 to-amber-900/20 border border-highlight/30 rounded-xl p-8 text-center">
              <TrendingUp className="mx-auto mb-4 text-highlight" size={40} />
              <div className="text-4xl font-bold text-white mb-2">
                £{totalAllTime.toLocaleString()}
              </div>
              <div className="text-gray-400">Total Raised</div>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 text-center">
              <Calendar className="mx-auto mb-4 text-highlight" size={40} />
              <div className="text-4xl font-bold text-white mb-2">{yearsActive}</div>
              <div className="text-gray-400">Years of Festivals</div>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 text-center">
              <Users className="mx-auto mb-4 text-highlight" size={40} />
              <div className="text-4xl font-bold text-white mb-2">
                {reports.reduce((sum, r) => sum + r.beneficiaries.length, 0)}
              </div>
              <div className="text-gray-400">Organisations Supported</div>
            </div>
          </div>
        )}

        {/* Impact Reports by Year */}
        {reports.length > 0 ? (
          <div className="space-y-16">
            {reports.map((report) => (
              <section 
                key={report.slug}
                className="bg-gray-900/30 border border-gray-800 rounded-xl overflow-hidden"
              >
                {/* Year Header */}
                <div className="bg-gradient-to-r from-highlight/10 to-transparent p-6 border-b border-gray-800">
                  <h2 className="text-3xl font-bold text-white">
                    {report.year} Festival
                  </h2>
                </div>

                <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
                  {/* Report Content */}
                  <div>
                    <div className="prose prose-invert prose-gray max-w-none [&_p]:text-gray-300 [&_h2]:text-white [&_h3]:text-white [&_strong]:text-white">
                      <RenderContent content={report.content} />
                    </div>
                  </div>

                  {/* Fund Distribution */}
                  {report.beneficiaries.length > 0 && (
                    <div className="bg-gray-900/50 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                        <Heart className="text-highlight" size={24} />
                        Fund Distribution
                      </h3>
                      <ImpactChart 
                        beneficiaries={report.beneficiaries} 
                        totalRaised={report.totalRaised}
                      />
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-900/30 rounded-xl">
            <Heart size={64} className="mx-auto mb-6 text-gray-600" />
            <h2 className="text-2xl font-bold text-white mb-3">Impact Reports Coming Soon</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              After each festival, we&apos;ll publish a detailed report showing exactly 
              how funds were distributed to local charities and community projects.
            </p>
          </div>
        )}

        {/* Future Goals */}
        <div className="mt-16 bg-gradient-to-br from-highlight/10 to-transparent border border-highlight/20 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Looking Ahead</h3>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            Every pint poured at the Helpston Beer Festival helps support vital local 
            causes. Join us at our next event to continue making a positive impact 
            in our community.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-highlight text-black font-semibold rounded-lg hover:bg-highlight/90 transition-colors"
          >
            Join the Next Festival
          </Link>
        </div>
      </div>
    </Container>
  );
}
