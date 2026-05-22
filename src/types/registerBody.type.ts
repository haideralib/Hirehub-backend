
export type RegisterBody = {
  name: string;
  email: string;
  password: string;
  role: "candidate" | "company";

  skills?: string[] | undefined;
  experience?: string;
  
  company_name?: string;
  industry?: string;
};