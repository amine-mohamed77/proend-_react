
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  GalleryHorizontal, 
  Heart, 
  Home, 
  MapPin, 
  Share, 
  Star, 
  BookmarkIcon
} from "lucide-react";

// Mock data for a specific offer
const offerDetails = {
  id: "1",
  title: "Modern Studio near UW Campus",
  description: "This beautiful studio apartment is perfect for students. Featuring modern amenities, a fully equipped kitchen, and high-speed internet. The property is located just a 5-minute walk from campus and close to grocery stores, cafes, and public transportation.",
  location: "123 University Ave, Seattle, WA 98105",
  price: 950,
  deposit: 950,
  bedroomCount: 1,
  bathroomCount: 1,
  area: 400,
  availableFrom: "2023-09-01",
  leaseLength: "12 months",
  amenities: [
    "Air Conditioning", "Heating", "High-Speed Internet", "Furnished", 
    "Dishwasher", "Laundry On-Site", "Security System", "Parking Available"
  ],
  nearbyFacilities: [
    "University Campus (5 min walk)", "Grocery Store (2 min walk)", 
    "Gym (7 min walk)", "Bus Stop (3 min walk)", "Library (10 min walk)",
    "Coffee Shop (5 min walk)", "Restaurant (7 min walk)"
  ],
  images: [
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
  ],
  owner: {
    name: "Sarah Johnson",
    rating: 4.8,
    responseRate: "98%",
    responseTime: "within a day",
    memberSince: "2020",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625"
  }
};

const OfferDetailsPage = () => {
  const { id } = useParams();
  const [mainImage, setMainImage] = useState(offerDetails.images[0]);
  
  return (
    <div className="container py-8">
      <div className="flex flex-col md:grid md:grid-cols-3 gap-8">
        {/* Main Content (2/3 width) */}
        <div className="md:col-span-2">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
            <h1 className="text-3xl font-bold">{offerDetails.title}</h1>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Share className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <BookmarkIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center text-gray-500 mb-6">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{offerDetails.location}</span>
          </div>
          
          {/* Photo Gallery */}
          <div className="mb-8">
            <div className="rounded-lg overflow-hidden mb-2 h-80">
              <img 
                src={mainImage} 
                alt={offerDetails.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {offerDetails.images.map((image, index) => (
                <div 
                  key={index}
                  className={`h-20 rounded-md overflow-hidden cursor-pointer 
                    ${mainImage === image ? 'ring-2 ring-housing-blue' : ''}`}
                  onClick={() => setMainImage(image)}
                >
                  <img 
                    src={image} 
                    alt={`${offerDetails.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Details Content */}
          <Tabs defaultValue="description">
            <TabsList className="mb-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">About this property</h3>
                  <p className="text-gray-700">{offerDetails.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center">
                      <Home className="text-housing-blue mr-2 h-5 w-5" />
                      <div>
                        <p className="font-medium">Property Type</p>
                        <p className="text-sm text-gray-500">Studio Apartment</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <GalleryHorizontal className="text-housing-blue mr-2 h-5 w-5" />
                      <div>
                        <p className="font-medium">Area</p>
                        <p className="text-sm text-gray-500">{offerDetails.area} sq ft</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="text-housing-blue mr-2 h-5 w-5" />
                      <div>
                        <p className="font-medium">Available From</p>
                        <p className="text-sm text-gray-500">{offerDetails.availableFrom}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="text-housing-blue mr-2 h-5 w-5" />
                      <div>
                        <p className="font-medium">Lease Length</p>
                        <p className="text-sm text-gray-500">{offerDetails.leaseLength}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="amenities">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Apartment Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
                    {offerDetails.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-housing-blue mr-2"></div>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4 mt-8">Nearby Facilities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                    {offerDetails.nearbyFacilities.map((facility, index) => (
                      <div key={index} className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-housing-orange mr-2"></div>
                        <span>{facility}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="location">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Location</h3>
                  <p className="mb-4">{offerDetails.location}</p>
                  <div className="aspect-video bg-gray-200 w-full rounded flex items-center justify-center">
                    <p className="text-gray-600">Interactive Map Would Go Here</p>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Exact location provided after booking
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar (1/3 width) */}
        <div>
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-2xl font-bold">${offerDetails.price}<span className="text-sm font-normal text-gray-500">/month</span></p>
                  <p className="text-sm text-gray-500">${offerDetails.deposit} security deposit</p>
                </div>
                <Badge className="bg-housing-blue">Available Now</Badge>
              </div>
              
              <div className="border-t border-b py-4 my-4">
                <div className="flex justify-between mb-2">
                  <span>Bedrooms</span>
                  <span className="font-medium">{offerDetails.bedroomCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bathrooms</span>
                  <span className="font-medium">{offerDetails.bathroomCount}</span>
                </div>
              </div>
              
              <Button className="w-full bg-housing-orange hover:bg-orange-600 mb-3">
                Contact Owner
              </Button>
              
              <Button variant="outline" className="w-full">
                Schedule Viewing
              </Button>
              
              <div className="mt-6 flex items-center pt-4 border-t">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                  <img 
                    src={offerDetails.owner.image} 
                    alt={offerDetails.owner.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <p className="font-medium">{offerDetails.owner.name}</p>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-housing-orange fill-housing-orange mr-1" />
                    <span className="text-sm">{offerDetails.owner.rating} · Member since {offerDetails.owner.memberSince}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                <p>Response rate: {offerDetails.owner.responseRate}</p>
                <p>Response time: {offerDetails.owner.responseTime}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OfferDetailsPage;
