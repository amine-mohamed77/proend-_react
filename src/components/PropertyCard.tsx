
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";

interface PropertyCardProps {
  id: string;
  type: "offer" | "demand";
  title: string;
  location: string;
  price: number;
  bedroomCount: number;
  bathroomCount: number;
  imageUrl: string;
  isNearby?: boolean;
  isRecommended?: boolean;
}

const PropertyCard = ({
  id,
  type,
  title,
  location,
  price,
  bedroomCount,
  bathroomCount,
  imageUrl,
  isNearby,
  isRecommended,
}: PropertyCardProps) => {
  const linkPath = type === "offer" ? `/offers/${id}` : `/demands/${id}`;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <Link to={linkPath} className="block">
        <div className="relative">
          <img 
            src={imageUrl} 
            alt={title} 
            className="h-48 w-full object-cover"
          />
          <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-100">
            <Heart className="h-4 w-4 text-gray-500 hover:text-housing-orange" />
          </button>
          {isRecommended && (
            <Badge className="absolute top-2 left-2 bg-housing-blue hover:bg-housing-blue">
              Recommended
            </Badge>
          )}
          {isNearby && (
            <Badge variant="outline" className="absolute top-2 left-2 bg-white">
              Nearby
            </Badge>
          )}
        </div>
      </Link>
      
      <CardContent className="pt-4">
        <div className="flex justify-between mb-1">
          <h3 className="font-semibold truncate">{title}</h3>
          <span className="text-housing-blue font-bold">${price}/mo</span>
        </div>
        <p className="text-sm text-gray-500 mb-2">{location}</p>
        <div className="flex items-center text-sm text-gray-600 space-x-4">
          <span>{bedroomCount} {bedroomCount === 1 ? 'Bedroom' : 'Bedrooms'}</span>
          <span>•</span>
          <span>{bathroomCount} {bathroomCount === 1 ? 'Bathroom' : 'Bathrooms'}</span>
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-3 pb-3 text-xs text-gray-500">
        {type === "offer" ? "Listed by Owner" : "Student Request"}
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
