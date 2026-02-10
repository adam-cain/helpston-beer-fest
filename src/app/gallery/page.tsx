/**
 * ============================================================================
 * GALLERY INDEX PAGE
 * ============================================================================
 * 
 * Displays all gallery albums organized by year.
 * Styled to match the homepage editorial aesthetic.
 */

import CTAButton from '@/components/CTAButton';
import { getGalleryAlbums } from '@/lib/content/reader';
import Image from 'next/image';
import Link from 'next/link';
import { Camera, Calendar } from 'lucide-react';

export default async function GalleryPage() {
  const albums = await getGalleryAlbums();

  return (
    <main className="pt-16 min-h-screen">
      {/* Page Header */}
      <div className="py-12 text-center">
        <h1 className="text-5xl lg:text-6xl text-display mb-6">Festival Gallery</h1>
        <p className="text-xl text-body text-white/60 max-w-3xl mx-auto px-4">
          Relive the memories from past Helpston Beer Festivals. Browse through 
          our collection of photos capturing the community spirit, great beer, 
          and unforgettable moments.
        </p>
      </div>

      {/* Albums Grid — white background */}
      <div className="bg-white text-black">
        <div className="container mx-auto px-4 py-12 lg:px-32 xl:px-48">
          {albums.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {albums.map((album) => (
                <Link
                  key={album.slug}
                  href={`/gallery/${album.year}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden mb-4">
                    {album.coverImage ? (
                      <Image
                        src={album.coverImage}
                        alt={album.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-black/5 flex items-center justify-center">
                        <Camera size={48} className="text-black/20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h2 className="text-2xl text-title text-white mb-1">{album.title}</h2>
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Calendar size={14} />
                        <span>{album.year}</span>
                        <span className="text-white/30">|</span>
                        <Camera size={14} />
                        <span>{album.images.length} photos</span>
                      </div>
                    </div>
                  </div>
                  {album.description && (
                    <p className="text-body text-black/60 line-clamp-2">{album.description}</p>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Camera size={64} className="mx-auto mb-6 text-black/20" />
              <h2 className="text-4xl text-title mb-4">Gallery Coming Soon</h2>
              <p className="text-body text-black/60 max-w-md mx-auto">
                We&apos;re currently gathering photos from past festivals. 
                Check back soon to see our collection of memories!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Call to Action — dark section */}
      <div className="container mx-auto px-4 py-12 lg:px-32 xl:px-48">
        <div className="flex flex-col gap-5">
          <p className="text-label">Contribute</p>
          <h3 className="text-4xl lg:text-5xl text-title text-balance">Have Photos to Share?</h3>
          <div className="text-[clamp(1rem,0.442vw+0.896rem,1.25rem)] text-body text-balance text-white/60">
            If you took photos at any of our festivals and would like to contribute 
            to our gallery, we&apos;d love to hear from you!
          </div>
          <div>
            <CTAButton href="mailto:stuartbunn59@hotmail.com?subject=Beer%20Festival%20Photos" reverse={false}>
              Share Your Photos
            </CTAButton>
          </div>
        </div>
      </div>
    </main>
  );
}
