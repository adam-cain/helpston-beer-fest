/**
 * ============================================================================
 * GALLERY GRID COMPONENT
 * ============================================================================
 * 
 * Displays a grid of images with lightbox functionality.
 * Styled with sharp corners to match the editorial design system.
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

type GalleryImage = {
  image: string;
  caption: string | null;
  photographer: string | null;
};

type GalleryGridProps = {
  images: GalleryImage[];
  albumTitle?: string;
};

/**
 * GalleryGrid — renders a masonry-style photo grid with lightbox
 * Inputs: images (array of gallery image objects), albumTitle (string for alt text)
 * Outputs: Interactive grid with click-to-open lightbox, keyboard navigation
 */
export default function GalleryGrid({ images, albumTitle }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  /** Opens the lightbox at a given index and locks body scroll */
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  /** Closes the lightbox and restores body scroll */
  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = 'unset';
  };

  /** Navigate to previous image, wrapping at the start */
  const goToPrevious = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === 0 ? images.length - 1 : lightboxIndex - 1);
  };

  /** Navigate to next image, wrapping at the end */
  const goToNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === images.length - 1 ? 0 : lightboxIndex + 1);
  };

  /** Handle keyboard navigation within the lightbox */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="relative aspect-square overflow-hidden group cursor-pointer focus:outline-none focus:ring-2 focus:ring-highlight"
          >
            <Image
              src={img.image}
              alt={img.caption || `${albumTitle} photo ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
            {img.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-sm truncate">{img.caption}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/40 hover:text-white transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/40 hover:text-white transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={48} />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/40 hover:text-white transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight size={48} />
          </button>

          {/* Image */}
          <div
            className="relative max-w-[90vw] max-h-[85vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex].image}
              alt={images[lightboxIndex].caption || `Photo ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* Caption */}
          {(images[lightboxIndex].caption || images[lightboxIndex].photographer) && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center px-6 py-3 bg-black/60 max-w-lg">
              {images[lightboxIndex].caption && (
                <p className="text-white text-body">{images[lightboxIndex].caption}</p>
              )}
              {images[lightboxIndex].photographer && (
                <p className="text-white/40 text-meta mt-1">
                  Photo by {images[lightboxIndex].photographer}
                </p>
              )}
            </div>
          )}

          {/* Counter */}
          <div className="absolute top-4 left-4 text-white/40 text-meta">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
