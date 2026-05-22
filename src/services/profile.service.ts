import { eq } from "drizzle-orm";
import { db } from "../config/db.config";
import { locations } from "../schemas/location.schema";
import { users } from "../schemas/users.schema";
import { employers } from "../schemas/employer.schema";
import { candidates } from "../schemas/candidate.schema";


export async function getEmployerProfile(userId: string) {
  const result = await db
    .select({
      // users
      id: users.id,
      name: users.name,
      email: users.email,
      profilePicUrl: users.profilePicUrl,
      isActive: users.status,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
      role: users.role,

      // employer
      companyName: employers.company_name,
      industry: employers.industry,

      // location
      locationId: locations.id,
      address: locations.address,
      city: locations.city,
      state: locations.state,
      latitude: locations.latitude,
      longitude: locations.longitude,
    })
    .from(users)
    .innerJoin(employers, eq(employers.userId, users.id))
    .leftJoin(locations, eq(locations.id, employers.location))
    .where(eq(users.id, userId))
    .limit(1);

  return result[0];
}

export async function getCandidateProfile(userId: string) {
  const result = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      profilePicUrl: users.profilePicUrl,
      isActive: users.status,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
      role: users.role,
      skills: candidates.skills,
      experience: candidates.experience,

      locationId: locations.id,
      address: locations.address,
      city: locations.city,
      state: locations.state,
      latitude: locations.latitude,
      longitude: locations.longitude,
    })
    .from(users)
    .leftJoin(candidates, eq(candidates.userId, users.id))
    .leftJoin(locations, eq(locations.id, users.id)) // if you later link user → location
    .where(eq(users.id, userId))
    .limit(1);

  return result[0];
}