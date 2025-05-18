import { useState } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus } from "lucide-react";

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
  {
    id: "103",
    type: "demand" as const,
    title: "3 Students Looking for Apartment",
    location: "Within 1 mile of Central Campus",
    price: 1500,
    bedroomCount: 3,
    bathroomCount: 2,
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625"
  },
  {
    id: "104",
    type: "demand" as const,
    title: "PhD Student Looking for Quiet Studio",
    location: "Research Campus area",
    price: 900,
    bedroomCount: 1,
    bathroomCount: 1,
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
  },
  {
    id: "105",
    type: "demand" as const,
    title: "International Student Group Needs Housing",
    location: "Close to International Center",
    price: 2000,
    bedroomCount: 4,
    bathroomCount: 2,
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625"
  },
  {
    id: "106",
    type: "demand" as const,
    title: "Business Major Seeking Roommate",
    location: "Downtown Campus Area",
    price: 700,
    bedroomCount: 2,
    bathroomCount: 1,
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
  },
];

const DemandsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Student Housing Demands</h1>
        <Button className="bg-housing-orange hover:bg-orange-600" asChild>
          <Link to="/create-demand">
            <Plus className="mr-2 h-4 w-4" />
            Post Your Demand
          </Link>
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="w-full md:w-64 lg:w-96">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search housing demands..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="w-full md:w-48">
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="studio">Studio Apartments</SelectItem>
              <SelectItem value="shared">Shared Apartments</SelectItem>
              <SelectItem value="house">Houses</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-48">
          <Select defaultValue="newest">
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="budget_high">Budget: High to Low</SelectItem>
              <SelectItem value="budget_low">Budget: Low to High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockDemands.map((demand) => (
          <PropertyCard key={demand.id} {...demand} />
        ))}
      </div>
      
      <div className="mt-8 flex justify-center">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  );
};

export default DemandsPage;
