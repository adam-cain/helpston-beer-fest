/**
 * ============================================================================
 * GALLERY INDEX PAGE
 * ============================================================================
 * 
 * Displays all gallery albums organized by year.
 */

import Container from '@/components/Container';
import { getGalleryAlbums } from '@/lib/content/reader';
import Image from 'next/image';
import Link from 'next/link';
import { Camera, Calendar } from 'lucide-react';

export default async function GalleryPage() {
  const albums = await getGalleryAlbums();

  return (
    <Container>
      <div className="py-16 md:py-24 min-h-screen">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Festival <span className="text-highlight">Gallery</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Relive the memories from past Helpston Beer Festivals. Browse through 
            our collection of photos capturing the community spirit, great beer, 
            and unforgettable moments.
          </p>
        </div>

        {/* Albums Grid */}
        {albums.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {albums.map((album) => (
              <Link
                key={album.slug}
                href={`/gallery/${album.year}`}
                className="group block"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                  {album.coverImage ? (
                    <Image
                      src={album.coverImage}
                      alt={album.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <Camera size={48} className="text-gray-600" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-2xl font-bold text-white mb-1">{album.title}</h2>
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <Calendar size={14} />
                      <span>{album.year}</span>
                      <span className="text-gray-500">•</span>
                      <Camera size={14} />
                      <span>{album.images.length} photos</span>
                    </div>
                  </div>
                </div>
                {album.description && (
                  <p className="text-gray-400 line-clamp-2">{album.description}</p>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-900/30 rounded-xl">
            <Camera size={64} className="mx-auto mb-6 text-gray-600" />
            <h2 className="text-2xl font-bold text-white mb-3">Gallery Coming Soon</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              We&apos;re currently gathering photos from past festivals. 
              Check back soon to see our collection of memories!
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gray-900/50 border border-gray-800 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-3">Have Photos to Share?</h3>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            If you took photos at any of our festivals and would like to contribute 
            to our gallery, we&apos;d love to hear from you!
          </p>
          <a
            href="mailto:stuartbunn59@hotmail.com?subject=Beer%20Festival%20Photos"
            className="inline-flex items-center gap-2 px-6 py-3 bg-highlight text-black font-semibold rounded-lg hover:bg-highlight/90 transition-colors"
          >
            <Camera size={20} />
            Share Your Photos
          </a>
        </div>
      </div>
    </Container>
  );
}
