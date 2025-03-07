"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import FeatureSection from "@/components/FeatureSection";
import Map from "@/components/Maps";
import Link from "next/link";

// Define image list
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
    <div className="items-center justify-items-center min-h-screen">
      <main className="size-full flex flex-col items-center">
        <div className="relative w-full overflow-hidden min-h-[100svh]">
          {images.map((src, index) => {
            // Is this the top (current) image?
            const isTop = layers[0] === index;
            // Is this the bottom (next) image?
            const isBottom = layers[1] === index;

            // If nothing is animating right now, only the true "currentIndex" is visible
            // But if we&apos;re in an animation, we want both top and bottom in the DOM.
            const isVisible =
              index === currentIndex || isTop || isBottom;

            if (!isVisible) return null;

            // We&apos;ll use dynamic classes:
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
              // If not in layers but is currentIndex, it&apos;s just the stable background
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
          <div className="absolute top-0 w-full h-full bg-black opacity-40 z-30" />
          <div className="absolute bottom-0 flex items-start justify-start z-30 m-6 flex-col gap-2">
            <span className="text-6xl md:text-8xl lg:text-9xl font-normal">
              HELPSTON
              <br />BEER FESTIVAL
            </span>
            <span className="text-xl md:text-3xl lg:text-4xl  font-extralight ml-1 md:ml-2">
              March 22nd 2025
            </span>
          </div>
        </div>

        <div className="size-full">
          <FeatureSection
            subTitle={"Charity"}
            title={"Little Miracles"} description={<>This beer festival isn&apos;t just about great brews—it&apos;s about making a real impact. <b>Proceeds from this year&apos;s event will benefit Little Miracles and other local charities</b>. Little Miracles are a charity dedicated to helping families with children who have additional needs, disabilities, or life-limiting conditions.</>}
            ctaText={"Little Miracles"}
            link={"https://www.littlemiraclescharity.org.uk/"}
            visualElement={
              <div className="flex max-h-fit items-center justify-center align-middle object-center place-content-center">
                <Image
                  alt="Little miracles charity logo"
                  src={"/other/charity.png"}
                  width={300}
                  height={192} />
              </div>}
          />
        </div>
        <FeatureSection
          reverse={true}
          subTitle={"Where"}
          title={"Helpston Village Hall"} description={<>The Beer Festival is hosted at <b>Helpston Village Hall</b>, centrally located in the village of Helpston near Peterborough. 
          <br /><br />
          The venue is <b>easy to access</b>, with a local bus route passing directly through the village, ensuring convenient transport options for attendees. There is <b>limited on street parking</b> for those driving to the event.</>}
          ctaText={"Found Out Where"}
          link={"https://maps.app.goo.gl/VynhgiMLfBig4Eyn8"}
          visualElement={
            <div className="size-full h-[60vw] sm:h-full">
              <Map></Map>
            </div>}
        />
        <FeatureSection
          subTitle={"Food and Drink"}
          title={"Pizza & Beer"}
          description={
            <>
              Enjoy <b>ales and beers from 7 local breweries</b>, perfectly paired with fresh, authentic, wood-fired pizza from <Link href="http://www.amolapizza.uk/"><b>Amo La Pizza</b></Link>&apos;s iconic pizza van.

              <br /><br />
              Grasmere Farm will also be joining us with their delicious <Link href="https://www.grasmere-farm.co.uk/product/grasmere-grunta-our-signature-snack-salami/"><b>Grasmere Grunta Signature Snack Salami</b></Link>, plus providing a hamper as a prize for our Friday night quiz.

              <br /><br />
              Topped off with fresh, hot donuts from <Link href="https://www.facebook.com/share/18h1MGNbvc/"><b>Shelley Bibby</b></Link>—could it get any better?
            </>
          }
          ctaText={"Find out more"}
          link={"http://www.amolapizza.uk/"}
          visualElement={
            <div className="flex max-h-fit items-center justify-center align-middle object-center place-content-center">
              <Image
                alt="Pizza van"
                src={"/images/food/pizza-van.jpg"}
                width={400}
                height={400}
              />
            </div>
          }
        />
        <FeatureSection
          reverse={true}
          subTitle={"Live Music"}
          title={"The Zephyrs"}
          description={
            <>
              Join us for an unforgettable evening with <strong>The Zephyrs</strong>, a local band from the Peterborough area, known for their energetic performances and captivating mix of classic rock and popular hits.
              <br /><br />

              Don&apos;t miss their live set starting at <b>7:30 pm this Saturday!</b>
            </>}
          ctaText={"Discover The Band"}
          link={"https://www.facebook.com/p/The-Zephyrs-100077795577286/"}
          visualElement={
            <div className="flex max-h-fit items-center justify-center align-middle object-center place-content-center">
              <Image
                alt="The Zephyrs"
                src={"/other/zephyrs.jpg"}
                width={400}
                height={400} />
            </div>}
        />
        <FeatureSection
          reverse={false}
          subTitle={"Sponsors"}
          title={"Thank You"} description={<>We couldn&apos;t raise a glass or bring this incredible charity beer festival to life without the amazing support of our sponsors. Their generosity helps us create a memorable experience for our community while raising funds for important causes. From providing the finest craft brews to supporting our event logistics, our sponsors make it all happen.
            {/* <br />
            <br />
            If you&apos;d like to join this fantastic group and help make a difference, we&apos;d love to hear from you! Sponsoring our festival is a wonderful way to give back. */}
            <br />
            <br />

            Interested in becoming a sponsor? Get in touch with us at
            <Link className="font-bold underline mx-1" href={"mailto:stuartbunn59@hotmail.com"}>stuartbunn59@hotmail.com</Link>for more information. Together, we can make a lasting impact. Cheers to that!</>}
          ctaText={"Meet Our Generous Sponsors"}
          link={"/sponsors"}
        />

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}

// * About the Charity - Little Miracles main beneficiary
// * How to get there,
// - Bus timetable: public/other/BusTimetables.pdf
// - what 3 words: https://w3w.co/helpless.conforms.wealth
// - google maps: https://maps.app.goo.gl/VynhgiMLfBig4Eyn8
// * Food and Drink
// - Pizza Van - http://www.amolapizza.uk/?fbclid=IwZXh0bgNhZW0CMTEAAR36dEvDZ8Cpia-HE4s4v5iK59sRl5QUAG75ohWIDtFMnMxJa7xj9kP3UJA_aem_teNgZzcbWX5xsvUbp-Y1RQ&sfnsn=scwspwa
// - Beer selection
// * Sponsors ~12
// 