import DayCard from "../DayCard";

// todo: remove mock functionality
const mockLocations = [
  {
    id: "1",
    name: "Café de Flore",
    type: "restaurant" as const,
    category: "French Café",
    description: "Historic Parisian café famous for its literary clientele and exceptional coffee.",
    duration: "1 hour",
    time: "8:00 AM",
    imageUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    name: "Louvre Museum",
    type: "attraction" as const,
    category: "Museum",
    description: "The world's largest art museum and home to the Mona Lisa and Venus de Milo.",
    duration: "3-4 hours",
    time: "10:00 AM",
    imageUrl: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop",
    transport: { method: "Walk", duration: "10 min" },
  },
  {
    id: "3",
    name: "Le Petit Cler",
    type: "restaurant" as const,
    category: "French Bistro",
    description: "Cozy neighborhood bistro with traditional French cuisine and local wines.",
    duration: "1.5 hours",
    time: "13:00",
    imageUrl: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&h=300&fit=crop",
    transport: { method: "Metro", duration: "20 min" },
  },
  {
    id: "4",
    name: "Eiffel Tower",
    type: "attraction" as const,
    category: "Landmark",
    description: "The iconic iron lattice tower offering stunning views of Paris.",
    duration: "2 hours",
    time: "15:00",
    imageUrl: "https://images.unsplash.com/photo-1511739001486-6bfe10ce65f4?w=400&h=300&fit=crop",
    transport: { method: "Walk", duration: "15 min" },
  },
  {
    id: "5",
    name: "Le Jules Verne",
    type: "restaurant" as const,
    category: "Fine Dining",
    description: "Michelin-starred restaurant on the Eiffel Tower with panoramic views.",
    duration: "2.5 hours",
    time: "19:30",
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
  },
];

export default function DayCardExample() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <DayCard
        dayNumber={1}
        date={new Date()}
        locations={mockLocations}
        defaultOpen={true}
      />
    </div>
  );
}
