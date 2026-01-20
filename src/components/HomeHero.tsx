/**
 * ============================================================================
 * HOME HERO COMPONENT
 * ============================================================================
 * 
 * Animated hero section with background image slideshow.
 * This is a client component to handle the animation state.
 */

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Hero background images
const images: string[] = [
  "/images/frontpage/BeerKeg.jpeg",
  "/images/frontpage/BeerKegs2.jpeg",
  "/images/frontpage/BeerKegsCloseUp.jpeg",
  "/images/frontpage/BeerKegsCloseUpInRack.jpeg",
  "/images/frontpage/BeerKegsInRack.jpeg",
  "/images/frontpage/BeerKegsinRack2.jpeg",
  "/images/frontpage/BeerSign.jpeg",
  "/images/frontpage/DancingOnBar.jpeg",
  "/images/frontpage/EmptyBar.jpeg",
  "/images/frontpage/EmptyHall.jpeg",
  "/images/frontpage/FestivalCandid.jpeg",
  "/images/frontpage/FestivalCandid2.jpeg",
  "/images/frontpage/FestivalCandid3.jpeg",
  "/images/frontpage/LiveMusic.jpeg",
  "/images/frontpage/PeopleAtBar.jpeg",
  "/images/frontpage/PeopleCheering.jpeg",
  "/images/frontpage/PeopleInFestivalDancing.jpeg",
  "/images/frontpage/PeopleOutsideFestival.jpeg",
  "/images/frontpage/SignOutsideFestival.jpeg",
  "/images/frontpage/StaffAtBar.jpeg",
];

type HomeHeroProps = {
  title: string;
  eventDate: string;
};

export default function HomeHero({ title, eventDate }: HomeHeroProps) {
  // States for animation
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [layers, setLayers] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Random delay generator
  const getRandomDelay = (): number => Math.floor(Math.random() * 8000) + 4000;

  useEffect(() => {
    const startAnimation = () => {
      if (isAnimating) return;
      setIsAnimating(true);

      // Identify current (top) and next (bottom) images
      const nextIndex = (currentIndex + 1) % images.length;
      setLayers([currentIndex, nextIndex]);

      // After animation is done, update currentIndex
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setIsAnimating(false);
        setLayers([]);
      }, 1500);
    };

    // Schedule the animation with a random delay
    const timeout = setTimeout(startAnimation, getRandomDelay());
    return () => clearTimeout(timeout);
  }, [currentIndex, isAnimating]);

  // Split title: First word on first line, rest on second line
  const firstWord = title.split(' ')[0];
  const restOfTitle = title.split(' ').slice(1).join(' ');

  return (
    <div className="relative w-full overflow-hidden min-h-[100svh]">
      {images.map((src, index) => {
        // Is this the top (current) image?
        const isTop = layers[0] === index;
        // Is this the bottom (next) image?
        const isBottom = layers[1] === index;

        // Determine visibility
        const isVisible = index === currentIndex || isTop || isBottom;

        if (!isVisible) return null;

        // Dynamic classes for animation
        let classNames = "absolute top-0 left-0 w-full h-full transition-transform ease-in-out duration-[1500ms] ";

        if (isTop) {
          classNames += isAnimating ? "translate-x-full z-20" : "translate-x-0 z-20";
        } else if (isBottom) {
          classNames += isAnimating
            ? "translate-x-0 z-10 delay-300"
            : "-translate-x-full z-10 delay-300";
        } else {
          classNames += "translate-x-0 z-0";
        }

        return (
          <Image
            key={index}
            src={src}
            alt={`Festival image ${index + 1}`}
            fill
            style={{ objectFit: "cover" }}
            className={classNames}
            priority={index === 0}
          />
        );
      })}
      
      {/* Overlay */}
      <div className="absolute top-0 w-full h-full bg-black opacity-40 z-30" />
      
      {/* Content */}
      <div className="absolute bottom-0 flex items-start justify-start z-30 m-3 sm:m-6 flex-col gap-2">
        <span className="text-6xl md:text-8xl lg:text-9xl text-display">
          {firstWord}
          <br />
          {restOfTitle}
        </span>
        <span className="text-xl md:text-3xl lg:text-4xl text-meta ml-1 md:ml-2">
          {eventDate}
        </span>
      </div>
    </div>
  );
}
