import { format, addDays } from "date-fns";
import DayCard from "./DayCard";
import MapSection from "./MapSection";
import ExportBar from "./ExportBar";
import { Plane, RefreshCw, Save, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useState } from "react";

interface Location {
  id: string;
  name: string;
  type: "restaurant" | "attraction";
  category: string;
  description: string;
  duration?: string;
  time?: string;
  imageUrl?: string;
  transport?: {
    method: string;
    duration: string;
  };
  lat?: number;
  lng?: number;
}

interface DayItinerary {
  dayNumber: number;
  date: Date;
  locations: Location[];
}

interface ItineraryResultsProps {
  destination: string;
  startDate: Date;
  days: DayItinerary[];
  onReset: () => void;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

export default function ItineraryResults({
  destination,
  startDate,
  days,
  onReset,
  onRegenerate,
  isRegenerating,
}: ItineraryResultsProps) {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);

  const saveMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/itinerary/save", {
        destination,
        duration: days.length,
        startDate: format(startDate, "yyyy-MM-dd"),
        itineraryData: { destination, days },
      });
    },
    onSuccess: () => {
      setIsSaved(true);
      queryClient.invalidateQueries({ queryKey: ["/api/itinerary/saved"] });
      toast({
        title: "Trip Saved",
        description: "Your itinerary has been saved to My Trips.",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Login Required",
          description: "Please log in to save your trip.",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to save your trip. Please try again.",
        variant: "destructive",
      });
    },
  });

  const mapLocations = days.flatMap((day) =>
    day.locations
      .filter((loc) => loc.lat && loc.lng)
      .map((loc) => ({
        id: loc.id,
        name: loc.name,
        lat: loc.lat!,
        lng: loc.lng!,
        day: day.dayNumber,
        type: loc.type,
      }))
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card border-b sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <Plane className="w-6 h-6 text-primary" />
              <div>
                <h1 className="text-xl font-bold">{destination}</h1>
                <p className="text-sm text-muted-foreground">
                  {format(startDate, "MMM d")} - {format(addDays(startDate, days.length - 1), "MMM d, yyyy")}
                  {" • "}
                  {days.length} {days.length === 1 ? "day" : "days"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {onRegenerate && (
                <Button
                  variant="secondary"
                  onClick={onRegenerate}
                  disabled={isRegenerating}
                  data-testid="button-regenerate"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isRegenerating ? "Generating..." : "New Ideas"}
                </Button>
              )}
              {isAuthenticated && !isSaved && (
                <Button
                  onClick={() => saveMutation.mutate()}
                  disabled={saveMutation.isPending}
                  data-testid="button-save-trip"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saveMutation.isPending ? "Saving..." : "Save Trip"}
                </Button>
              )}
              {isSaved && (
                <Button variant="outline" disabled data-testid="button-saved">
                  <Check className="w-4 h-4 mr-2" />
                  Saved
                </Button>
              )}
              <Button
                variant="outline"
                onClick={onReset}
                data-testid="button-new-trip"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Plan New Trip
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {days.map((day, index) => (
          <DayCard
            key={day.dayNumber}
            dayNumber={day.dayNumber}
            date={day.date}
            locations={day.locations}
            destination={destination}
            defaultOpen={index === 0}
          />
        ))}
      </main>

      <MapSection
        locations={mapLocations}
        totalDays={days.length}
        destination={destination}
      />

      <ExportBar 
        destination={destination} 
        locations={days.flatMap(day => day.locations.map(loc => ({ name: loc.name, type: loc.type })))}
      />
    </div>
  );
}
