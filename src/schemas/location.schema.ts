import { doublePrecision, numeric, pgTable, serial, uuid, varchar } from "drizzle-orm/pg-core";
import {generalProperties } from "./general.schema";



export const locations = pgTable("locations", {
    ...generalProperties,

    address:varchar("address", {length:256}).notNull(),
    city: varchar("city", {length: 256}).notNull(),
    state: varchar("state", {length:256}).notNull(),
    latitude: doublePrecision("latitude").notNull(),
    longitude: doublePrecision("longitude").notNull(),
    
});