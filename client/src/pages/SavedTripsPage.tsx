import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, MapPin, Calendar, Trash2, Eye, LogIn } from "lucide-react";
import { format } from "date-fns";
import type { SavedItinerary } from "@shared/schema";
import { Link } from "wouter";

export default function SavedTripsPage() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const { data: trips, isLoading } = useQuery<SavedItinerary[]>({
    queryKey: ["/api/itinerary/saved"],
    enabled: isAuthenticated,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/itinerary/saved/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/itinerary/saved"] });
      toast({
        title: "Trip Deleted",
        description: "Your saved trip has been removed.",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to delete trip.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to view your saved trips.",
        variant: "destructive",
      });
    }
  }, [authLoading, isAuthenticated, toast]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardHeader className="text-center">
            <Plane className="w-12 h-12 mx-auto text-primary mb-4" />
            <CardTitle>Sign in to View Saved Trips</CardTitle>
            <CardDescription>
              Log in to access your saved travel itineraries
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <a href="/api/login">
              <Button data-testid="button-login-prompt">
                <LogIn className="w-4 h-4 mr-2" />
                Log in
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Saved Trips</h1>
          <p className="text-muted-foreground">
            View and manage your saved travel itineraries
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2 mt-2" />
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-muted rounded w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : trips && trips.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {trips.map((trip) => (
              <Card key={trip.id} className="hover-elevate" data-testid={`card-trip-${trip.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        {trip.destination}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {trip.duration} {trip.duration === 1 ? "day" : "days"}
                        </span>
                        {trip.startDate && (
                          <span>Starting {trip.startDate}</span>
                        )}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Link href={`/?view=${trip.id}`}>
                      <Button variant="outline" size="sm" data-testid={`button-view-trip-${trip.id}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteMutation.mutate(trip.id)}
                      disabled={deleteMutation.isPending}
                      data-testid={`button-delete-trip-${trip.id}`}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Saved {trip.createdAt ? format(new Date(trip.createdAt), "MMM d, yyyy") : "recently"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <Plane className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No saved trips yet</h3>
              <p className="text-muted-foreground mb-4">
                Generate an itinerary and save it to view it here later.
              </p>
              <Link href="/">
                <Button data-testid="button-plan-trip">
                  Plan a Trip
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
