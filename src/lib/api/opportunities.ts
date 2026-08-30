import { createServerFn } from "@tanstack/react-start";
import { getServerSupabaseClient, isSupabaseConfigured } from "../supabase";
import {
  Opportunity,
  OpportunityField,
  OpportunityWithFields,
  baseApplicationSchema,
} from "../types/portal";

// Fallback mock opportunities for development / testing when DB is not yet populated
const FALLBACK_OPPORTUNITIES: OpportunityWithFields[] = [
  {
    id: "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
    title: "Frontend Engineering Intern (Summer 2026)",
    type: "internship",
    description:
      "Join the DolpStack Core Team to build lightning-fast web applications, developer workbenches, and interactive visual tooling. You will collaborate directly with senior engineers on modern React, TypeScript, and high-performance WebGL / canvas UI architectures.",
    eligibility:
      "Enrolled in a Bachelor's or Master's degree in Computer Science, Information Technology, or related technical field. Graduation between 2026 and 2028. Strong fundamentals in JavaScript/TypeScript, React, HTML/CSS, and Git version control.",
    benefits:
      "• Competitive monthly stipend ($2,500 - $3,500/mo)\n• Flexible remote or hybrid work policy\n• 1-on-1 mentorship with principal engineers\n• Certificate of completion & high-performing PPO consideration\n• Hardware allowance / cloud workstation credits",
    application_deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    fields: [
      {
        id: "f1",
        opportunity_id: "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
        label: "Preferred Internship Duration",
        field_key: "internship_duration",
        type: "select",
        required: true,
        options: ["3 Months", "6 Months", "Flexible"],
        display_order: 1,
      },
      {
        id: "f2",
        opportunity_id: "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
        label: "Work Location Preference",
        field_key: "location_preference",
        type: "select",
        required: true,
        options: ["Remote", "Hybrid (Bangalore)", "Hybrid (San Francisco)"],
        display_order: 2,
      },
      {
        id: "f3",
        opportunity_id: "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
        label: "Primary Frontend Framework Preference",
        field_key: "frontend_framework",
        type: "select",
        required: false,
        options: ["React / Next.js / TanStack", "Vue / Nuxt", "Svelte", "Other"],
        display_order: 3,
      },
      {
        id: "f4",
        opportunity_id: "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
        label: "Available Start Date",
        field_key: "available_start_date",
        type: "date",
        required: true,
        display_order: 4,
      },
      {
        id: "f5",
        opportunity_id: "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
        label: "Link to Your Best Live Project / Demo",
        field_key: "live_demo_url",
        type: "url",
        required: false,
        display_order: 5,
      },
    ],
  },
  {
    id: "b2c3d4e5-f6a7-4b6c-9d0e-1f2a3b4c5d6e",
    title: "DolpStack AI Innovation Hackathon 2026",
    type: "hackathon",
    description:
      "A 48-hour global virtual hackathon bringing together builders, students, and engineers to create groundbreaking developer tools, autonomous coding assistants, and cloud workspace extensions. Compete for $25,000 in cash prizes and incubator access.",
    eligibility:
      "Open to all students, independent developers, and tech enthusiasts worldwide. Solo participants or teams up to 4 members. Projects must be built during the hackathon period and open-sourced.",
    benefits:
      "• $25,000 Total Cash Prize Pool (1st: $12k, 2nd: $8k, 3rd: $5k)\n• Fast-track interviews with top tech accelerator partners\n• Exclusive DolpStack swag box for top 20 finalists\n• Free credits for AI APIs and cloud hosting\n• Live mentorship & workshops from industry leaders",
    application_deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    fields: [
      {
        id: "f6",
        opportunity_id: "b2c3d4e5-f6a7-4b6c-9d0e-1f2a3b4c5d6e",
        label: "Participation Mode",
        field_key: "participation_mode",
        type: "select",
        required: true,
        options: ["Solo Builder", "Team of 2", "Team of 3", "Team of 4"],
        display_order: 1,
      },
      {
        id: "f7",
        opportunity_id: "b2c3d4e5-f6a7-4b6c-9d0e-1f2a3b4c5d6e",
        label: "Team Name (if participating as team)",
        field_key: "team_name",
        type: "text",
        required: false,
        display_order: 2,
      },
      {
        id: "f8",
        opportunity_id: "b2c3d4e5-f6a7-4b6c-9d0e-1f2a3b4c5d6e",
        label: "Hackathon Track of Interest",
        field_key: "hackathon_track",
        type: "select",
        required: true,
        options: [
          "AI Developer Agents",
          "Real-Time Collaborative Tools",
          "Open Source Developer Tooling",
          "Cloud & Edge Infrastructure",
        ],
        display_order: 3,
      },
      {
        id: "f9",
        opportunity_id: "b2c3d4e5-f6a7-4b6c-9d0e-1f2a3b4c5d6e",
        label: "Briefly describe previous hackathons or open-source projects (if any)",
        field_key: "previous_experience",
        type: "textarea",
        required: false,
        display_order: 4,
      },
    ],
  },
  {
    id: "c3d4e5f6-a7b8-4c7d-0e1f-2a3b4c5d6e7f",
    title: "Full Stack Cloud & Systems Intern",
    type: "internship",
    description:
      "Work on distributed backend systems, real-time collaboration engines, and edge API infrastructure. Gain deep hands-on experience with PostgreSQL, Nitro/Vite micro-services, and serverless edge functions.",
    eligibility:
      "Students in CS/ECE/EE with proficiency in Node.js, TypeScript, and SQL databases. Understanding of REST/WebSocket protocols and cloud computing fundamentals.",
    benefits:
      "• Competitive monthly stipend\n• Hands-on edge computing & distributed DB experience\n• Direct contribution to open-source developer tool ecosystem\n• Flexible hours & mentorship program",
    application_deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    fields: [
      {
        id: "f10",
        opportunity_id: "c3d4e5f6-a7b8-4c7d-0e1f-2a3b4c5d6e7f",
        label: "Familiar Databases & Storage Engines",
        field_key: "databases_known",
        type: "text",
        required: true,
        display_order: 1,
      },
    ],
  },
];

// 1. Get All Active Opportunities
export const getOpportunitiesFn = createServerFn({ method: "GET" }).handler(async () => {
  if (!isSupabaseConfigured()) {
    return {
      opportunities: FALLBACK_OPPORTUNITIES,
      source: "mock",
    };
  }

  try {
    const supabase = getServerSupabaseClient();
    const { data, error } = await supabase
      .from("opportunities")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase getOpportunities error:", error);
      return {
        opportunities: FALLBACK_OPPORTUNITIES,
        source: "mock_fallback",
      };
    }

    if (!data || data.length === 0) {
      return {
        opportunities: FALLBACK_OPPORTUNITIES,
        source: "mock_empty_db",
      };
    }

    return {
      opportunities: data as Opportunity[],
      source: "supabase",
    };
  } catch (err) {
    console.error("Failed to fetch opportunities:", err);
    return {
      opportunities: FALLBACK_OPPORTUNITIES,
      source: "mock_error",
    };
  }
});

// 2. Get Opportunity Details with Dynamic Fields
export const getOpportunityByIdFn = createServerFn({ method: "GET" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const { id } = data;

    if (!isSupabaseConfigured()) {
      const found = FALLBACK_OPPORTUNITIES.find((o) => o.id === id);
      if (!found) {
        return { opportunity: null, error: "Opportunity not found" };
      }
      return { opportunity: found, source: "mock" };
    }

    try {
      const supabase = getServerSupabaseClient();
      const { data: opp, error: oppError } = await supabase
        .from("opportunities")
        .select("*")
        .eq("id", id)
        .single();

      if (oppError || !opp) {
        // Check fallback list before failing
        const found = FALLBACK_OPPORTUNITIES.find((o) => o.id === id);
        if (found) {
          return { opportunity: found, source: "mock_fallback" };
        }
        return { opportunity: null, error: "Opportunity not found" };
      }

      const { data: fields, error: fieldsError } = await supabase
        .from("opportunity_fields")
        .select("*")
        .eq("opportunity_id", id)
        .order("display_order", { ascending: true });

      if (fieldsError) {
        console.error("Error fetching opportunity fields:", fieldsError);
      }

      const opportunityWithFields: OpportunityWithFields = {
        ...(opp as Opportunity),
        fields: (fields || []) as OpportunityField[],
      };

      return { opportunity: opportunityWithFields, source: "supabase" };
    } catch (err) {
      console.error("Failed to fetch opportunity by id:", err);
      const found = FALLBACK_OPPORTUNITIES.find((o) => o.id === id);
      if (found) {
        return { opportunity: found, source: "mock_fallback" };
      }
      return { opportunity: null, error: "Internal error fetching opportunity" };
    }
  });

// 3. Submit Application
export const submitApplicationFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    return baseApplicationSchema.parse(data);
  })
  .handler(async ({ data }) => {
    const {
      opportunity_id,
      name,
      email,
      phone,
      college_university,
      degree,
      branch,
      current_year,
      current_semester,
      cgpa_cpi,
      linkedin_url,
      github_url,
      portfolio_url,
      skills,
      custom_answers,
    } = data;

    // A. Verify Supabase or handle mock environment
    if (!isSupabaseConfigured()) {
      const opp = FALLBACK_OPPORTUNITIES.find((o) => o.id === opportunity_id);
      if (!opp) {
        throw new Error("The selected opportunity does not exist.");
      }
      if (!opp.is_active) {
        throw new Error("This opportunity is no longer accepting applications.");
      }
      if (new Date(opp.application_deadline) < new Date()) {
        throw new Error("The application deadline for this opportunity has passed.");
      }

      // Mock duplicate check simulation
      if (email.toLowerCase().includes("duplicate")) {
        throw new Error("You have already submitted an application for this opportunity.");
      }

      return {
        success: true,
        application_id: `mock-app-${Date.now()}`,
        message: "Application submitted successfully! (Local Mode)",
      };
    }

    const supabase = getServerSupabaseClient();

    // B. Validate Opportunity existence, active status, and deadline
    const { data: opp, error: oppErr } = await supabase
      .from("opportunities")
      .select("id, is_active, application_deadline, title")
      .eq("id", opportunity_id)
      .single();

    if (oppErr || !opp) {
      throw new Error("The selected opportunity does not exist.");
    }

    if (!opp.is_active) {
      throw new Error("This opportunity is no longer active and cannot accept applications.");
    }

    if (new Date(opp.application_deadline) < new Date()) {
      throw new Error("The deadline for this opportunity has passed.");
    }

    // C. Validate Custom Dynamic Fields requirements
    const { data: dynamicFields } = await supabase
      .from("opportunity_fields")
      .select("*")
      .eq("opportunity_id", opportunity_id);

    if (dynamicFields && dynamicFields.length > 0) {
      for (const field of dynamicFields as OpportunityField[]) {
        const answer = custom_answers[field.field_key];
        if (field.required) {
          if (
            answer === undefined ||
            answer === null ||
            (typeof answer === "string" && answer.trim() === "") ||
            (Array.isArray(answer) && answer.length === 0)
          ) {
            throw new Error(`Field "${field.label}" is required.`);
          }
        }
        if (field.type === "url" && answer && typeof answer === "string" && answer.trim() !== "") {
          try {
            new URL(answer.trim());
          } catch {
            throw new Error(`Field "${field.label}" must be a valid URL.`);
          }
        }
      }
    }

    // D. Duplicate Application check
    const normalizedEmail = email.trim().toLowerCase();
    const { data: existingApp } = await supabase
      .from("applications")
      .select("id")
      .eq("opportunity_id", opportunity_id)
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (existingApp) {
      throw new Error("You have already submitted an application for this opportunity.");
    }

    // E. Insert application record
    const { data: inserted, error: insertError } = await supabase
      .from("applications")
      .insert({
        opportunity_id,
        name: name.trim(),
        email: normalizedEmail,
        phone: phone.trim(),
        college_university: college_university.trim(),
        degree: degree.trim(),
        branch: branch.trim(),
        current_year: current_year.trim(),
        current_semester: current_semester ? current_semester.trim() : null,
        cgpa_cpi,
        linkedin_url: linkedin_url && linkedin_url.trim() ? linkedin_url.trim() : null,
        github_url: github_url && github_url.trim() ? github_url.trim() : null,
        portfolio_url: portfolio_url && portfolio_url.trim() ? portfolio_url.trim() : null,
        skills,
        status: "submitted",
        custom_answers: custom_answers || {},
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("Supabase insert application error:", insertError);
      if (insertError.code === "23505") {
        throw new Error("You have already submitted an application for this opportunity.");
      }
      throw new Error(
        "An unexpected error occurred while saving your application. Please try again.",
      );
    }

    return {
      success: true,
      application_id: inserted.id,
      message: "Application submitted successfully!",
    };
  });
