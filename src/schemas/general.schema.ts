import { boolean, timestamp, uuid } from "drizzle-orm/pg-core";



export const generalProperties = {
    id: uuid("id").defaultRandom().primaryKey(),

    status: boolean("isActive").default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
}