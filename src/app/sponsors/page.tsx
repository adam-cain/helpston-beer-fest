import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import { Beer } from "lucide-react";

// Define the sponsor type
type Sponsor = {
  name: string;
  url: string;
  imagePath: string;
  imageType: 'png' | 'svg';
  color: 'dark' | 'light';
};

// List of sponsors with their information
const sponsors: Sponsor[] = [
  {
    name: "Village Tribune",
    url: "http://www.villagetribune.org.uk/",
    imagePath: "/images/sponsors/VillageTribune.png",
    imageType: "png",
    color: "light",
  },
  {
    name: "My Therapist Online",
    url: "http://www.mytherapistonline.co.uk/",
    imagePath: "/images/sponsors/MyTherapistOnline.png",
    imageType: "png",
    color: "dark",
  },
  {
    name: "Choice Windows",
    url: "https://choicewindows.info/",
    imagePath: "/images/sponsors/ChoiceWindows.svg",
    imageType: "svg",
    color: "light",
  },
  {
    name: "Orangehouse Renewables",
    url: "https://ohrenewables.co.uk/",
    imagePath: "/images/sponsors/OrangeHouseRenewables.png",
    imageType: "png",
    color: "light",
  },
  {
    name: "Stamford Stone Co",
    url: "http://www.stamfordstone.co.uk/",
    imagePath: "/images/sponsors/StamfordStoneCo.svg",
    imageType: "svg",
    color: "light",
  },
  {
    name: "C & P Motor Services",
    url: "https://www.candpmotorservices.org.uk/",
    imagePath: "/images/sponsors/C&PMotorServices.png",
    imageType: "png",
    color: "light",
  },
  {
    name: "The Bluebell Helpston",
    url: "http://www.bluebellhelpston.co.uk/",
    imagePath: "/images/sponsors/TheBlueBellHelpston.png",
    imageType: "png",
    color: "dark",
  },
  {
    name: "Century Security Services",
    url: "https://www.facebook.com/p/Century-Security-Services-Ltd-61556733500874/",
    imagePath: "/images/sponsors/CenturySecurity.png",
    imageType: "png",
    color: "dark",
  },
  {
    name: "The Thirsty Giraffe",
    url: "https://facebook.com/106426558518116",
    imagePath: "/images/sponsors/TheThirstyGiraffe.png",
    imageType: "png",
    color: "light",
  },
  {
    name: "The Frothblowers",
    url: "http://www.facebook.com/frothblower",
    imagePath: "/images/sponsors/TheFrothBlowers.png",
    imageType: "png",
    color: "light",
  },
  {
    name: "CMIS Financial Planning",
    url: "https://cmisifa.co.uk/",
    imagePath: "/images/sponsors/CMIS.png",
    imageType: "png",
    color: "light",
  },
  {
    name: "Paper Rhino",
    url: "https://paperrhino.co.uk/",
    imagePath: "/images/sponsors/PaperRhino.png",
    imageType: "png",
    color: "light",
  },
  {
    name: "Pet Stop",
    url: "https://petstopmarketdeeping.co.uk/",
    imagePath: "/images/sponsors/PetStop.png",
    imageType: "png",
    color: "light",
  },
  {
    name: "Nene Overland",
    url: "https://neneoverland.co.uk/",
    imagePath: "/images/sponsors/NeneOverland.png",
    imageType: "png",
    color: "dark",
  },
  {
    name: "Oakham Ales",
    url: "https://www.oakhamales.com/",
    imagePath: "/images/sponsors/Oakham.svg",
    imageType: "svg",
    color: "light",
  },
  {
    name: "Plant Fencing",
    url: "http://www.plantfencing.com/index.html",
    imagePath: "/images/sponsors/PlantFencing.png",
    imageType: "png",
    color: "light",
  },
  {
    name: "Grasmere Farm",
    url: "https://www.grasmere-farm.co.uk/",
    imagePath: "/images/sponsors/Grasmere.svg",
    imageType: "svg",
    color: "light",
  },
  {
    name: "P&M Pumps",
    url: "https://www.pumpmix.co.uk/",
    imagePath: "/images/sponsors/P&MPumps.png",
    imageType: "png",
    color: "light",
  },
  {
    name: "SA Building and Developments",
    url: "https://www.mybuilder.com/profile/sa_building_and_developments_ltd",
    imagePath: "/images/sponsors/SABuilding.png",
    imageType: "png",
    color: "light",
  },
  {
    name: "RHAB Contractors",
    url: "https://www.facebook.com/rhabcontractors/?locale=en_GB",
    imagePath: "/images/sponsors/RHABFencing.png",
    imageType: "png",
    color: "light",
  },
];

const SponsorCard = ({ sponsor }: { sponsor: Sponsor }) => (
  <Link 
    href={sponsor.url} 
    target="_blank" 
    rel="noopener noreferrer"
    className={`flex flex-col items-center p-6 rounded-lg shadow-lg 
               ${sponsor.color === 'dark' ? 'bg-black' : 'bg-white'} 
               backdrop-blur-sm 
               hover:${sponsor.color === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} 
               transition-all duration-300 
               transform hover:-translate-y-1 hover:shadow-xl
               group`}
  >
    <div className="h-40 w-full flex items-center justify-center mb-4 relative ">
      <div className="relative h-full w-full flex items-center justify-center">
        {sponsor.imageType === 'svg' ? (
          <div className="h-32 w-full relative">
            <Image 
              src={sponsor.imagePath} 
              alt={sponsor.name} 
              fill
              style={{ objectFit: 'contain' }}
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="h-32 w-full relative">
            <Image 
              src={sponsor.imagePath} 
              alt={sponsor.name} 
              fill
              style={{ objectFit: 'contain' }}
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
      </div>
    </div>
    <h3 className={`text-lg text-cta normal-case text-center ${sponsor.color === 'dark' ? 'text-white' : 'text-black'}`}>{sponsor.name}</h3>
    <div className={`mt-2 opacity-0 group-hover:opacity-100 transition-opacity ${sponsor.color === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
      <span className="text-sm underline">Visit Website</span>
    </div>
  </Link>
);

export default function Sponsors() {
  return (
    <Container>
      <div className="flex flex-col items-center py-24 md:py-24 min-h-screen">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* <div className="text-center mb-16 relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-10 -z-10">
              <Beer size={300} />
            </div>
            <h1 className="text-5xl md:text-7xl font-normal mb-6 relative">
              OUR <span className="text-highlight">SPONSORS</span>
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-4xl mx-auto">
              The Helpston Beer Festival is made possible through the generous support of our sponsors. 
              These local businesses and organizations have come together to help create an unforgettable 
              community experience. We extend our deepest gratitude to each one for their commitment to 
              local culture, community spirit, and of course, great beer!
            </p>
          </div> */}

          {/* <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              <div className="bg-amber-100 p-6 rounded-lg flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
                <Beer className="mb-4 text-amber-600" size={40} />
                <h3 className="font-medium text-xl mb-2">20+ Beer Varieties</h3>
                <p className="text-gray-700">Featuring the finest local and regional ales</p>
              </div>
              <div className="bg-amber-100 p-6 rounded-lg flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
                <Users className="mb-4 text-amber-600" size={40} />
                <h3 className="font-medium text-xl mb-2">Community Event</h3>
                <p className="text-gray-700">Bringing together hundreds of visitors each year</p>
              </div>
              <div className="bg-amber-100 p-6 rounded-lg flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
                <Heart className="mb-4 text-amber-600" size={40} />
                <h3 className="font-medium text-xl mb-2">Charity Support</h3>
                <p className="text-gray-700">All proceeds go to local community projects</p>
              </div>
              <div className="bg-amber-100 p-6 rounded-lg flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
                <Award className="mb-4 text-amber-600" size={40} />
                <h3 className="font-medium text-xl mb-2">Award-Winning</h3>
                <p className="text-gray-700">Recognized for excellence in community events</p>
              </div>
            </div>
          </div> */}

          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl text-title mb-6">Our Valued Partners</h2>
              <p className="text-xl text-body mb-4 max-w-4xl mx-auto">
                Each of our sponsors plays an equal and crucial role in making the Helpston Beer Festival happen. 
                Without their generous support, this beloved community event would not be possible. 
                Please take a moment to explore our sponsors and support their businesses as they have supported us.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sponsors.map((sponsor, index) => (
                <SponsorCard key={index} sponsor={sponsor} />
              ))}
            </div>
          </div>

          <div className="bg-highlight text-white rounded-lg p-8 shadow-xl max-w-4xl mx-auto mb-12 relative">
            <div className="absolute top-0 right-0 opacity-10">
              <Beer size={200} />
            </div>
            <h2 className="text-4xl text-title mb-6 relative z-10">Become a Sponsor</h2>
            <p className="text-xl text-body mb-8 relative z-10">
              Interested in becoming a sponsor for next year&apos;s Helpston Beer Festival? 
              Join our community of supporters and gain visibility while helping to make
              this beloved community event a success.
            </p>
            <p className="text-stone-900">
              For sponsorship inquiries, please email <a href="mailto:stuartbunn59@hotmail.com" className="bg-stone-900 text-highlight hover:underline px-3 py-2 ml-1">stuartbunn59@hotmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}