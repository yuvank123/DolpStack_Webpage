import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getOpportunityByIdFn, submitApplicationFn } from "@/lib/api/opportunities";
import { PortalHeader } from "@/components/portal/PortalHeader";
import { SkillInput } from "@/components/portal/SkillInput";
import { DynamicFieldRenderer } from "@/components/portal/DynamicFieldRenderer";
import { baseApplicationSchema, ApplicationSubmissionInput } from "@/lib/types/portal";
import {
  User,
  GraduationCap,
  Briefcase,
  Globe,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Loader2,
  ShieldCheck,
  Trophy,
  Sparkles,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/opportunities/$id/apply")({
  loader: async ({ params }) => {
    const res = await getOpportunityByIdFn({ data: { id: params.id } });
    if (!res.opportunity) {
      throw notFound();
    }
    return res.opportunity;
  },
  component: ApplicationFormPage,
});

function ApplicationFormPage() {
  const opp = Route.useLoaderData();

  const deadlineDate = new Date(opp.application_deadline);
  const isExpired = deadlineDate < new Date();
  const isClosed = !opp.is_active || isExpired;

  // Form State
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    college_university: string;
    degree: string;
    branch: string;
    current_year: string;
    current_semester: string;
    cgpa_cpi: string;
    linkedin_url: string;
    github_url: string;
    portfolio_url: string;
    skills: string[];
    custom_answers: Record<string, unknown>;
    consent_agreed: boolean;
  }>({
    name: "",
    email: "",
    phone: "",
    college_university: "",
    degree: "",
    branch: "",
    current_year: "",
    current_semester: "",
    cgpa_cpi: "",
    linkedin_url: "",
    github_url: "",
    portfolio_url: "",
    skills: [],
    custom_answers: {},
    consent_agreed: false,
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);

  const updateField = (key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
    if (generalError) setGeneralError(null);
  };

  const updateCustomAnswer = (key: string, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      custom_answers: { ...prev.custom_answers, [key]: value },
    }));
    const errorKey = `custom_${key}`;
    if (fieldErrors[errorKey]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[errorKey];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);
    setFieldErrors({});

    if (isClosed) {
      setGeneralError("This opportunity is closed and cannot accept new applications.");
      return;
    }

    // Client-side Custom Field validations
    const errors: Record<string, string> = {};
    if (opp.fields && opp.fields.length > 0) {
      for (const field of opp.fields) {
        const answer = formData.custom_answers[field.field_key];
        if (field.required) {
          if (
            answer === undefined ||
            answer === null ||
            (typeof answer === "string" && answer.trim() === "") ||
            (Array.isArray(answer) && answer.length === 0)
          ) {
            errors[`custom_${field.field_key}`] = `${field.label} is required`;
          }
        }
        if (field.type === "url" && answer && typeof answer === "string" && answer.trim() !== "") {
          try {
            new URL(answer.trim());
          } catch {
            errors[`custom_${field.field_key}`] = "Please enter a valid URL (https://...)";
          }
        }
      }
    }

    // Parse base fields with Zod
    const payloadToValidate = {
      opportunity_id: opp.id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      college_university: formData.college_university,
      degree: formData.degree,
      branch: formData.branch,
      current_year: formData.current_year,
      current_semester: formData.current_semester,
      cgpa_cpi: formData.cgpa_cpi ? Number(formData.cgpa_cpi) : NaN,
      linkedin_url: formData.linkedin_url,
      github_url: formData.github_url,
      portfolio_url: formData.portfolio_url,
      skills: formData.skills,
      custom_answers: formData.custom_answers,
      consent_agreed: formData.consent_agreed,
    };

    const parsed = baseApplicationSchema.safeParse(payloadToValidate);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const path = issue.path[0] as string;
        if (!errors[path]) {
          errors[path] = issue.message;
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setGeneralError("Please fix the highlighted errors before submitting.");
      // Scroll to top of form
      window.scrollTo({ top: 100, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitApplicationFn({
        data: parsed.data as ApplicationSubmissionInput,
      });

      if (response && response.success) {
        setSubmittedAppId(response.application_id);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setGeneralError("Failed to submit application. Please try again.");
      }
    } catch (err: unknown) {
      console.error("Submission error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred during submission.";
      setGeneralError(errorMessage);
      window.scrollTo({ top: 100, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 1. Success State View
  if (submittedAppId) {
    return (
      <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20">
        <PortalHeader />
        <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-b from-card/90 to-card/40 p-8 sm:p-12 text-center backdrop-blur-xl shadow-2xl space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 ring-8 ring-emerald-500/5">
              <CheckCircle className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <Badge
                variant="outline"
                className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              >
                Application Received
              </Badge>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl text-foreground">
                You're All Set, {formData.name.split(" ")[0]}!
              </h1>
              <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                Your application for <strong className="text-foreground">{opp.title}</strong> has
                been securely recorded and dispatched to the review team.
              </p>
            </div>

            {/* Application Reference ID Box */}
            <div className="rounded-xl border border-border/60 bg-muted/20 p-4 text-xs space-y-1">
              <span className="text-muted-foreground uppercase font-mono tracking-wider">
                Application Reference ID
              </span>
              <div className="font-mono text-sm font-bold text-primary select-all break-all">
                {submittedAppId}
              </div>
            </div>

            <div className="rounded-xl border border-border/50 bg-background/50 p-4 text-left text-xs text-muted-foreground space-y-2">
              <div className="flex items-center gap-2 font-semibold text-foreground">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                What happens next?
              </div>
              <p>
                Our engineering and review panel evaluates candidates on a rolling basis. If your
                profile matches our criteria, we will reach out to{" "}
                <strong className="text-foreground">{formData.email}</strong> with next steps.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                to="/opportunities"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90"
              >
                Browse More Opportunities
              </Link>
              <Link
                to="/"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-border/70 bg-background/60 px-5 py-2.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // 2. Closed State View
  if (isClosed) {
    return (
      <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20">
        <PortalHeader backTo={`/opportunities/${opp.id}`} backLabel="Opportunity Details" />
        <main className="mx-auto max-w-xl px-4 py-16 sm:px-6">
          <div className="rounded-3xl border border-destructive/30 bg-destructive/5 p-8 text-center backdrop-blur-xl shadow-xl space-y-4">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
            <h1 className="text-xl font-bold text-foreground">Applications are Closed</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Applications for <strong className="text-foreground">{opp.title}</strong> are
              currently closed as the deadline has passed.
            </p>
            <div className="pt-4">
              <Link
                to="/opportunities"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-md hover:bg-primary/90"
              >
                View Active Opportunities
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // 3. Application Form
  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20">
      <PortalHeader backTo={`/opportunities/${opp.id}`} backLabel="Opportunity Details" />

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground pb-6">
          <Link to="/opportunities" className="hover:text-foreground transition-colors">
            Opportunities
          </Link>
          <span>/</span>
          <Link
            to="/opportunities/$id"
            params={{ id: opp.id }}
            className="hover:text-foreground transition-colors truncate max-w-[150px]"
          >
            {opp.title}
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">Application</span>
        </div>

        {/* Header Title Card */}
        <div className="rounded-2xl border border-border/70 bg-gradient-to-b from-card/90 to-card/40 p-6 sm:p-8 backdrop-blur-xl shadow-xl mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {opp.type === "internship" ? (
              <Badge
                variant="outline"
                className="border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs"
              >
                <Briefcase className="h-3 w-3 mr-1" /> Internship
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs"
              >
                <Trophy className="h-3 w-3 mr-1" /> Hackathon
              </Badge>
            )}
            <Badge variant="secondary" className="text-xs">
              No Resume Required
            </Badge>
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl text-foreground">
            Application for {opp.title}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Please fill out your educational details, skill proficiencies, and answers accurately.
            All submissions are processed securely.
          </p>
        </div>

        {/* Global Error Banner */}
        {generalError && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-destructive">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="text-sm font-medium">
              <p>{generalError}</p>
            </div>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Personal Information */}
          <div className="rounded-2xl border border-border/70 bg-card/50 p-6 sm:p-8 backdrop-blur-md space-y-5">
            <div className="flex items-center gap-2.5 border-b border-border/50 pb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                <User className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-foreground">1. Personal Information</h2>
                <p className="text-xs text-muted-foreground">
                  Primary contact and identity details
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="bg-background/50"
                />
                {fieldErrors.name && <p className="text-xs text-destructive">{fieldErrors.name}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="alex@university.edu"
                  className="bg-background/50"
                />
                {fieldErrors.email && (
                  <p className="text-xs text-destructive">{fieldErrors.email}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="bg-background/50"
                />
                {fieldErrors.phone && (
                  <p className="text-xs text-destructive">{fieldErrors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Education */}
          <div className="rounded-2xl border border-border/70 bg-card/50 p-6 sm:p-8 backdrop-blur-md space-y-5">
            <div className="flex items-center gap-2.5 border-b border-border/50 pb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
                <GraduationCap className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-foreground">2. Education Details</h2>
                <p className="text-xs text-muted-foreground">
                  Your academic background and standing
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="college_university" className="text-sm font-medium">
                  College / University <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="college_university"
                  type="text"
                  value={formData.college_university}
                  onChange={(e) => updateField("college_university", e.target.value)}
                  placeholder="e.g. Stanford University / IIT Bombay / MIT"
                  className="bg-background/50"
                />
                {fieldErrors.college_university && (
                  <p className="text-xs text-destructive">{fieldErrors.college_university}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="degree" className="text-sm font-medium">
                  Degree <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="degree"
                  type="text"
                  value={formData.degree}
                  onChange={(e) => updateField("degree", e.target.value)}
                  placeholder="e.g. B.Tech / B.S. / M.S. / BCA"
                  className="bg-background/50"
                />
                {fieldErrors.degree && (
                  <p className="text-xs text-destructive">{fieldErrors.degree}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="branch" className="text-sm font-medium">
                  Branch / Major <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="branch"
                  type="text"
                  value={formData.branch}
                  onChange={(e) => updateField("branch", e.target.value)}
                  placeholder="e.g. Computer Science & Engineering"
                  className="bg-background/50"
                />
                {fieldErrors.branch && (
                  <p className="text-xs text-destructive">{fieldErrors.branch}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="current_year" className="text-sm font-medium">
                  Current Year of Study <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.current_year}
                  onValueChange={(val) => updateField("current_year", val)}
                >
                  <SelectTrigger id="current_year" className="bg-background/50">
                    <SelectValue placeholder="Select current year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st Year">1st Year</SelectItem>
                    <SelectItem value="2nd Year">2nd Year</SelectItem>
                    <SelectItem value="3rd Year">3rd Year</SelectItem>
                    <SelectItem value="4th Year">4th Year</SelectItem>
                    <SelectItem value="Final Year">Final Year</SelectItem>
                    <SelectItem value="Graduate / Post-Grad">Graduate / Post-Grad</SelectItem>
                  </SelectContent>
                </Select>
                {fieldErrors.current_year && (
                  <p className="text-xs text-destructive">{fieldErrors.current_year}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="current_semester" className="text-sm font-medium">
                  Current Semester <span className="text-xs text-muted-foreground">(Optional)</span>
                </Label>
                <Select
                  value={formData.current_semester}
                  onValueChange={(val) => updateField("current_semester", val)}
                >
                  <SelectTrigger id="current_semester" className="bg-background/50">
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Semester 1">Semester 1</SelectItem>
                    <SelectItem value="Semester 2">Semester 2</SelectItem>
                    <SelectItem value="Semester 3">Semester 3</SelectItem>
                    <SelectItem value="Semester 4">Semester 4</SelectItem>
                    <SelectItem value="Semester 5">Semester 5</SelectItem>
                    <SelectItem value="Semester 6">Semester 6</SelectItem>
                    <SelectItem value="Semester 7">Semester 7</SelectItem>
                    <SelectItem value="Semester 8">Semester 8</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="cgpa_cpi" className="text-sm font-medium">
                  Cumulative CGPA / CPI (on a 10.0 scale){" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="cgpa_cpi"
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  value={formData.cgpa_cpi}
                  onChange={(e) => updateField("cgpa_cpi", e.target.value)}
                  placeholder="e.g. 8.75"
                  className="bg-background/50"
                />
                {fieldErrors.cgpa_cpi && (
                  <p className="text-xs text-destructive">{fieldErrors.cgpa_cpi}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Professional Profiles */}
          <div className="rounded-2xl border border-border/70 bg-card/50 p-6 sm:p-8 backdrop-blur-md space-y-5">
            <div className="flex items-center gap-2.5 border-b border-border/50 pb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500">
                <Globe className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-foreground">3. Professional Profiles</h2>
                <p className="text-xs text-muted-foreground">
                  Provide links to your online work and repositories
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="linkedin_url" className="text-sm font-medium">
                  LinkedIn Profile URL
                </Label>
                <Input
                  id="linkedin_url"
                  type="url"
                  value={formData.linkedin_url}
                  onChange={(e) => updateField("linkedin_url", e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="bg-background/50"
                />
                {fieldErrors.linkedin_url && (
                  <p className="text-xs text-destructive">{fieldErrors.linkedin_url}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="github_url" className="text-sm font-medium">
                  GitHub Profile URL
                </Label>
                <Input
                  id="github_url"
                  type="url"
                  value={formData.github_url}
                  onChange={(e) => updateField("github_url", e.target.value)}
                  placeholder="https://github.com/username"
                  className="bg-background/50"
                />
                {fieldErrors.github_url && (
                  <p className="text-xs text-destructive">{fieldErrors.github_url}</p>
                )}
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="portfolio_url" className="text-sm font-medium">
                  Personal Portfolio / Blog URL
                </Label>
                <Input
                  id="portfolio_url"
                  type="url"
                  value={formData.portfolio_url}
                  onChange={(e) => updateField("portfolio_url", e.target.value)}
                  placeholder="https://yourportfolio.dev"
                  className="bg-background/50"
                />
                {fieldErrors.portfolio_url && (
                  <p className="text-xs text-destructive">{fieldErrors.portfolio_url}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Skills */}
          <div className="rounded-2xl border border-border/70 bg-card/50 p-6 sm:p-8 backdrop-blur-md space-y-5">
            <div className="flex items-center gap-2.5 border-b border-border/50 pb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-foreground">4. Skills & Proficiencies</h2>
                <p className="text-xs text-muted-foreground">
                  Add your core technical skills and languages
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium">
                Technical Skills <span className="text-destructive">*</span>
              </Label>
              <SkillInput
                skills={formData.skills}
                onChange={(skills) => updateField("skills", skills)}
                error={fieldErrors.skills}
              />
            </div>
          </div>

          {/* Section 5: Dynamic Opportunity Specific Questions */}
          {opp.fields && opp.fields.length > 0 && (
            <div className="rounded-2xl border border-border/70 bg-card/50 p-6 sm:p-8 backdrop-blur-md space-y-5">
              <div className="flex items-center gap-2.5 border-b border-border/50 pb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                  <Briefcase className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-foreground">
                    5. Opportunity Specific Questions
                  </h2>
                  <p className="text-xs text-muted-foreground">Tailored questions for this role</p>
                </div>
              </div>

              <div className="space-y-4">
                {opp.fields.map((field) => (
                  <DynamicFieldRenderer
                    key={field.id}
                    field={field}
                    value={formData.custom_answers[field.field_key]}
                    onChange={(val) => updateCustomAnswer(field.field_key, val)}
                    error={fieldErrors[`custom_${field.field_key}`]}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Section 6: Privacy Notice & Submission Agreement */}
          <div className="rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur-md space-y-4">
            <div className="rounded-xl border border-border/50 bg-muted/20 p-4 text-xs text-muted-foreground leading-relaxed">
              <p className="font-semibold text-foreground mb-1">Applicant Privacy & Data Consent</p>
              By submitting this form, you acknowledge and agree that your provided personal,
              educational, and professional data will be stored securely and used solely by the
              DolpStack team and its evaluators for the purpose of assessing and managing your
              application for this opportunity.
            </div>

            <div className="flex items-start space-x-3 pt-1">
              <Checkbox
                id="consent_agreed"
                checked={formData.consent_agreed}
                onCheckedChange={(checked) => updateField("consent_agreed", Boolean(checked))}
                className="mt-0.5"
              />
              <Label
                htmlFor="consent_agreed"
                className="text-xs text-foreground font-normal leading-normal cursor-pointer select-none"
              >
                I confirm that all information provided is accurate, and I agree to the processing
                of my application data for evaluation. <span className="text-destructive">*</span>
              </Label>
            </div>
            {fieldErrors.consent_agreed && (
              <p className="text-xs text-destructive">{fieldErrors.consent_agreed}</p>
            )}
          </div>

          {/* Submit Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <Link
              to="/opportunities/$id"
              params={{ id: opp.id }}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Cancel and return to overview
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-500 hover:via-indigo-500 hover:to-blue-600 hover:shadow-blue-500/40 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting Application...
                </>
              ) : (
                <>
                  Submit Application <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
