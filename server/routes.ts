import type { Express } from "express";
import { createServer, type Server } from "http";
import { generateItinerary } from "./lib/gemini";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { storage } from "./storage";
import { z } from "zod";

const generateItinerarySchema = z.object({
  destination: z.string().min(1, "Destination is required"),
  duration: z.number().int().min(1).max(30),
});

const saveItinerarySchema = z.object({
  destination: z.string().min(1),
  duration: z.number().int().min(1),
  startDate: z.string().optional(),
  itineraryData: z.any(),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  await setupAuth(app);

  app.get("/api/auth/user", async (req: any, res) => {
    try {
      if (!req.isAuthenticated() || !req.user?.claims?.sub) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.post("/api/itinerary/generate", async (req, res) => {
    try {
      const validationResult = generateItinerarySchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({
          error: "Invalid request",
          details: validationResult.error.errors,
        });
      }

      const { destination, duration } = validationResult.data;
      const itinerary = await generateItinerary(destination, duration);
      return res.json(itinerary);
    } catch (error) {
      console.error("Error generating itinerary:", error);
      return res.status(500).json({
        error: "Failed to generate itinerary. Please try again.",
      });
    }
  });

  app.post("/api/itinerary/save", isAuthenticated, async (req: any, res) => {
    try {
      const validationResult = saveItinerarySchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ error: "Invalid request" });
      }

      const userId = req.user.claims.sub;
      const { destination, duration, startDate, itineraryData } = validationResult.data;

      const saved = await storage.createSavedItinerary({
        userId,
        destination,
        duration,
        startDate: startDate || null,
        itineraryData,
      });

      return res.json(saved);
    } catch (error) {
      console.error("Error saving itinerary:", error);
      return res.status(500).json({ error: "Failed to save itinerary" });
    }
  });

  app.get("/api/itinerary/saved", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const itineraries = await storage.getSavedItineraries(userId);
      return res.json(itineraries);
    } catch (error) {
      console.error("Error fetching saved itineraries:", error);
      return res.status(500).json({ error: "Failed to fetch saved itineraries" });
    }
  });

  app.get("/api/itinerary/saved/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid itinerary ID" });
      }

      const itinerary = await storage.getSavedItinerary(id, userId);
      
      if (!itinerary) {
        return res.status(404).json({ error: "Itinerary not found" });
      }

      return res.json(itinerary);
    } catch (error) {
      console.error("Error fetching itinerary:", error);
      return res.status(500).json({ error: "Failed to fetch itinerary" });
    }
  });

  app.delete("/api/itinerary/saved/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid itinerary ID" });
      }

      const deleted = await storage.deleteSavedItinerary(id, userId);
      
      if (!deleted) {
        return res.status(404).json({ error: "Itinerary not found" });
      }

      return res.json({ success: true });
    } catch (error) {
      console.error("Error deleting itinerary:", error);
      return res.status(500).json({ error: "Failed to delete itinerary" });
    }
  });

  return httpServer;
}
