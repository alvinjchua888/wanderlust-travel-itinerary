import MapSection from "../MapSection";

// todo: remove mock functionality
const mockLocations = [
  { id: "1", name: "Café de Flore", lat: 48.8541, lng: 2.3326, day: 1, type: "restaurant" as const },
  { id: "2", name: "Louvre Museum", lat: 48.8606, lng: 2.3376, day: 1, type: "attraction" as const },
  { id: "3", name: "Eiffel Tower", lat: 48.8584, lng: 2.2945, day: 1, type: "attraction" as const },
  { id: "4", name: "Montmartre", lat: 48.8867, lng: 2.3431, day: 2, type: "attraction" as const },
  { id: "5", name: "Sacré-Cœur", lat: 48.8867, lng: 2.3431, day: 2, type: "attraction" as const },
  { id: "6", name: "Notre-Dame", lat: 48.8530, lng: 2.3499, day: 3, type: "attraction" as const },
];

export default function MapSectionExample() {
  return (
    <div className="bg-background">
      <MapSection
        locations={mockLocations}
        totalDays={3}
        destination="Paris, France"
      />
    </div>
  );
}
