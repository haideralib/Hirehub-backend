import { PgArray, pgSequence, pgTable, serial, text, uuid } from "drizzle-orm/pg-core";
import { generalProperties } from "./general.schema";
import { varchar } from "drizzle-orm/mysql-core";
import { locations } from "./location.schema";
import { users } from "./users.schema";



export const candidates = pgTable("candidates", {
    ...generalProperties,
    
    skills: text("skills").array(),
    experience: text("experience").notNull(),
    resume_url: text("resume_url"),
    
    location: uuid("location_id").references(()=> locations.id),
    userId: uuid("user_id").notNull().references(()=> users.id)
});