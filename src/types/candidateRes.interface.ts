import type { BaseProfileRes } from "./baseProfileRes.interface";


export interface CandidateProfileRes extends BaseProfileRes {
  role: "candidate";

  skills?: string[];
  experience?: string;
}