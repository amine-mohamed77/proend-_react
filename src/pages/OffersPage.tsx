import { useState } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "@/components/PropertyCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, SlidersHorizontal, Plus } from "lucide-react";

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
  },
  {
    id: "5",
    type: "offer" as const,
    title: "3BR House for Student Group",
    location: "202 Campus Way, Seattle",
    price: 1800,
    bedroomCount: 3,
    bathroomCount: 2,
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
  },
  {
    id: "6",
    type: "offer" as const,
    title: "Modern Loft near Business School",
    location: "303 Scholar Street, Seattle",
    price: 1100,
    bedroomCount: 1,
    bathroomCount: 1,
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
  },
  {
    id: "7",
    type: "offer" as const,
    title: "Budget Studio for Students",
    location: "404 Academic Blvd, Seattle",
    price: 850,
    bedroomCount: 1,
    bathroomCount: 1,
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  },
  {
    id: "8",
    type: "offer" as const,
    title: "Premium Apartment with Gym",
    location: "505 Degree Drive, Seattle",
    price: 1400,
    bedroomCount: 2,
    bathroomCount: 2,
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  },
];

const OffersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([500, 1500]);
  const [bedrooms, setBedrooms] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Housing Offers</h1>
        <Button className="bg-housing-blue hover:bg-housing-light-blue" asChild>
          <Link to="/create-offer">
            <Plus className="mr-2 h-4 w-4" />
            Post Your Offer
          </Link>
        </Button>
      </div>
      
      <div className="flex justify-between items-start gap-4 flex-col md:flex-row mb-8">
        <div className="w-full md:w-64 lg:w-96">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search housing offers..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>
      
      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price Range</label>
            <div className="px-3">
              <Slider
                defaultValue={[500, 1500]}
                min={0}
                max={3000}
                step={50}
                value={priceRange}
                onValueChange={setPriceRange}
              />
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Bedrooms</label>
            <Select value={bedrooms} onValueChange={setBedrooms}>
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3+">3+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Sort By</label>
            <Select defaultValue="recommended">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="md:col-span-3 flex justify-end">
            <Button className="bg-housing-blue hover:bg-housing-light-blue">Apply Filters</Button>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockOffers.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
      
      <div className="mt-8 flex justify-center">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  );
};

export default OffersPage;
