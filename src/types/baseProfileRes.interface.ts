import type { LocationRes } from "./locationRes.interface";

export interface BaseProfileRes {
  id: string;
  name: string;
  email: string;
  profilePicUrl?: string | null;

  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  location?: LocationRes | null;
}