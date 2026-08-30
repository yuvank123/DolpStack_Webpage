import { z } from "zod";

export type OpportunityType = "internship" | "hackathon" | string;

export type CustomFieldType =
  "text" | "textarea" | "number" | "select" | "multi-select" | "checkbox" | "url" | "date";

export type ApplicationStatus =
  "submitted" | "under_review" | "shortlisted" | "selected" | "rejected";

export interface Opportunity {
  id: string;
  title: string;
  type: OpportunityType;
  description: string;
  eligibility: string;
  benefits: string;
  application_deadline: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface OpportunityField {
  id: string;
  opportunity_id: string;
  label: string;
  field_key: string;
  type: CustomFieldType;
  required: boolean;
  options?: string[];
  display_order: number;
  created_at?: string;
}

export interface OpportunityWithFields extends Opportunity {
  fields: OpportunityField[];
}

export interface Application {
  id: string;
  opportunity_id: string;
  name: string;
  email: string;
  phone: string;
  college_university: string;
  degree: string;
  branch: string;
  current_year: string;
  current_semester?: string | null;
  cgpa_cpi: number;
  linkedin_url?: string | null;
  github_url?: string | null;
  portfolio_url?: string | null;
  skills: string[];
  status: ApplicationStatus;
  custom_answers: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

// Zod Schema for Base Application Submission
export const baseApplicationSchema = z.object({
  opportunity_id: z.string().uuid("Invalid opportunity ID"),
  name: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must not exceed 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email is too long"),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(20, "Phone number is too long")
    .regex(/^[+()0-9\s-]+$/, "Phone number contains invalid characters"),
  college_university: z
    .string()
    .trim()
    .min(2, "College/University is required")
    .max(200, "College/University name is too long"),
  degree: z
    .string()
    .trim()
    .min(2, "Degree is required (e.g. B.Tech, B.S., M.S.)")
    .max(100, "Degree name is too long"),
  branch: z
    .string()
    .trim()
    .min(2, "Branch/Field of study is required")
    .max(100, "Branch name is too long"),
  current_year: z.string().trim().min(1, "Current year of study is required"),
  current_semester: z.string().trim().optional().or(z.literal("")),
  cgpa_cpi: z
    .number({ invalid_type_error: "CGPA/CPI must be a valid number" })
    .min(0, "CGPA/CPI cannot be negative")
    .max(10, "CGPA/CPI cannot exceed 10.00"),
  linkedin_url: z
    .string()
    .trim()
    .url("Please enter a valid LinkedIn URL")
    .optional()
    .or(z.literal("")),
  github_url: z.string().trim().url("Please enter a valid GitHub URL").optional().or(z.literal("")),
  portfolio_url: z
    .string()
    .trim()
    .url("Please enter a valid Portfolio URL")
    .optional()
    .or(z.literal("")),
  skills: z.array(z.string().trim().min(1)).min(1, "Please provide at least one skill"),
  custom_answers: z.record(z.unknown()).default({}),
  consent_agreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy to submit your application",
  }),
});

export type ApplicationSubmissionInput = z.infer<typeof baseApplicationSchema>;
