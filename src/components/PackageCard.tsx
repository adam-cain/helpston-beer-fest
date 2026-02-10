/**
 * ============================================================================
 * PACKAGE CARD COMPONENT
 * ============================================================================
 * 
 * Displays a sponsorship package tier with pricing and inclusions.
 * Styled with sharp corners and custom typography to match the 
 * homepage editorial design system.
 */

'use client';

import { type SponsorshipPackage } from '@/lib/content/reader';
import { Star, Check } from 'lucide-react';

/**
 * Helper to render inclusions from the YAML structure
 * Inputs: inclusions (unknown) — raw YAML document content for package inclusions
 * Outputs: JSX list items with check icons
 */
function InclusionsList({ inclusions }: { inclusions: unknown }) {
  if (!inclusions) return null;
  
  // Handle array structure from YAML (Keystatic document format)
  if (Array.isArray(inclusions)) {
    return (
      <>
        {inclusions.map((item, idx) => {
          if (item.type === 'unordered-list' && Array.isArray(item.children)) {
            return item.children.map((listItem: { children?: Array<{ children?: Array<{ children?: Array<{ text?: string }> }> }> }, listIdx: number) => {
              // Extract text from nested structure
              const text = listItem.children?.[0]?.children?.[0]?.children?.[0]?.text || '';
              return text ? (
                <li key={`${idx}-${listIdx}`} className="flex items-start gap-2 text-white/60">
                  <Check size={18} className="text-highlight shrink-0 mt-0.5" />
                  <span>{text}</span>
                </li>
              ) : null;
            });
          }
          return null;
        })}
      </>
    );
  }
  
  return null;
}

type PackageCardProps = {
  package: SponsorshipPackage;
  onSelect?: (packageSlug: string) => void;
  isSelected?: boolean;
};

/**
 * PackageCard — renders a single sponsorship tier
 * Inputs: package (SponsorshipPackage), onSelect callback, isSelected flag
 * Outputs: Interactive card with tier details, pricing, and inclusions
 */
export default function PackageCard({ 
  package: pkg, 
  onSelect,
  isSelected = false,
}: PackageCardProps) {
  const handleClick = () => {
    if (onSelect) {
      onSelect(pkg.slug);
    }
  };

  return (
    <div 
      className={`
        relative flex flex-col border-2 transition-all duration-300
        ${pkg.featured 
          ? 'border-highlight bg-highlight/10 scale-105' 
          : 'border-white/20 bg-white/5 hover:border-white/40'
        }
        ${isSelected 
          ? 'ring-2 ring-highlight ring-offset-2 ring-offset-black' 
          : ''
        }
        ${onSelect ? 'cursor-pointer' : ''}
      `}
      onClick={handleClick}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onKeyDown={(e) => {
        if (onSelect && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Featured Badge */}
      {pkg.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-highlight text-black text-sm text-cta normal-case">
            <Star size={14} className="fill-current" />
            Popular
          </span>
        </div>
      )}

      {/* Header */}
      <div className={`p-6 text-center ${pkg.featured ? 'pt-8' : ''}`}>
        <h3 className="text-2xl text-title mb-2">
          {pkg.tierName}
        </h3>
        <div className="text-4xl text-display text-highlight">
          £{pkg.price.toLocaleString()}
        </div>
        {!pkg.available && (
          <span className="inline-block mt-2 px-2 py-1 bg-red-900/50 text-red-300 text-sm">
            Sold Out
          </span>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-white/10 mx-6" />

      {/* Inclusions */}
      <div className="p-6 flex-grow">
        <h4 className="text-label mb-4">
          What&apos;s Included
        </h4>
        <ul className="space-y-2">
          <InclusionsList inclusions={pkg.inclusions} />
        </ul>
      </div>

      {/* Selection indicator */}
      {onSelect && (
        <div className="p-4 pt-0">
          <div className={`
            w-full py-3 text-center text-cta transition-colors
            ${isSelected 
              ? 'bg-highlight text-black' 
              : 'bg-white/10 text-white hover:bg-white/20'
            }
            ${!pkg.available ? 'opacity-50 cursor-not-allowed' : ''}
          `}>
            {isSelected ? 'Selected' : 'Select Package'}
          </div>
        </div>
      )}
    </div>
  );
}
