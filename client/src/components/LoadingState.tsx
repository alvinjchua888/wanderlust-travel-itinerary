import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Plane, MapPin, Utensils, Camera } from "lucide-react";
import { useState, useEffect } from "react";

interface LoadingStateProps {
  destination: string;
}

const loadingMessages = [
  { text: "Researching top attractions...", icon: Camera },
  { text: "Finding the best restaurants...", icon: Utensils },
  { text: "Mapping optimal routes...", icon: MapPin },
  { text: "Creating your perfect itinerary...", icon: Plane },
];

export default function LoadingState({ destination }: LoadingStateProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = loadingMessages[messageIndex].icon;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
          <CurrentIcon className="w-8 h-8 text-primary animate-pulse" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">
          Planning your trip to {destination}
        </h2>
        <p className="text-muted-foreground animate-pulse">
          {loadingMessages[messageIndex].text}
        </p>
      </div>

      <div className="space-y-6">
        {[1, 2, 3].map((day) => (
          <Card key={day}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex gap-4">
                  <Skeleton className="w-32 h-24 rounded-md flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
