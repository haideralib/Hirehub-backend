import type { BaseProfileRes } from "./baseProfileRes.interface";


export interface EmployerProfileRes extends BaseProfileRes {
  role: "company";

  company: {
    name: string;
    industry: string;
  };
}