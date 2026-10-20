# Data Storage Architecture: Supabase & Cloud Spreadsheet Integration

This document provides a comprehensive technical breakdown of how data is stored, structured, validated, and synchronized across **Supabase (PostgreSQL)** and the **Cloud Spreadsheet (Google Sheets)** in the Contribution Hub portal.

---

## 1. High-Level Architecture Overview

The application utilizes a **dual-storage and synchronization pattern**:
1. **Supabase (PostgreSQL Database)**: Serves as the primary, ACID-compliant source of truth. It enforces relational integrity, dynamic field constraints, Row Level Security (RLS) policies, uniqueness constraints, and performance indexes.
2. **Cloud Spreadsheet (Google Sheets)**: Serves as an asynchronous downstream destination. It provides recruiters, reviewers, and non-technical stakeholders real-time visibility into incoming applications without granting direct database access.

```
┌──────────────────────────────────────────────────────────────┐
│                    Applicant Browser                         │
│   (TanStack Router Form: /opportunities/$id/apply)           │
└──────────────────────────────┬───────────────────────────────┘
                               │
                               │ 1. Submits Application via RPC / ServerFn
                               ▼
┌──────────────────────────────────────────────────────────────┐
│       TanStack Start Server Function (submitApplicationFn)   │
│   - Runtime Zod Schema Validation                            │
│   - Opportunity Active & Deadline Verification               │
│   - Dynamic Custom Fields Validation                         │
│   - Duplicate Application Check                              │
└──────────────┬───────────────────────────────┬───────────────┘
               │                               │
               │ 2. Primary Transaction        │ 3. Asynchronous Sync
               ▼                               ▼
┌──────────────────────────────┐ ┌──────────────────────────────┐
│      Supabase (Postgres)     │ │   Cloud Google Spreadsheet   │
│  - opportunities             │ │  (Google Apps Script Webhook)│
│  - opportunity_fields        │ │                              │
│  - applications              │ │  - Appends row in real-time  │
│  - RLS Security & Triggers   │ │  - Recruiter view & review   │
└──────────────────────────────┘ └──────────────────────────────┘
```

---

## 2. Supabase (PostgreSQL) Storage Layer

### 2.1 Configuration & Client Management
Located at [`src/lib/supabase.ts`](file:///d:/yuvProj/your-contribution-hub/src/lib/supabase.ts).

The application provides two clients:
- **`getSupabaseClient()`**: Browser-safe client configured with public anon key (`persistSession: false`).
- **`getServerSupabaseClient()`**: Server-side client utilizing `SUPABASE_SERVICE_ROLE_KEY` (or falling back to `SUPABASE_ANON_KEY`) for secure backend operations.
- **Mock/Local Fallback**: If Supabase environment variables are omitted or point to placeholder configurations, the system gracefully operates in fallback mode without breaking UI workflows.

---

### 2.2 Database Tables & Schemas
The database schema is defined in [`supabase/migrations/20260829000000_create_opportunities_portal.sql`](file:///d:/yuvProj/your-contribution-hub/supabase/migrations/20260829000000_create_opportunities_portal.sql).

#### Table 1: `opportunities`
Stores active and upcoming listings (Internships, Hackathons, Fellowships).

| Column | Data Type | Constraints & Defaults | Description |
|---|---|---|---|
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Unique opportunity identifier |
| `title` | `TEXT` | `NOT NULL` | Title of the program/role |
| `type` | `TEXT` | `NOT NULL CHECK (type IN ('internship', 'hackathon'))` | Category classification |
| `description` | `TEXT` | `NOT NULL` | Comprehensive overview |
| `eligibility` | `TEXT` | `NOT NULL` | Candidate prerequisites & qualifications |
| `benefits` | `TEXT` | `NOT NULL` | Stipend, prizes, perks, certificates |
| `application_deadline` | `TIMESTAMPTZ` | `NOT NULL` | UTC deadline timestamp |
| `is_active` | `BOOLEAN` | `NOT NULL DEFAULT true` | Controls visibility and submission status |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT now()` | Record creation timestamp |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT now()` | Auto-updated via trigger |

---

#### Table 2: `opportunity_fields` (Dynamic Form Schema)
Enables configurable questions per opportunity without altering table columns.

| Column | Data Type | Constraints & Defaults | Description |
|---|---|---|---|
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Unique field identifier |
| `opportunity_id` | `UUID` | `NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE` | Linked opportunity |
| `label` | `TEXT` | `NOT NULL` | User-facing question label |
| `field_key` | `TEXT` | `NOT NULL` | Unique machine key for form state mapping |
| `type` | `TEXT` | `CHECK (type IN ('text', 'textarea', 'number', 'select', 'multi-select', 'checkbox', 'url', 'date'))` | Field input widget type |
| `required` | `BOOLEAN` | `NOT NULL DEFAULT false` | Whether input is mandatory |
| `options` | `JSONB` | `DEFAULT '[]'::jsonb` | Allowed options for `select` / `multi-select` |
| `display_order` | `INTEGER` | `NOT NULL DEFAULT 0` | Ordering index on the UI |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT now()` | Record creation timestamp |

*Constraint:* `UNIQUE (opportunity_id, field_key)` ensures distinct field keys per opportunity.

---

#### Table 3: `applications`
Stores candidate submissions, academic details, contact info, and dynamic form answers.

| Column | Data Type | Constraints & Defaults | Description |
|---|---|---|---|
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Unique application tracking ID |
| `opportunity_id` | `UUID` | `NOT NULL REFERENCES opportunities(id) ON DELETE RESTRICT` | Associated opportunity |
| `name` | `TEXT` | `NOT NULL` | Applicant full name |
| `email` | `TEXT` | `NOT NULL` | Normalized lowercase email address |
| `phone` | `TEXT` | `NOT NULL` | Contact phone number |
| `college_university`| `TEXT` | `NOT NULL` | Applicant institution |
| `degree` | `TEXT` | `NOT NULL` | Program / Degree (e.g. B.Tech, M.S.) |
| `branch` | `TEXT` | `NOT NULL` | Department / Major |
| `current_year` | `TEXT` | `NOT NULL` | Academic year of study |
| `current_semester`| `TEXT` | `NULLABLE` | Semester index / name |
| `cgpa_cpi` | `NUMERIC(4,2)` | `NOT NULL` | Academic score |
| `linkedin_url` | `TEXT` | `NULLABLE` | LinkedIn profile link |
| `github_url` | `TEXT` | `NULLABLE` | GitHub profile link |
| `portfolio_url` | `TEXT` | `NULLABLE` | Portfolio or personal website link |
| `skills` | `JSONB` | `NOT NULL DEFAULT '[]'::jsonb` | Array of skill tags (e.g. `["React", "TypeScript"]`) |
| `status` | `TEXT` | `DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'shortlisted', 'selected', 'rejected'))` | Pipeline stage |
| `custom_answers` | `JSONB` | `NOT NULL DEFAULT '{}'::jsonb` | Key-value store of dynamic questions |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT now()` | Submission timestamp |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT now()` | Auto-updated via trigger |

*Constraint:* `UNIQUE (opportunity_id, email)` prevents candidate duplicate submissions for the same opportunity.

---

### 2.3 Row Level Security (RLS) & Performance Indexes

1. **Security Policies**:
   - **`opportunities`**: Public read access is permitted only when `is_active = true`.
   - **`opportunity_fields`**: Public read access is permitted only if the parent opportunity is active.
   - **`applications`**: Direct public reads are blocked to protect candidate PII. Public inserts are permitted only if the opportunity is active and `application_deadline > now()`.
2. **Database Indexes**:
   - `idx_opportunities_type`, `idx_opportunities_is_active`, `idx_opportunities_deadline`
   - `idx_opportunity_fields_opp_order` (covers `opportunity_id` + `display_order`)
   - `idx_applications_opportunity_id`, `idx_applications_email`, `idx_applications_status`

---

## 3. Cloud Spreadsheet (Google Sheets) Storage Layer

### 3.1 Webhook Dispatch Mechanism
Located in [`src/lib/api/opportunities.ts`](file:///d:/yuvProj/your-contribution-hub/src/lib/api/opportunities.ts#L10-L30).

When a candidate submits an application, the server function invokes `syncToGoogleSheet(payload)` asynchronously:

```typescript
async function syncToGoogleSheet(payload: Record<string, unknown>) {
  const webhookUrl =
    getEnv("GOOGLE_SHEET_WEBHOOK_URL") ||
    "https://script.google.com/macros/s/AKfycbx02GM8lBeQ7KPLyqOxzz9kxLGwfkTHWBtKk-rE71nve_MebhPCxP132KEpulJI3B6y/exec";

  if (!webhookUrl) return;

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.warn("Google Sheet webhook returned status:", res.status);
    }
  } catch (err) {
    console.error("Failed to sync application to Google Sheets:", err);
  }
}
```

### 3.2 Payload Data Contract
The payload sent to the Cloud Spreadsheet webhook contains the following JSON structure:

```json
{
  "submitted_at": "2026-09-12T01:14:00.000Z",
  "opportunity_title": "Frontend Engineering Intern (Summer 2026)",
  "opportunity_id": "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
  "name": "Jane Doe",
  "email": "jane.doe@university.edu",
  "phone": "+1 (555) 019-2834",
  "college_university": "Stanford University",
  "degree": "B.S. Computer Science",
  "branch": "Computer Science & Engineering",
  "current_year": "3rd Year",
  "current_semester": "6th Semester",
  "cgpa_cpi": 3.92,
  "linkedin_url": "https://linkedin.com/in/janedoe",
  "github_url": "https://github.com/janedoe",
  "portfolio_url": "https://janedoe.dev",
  "skills": ["React", "TypeScript", "Tailwind CSS", "Node.js"],
  "custom_answers": {
    "internship_duration": "6 Months",
    "location_preference": "Remote",
    "available_start_date": "2026-06-01",
    "live_demo_url": "https://demo.janedoe.dev"
  }
}
```

### 3.3 Google Apps Script Receiver Implementation
On the Google Sheets side, a Google Apps Script Web App receives the incoming HTTP POST request, processes the payload, and appends the row:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    // Format skills array into comma-separated text
    const skillsText = Array.isArray(data.skills) ? data.skills.join(", ") : (data.skills || "");

    // Format custom answers JSON into readable key-value strings
    let customAnswersText = "";
    if (data.custom_answers && typeof data.custom_answers === "object") {
      customAnswersText = Object.entries(data.custom_answers)
        .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
        .join("\n");
    }

    // Append structured row
    sheet.appendRow([
      data.submitted_at || new Date().toISOString(),
      data.opportunity_title || "",
      data.name || "",
      data.email || "",
      data.phone || "",
      data.college_university || "",
      data.degree || "",
      data.branch || "",
      data.current_year || "",
      data.current_semester || "",
      data.cgpa_cpi || "",
      data.linkedin_url || "",
      data.github_url || "",
      data.portfolio_url || "",
      skillsText,
      customAnswersText,
      data.opportunity_id || ""
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

### 3.4 Spreadsheet Column Layout

| Column Index | Column Header | Source Property | Notes |
|---|---|---|---|
| **A** | `Submission Timestamp` | `submitted_at` | ISO 8601 UTC string |
| **B** | `Opportunity Title` | `opportunity_title` | Human-readable role name |
| **C** | `Candidate Name` | `name` | Applicant full name |
| **D** | `Email` | `email` | Lowercase normalized email |
| **E** | `Phone` | `phone` | Contact number |
| **F** | `College / University` | `college_university` | College name |
| **G** | `Degree` | `degree` | Degree program |
| **H** | `Branch / Major` | `branch` | Department |
| **I** | `Current Year` | `current_year` | 1st, 2nd, 3rd, 4th, etc. |
| **J** | `Current Semester` | `current_semester` | Semester string |
| **K** | `CGPA / CPI` | `cgpa_cpi` | Numerical grade point |
| **L** | `LinkedIn URL` | `linkedin_url` | Profile URL |
| **M** | `GitHub URL` | `github_url` | GitHub profile URL |
| **N** | `Portfolio URL` | `portfolio_url` | Portfolio website |
| **O** | `Skills` | `skills` | Comma-separated list |
| **P** | `Custom Answers` | `custom_answers` | Formatted multi-line key-value entries |
| **Q** | `Opportunity ID` | `opportunity_id` | UUID foreign key |

---

## 4. End-to-End Submission Lifecycle

```
[User submits form on UI]
           │
           ▼
[Zod Schema Verification] ──(Fails)──> Returns 400 with input validation errors
           │ (Passes)
           ▼
[Opportunity Validation] ───(Expired/Inactive)──> Returns error: Deadline passed / inactive
           │ (Valid)
           ▼
[Dynamic Fields Validation] ─(Missing required)─> Returns error: Specific field is required
           │ (Valid)
           ▼
[Duplicate Check] ──────────(Already exists)────> Returns error: Duplicate application
           │ (New applicant)
           ▼
[Supabase DB Insert] ───────(Insert into 'applications' table)
           │
           ├───> [Background Cloud Sheet Sync] ───> Sends HTTP POST to Webhook
           │
           ▼
[Return Success JSON to Client with application_id]
```

---

## 5. Environment Variables Reference

| Variable | Scope | Description |
|---|---|---|
| `VITE_SUPABASE_URL` / `SUPABASE_URL` | Client & Server | Supabase project endpoint URL |
| `VITE_SUPABASE_ANON_KEY` / `SUPABASE_ANON_KEY` | Client & Server | Supabase anonymous public API key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server Only | High-privilege key for server function execution |
| `GOOGLE_SHEET_WEBHOOK_URL` | Server Only | Google Apps Script Web App URL for spreadsheet sync |
