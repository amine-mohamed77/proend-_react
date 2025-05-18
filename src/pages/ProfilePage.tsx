
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import PropertyCard from "@/components/PropertyCard";
import { Settings, Star } from "lucide-react";

// Mock data for the current user
const userData = {
  name: "Alex Johnson",
  email: "alex@university.edu",
  university: "University of Washington",
  type: "Student",
  joinedDate: "September 2022",
  bio: "Computer Science major looking for affordable housing near campus. I'm clean, quiet, and respectful of shared spaces.",
  image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
  rating: 4.7
};

// Mock data for the wishlist
const wishlistItems = [
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
    id: "3",
    type: "offer" as const,
    title: "Luxury 1BR with Campus View",
    location: "789 Graduate Ave, Seattle",
    price: 1200,
    bedroomCount: 1,
    bathroomCount: 1,
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  }
];

// Mock data for the user's housing posts
const userPosts = [
  {
    id: "101",
    type: "demand" as const,
    title: "Looking for Studio near Business School",
    location: "UW Business School area",
    price: 800,
    bedroomCount: 1,
    bathroomCount: 1,
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    status: "Active"
  }
];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  
  return (
    <div className="container py-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-2 border-white shadow">
            <AvatarImage src={userData.image} alt={userData.name} />
            <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{userData.name}</h1>
              <Badge className="bg-housing-blue">{userData.type}</Badge>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Star className="h-4 w-4 text-housing-orange fill-housing-orange mr-1" />
              <span>{userData.rating} rating</span>
              <span className="mx-2">•</span>
              <span>Member since {userData.joinedDate}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{userData.university}</p>
          </div>
        </div>
        
        <Button variant="outline" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>
      
      {/* Profile Content */}
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full"
      >
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          <TabsTrigger value="posts">My Posts</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">About Me</h2>
              <p className="text-gray-700 mb-6">{userData.bio}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Personal Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Full Name</span>
                      <span>{userData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Email</span>
                      <span>{userData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">University</span>
                      <span>{userData.university}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Member Since</span>
                      <span>{userData.joinedDate}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Housing Preferences</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Preferred Location</span>
                      <span>Within 1 mile of campus</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Budget</span>
                      <span>$700 - $1000 / month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Room Type</span>
                      <span>Private room or studio</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Move-in Date</span>
                      <span>Flexible</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="wishlist">
          <h2 className="text-xl font-semibold mb-4">My Wishlist</h2>
          {wishlistItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <PropertyCard key={item.id} {...item} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-6 text-center">
                <p className="text-gray-500 mb-4">Your wishlist is empty</p>
                <Button asChild>
                  <Link to="/offers">Browse Housing Offers</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="posts">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">My Housing Posts</h2>
            <Button className="bg-housing-orange hover:bg-orange-600">
              Create New Post
            </Button>
          </div>
          
          {userPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {userPosts.map((post) => (
                <div key={post.id} className="relative">
                  <Badge className="absolute top-2 right-2 z-10 bg-green-500">{post.status}</Badge>
                  <PropertyCard {...post} />
                </div>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-6 text-center">
                <p className="text-gray-500 mb-4">You haven't created any housing posts yet</p>
                <Button>Create Your First Post</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="messages">
          <Card>
            <CardContent className="py-6 text-center">
              <p className="text-gray-500 mb-4">You have no messages yet</p>
              <p className="text-sm text-gray-400">
                When you contact property owners or receive inquiries, your messages will appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Needed for Link component
import { Link } from "react-router-dom";

export default ProfilePage;
