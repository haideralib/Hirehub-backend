import { pgTable, serial, uuid,varchar } from "drizzle-orm/pg-core";
import { generalProperties } from "./general.schema";
import { locations } from "./location.schema";
import { users } from "./users.schema";


export const employers = pgTable("employers", {
    ...generalProperties,
    
    company_name: varchar("company_name", {length:256}).notNull(),
    industry: varchar("industry", {length:256}).notNull(), 
    
    location: uuid("location_id").references(()=> locations.id),
    userId: uuid("user_id").notNull().references(()=> users.id)
});