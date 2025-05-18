
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertyCard from "@/components/PropertyCard";
import { Search } from "lucide-react";

// Mock data for the housing offers
const mockOffers = [
  {
    id: "1",
    type: "offer" as const,
    title: "Modern Studio near UW Campus",
    location: "123 University Ave, Seattle",
    price: 950,
    bedroomCount: 1,
    bathroomCount: 1,
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    isRecommended: true
  },
  {
    id: "2",
    type: "offer" as const,
    title: "Shared 2BR Apartment",
    location: "456 College St, Seattle",
    price: 750,
    bedroomCount: 2,
    bathroomCount: 1,
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    isNearby: true
  },
  {
    id: "3",
    type: "offer" as const,
    title: "Luxury 1BR with Campus View",
    location: "789 Graduate Ave, Seattle",
    price: 1200,
    bedroomCount: 1,
    bathroomCount: 1,
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    isRecommended: true
  },
  {
    id: "4",
    type: "offer" as const,
    title: "Cozy Room in Shared House",
    location: "101 Student Lane, Seattle",
    price: 600,
    bedroomCount: 1,
    bathroomCount: 0.5,
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    isNearby: true
  },
];

// Mock data for the housing demands
const mockDemands = [
  {
    id: "101",
    type: "demand" as const,
    title: "Looking for Studio near Business School",
    location: "UW Business School area",
    price: 800,
    bedroomCount: 1,
    bathroomCount: 1,
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
  },
  {
    id: "102",
    type: "demand" as const,
    title: "Engineering Student needs Room",
    location: "Engineering Campus vicinity",
    price: 600,
    bedroomCount: 1,
    bathroomCount: 1,
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-housing-blue to-housing-light-blue text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect University Housing</h1>
          <p className="text-xl opacity-90 mb-8">
            Connect with property owners and find the ideal living space near your campus.
          </p>
          
          <form onSubmit={handleSearch} className="flex max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by university, area or zip code..."
                className="pl-9 pr-4 py-6 rounded-l-md w-full border-0 focus-visible:ring-offset-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              className="rounded-l-none bg-housing-orange hover:bg-orange-500 px-6"
            >
              Search
            </Button>
          </form>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6">Housing Options</h2>
          
          <Tabs defaultValue="recommended">
            <TabsList className="mb-8">
              <TabsTrigger value="recommended">Recommended For You</TabsTrigger>
              <TabsTrigger value="nearby">Near Your University</TabsTrigger>
              <TabsTrigger value="new">New Listings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recommended" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mockOffers.filter(offer => offer.isRecommended).map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </div>
              <div className="text-center">
                <Button 
                  variant="outline" 
                  asChild
                  className="mt-4"
                >
                  <Link to="/offers">View All Recommendations</Link>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="nearby" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mockOffers.filter(offer => offer.isNearby).map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </div>
              <div className="text-center">
                <Button 
                  variant="outline" 
                  asChild
                  className="mt-4"
                >
                  <Link to="/offers">View All Nearby</Link>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="new" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mockOffers.slice(0, 2).map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </div>
              <div className="text-center">
                <Button 
                  variant="outline" 
                  asChild
                  className="mt-4"
                >
                  <Link to="/offers">View All New Listings</Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Recent Student Demands */}
      <section className="py-12 bg-gray-50 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recent Student Demands</h2>
            <Button variant="outline" asChild>
              <Link to="/demands">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockDemands.map((demand) => (
              <PropertyCard key={demand.id} {...demand} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-housing-blue text-white py-16 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Are You a Property Owner?</h2>
          <p className="text-lg mb-8 opacity-90">
            List your property and connect with university students looking for housing solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white text-housing-blue hover:bg-gray-100">
              List Your Property
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-housing-light-blue">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
