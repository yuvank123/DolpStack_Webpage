-- ==============================================================================
-- Development & Testing Seed Data
-- ==============================================================================

-- 1. Insert sample opportunities
INSERT INTO public.opportunities (
  id,
  title,
  type,
  description,
  eligibility,
  benefits,
  application_deadline,
  is_active
) VALUES 
(
  'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d',
  'Frontend Engineering Intern (Summer 2026)',
  'internship',
  'Join the DolpStack Core Team to build lightning-fast web applications, developer workbenches, and interactive visual tooling. You will collaborate directly with senior engineers on modern React, TypeScript, and high-performance WebGL / canvas UI architectures.',
  'Enrolled in a Bachelor''s or Master''s degree in Computer Science, Information Technology, or related technical field. Graduation between 2026 and 2028. Strong fundamentals in JavaScript/TypeScript, React, HTML/CSS, and Git version control.',
  '• Competitive monthly stipend ($2,500 - $3,500/mo)
• Flexible remote or hybrid work policy
• 1-on-1 mentorship with principal engineers
• Certificate of completion & high-performing PPO consideration
• Hardware allowance / cloud workstation credits',
  (now() + INTERVAL '45 days'),
  true
),
(
  'b2c3d4e5-f6a7-4b6c-9d0e-1f2a3b4c5d6e',
  'DolpStack AI Innovation Hackathon 2026',
  'hackathon',
  'A 48-hour global virtual hackathon bringing together builders, students, and engineers to create groundbreaking developer tools, autonomous coding assistants, and cloud workspace extensions. Compete for $25,000 in cash prizes and incubator access.',
  'Open to all students, independent developers, and tech enthusiasts worldwide. Solo participants or teams up to 4 members. Projects must be built during the hackathon period and open-sourced.',
  '• $25,000 Total Cash Prize Pool (1st: $12k, 2nd: $8k, 3rd: $5k)
• Fast-track interviews with top tech accelerator partners
• Exclusive DolpStack swag box for top 20 finalists
• Free credits for AI APIs and cloud hosting
• Live mentorship & workshops from industry leaders',
  (now() + INTERVAL '30 days'),
  true
),
(
  'c3d4e5f6-a7b8-4c7d-0e1f-2a3b4c5d6e7f',
  'Full Stack Cloud & Systems Intern',
  'internship',
  'Work on distributed backend systems, real-time collaboration engines, and edge API infrastructure. Gain deep hands-on experience with PostgreSQL, Nitro/Vite micro-services, and serverless edge functions.',
  'Students in CS/ECE/EE with proficiency in Node.js, TypeScript, and SQL databases. Understanding of REST/WebSocket protocols and cloud computing fundamentals.',
  '• Competitive stipend
• Hands-on edge computing & distributed DB experience
• Direct contribution to open-source developer tool ecosystem
• Flexible hours & mentorship program',
  (now() + INTERVAL '60 days'),
  true
)
ON CONFLICT (id) DO NOTHING;

-- 2. Insert dynamic fields for Frontend Internship
INSERT INTO public.opportunity_fields (
  opportunity_id,
  label,
  field_key,
  type,
  required,
  options,
  display_order
) VALUES
(
  'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d',
  'Preferred Internship Duration',
  'internship_duration',
  'select',
  true,
  '["3 Months", "6 Months", "Flexible"]'::jsonb,
  1
),
(
  'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d',
  'Work Location Preference',
  'location_preference',
  'select',
  true,
  '["Remote", "Hybrid (Bangalore)", "Hybrid (San Francisco)"]'::jsonb,
  2
),
(
  'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d',
  'Primary Frontend Framework Preference',
  'frontend_framework',
  'select',
  false,
  '["React / Next.js / TanStack", "Vue / Nuxt", "Svelte", "Other"]'::jsonb,
  3
),
(
  'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d',
  'Available Start Date',
  'available_start_date',
  'date',
  true,
  '[]'::jsonb,
  4
),
(
  'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d',
  'Link to Your Best Live Project / Demo',
  'live_demo_url',
  'url',
  false,
  '[]'::jsonb,
  5
)
ON CONFLICT (opportunity_id, field_key) DO NOTHING;

-- 3. Insert dynamic fields for Hackathon
INSERT INTO public.opportunity_fields (
  opportunity_id,
  label,
  field_key,
  type,
  required,
  options,
  display_order
) VALUES
(
  'b2c3d4e5-f6a7-4b6c-9d0e-1f2a3b4c5d6e',
  'Participation Mode',
  'participation_mode',
  'select',
  true,
  '["Solo Builder", "Team of 2", "Team of 3", "Team of 4"]'::jsonb,
  1
),
(
  'b2c3d4e5-f6a7-4b6c-9d0e-1f2a3b4c5d6e',
  'Team Name (if participating as team)',
  'team_name',
  'text',
  false,
  '[]'::jsonb,
  2
),
(
  'b2c3d4e5-f6a7-4b6c-9d0e-1f2a3b4c5d6e',
  'Hackathon Track of Interest',
  'hackathon_track',
  'select',
  true,
  '["AI Developer Agents", "Real-Time Collaborative Tools", "Open Source Developer Tooling", "Cloud & Edge Infrastructure"]'::jsonb,
  3
),
(
  'b2c3d4e5-f6a7-4b6c-9d0e-1f2a3b4c5d6e',
  'Briefly describe previous hackathons or open-source projects (if any)',
  'previous_experience',
  'textarea',
  false,
  '[]'::jsonb,
  4
)
ON CONFLICT (opportunity_id, field_key) DO NOTHING;
