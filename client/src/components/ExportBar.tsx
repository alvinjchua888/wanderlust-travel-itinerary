import { Button } from "@/components/ui/button";
import { Printer, Share2, Download, Check, Map } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Location {
  name: string;
  type: string;
}

interface ExportBarProps {
  destination: string;
  locations?: Location[];
}

export default function ExportBar({ destination, locations = [] }: ExportBarProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handlePrint = () => {
    window.print();
    toast({
      title: "Print dialog opened",
      description: "Your itinerary is ready to print.",
    });
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${destination} Travel Itinerary`,
          text: `Check out my ${destination} travel itinerary!`,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Share this link with friends and family.",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    toast({
      title: "Preparing PDF",
      description: "Your itinerary will download shortly.",
    });
  };

  const handleOpenInGoogleMaps = () => {
    if (locations.length === 0) {
      toast({
        title: "No locations",
        description: "No locations available to open in Google Maps.",
        variant: "destructive",
      });
      return;
    }

    const waypoints = locations.slice(0, 10).map(loc => 
      encodeURIComponent(`${loc.name}, ${destination}`)
    );
    
    let mapsUrl: string;
    if (waypoints.length === 1) {
      mapsUrl = `https://www.google.com/maps/search/?api=1&query=${waypoints[0]}`;
    } else {
      const origin = waypoints[0];
      const dest = waypoints[waypoints.length - 1];
      const middle = waypoints.slice(1, -1).join('|');
      mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}${middle ? `&waypoints=${middle}` : ''}&travelmode=walking`;
    }
    
    window.open(mapsUrl, '_blank');
    toast({
      title: "Opening Google Maps",
      description: `Showing ${Math.min(locations.length, 10)} locations on your route.`,
    });
  };

  const handleDownloadCSV = () => {
    if (locations.length === 0) {
      toast({
        title: "No locations",
        description: "No locations available to export.",
        variant: "destructive",
      });
      return;
    }

    const csvContent = [
      ['Name', 'Type', 'Address'].join(','),
      ...locations.map(loc => 
        [`"${loc.name}"`, `"${loc.type}"`, `"${loc.name}, ${destination}"`].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${destination.replace(/\s+/g, '_')}_itinerary.csv`;
    link.click();
    URL.revokeObjectURL(link.href);

    toast({
      title: "CSV Downloaded",
      description: "Import this file into Google My Maps to create your custom map.",
    });
  };

  return (
    <div className="sticky bottom-0 z-50 bg-background/80 backdrop-blur-lg border-t">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            <span className="hidden md:inline">Your </span>
            <span className="font-medium text-foreground">{destination}</span> itinerary is ready!
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="default"
              size="sm"
              onClick={handleOpenInGoogleMaps}
              data-testid="button-open-maps"
            >
              <Map className="w-4 h-4 mr-2" />
              Open in Maps
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadCSV}
              data-testid="button-download-csv"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              data-testid="button-print"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              data-testid="button-share"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
