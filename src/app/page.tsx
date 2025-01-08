"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Define image list
const images: string[] = [
  "/images/BeerKeg.jpeg",
  "/images/BeerKegs2.jpeg",
  "/images/BeerKegsCloseUp.jpeg",
  "/images/BeerKegsCloseUpInRack.jpeg",
  "/images/BeerKegsInRack.jpeg",
  "/images/BeerKegsinRack2.jpeg",
  "/images/BeerSign.jpeg",
  "/images/DancingOnBar.jpeg",
  "/images/EmptyBar.jpeg",
  "/images/EmptyHall.jpeg",
  "/images/FestivalCandid.jpeg",
  "/images/FestivalCandid2.jpeg",
  "/images/FestivalCandid3.jpeg",
  "/images/LiveMusic.jpeg",
  "/images/PeopleAtBar.jpeg",
  "/images/PeopleCheering.jpeg",
  "/images/PeopleInFestivalDancing.jpeg",
  "/images/PeopleOutsideFestival.jpeg",
  "/images/SignOutsideFestical.jpeg",
  "/images/StaffAtBar.jpeg",
];

export default function Home() {
  // States
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [layers, setLayers] = useState<number[]>([]); // Tracks top & bottom images
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Random delay generator
  const getRandomDelay = (): number => Math.floor(Math.random() * 8000) + 4000; // Random 2-5 sec

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
        setLayers([]); // Clear layers after we settle on the new image
      }, 1500);
    };

    // Schedule the animation with a random delay
    const timeout = setTimeout(startAnimation, getRandomDelay());
    return () => clearTimeout(timeout);
  }, [currentIndex, isAnimating]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16">
      <main className="size-full flex flex-col gap-8 items-center">
        <div className="relative w-full overflow-hidden min-h-[100svh]">
          {images.map((src, index) => {
            // Is this the top (current) image?
            const isTop = layers[0] === index;
            // Is this the bottom (next) image?
            const isBottom = layers[1] === index;

            // If nothing is animating right now, only the true "currentIndex" is visible
            // But if we’re in an animation, we want both top and bottom in the DOM.
            const isVisible =
              index === currentIndex || isTop || isBottom;

            if (!isVisible) return null;

            // We'll use dynamic classes:
            //  - The top image slides out to the right
            //  - The bottom image slides in from the left with a delay
            //  - The final state is the bottom image occupying the screen.
            let classNames = "absolute top-0 left-0 w-full h-full transition-transform ease-in-out duration-[1500ms] ";

            if (isTop) {
              // If this is the top image, it starts at translate-x-0
              // and slides out to translate-x-full when animating
              classNames += isAnimating ? "translate-x-full z-20" : "translate-x-0 z-20";
            } else if (isBottom) {
              // If this is the bottom image, it starts offscreen to the left
              // but after a slight delay, slides into view
              classNames += isAnimating
                ? "translate-x-0 z-10 delay-300"
                : "-translate-x-full z-10 delay-300";
            } else {
              // If not in layers but is currentIndex, it’s just the stable background
              classNames += "translate-x-0 z-0";
            }

            return (
              <Image
                key={index}
                src={src}
                alt={`Image ${index}`}
                fill
                style={{ objectFit: "cover" }}
                className={classNames}
              />
            );
          })}
          <div className="absolute top-0 w-full h-full bg-black opacity-70 z-30"/>
          <div className="absolute bottom-0 flex items-start justify-start text-6xl font-normal z-30 m-6">
            HELPSTON <br/>BEER FESTIVAL...
          </div>
        </div>
        <div className=" bg-accent size-full">Next section</div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}