import HeroSection from "../HeroSection";

export default function HeroSectionExample() {
  const handleGenerate = (data: { destination: string; startDate: Date; duration: number }) => {
    console.log("Generating itinerary for:", data);
  };

  return <HeroSection onGenerateItinerary={handleGenerate} isLoading={false} />;
}
