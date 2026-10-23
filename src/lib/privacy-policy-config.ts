/**
 * DolpBrain Privacy Policy Configuration & Developer TODO List
 *
 * SOURCE OF TRUTH: DolpBrain_Privacy_Policy.pdf
 * Effective Date: 22 October 2026
 * Last Updated: 23 October 2026
 *
 * ============================================================================
 * DEVELOPER & BUSINESS CONFIRMATION TODO LIST (Before Public Production Launch)
 * ============================================================================
 * The following values are legal placeholders preserved directly from the source
 * policy document. Replace each placeholder in this configuration file with
 * verified business details before deploying to production.
 *
 * [ ] 1. Udyam Registration Number:
 *        Replace "[Udyam Registration No. UDYAM-XX-00-0000000]" with your official
 *        MSME Udyam certificate registration identifier.
 *
 * [ ] 2. Registered Business Address:
 *        Replace "[Registered business address, City, State, PIN]" with the official
 *        registered office address of DolpBrain in India.
 *
 * [ ] 3. Canonical Website Domain:
 *        Replace "[https://www.yourdomain.com]" with "https://dolpstack.com" (or your
 *        official production domain).
 *
 * [ ] 4. Current Features List:
 *        Replace "[List your current features, e.g. user accounts, content access, support, payments]"
 *        with the live functionality currently provided on DolpStack.
 *
 * [ ] 5. Upcoming Features List:
 *        Replace "[List planned features, e.g. community, contests, AI-assisted features, recruiter visibility, mobile app, subscriptions]"
 *        with the actual planned features on the DolpStack product roadmap.
 *
 * [ ] 6. Third-Party Services Audit:
 *        Replace "[Edit this list to match the tools you actually use]" with the explicit
 *        tools currently utilized (e.g., Supabase, PostHog / Google Analytics, Cloudflare, Stripe/Razorpay).
 *
 * [ ] 7. Customer Support Email:
 *        Replace "[support@yourdomain.com]" with the verified operational support email
 *        (e.g., support@dolpstack.com).
 *
 * [ ] 8. Grievance Officer Name:
 *        Replace "[Grievance Officer name]" with the designated individual's full name
 *        mandated under the Information Technology Act, 2000.
 *
 * [ ] 9. Grievance Officer Email:
 *        Replace "[grievance@yourdomain.com]" with the designated grievance desk email
 *        (e.g., grievance@dolpstack.com).
 *
 * [ ] 10. Governing Jurisdiction City:
 *        Replace "[your city]" with the city in India whose courts shall have exclusive
 *        jurisdiction over disputes (e.g., Bengaluru, Karnataka).
 * ============================================================================
 */

export interface PrivacyPolicySectionMeta {
  id: string;
  number: number;
  title: string;
}

export const PRIVACY_POLICY_CONFIG = {
  effectiveDate: "22 October 2026",
  lastUpdated: "23 October 2026",
  businessName: "DolpBrain",
  entityType: "MSME-registered business in India",
  placeholders: {
    udyamRegistrationNumber: "UDYAM-MP-10-0178997",
    registeredAddress: "Ayodhya Nagar, Bhopal, Madhya Pradesh, 462041",
    websiteDomain: "https://dolpstack.in",
    presentFeatures:
      "user accounts, content access, support, payments, and other core features of DolpStack",
    upcomingFeatures:
      "community, contests, AI-assisted features, recruiter visibility, mobile app, subscriptions, and other planned enhancements to DolpStack",
    thirdPartyServicesNotice: "Cloudflare, AWS, Razorpay, and other third-party services used for hosting, analytics, and payment processing",
    supportEmail: "Currently Unavailable",
    grievanceOfficerName: "Currently Unavailable",
    grievanceOfficerEmail: "Currently Unavailable",
    governingCourtsCity: "Bhopal, Madhya Pradesh, India",
  },
  sections: [
    { id: "section-1", number: 1, title: "Introduction" },
    { id: "section-2", number: 2, title: "Definitions" },
    { id: "section-3", number: 3, title: "Information We Collect" },
    { id: "section-4", number: 4, title: "How We Use Your Information" },
    { id: "section-5", number: 5, title: "Present and Upcoming Features" },
    { id: "section-6", number: 6, title: "Sharing and Disclosure of Information" },
    { id: "section-7", number: 7, title: "Third-Party Services" },
    { id: "section-8", number: 8, title: "Cookies and Tracking Technologies" },
    { id: "section-9", number: 9, title: "Data Retention" },
    { id: "section-10", number: 10, title: "Data Security" },
    { id: "section-11", number: 11, title: "Data Storage and Transfers" },
    { id: "section-12", number: 12, title: "Your Rights" },
    { id: "section-13", number: 13, title: "Children's Privacy" },
    { id: "section-14", number: 14, title: "Commercial Communication" },
    { id: "section-15", number: 15, title: "Reporting Security Vulnerabilities" },
    { id: "section-16", number: 16, title: "Grievance Officer and Contact" },
    { id: "section-17", number: 17, title: "Changes to This Policy" },
    { id: "section-18", number: 18, title: "Governing Law" },
  ] as const satisfies readonly PrivacyPolicySectionMeta[],
};
