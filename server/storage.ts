import {
  users,
  savedItineraries,
  type User,
  type UpsertUser,
  type SavedItinerary,
  type InsertSavedItinerary,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  getSavedItineraries(userId: string): Promise<SavedItinerary[]>;
  getSavedItinerary(id: number, userId: string): Promise<SavedItinerary | undefined>;
  createSavedItinerary(itinerary: InsertSavedItinerary): Promise<SavedItinerary>;
  deleteSavedItinerary(id: number, userId: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getSavedItineraries(userId: string): Promise<SavedItinerary[]> {
    return await db
      .select()
      .from(savedItineraries)
      .where(eq(savedItineraries.userId, userId))
      .orderBy(desc(savedItineraries.createdAt));
  }

  async getSavedItinerary(id: number, userId: string): Promise<SavedItinerary | undefined> {
    const [itinerary] = await db
      .select()
      .from(savedItineraries)
      .where(eq(savedItineraries.id, id));
    
    if (itinerary && itinerary.userId === userId) {
      return itinerary;
    }
    return undefined;
  }

  async createSavedItinerary(itinerary: InsertSavedItinerary): Promise<SavedItinerary> {
    const [saved] = await db
      .insert(savedItineraries)
      .values(itinerary)
      .returning();
    return saved;
  }

  async deleteSavedItinerary(id: number, userId: string): Promise<boolean> {
    const itinerary = await this.getSavedItinerary(id, userId);
    if (!itinerary) {
      return false;
    }
    await db.delete(savedItineraries).where(eq(savedItineraries.id, id));
    return true;
  }
}

export const storage = new DatabaseStorage();
