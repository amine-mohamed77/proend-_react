
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

const demandSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  location: z.string().min(5, "Desired location is required"),
  budget: z.coerce.number().min(1, "Budget must be greater than 0"),
  bedroomCount: z.coerce.number().min(1, "Must specify at least 1 bedroom"),
  bathroomCount: z.coerce.number().min(0.5, "Must specify at least 0.5 bathroom"),
  preferredType: z.string().min(1, "Preferred property type is required"),
  moveInDate: z.string().min(1, "Move-in date is required"),
  imageUrl: z.string().optional(),
});

type DemandFormValues = z.infer<typeof demandSchema>;

const propertyTypes = [
  "Studio Apartment",
  "1 Bedroom Apartment",
  "2+ Bedroom Apartment",
  "Shared Room",
  "Private Room in Shared House",
  "Entire House",
  "Any Type",
];

const CreateDemandPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const form = useForm<DemandFormValues>({
    resolver: zodResolver(demandSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      budget: 0,
      bedroomCount: 1,
      bathroomCount: 1,
      preferredType: "",
      moveInDate: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (values: DemandFormValues) => {
    if (!user) {
      toast.error("You must be logged in to create a demand");
      navigate("/auth");
      return;
    }

    // In a real application, this would submit to a backend API
    // For now, we'll just simulate a successful submission
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Housing demand created successfully!");
      navigate("/demands");
    } catch (error) {
      toast.error("Failed to create demand. Please try again.");
    }
  };

  return (
    <div className="container py-8 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create Housing Demand</CardTitle>
          <CardDescription>
            Let property owners know what kind of housing you're looking for
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
                      <Input placeholder="Looking for Studio near Business School" {...field} />
                    </FormControl>
                    <FormDescription>
                      Summarize what you're looking for in a short title
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Budget ($)</FormLabel>
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
                      <FormLabel>Desired Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Near Engineering Campus" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="preferredType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Property Type</FormLabel>
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
                      <FormLabel>Bedrooms Needed</FormLabel>
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
                      <FormLabel>Bathrooms Needed</FormLabel>
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
                name="moveInDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Move-in Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe what you're looking for in detail..." 
                        className="h-32 resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Include details about amenities you want, roommates, lease length, etc.
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
                    <FormLabel>Image URL (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://example.com/profile-image.jpg" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      You can optionally add your profile picture or an image of what you're looking for
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4 flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/demands")}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-housing-orange hover:bg-orange-600"
                >
                  Post Demand
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateDemandPage;
