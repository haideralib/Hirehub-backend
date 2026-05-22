import { pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { generalProperties } from "./general.schema";



export const users = pgTable("users", {
  ...generalProperties,

  name: varchar("name", { length: 256 }).notNull(),

  email: varchar("email", { length: 256 }).notNull().unique(),

  profilePicUrl: varchar("profile_pic_url", { length: 256 }),

  password: varchar("password", { length: 256 }).notNull(),

  role: varchar("role",{length:255}).notNull(),

  refreshToken: varchar("refresh_token", {length: 255})

});