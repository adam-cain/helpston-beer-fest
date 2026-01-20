/**
 * ============================================================================
 * CONTENT READER (File-Based)
 * ============================================================================
 * 
 * Direct file reading for content stored in /content directory.
 * This avoids the Keystatic reader which has React context issues
 * with Next.js 15 server components.
 */

import fs from 'fs/promises';
import path from 'path';
import yaml from 'yaml';

const CONTENT_DIR = path.join(process.cwd(), 'content');

/**
 * Type definitions
 */
export type Sponsor = {
  slug: string;
  name: string;
  url: string | null;
  logo: string | null;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze' | 'supporter';
  displayColor: 'light' | 'dark';
  active: boolean;
};

export type SponsorshipPackage = {
  slug: string;
  tierName: string;
  price: number;
  sortOrder: number;
  available: boolean;
  featured: boolean;
  inclusions: unknown;
};

export type Charity = {
  slug: string;
  name: string;
  description: unknown;
  logo: string | null;
  website: string | null;
  yearFeatured: number | null;
  isPrimary: boolean;
};

export type ImpactReport = {
  slug: string;
  year: string;
  totalRaised: number;
  content: unknown;
  beneficiaries: Array<{
    name: string;
    amount: number;
    description: string | null;
  }>;
};

export type GalleryAlbum = {
  slug: string;
  year: string;
  title: string;
  description: string | null;
  coverImage: string | null;
  images: Array<{
    image: string;
    caption: string | null;
    photographer: string | null;
  }>;
};

export type SiteSettings = {
  eventTitle: string;
  eventDate: string | null;
  eventEndDate: string | null;
  contactEmail: string;
  ticketLink: string | null;
  social: {
    facebook: string | null;
    instagram: string | null;
    twitter: string | null;
  };
};

export type HomepageSection = {
  subtitle: string | null;
  title: string | null;
  description: string | null;
  ctaText: string | null;
  ctaLink: string | null;
  image?: string | null;
};

export type HomepageContent = {
  heroTitle: string;
  charitySection: HomepageSection;
  locationSection: HomepageSection;
  foodSection: HomepageSection;
  musicSection: HomepageSection;
  sponsorsSection: HomepageSection;
};

/**
 * Read YAML file and parse contents
 */
async function readYamlFile<T>(filePath: string): Promise<T | null> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return yaml.parse(content) as T;
  } catch {
    return null;
  }
}

/**
 * List files in a directory
 */
async function listDirectory(dirPath: string): Promise<string[]> {
  try {
    const files = await fs.readdir(dirPath);
    return files.filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
  } catch {
    return [];
  }
}

/**
 * Get all sponsors
 */
export async function getSponsors(activeOnly = true): Promise<Sponsor[]> {
  const sponsorsDir = path.join(CONTENT_DIR, 'sponsors');
  const files = await listDirectory(sponsorsDir);
  const sponsors: Sponsor[] = [];

  for (const file of files) {
    const data = await readYamlFile<{
      name: string;
      url?: string;
      logo?: string;
      tier?: string;
      displayColor?: string;
      active?: boolean;
    }>(path.join(sponsorsDir, file));

    if (data) {
      const sponsor: Sponsor = {
        slug: file.replace(/\.ya?ml$/, ''),
        name: data.name || 'Unknown',
        url: data.url || null,
        logo: data.logo || null,
        tier: (data.tier as Sponsor['tier']) || 'supporter',
        displayColor: (data.displayColor as Sponsor['displayColor']) || 'light',
        active: data.active !== false,
      };

      if (!activeOnly || sponsor.active) {
        sponsors.push(sponsor);
      }
    }
  }

  return sponsors;
}

/**
 * Get all sponsorship packages
 */
export async function getSponsorshipPackages(availableOnly = false): Promise<SponsorshipPackage[]> {
  const packagesDir = path.join(CONTENT_DIR, 'sponsorship-packages');
  const files = await listDirectory(packagesDir);
  const packages: SponsorshipPackage[] = [];

  for (const file of files) {
    const data = await readYamlFile<{
      tierName: string;
      price?: number;
      sortOrder?: number;
      available?: boolean;
      featured?: boolean;
      inclusions?: unknown;
    }>(path.join(packagesDir, file));

    if (data) {
      const pkg: SponsorshipPackage = {
        slug: file.replace(/\.ya?ml$/, ''),
        tierName: data.tierName || 'Package',
        price: data.price ?? 0,
        sortOrder: data.sortOrder ?? 10,
        available: data.available !== false,
        featured: data.featured === true,
        inclusions: data.inclusions,
      };

      if (!availableOnly || pkg.available) {
        packages.push(pkg);
      }
    }
  }

  return packages.sort((a, b) => a.sortOrder - b.sortOrder);
}

/**
 * Get all charities
 */
export async function getCharities(): Promise<Charity[]> {
  const charitiesDir = path.join(CONTENT_DIR, 'charities');
  const files = await listDirectory(charitiesDir);
  const charities: Charity[] = [];

  for (const file of files) {
    const data = await readYamlFile<{
      name: string;
      description?: unknown;
      logo?: string;
      website?: string;
      yearFeatured?: number;
      isPrimary?: boolean;
    }>(path.join(charitiesDir, file));

    if (data) {
      charities.push({
        slug: file.replace(/\.ya?ml$/, ''),
        name: data.name || 'Unknown',
        description: data.description,
        logo: data.logo || null,
        website: data.website || null,
        yearFeatured: data.yearFeatured ?? null,
        isPrimary: data.isPrimary === true,
      });
    }
  }

  return charities;
}

/**
 * Get primary charity
 */
export async function getPrimaryCharity(): Promise<Charity | null> {
  const charities = await getCharities();
  return charities.find(c => c.isPrimary) || null;
}

/**
 * Get all impact reports
 */
export async function getImpactReports(): Promise<ImpactReport[]> {
  const reportsDir = path.join(CONTENT_DIR, 'impact-reports');
  const files = await listDirectory(reportsDir);
  const reports: ImpactReport[] = [];

  for (const file of files) {
    const data = await readYamlFile<{
      year: string;
      totalRaised?: number;
      content?: unknown;
      beneficiaries?: Array<{
        name: string;
        amount?: number;
        description?: string;
      }>;
    }>(path.join(reportsDir, file));

    if (data) {
      reports.push({
        slug: file.replace(/\.ya?ml$/, ''),
        year: data.year || file.replace(/\.ya?ml$/, ''),
        totalRaised: data.totalRaised ?? 0,
        content: data.content,
        beneficiaries: (data.beneficiaries || []).map(b => ({
          name: b.name,
          amount: b.amount ?? 0,
          description: b.description || null,
        })),
      });
    }
  }

  return reports.sort((a, b) => parseInt(b.year) - parseInt(a.year));
}

/**
 * Get all gallery albums
 */
export async function getGalleryAlbums(): Promise<GalleryAlbum[]> {
  const galleryDir = path.join(CONTENT_DIR, 'gallery');
  const files = await listDirectory(galleryDir);
  const albums: GalleryAlbum[] = [];

  for (const file of files) {
    const data = await readYamlFile<{
      year: string;
      title?: string;
      description?: string;
      coverImage?: string;
      images?: Array<{
        image?: string;
        caption?: string;
        photographer?: string;
      }>;
    }>(path.join(galleryDir, file));

    if (data) {
      albums.push({
        slug: file.replace(/\.ya?ml$/, ''),
        year: data.year || file.replace(/\.ya?ml$/, ''),
        title: data.title || `${data.year} Festival`,
        description: data.description || null,
        coverImage: data.coverImage || null,
        images: (data.images || []).map(img => ({
          image: img.image || '',
          caption: img.caption || null,
          photographer: img.photographer || null,
        })),
      });
    }
  }

  return albums.sort((a, b) => parseInt(b.year) - parseInt(a.year));
}

/**
 * Get gallery album by year
 */
export async function getGalleryAlbumByYear(year: string): Promise<GalleryAlbum | null> {
  const albums = await getGalleryAlbums();
  return albums.find(a => a.year === year) || null;
}

/**
 * Get site settings
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await readYamlFile<{
    eventTitle?: string;
    eventDate?: string;
    eventEndDate?: string;
    contactEmail?: string;
    ticketLink?: string;
    social?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
    };
  }>(path.join(CONTENT_DIR, 'site-settings.yaml'));

  return {
    eventTitle: data?.eventTitle || 'Helpston Beer Festival',
    eventDate: data?.eventDate || null,
    eventEndDate: data?.eventEndDate || null,
    contactEmail: data?.contactEmail || 'stuartbunn59@hotmail.com',
    ticketLink: data?.ticketLink || null,
    social: {
      facebook: data?.social?.facebook || null,
      instagram: data?.social?.instagram || null,
      twitter: data?.social?.twitter || null,
    },
  };
}

/**
 * Helper to extract section
 */
function extractSection(section: {
  subtitle?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  image?: string;
} | undefined): HomepageSection {
  return {
    subtitle: section?.subtitle || null,
    title: section?.title || null,
    description: section?.description || null,
    ctaText: section?.ctaText || null,
    ctaLink: section?.ctaLink || null,
    image: section?.image || null,
  };
}

/**
 * Get homepage content
 */
export async function getHomepageContent(): Promise<HomepageContent> {
  const data = await readYamlFile<{
    heroTitle?: string;
    charitySection?: {
      subtitle?: string;
      title?: string;
      description?: string;
      ctaText?: string;
      ctaLink?: string;
      image?: string;
    };
    locationSection?: {
      subtitle?: string;
      title?: string;
      description?: string;
      ctaText?: string;
      ctaLink?: string;
    };
    foodSection?: {
      subtitle?: string;
      title?: string;
      description?: string;
      ctaText?: string;
      ctaLink?: string;
      image?: string;
    };
    musicSection?: {
      subtitle?: string;
      title?: string;
      description?: string;
      ctaText?: string;
      ctaLink?: string;
      image?: string;
    };
    sponsorsSection?: {
      subtitle?: string;
      title?: string;
      description?: string;
      ctaText?: string;
      ctaLink?: string;
    };
  }>(path.join(CONTENT_DIR, 'pages', 'home.yaml'));

  return {
    heroTitle: data?.heroTitle || 'HELPSTON BEER FESTIVAL',
    charitySection: extractSection(data?.charitySection),
    locationSection: extractSection(data?.locationSection),
    foodSection: extractSection(data?.foodSection),
    musicSection: extractSection(data?.musicSection),
    sponsorsSection: extractSection(data?.sponsorsSection),
  };
}

/**
 * Format event date for display
 */
export function formatEventDate(dateString: string | null): string {
  if (!dateString) return 'Date TBA';
  
  const date = new Date(dateString);
  const day = date.getDate();
  const suffix = getDaySuffix(day);
  
  const options: Intl.DateTimeFormatOptions = { 
    month: 'long', 
    year: 'numeric' 
  };
  
  const monthYear = date.toLocaleDateString('en-GB', options);
  return `${day}${suffix} ${monthYear}`;
}

function getDaySuffix(day: number): string {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}
