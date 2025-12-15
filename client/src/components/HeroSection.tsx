import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, MapPin, Plane, Loader2 } from "lucide-react";
import { format } from "date-fns";
import heroImage from "@assets/generated_images/santorini_sunset_travel_hero.png";

interface HeroSectionProps {
  onGenerateItinerary: (data: {
    destination: string;
    startDate: Date;
    duration: number;
  }) => void;
  isLoading?: boolean;
}

export default function HeroSection({ onGenerateItinerary, isLoading = false }: HeroSectionProps) {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [duration, setDuration] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (destination && startDate && duration) {
      onGenerateItinerary({
        destination,
        startDate,
        duration: parseInt(duration),
      });
    }
  };

  const isFormValid = destination && startDate && duration;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Plane className="w-8 h-8 text-white" />
            <span className="text-white/90 text-lg font-medium tracking-wide">WANDERLUST</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Plan Your Perfect Trip
          </h1>
          <p className="text-lg md:text-xl text-white/80">
            Let AI create a personalized itinerary with restaurants, attractions, and routes
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 md:p-8 border border-white/20"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="destination" className="text-white font-medium">
                Where do you want to go?
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="destination"
                  data-testid="input-destination"
                  placeholder="Paris, Tokyo, New York..."
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="pl-10 h-12 bg-white/90 border-0 text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white font-medium">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      data-testid="button-start-date"
                      className="w-full h-12 justify-start bg-white/90 border-0 text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration" className="text-white font-medium">Trip Duration (days)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  max="30"
                  data-testid="input-duration"
                  placeholder="e.g. 3"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="h-12 bg-white/90 border-0 text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <Button
              type="submit"
              data-testid="button-generate"
              disabled={!isFormValid || isLoading}
              className="w-full h-12 text-lg font-semibold mt-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Itinerary...
                </>
              ) : (
                <>
                  <Plane className="mr-2 h-5 w-5" />
                  Generate My Itinerary
                </>
              )}
            </Button>
          </div>
        </form>

        <p className="text-center text-white/60 text-sm mt-6">
          Powered by AI to create the perfect travel experience
        </p>
      </div>
    </section>
  );
}
