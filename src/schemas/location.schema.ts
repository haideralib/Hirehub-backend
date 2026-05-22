import { numeric, pgTable, serial, uuid, varchar } from "drizzle-orm/pg-core";
import { generalProperties } from "./general.schema";



export const locations = pgTable("locations", {
    ...generalProperties,

    address:varchar("address", {length:256}).notNull(),
    city: varchar("city", {length: 256}).notNull(),
    state: varchar("state", {length:256}).notNull(),
    latitude: numeric("latitude", { precision: 10, scale: 6 }).notNull(),
    longitude: numeric("longitude", { precision: 10, scale: 6 }).notNull(),
    
});