/**
 * ============================================================================
 * GALLERY YEAR PAGE
 * ============================================================================
 * 
 * Displays photos from a specific festival year.
 * Styled to match the homepage editorial aesthetic.
 */

import GalleryGrid from '@/components/GalleryGrid';
import { getGalleryAlbumByYear, getGalleryAlbums } from '@/lib/content/reader';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Camera } from 'lucide-react';

type PageProps = {
  params: Promise<{ year: string }>;
};

/**
 * Generate static params for all years
 * Outputs: Array of { year } params for static generation
 */
export async function generateStaticParams() {
  const albums = await getGalleryAlbums();
  return albums.map((album) => ({
    year: album.year,
  }));
}

export default async function GalleryYearPage({ params }: PageProps) {
  const { year } = await params;
  const album = await getGalleryAlbumByYear(year);

  if (!album) {
    notFound();
  }

  return (
    <main className="pt-16 min-h-screen">
      {/* Header — dark background */}
      <div className="container mx-auto px-4 py-12 lg:px-32 xl:px-48">
        {/* Back Link */}
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white mb-8 transition-colors text-body"
        >
          <ArrowLeft size={20} />
          Back to Gallery
        </Link>

        {/* Album Title */}
        <h1 className="text-5xl lg:text-6xl text-display mb-4">
          {album.title}
        </h1>
        <div className="flex items-center gap-4 text-white/60 text-body">
          <span className="flex items-center gap-2">
            <Calendar size={18} />
            {album.year}
          </span>
          <span className="flex items-center gap-2">
            <Camera size={18} />
            {album.images.length} photos
          </span>
        </div>
        {album.description && (
          <p className="mt-4 text-body text-white/60 max-w-2xl">{album.description}</p>
        )}
      </div>

      {/* Photo Grid — white background */}
      <div className="bg-white text-black">
        <div className="container mx-auto px-4 py-12 lg:px-32 xl:px-48">
          {album.images.length > 0 ? (
            <GalleryGrid images={album.images} albumTitle={album.title} />
          ) : (
            <div className="text-center py-20">
              <Camera size={64} className="mx-auto mb-6 text-black/20" />
              <h2 className="text-4xl text-title mb-4">No Photos Yet</h2>
              <p className="text-body text-black/60">
                Photos for {album.year} haven&apos;t been added yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
