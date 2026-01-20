/**
 * ============================================================================
 * PACKAGE CARD COMPONENT
 * ============================================================================
 * 
 * Displays a sponsorship package tier with pricing and inclusions.
 */

'use client';

import { type SponsorshipPackage } from '@/lib/content/reader';
import { Star, Check } from 'lucide-react';

/**
 * Helper to render inclusions from the YAML structure
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
                <li key={`${idx}-${listIdx}`} className="flex items-start gap-2 text-gray-300">
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
        relative flex flex-col rounded-lg border-2 transition-all duration-300
        ${pkg.featured 
          ? 'border-highlight bg-highlight/5 shadow-xl scale-105' 
          : 'border-gray-700 bg-gray-900/50 hover:border-gray-500'
        }
        ${isSelected 
          ? 'ring-2 ring-highlight ring-offset-2 ring-offset-black' 
          : ''
        }
        ${onSelect ? 'cursor-pointer hover:shadow-lg' : ''}
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
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-highlight text-black text-sm font-semibold rounded-full">
            <Star size={14} className="fill-current" />
            Popular
          </span>
        </div>
      )}

      {/* Header */}
      <div className={`p-6 text-center ${pkg.featured ? 'pt-8' : ''}`}>
        <h3 className="text-2xl font-bold text-white mb-2">
          {pkg.tierName}
        </h3>
        <div className="text-4xl font-bold text-highlight">
          £{pkg.price.toLocaleString()}
        </div>
        {!pkg.available && (
          <span className="inline-block mt-2 px-2 py-1 bg-red-900/50 text-red-300 text-sm rounded">
            Sold Out
          </span>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mx-6" />

      {/* Inclusions */}
      <div className="p-6 flex-grow">
        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
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
            w-full py-3 rounded-lg text-center font-semibold transition-colors
            ${isSelected 
              ? 'bg-highlight text-black' 
              : 'bg-gray-800 text-white hover:bg-gray-700'
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
