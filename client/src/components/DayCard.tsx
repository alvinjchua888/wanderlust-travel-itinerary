import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Calendar, Sun, Sunset, Moon } from "lucide-react";
import { format } from "date-fns";
import LocationCard, { type LocationType, type RecommendedDish } from "./LocationCard";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { getLocationImage } from "@/lib/locationImages";

interface Location {
  id: string;
  name: string;
  type: LocationType;
  category: string;
  description: string;
  duration?: string;
  time?: string;
  imageUrl?: string;
  transport?: {
    method: string;
    duration: string;
  };
  recommendedDishes?: RecommendedDish[];
}

interface DayCardProps {
  dayNumber: number;
  date: Date;
  locations: Location[];
  destination: string;
  defaultOpen?: boolean;
}

export default function DayCard({ dayNumber, date, locations, destination, defaultOpen = true }: DayCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const morningLocations = locations.filter((l) => {
    const hour = l.time ? parseInt(l.time.split(":")[0]) : 0;
    return hour < 12;
  });
  
  const afternoonLocations = locations.filter((l) => {
    const hour = l.time ? parseInt(l.time.split(":")[0]) : 0;
    return hour >= 12 && hour < 18;
  });
  
  const eveningLocations = locations.filter((l) => {
    const hour = l.time ? parseInt(l.time.split(":")[0]) : 0;
    return hour >= 18;
  });

  const TimeSection = ({ 
    title, 
    icon: Icon, 
    locations 
  }: { 
    title: string; 
    icon: typeof Sun; 
    locations: Location[] 
  }) => {
    if (locations.length === 0) return null;
    
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon className="w-5 h-5" />
          <span className="font-medium">{title}</span>
        </div>
        <div className="space-y-3 pl-7">
          {locations.map((location) => (
            <LocationCard 
              key={location.id} 
              {...location} 
              destination={destination}
              imageUrl={location.imageUrl || getLocationImage(location.type, location.id)}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card data-testid={`card-day-${dayNumber}`}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover-elevate rounded-t-lg">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                  {dayNumber}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Day {dayNumber}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{format(date, "EEEE, MMMM d, yyyy")}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" data-testid={`button-toggle-day-${dayNumber}`}>
                {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </Button>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0 space-y-8">
            <TimeSection title="Morning" icon={Sun} locations={morningLocations} />
            <TimeSection title="Afternoon" icon={Sunset} locations={afternoonLocations} />
            <TimeSection title="Evening" icon={Moon} locations={eveningLocations} />
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
