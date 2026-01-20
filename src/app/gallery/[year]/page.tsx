/**
 * ============================================================================
 * GALLERY YEAR PAGE
 * ============================================================================
 * 
 * Displays photos from a specific festival year.
 */

import Container from '@/components/Container';
import GalleryGrid from '@/components/GalleryGrid';
import { getGalleryAlbumByYear, getGalleryAlbums } from '@/lib/content/reader';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Camera } from 'lucide-react';

type PageProps = {
  params: Promise<{ year: string }>;
};

// Generate static params for all years
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
    <Container>
      <div className="py-16 md:py-24 min-h-screen">
        {/* Back Link */}
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Gallery
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {album.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-400">
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
            <p className="mt-4 text-gray-300 max-w-2xl">{album.description}</p>
          )}
        </div>

        {/* Photo Grid */}
        {album.images.length > 0 ? (
          <GalleryGrid images={album.images} albumTitle={album.title} />
        ) : (
          <div className="text-center py-20 bg-gray-900/30 rounded-xl">
            <Camera size={64} className="mx-auto mb-6 text-gray-600" />
            <h2 className="text-2xl font-bold text-white mb-3">No Photos Yet</h2>
            <p className="text-gray-400">
              Photos for {album.year} haven&apos;t been added yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </Container>
  );
}
