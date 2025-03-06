// Hi,

// Could you add these to the food section please?

// www.grasmere-farm.co.uk

// In particular to this product they are supplying:
// Grasmere Grunta – Our Signature Snack Salami - Grasmere Farm

// And for providing a hamper as a prize for the for the Friday night quiz.

// Shelley Bibby
// https://www.facebook.com/share/18h1MGNbvc/

// Amos pizza
//

// This should be a link to a donut vender - not a great deal of information, but they are providing hot donuts.

// Cheers

// images directories:
// images/breweries
// images/food

// Front page food and drink section
{/* <FeatureSection
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
      src={"/food/pizza-van.jpg"}
      width={400}
      height={400}
    />
  </div>
}
/> */}

import Image from "next/image";
import Link from "next/link";
import FeatureSection from "@/components/FeatureSection";

export default function FoodAndDrink() {
    return (
        <main className="pt-16 min-h-screen">
            <div className="py-12">
                <h1 className="text-center text-5xl lg:text-6xl mb-6">Food & Drink</h1>
                <p className="text-center text-xl max-w-3xl mx-auto px-4">
                    Enjoy a perfect pairing of local craft beers and delicious food options at our charity beer festival.
                </p>
            </div>

            <FeatureSection
                subTitle={"Local Breweries"}
                title={"7 Amazing Local Breweries"}
                description={
                    <>
                        Our festival proudly features <b>ales and beers from 7 local breweries</b>, offering 
                        a wide variety of flavors and styles to discover. From traditional ales to 
                        innovative craft beers, there's something for every beer enthusiast.
                        
                        <br /><br />
                        
                        Meet the brewers, learn about their craft, and sample some of the finest 
                        beers from our region. Each brewery brings its own unique character and passion 
                        to create an exceptional tasting experience.
                    </>
                }
                ctaText={"View Breweries"}
                link={"/breweries"}
                visualElement={
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <Image
                            alt="Castor Brewery"
                            src={"/images/breweries/castor.png"}
                            width={150}
                            height={150}
                            className="object-contain"
                        />
                        <Image
                            alt="Oakham Ales"
                            src={"/images/breweries/oakham.png"}
                            width={150}
                            height={150}
                            className="object-contain"
                        />
                        <Image
                            alt="Nene Valley Brewery"
                            src={"/images/breweries/nene.png"}
                            width={150}
                            height={150}
                            className="object-contain"
                        />
                        <Image
                            alt="Pot Belly Brewery"
                            src={"/images/breweries/potbelly.png"}
                            width={150}
                            height={150}
                            className="object-contain"
                        />
                        <Image
                            alt="Kings Cliffe Brewery"
                            src={"/images/breweries/KCB.png"}
                            width={150}
                            height={150}
                            className="object-contain"
                        />
                        <Image
                            alt="Bloke Down Brewery"
                            src={"/images/breweries/blokedown.png"}
                            width={150}
                            height={150}
                            className="object-contain"
                        />
                        <Image
                            alt="Bowlers Brewery"
                            src={"/images/breweries/bowlers.png"}
                            width={150}
                            height={150}
                            className="object-contain"
                        />
                    </div>
                }
            />

            <FeatureSection
                reverse={true}
                subTitle={"Wood-Fired Pizza"}
                title={"Amo La Pizza"}
                description={
                    <>
                        Perfectly paired with our local brews, enjoy fresh, authentic, wood-fired pizza from <Link href="http://www.amolapizza.uk/"><b>Amo La Pizza</b></Link>'s iconic pizza van.
                        
                        <br /><br />
                        
                        Amo La Pizza brings traditional Italian flavors made with the finest ingredients, 
                        prepared and cooked right before your eyes in their wood-fired oven. The perfect 
                        complement to a refreshing beer!
                    </>
                }
                ctaText={"Visit Amo La Pizza"}
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
                subTitle={"Local Delicacies"}
                title={"Grasmere Farm"}
                description={
                    <>
                        Grasmere Farm will be joining us with their delicious <Link href="https://www.grasmere-farm.co.uk/product/grasmere-grunta-our-signature-snack-salami/"><b>Grasmere Grunta Signature Snack Salami</b></Link> - the perfect beer snack!
                        
                        <br /><br />
                        
                        Grasmere Farm is also generously providing a hamper as a prize for our Friday night quiz,
                        packed with their quality local products.
                    </>
                }
                ctaText={"Visit Grasmere Farm"}
                link={"https://www.grasmere-farm.co.uk/"}
                visualElement={
                    <div className="flex max-h-fit items-center justify-center align-middle object-center place-content-center">
                    <Image
                        alt="Pizza van"
                        src={"/images/sponsors/grasmere.svg"}
                        width={400}
                        height={400}
                        className="my-6"
                    />
                </div>
                }
            />

            <FeatureSection
                reverse={true}
                subTitle={"Sweet Treats"}
                title={"Fresh, Hot Donuts"}
                description={
                    <>
                        Top off your beer festival experience with fresh, hot donuts from <Link href="https://www.facebook.com/share/18h1MGNbvc/"><b>Shelley Bibby</b></Link>.
                        
                        <br /><br />
                        
                        These delicious treats are made fresh on-site and are the perfect sweet finish 
                        to complement your beer tasting adventure.
                    </>
                }
                ctaText={"Learn More"}
                link={"https://www.facebook.com/share/18h1MGNbvc/"}
                visualElement={
                    <div className="flex max-h-fit items-center justify-center align-middle object-center place-content-center bg-amber-100 p-8 rounded-lg h-full">
                        <h3 className="text-2xl font-bold text-center text-amber-800">
                            Freshly Made<br/>
                            <span className="text-3xl">Hot Donuts</span><br/>
                            <span className="text-lg font-normal">by Shelley Bibby</span>
                        </h3>
                    </div>
                }
            />
        </main>
    );
}