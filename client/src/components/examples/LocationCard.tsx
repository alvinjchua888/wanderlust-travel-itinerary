import LocationCard from "../LocationCard";

export default function LocationCardExample() {
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <LocationCard
        name="Le Comptoir du Pantheon"
        type="restaurant"
        category="French Bistro"
        description="A charming traditional French bistro serving classic Parisian cuisine with a modern twist. Known for their exceptional croissants and café au lait."
        duration="1.5 hours"
        time="8:00 AM"
        imageUrl="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop"
      />
      
      <LocationCard
        name="Eiffel Tower"
        type="attraction"
        category="Landmark"
        description="The iconic iron lattice tower on the Champ de Mars is the most visited paid monument in the world. Take the elevator to the top for breathtaking views of Paris."
        duration="2-3 hours"
        time="10:30 AM"
        imageUrl="https://images.unsplash.com/photo-1511739001486-6bfe10ce65f4?w=400&h=300&fit=crop"
        transport={{ method: "Metro", duration: "15 min" }}
      />
    </div>
  );
}
