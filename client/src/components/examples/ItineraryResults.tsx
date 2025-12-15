import ItineraryResults from "../ItineraryResults";
import { Toaster } from "@/components/ui/toaster";

// todo: remove mock functionality
const mockDays = [
  {
    dayNumber: 1,
    date: new Date(),
    locations: [
      {
        id: "1",
        name: "Café de Flore",
        type: "restaurant" as const,
        category: "French Café",
        description: "Historic Parisian café famous for its literary clientele.",
        duration: "1 hour",
        time: "8:00 AM",
        imageUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop",
        lat: 48.8541,
        lng: 2.3326,
      },
      {
        id: "2",
        name: "Louvre Museum",
        type: "attraction" as const,
        category: "Museum",
        description: "World's largest art museum and home to the Mona Lisa.",
        duration: "3-4 hours",
        time: "10:00 AM",
        imageUrl: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop",
        transport: { method: "Walk", duration: "10 min" },
        lat: 48.8606,
        lng: 2.3376,
      },
      {
        id: "3",
        name: "Le Petit Cler",
        type: "restaurant" as const,
        category: "French Bistro",
        description: "Cozy neighborhood bistro with traditional cuisine.",
        duration: "1.5 hours",
        time: "14:00",
        imageUrl: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&h=300&fit=crop",
        transport: { method: "Metro", duration: "15 min" },
        lat: 48.8559,
        lng: 2.3058,
      },
      {
        id: "4",
        name: "Eiffel Tower",
        type: "attraction" as const,
        category: "Landmark",
        description: "Iconic iron lattice tower with stunning city views.",
        duration: "2 hours",
        time: "16:00",
        imageUrl: "https://images.unsplash.com/photo-1511739001486-6bfe10ce65f4?w=400&h=300&fit=crop",
        transport: { method: "Walk", duration: "15 min" },
        lat: 48.8584,
        lng: 2.2945,
      },
      {
        id: "5",
        name: "Le Jules Verne",
        type: "restaurant" as const,
        category: "Fine Dining",
        description: "Michelin-starred restaurant on the Eiffel Tower.",
        duration: "2.5 hours",
        time: "19:30",
        imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
        lat: 48.8584,
        lng: 2.2945,
      },
    ],
  },
  {
    dayNumber: 2,
    date: new Date(Date.now() + 86400000),
    locations: [
      {
        id: "6",
        name: "Pain Pain",
        type: "restaurant" as const,
        category: "Bakery",
        description: "Award-winning bakery known for artisan bread.",
        duration: "45 min",
        time: "8:30 AM",
        imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
        lat: 48.8867,
        lng: 2.3431,
      },
      {
        id: "7",
        name: "Montmartre",
        type: "attraction" as const,
        category: "Neighborhood",
        description: "Charming hilltop neighborhood with artistic heritage.",
        duration: "2-3 hours",
        time: "10:00 AM",
        imageUrl: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&h=300&fit=crop",
        transport: { method: "Metro", duration: "20 min" },
        lat: 48.8867,
        lng: 2.3431,
      },
      {
        id: "8",
        name: "Sacré-Cœur",
        type: "attraction" as const,
        category: "Landmark",
        description: "Stunning white basilica with panoramic city views.",
        duration: "1 hour",
        time: "13:00",
        imageUrl: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop",
        transport: { method: "Walk", duration: "5 min" },
        lat: 48.8867,
        lng: 2.3431,
      },
    ],
  },
];

export default function ItineraryResultsExample() {
  return (
    <>
      <ItineraryResults
        destination="Paris, France"
        startDate={new Date()}
        days={mockDays}
        onReset={() => console.log("Reset clicked")}
      />
      <Toaster />
    </>
  );
}
