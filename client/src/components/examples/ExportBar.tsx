import ExportBar from "../ExportBar";
import { Toaster } from "@/components/ui/toaster";

export default function ExportBarExample() {
  return (
    <div className="min-h-[200px] flex flex-col justify-end bg-muted/30">
      <div className="p-4 text-center text-muted-foreground text-sm mb-20">
        (Scroll down or look at the bottom of the screen)
      </div>
      <ExportBar destination="Paris, France" />
      <Toaster />
    </div>
  );
}
