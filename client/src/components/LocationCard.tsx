import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Utensils, Camera, Train, Car, PersonStanding, ChefHat } from "lucide-react";

export type LocationType = "restaurant" | "attraction" | "transport";

export interface RecommendedDish {
  name: string;
  description: string;
}

interface LocationCardProps {
  name: string;
  type: LocationType;
  category: string;
  description: string;
  duration?: string;
  time?: string;
  imageUrl?: string;
  destination?: string;
  transport?: {
    method: string;
    duration: string;
  };
  recommendedDishes?: RecommendedDish[];
}

const typeIcons = {
  restaurant: Utensils,
  attraction: Camera,
  transport: Train,
};

const transportIcons: Record<string, typeof Car> = {
  walk: PersonStanding,
  car: Car,
  train: Train,
  metro: Train,
  bus: Car,
};

export default function LocationCard({
  name,
  type,
  category,
  description,
  duration,
  time,
  imageUrl,
  destination,
  transport,
  recommendedDishes,
}: LocationCardProps) {
  const TypeIcon = typeIcons[type];

  return (
    <div className="space-y-2">
      {transport && (
        <div className="flex items-center gap-2 text-muted-foreground text-sm pl-4">
          {(() => {
            const TransportIcon = transportIcons[transport.method.toLowerCase()] || Car;
            return <TransportIcon className="w-4 h-4" />;
          })()}
          <span className="capitalize">{transport.method}</span>
          <span className="text-muted-foreground/60">({transport.duration})</span>
        </div>
      )}
      
      <Card className="overflow-hidden hover-elevate transition-all duration-200">
        <div className="flex flex-col md:flex-row">
          {imageUrl && (
            <div className="md:w-48 h-36 md:h-auto flex-shrink-0">
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                {time && (
                  <span className="text-sm font-medium text-muted-foreground">{time}</span>
                )}
                <h4 className="font-semibold text-lg">{name}</h4>
              </div>
              <Badge variant="secondary" className="flex items-center gap-1">
                <TypeIcon className="w-3 h-3" />
                {category}
              </Badge>
            </div>
            
            <p className="text-muted-foreground mt-2 text-sm line-clamp-2">
              {description}
            </p>
            
            {recommendedDishes && recommendedDishes.length > 0 && (
              <div className="mt-3 space-y-1.5">
                <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                  <ChefHat className="w-4 h-4" />
                  <span>Must-Try Dishes</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recommendedDishes.map((dish, index) => (
                    <div
                      key={index}
                      className="group relative"
                      data-testid={`dish-item-${index}`}
                    >
                      <Badge variant="outline" className="cursor-default">
                        {dish.name}
                      </Badge>
                      <div className="invisible group-hover:visible absolute z-10 bottom-full left-0 mb-1 p-2 bg-popover border rounded-md shadow-md text-xs max-w-48 whitespace-normal">
                        {dish.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
              {duration && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{duration}</span>
                </div>
              )}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + (destination ? ', ' + destination : ''))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-primary hover:underline"
                data-testid="link-view-map"
              >
                <MapPin className="w-4 h-4" />
                <span>View on map</span>
              </a>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
