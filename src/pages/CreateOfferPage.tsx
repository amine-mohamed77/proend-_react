
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const offerSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  location: z.string().min(5, "Location is required"),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  bedroomCount: z.coerce.number().min(1, "Must have at least 1 bedroom"),
  bathroomCount: z.coerce.number().min(0.5, "Must have at least 0.5 bathroom"),
  propertyType: z.string().min(1, "Property type is required"),
  imageUrl: z.string().url("Please enter a valid image URL"),
});

type OfferFormValues = z.infer<typeof offerSchema>;

const propertyTypes = [
  "Studio Apartment",
  "1 Bedroom Apartment",
  "2+ Bedroom Apartment",
  "Shared Room",
  "Private Room in Shared House",
  "Entire House",
];

const CreateOfferPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const form = useForm<OfferFormValues>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      price: 0,
      bedroomCount: 1,
      bathroomCount: 1,
      propertyType: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (values: OfferFormValues) => {
    if (!user) {
      toast.error("You must be logged in to create an offer");
      navigate("/auth");
      return;
    }

    // In a real application, this would submit to a backend API
    // For now, we'll just simulate a successful submission
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Housing offer created successfully!");
      navigate("/offers");
    } catch (error) {
      toast.error("Failed to create offer. Please try again.");
    }
  };

  return (
    <div className="container py-8 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create Housing Offer</CardTitle>
          <CardDescription>
            List your property for students to find and rent
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Modern Studio near University Campus" {...field} />
                    </FormControl>
                    <FormDescription>
                      Create a catchy title that describes your property
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Rent ($)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="50" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="123 University Ave, Seattle" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {propertyTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bedroomCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bedrooms</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bathroomCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bathrooms</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your property in detail..." 
                        className="h-32 resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Include details about amenities, proximity to campus, and any rules
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://example.com/property-image.jpg" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a URL to an image of your property (main photo)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4 flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/offers")}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-housing-blue hover:bg-housing-light-blue"
                >
                  Create Offer
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateOfferPage;
