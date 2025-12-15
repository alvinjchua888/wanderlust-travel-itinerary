import { sql } from "drizzle-orm";
import {
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Saved itineraries table
export const savedItineraries = pgTable("saved_itineraries", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  destination: varchar("destination").notNull(),
  duration: integer("duration").notNull(),
  startDate: varchar("start_date"),
  itineraryData: jsonb("itinerary_data").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSavedItinerarySchema = createInsertSchema(savedItineraries).omit({
  id: true,
  createdAt: true,
});

export type InsertSavedItinerary = z.infer<typeof insertSavedItinerarySchema>;
export type SavedItinerary = typeof savedItineraries.$inferSelect;
