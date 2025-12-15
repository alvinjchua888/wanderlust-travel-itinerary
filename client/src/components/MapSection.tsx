import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation } from "lucide-react";

interface MapLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  day: number;
  type: "restaurant" | "attraction";
}

interface MapSectionProps {
  locations: MapLocation[];
  totalDays: number;
  destination: string;
}

const dayColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-cyan-500",
  "bg-amber-500",
];

export default function MapSection({ locations, totalDays, destination }: MapSectionProps) {
  return (
    <section className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold">Trip Overview</h2>
        </div>

        <Card className="overflow-hidden">
          <div className="p-6 bg-gradient-to-br from-primary/5 to-primary/10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Navigation className="w-8 h-8 text-primary" />
            </div>
            <p className="text-center text-lg font-medium mb-2">{destination}</p>
            <p className="text-center text-muted-foreground text-sm mb-6">
              {locations.length} locations across {totalDays} {totalDays === 1 ? "day" : "days"}
            </p>
            
            <div className="flex flex-wrap justify-center gap-3">
              {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => {
                const dayLocations = locations.filter((l) => l.day === day);
                return (
                  <Badge
                    key={day}
                    variant="secondary"
                    className={`${dayColors[(day - 1) % dayColors.length]} text-white border-0`}
                  >
                    Day {day}: {dayLocations.length} stops
                  </Badge>
                );
              })}
            </div>
          </div>
        </Card>

        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => (
            <div key={day} className="flex items-center gap-2 text-sm">
              <div className={`w-3 h-3 rounded-full ${dayColors[(day - 1) % dayColors.length]}`} />
              <span className="text-muted-foreground">Day {day}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
