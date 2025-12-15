import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import HeroSection from "@/components/HeroSection";
import LoadingState from "@/components/LoadingState";
import ItineraryResults from "@/components/ItineraryResults";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { addDays, parseISO } from "date-fns";
import { apiRequest } from "@/lib/queryClient";

type AppState = "input" | "loading" | "results" | "regenerating";

interface TripData {
  destination: string;
  startDate: Date;
  duration: number;
}

interface ApiLocation {
  id: string;
  name: string;
  type: "restaurant" | "attraction";
  category: string;
  description: string;
  duration: string;
  time: string;
  address: string;
  lat: number;
  lng: number;
  transport?: {
    method: string;
    duration: string;
  };
}

interface ApiDayItinerary {
  dayNumber: number;
  locations: ApiLocation[];
}

interface ApiItinerary {
  destination: string;
  days: ApiDayItinerary[];
}

export default function Home() {
  const [appState, setAppState] = useState<AppState>("input");
  const [tripData, setTripData] = useState<TripData | null>(null);
  const [itinerary, setItinerary] = useState<{
    dayNumber: number;
    date: Date;
    locations: ApiLocation[];
  }[]>([]);
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const searchString = useSearch();

  useEffect(() => {
    const params = new URLSearchParams(searchString);
    const viewId = params.get("view");
    
    if (viewId) {
      loadSavedItinerary(viewId);
    }
  }, [searchString]);

  const loadSavedItinerary = async (id: string) => {
    setAppState("loading");
    try {
      const response = await fetch(`/api/itinerary/saved/${id}`, {
        credentials: "include",
      });
      
      if (!response.ok) {
        throw new Error("Failed to load itinerary");
      }
      
      const saved = await response.json();
      const itineraryData = saved.itineraryData;
      
      const startDate = saved.startDate ? parseISO(saved.startDate) : new Date();
      
      setTripData({
        destination: saved.destination,
        startDate,
        duration: saved.duration,
      });
      
      const daysWithDates = itineraryData.days.map((day: ApiDayItinerary, index: number) => ({
        dayNumber: day.dayNumber,
        date: addDays(startDate, index),
        locations: day.locations,
      }));
      
      setItinerary(daysWithDates);
      setAppState("results");
    } catch (error) {
      console.error("Failed to load saved itinerary:", error);
      toast({
        title: "Error",
        description: "Could not load the saved trip. Please try again.",
        variant: "destructive",
      });
      setLocation("/");
      setAppState("input");
    }
  };

  const handleGenerateItinerary = async (data: TripData) => {
    setTripData(data);
    setAppState("loading");

    try {
      const response = await apiRequest("POST", "/api/itinerary/generate", {
        destination: data.destination,
        duration: data.duration,
      });

      const result: ApiItinerary = await response.json();

      const daysWithDates = result.days.map((day: ApiDayItinerary, index: number) => ({
        dayNumber: day.dayNumber,
        date: addDays(data.startDate, index),
        locations: day.locations,
      }));

      setItinerary(daysWithDates);
      setAppState("results");
    } catch (error) {
      console.error("Failed to generate itinerary:", error);
      toast({
        title: "Generation Failed",
        description: "Could not generate your itinerary. Please try again.",
        variant: "destructive",
      });
      setAppState("input");
    }
  };

  const handleReset = () => {
    setAppState("input");
    setTripData(null);
    setItinerary([]);
    setLocation("/");
  };

  const handleRegenerate = async () => {
    if (!tripData) return;
    
    setAppState("regenerating");
    
    try {
      const response = await apiRequest("POST", "/api/itinerary/generate", {
        destination: tripData.destination,
        duration: tripData.duration,
      });

      const result: ApiItinerary = await response.json();

      const daysWithDates = result.days.map((day: ApiDayItinerary, index: number) => ({
        dayNumber: day.dayNumber,
        date: addDays(tripData.startDate, index),
        locations: day.locations,
      }));

      setItinerary(daysWithDates);
      setAppState("results");
      toast({
        title: "New Ideas Generated",
        description: "Here's a fresh itinerary for your trip!",
      });
    } catch (error) {
      console.error("Failed to regenerate itinerary:", error);
      toast({
        title: "Generation Failed",
        description: "Could not generate new ideas. Please try again.",
        variant: "destructive",
      });
      setAppState("results");
    }
  };

  return (
    <>
      {appState === "input" && (
        <HeroSection onGenerateItinerary={handleGenerateItinerary} />
      )}

      {appState === "loading" && tripData && (
        <LoadingState destination={tripData.destination} />
      )}

      {(appState === "results" || appState === "regenerating") && tripData && (
        <ItineraryResults
          destination={tripData.destination}
          startDate={tripData.startDate}
          days={itinerary}
          onReset={handleReset}
          onRegenerate={handleRegenerate}
          isRegenerating={appState === "regenerating"}
        />
      )}

      <Toaster />
    </>
  );
}
