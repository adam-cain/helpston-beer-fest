/**
 * ============================================================================
 * HOMEPAGE
 * ============================================================================
 * 
 * The main landing page for the Helpston Beer Festival website.
 * Content is managed via Keystatic CMS at /keystatic
 * 
 * Features:
 * - Animated hero with image slideshow
 * - Feature sections for charity, location, food, music, sponsors
 * - All content is editable via CMS
 */

import Image from "next/image";
import FeatureSection from "@/components/FeatureSection";
import Map from "@/components/Maps";
import Link from "next/link";
import FlyerPopup from "@/components/FlyerPopup";
import HomeHero from "@/components/HomeHero";
import { getSiteSettings, getHomepageContent, formatEventDate } from "@/lib/content/reader";

export default async function Home() {
  // Fetch content from CMS
  const [settings, content] = await Promise.all([
    getSiteSettings(),
    getHomepageContent(),
  ]);

  // Format the event date
  const formattedDate = formatEventDate(settings.eventDate);

  return (
    <div className="items-center justify-items-center min-h-screen">
      <main className="size-full flex flex-col items-center">
        <FlyerPopup popupId="beer-fest-flyer" />
        
        {/* Hero Section */}
        <HomeHero 
          title={content.heroTitle} 
          eventDate={formattedDate}
        />

        {/* Charity Section */}
        <div className="size-full">
          <FeatureSection
            subTitle={content.charitySection.subtitle || "Charity"}
            title={content.charitySection.title || "Little Miracles"}
            description={
              <>
                {content.charitySection.description?.split('. ').map((sentence, i, arr) => (
                  <span key={i}>
                    {sentence}{i < arr.length - 1 ? '. ' : ''}
                  </span>
                ))}
              </>
            }
            ctaText={content.charitySection.ctaText || "Learn More"}
            link={content.charitySection.ctaLink || "#"}
            visualElement={
              content.charitySection.image && (
                <div className="flex max-h-fit items-center justify-center align-middle object-center place-content-center">
                  <Image
                    alt="Charity logo"
                    src={content.charitySection.image}
                    width={300}
                    height={192}
                  />
                </div>
              )
            }
          />
        </div>

        {/* Location Section */}
        <FeatureSection
          reverse={true}
          subTitle={content.locationSection.subtitle || "Where"}
          title={content.locationSection.title || "Helpston Village Hall"}
          description={
            <>
              {content.locationSection.description?.split('\n\n').map((para, i) => (
                <span key={i}>
                  {para}
                  {i < (content.locationSection.description?.split('\n\n').length || 1) - 1 && (
                    <><br /><br /></>
                  )}
                </span>
              ))}
            </>
          }
          ctaText={content.locationSection.ctaText || "Find Out Where"}
          link={content.locationSection.ctaLink || "https://maps.app.goo.gl/VynhgiMLfBig4Eyn8"}
          visualElement={
            <div className="size-full h-[60vw] sm:h-full">
              <Map />
            </div>
          }
        />

        {/* Food & Drink Section */}
        <FeatureSection
          subTitle={content.foodSection.subtitle || "Food and Drink"}
          title={content.foodSection.title || "Pizza & Beer"}
          description={
            <>
              {content.foodSection.description}
            </>
          }
          ctaText={content.foodSection.ctaText || "Find out more"}
          link={content.foodSection.ctaLink || "/food-and-drink"}
          visualElement={
            content.foodSection.image && (
              <div className="flex max-h-fit items-center justify-center align-middle object-center place-content-center">
                <Image
                  alt="Food at the festival"
                  src={content.foodSection.image}
                  width={400}
                  height={400}
                />
              </div>
            )
          }
        />

        {/* Live Music Section */}
        <FeatureSection
          reverse={true}
          subTitle={content.musicSection.subtitle || "Live Music"}
          title={content.musicSection.title || "The Zephyrs"}
          description={
            <>
              {content.musicSection.description}
            </>
          }
          ctaText={content.musicSection.ctaText || "Discover The Band"}
          link={content.musicSection.ctaLink || "#"}
          visualElement={
            content.musicSection.image && (
              <div className="flex max-h-fit items-center justify-center align-middle object-center place-content-center">
                <Image
                  alt="Live music"
                  src={content.musicSection.image}
                  width={400}
                  height={400}
                />
              </div>
            )
          }
        />

        {/* Sponsors Section */}
        <FeatureSection
          reverse={false}
          subTitle={content.sponsorsSection.subtitle || "Sponsors"}
          title={content.sponsorsSection.title || "Thank You"}
          description={
            <>
              {content.sponsorsSection.description}
              <br />
              <br />
              Interested in becoming a sponsor? Get in touch with us at
              <Link className="font-bold underline mx-1" href={`mailto:${settings.contactEmail}`}>
                {settings.contactEmail}
              </Link>
              for more information. Together, we can make a lasting impact. Cheers to that!
            </>
          }
          ctaText={content.sponsorsSection.ctaText || "Meet Our Generous Sponsors"}
          link={content.sponsorsSection.ctaLink || "/sponsors"}
        />
      </main>
      
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
