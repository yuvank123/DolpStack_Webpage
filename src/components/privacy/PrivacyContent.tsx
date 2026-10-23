import { PRIVACY_POLICY_CONFIG } from "@/lib/privacy-policy-config";
import { Placeholder } from "@/components/privacy/Placeholder";

export function PrivacyContent() {
  const { placeholders } = PRIVACY_POLICY_CONFIG;

  return (
    <article className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/75 p-6 sm:p-10 md:p-12 backdrop-blur-xl shadow-xl shadow-black/5 dark:shadow-none space-y-12 text-foreground">
      {/* Top subtle border glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      {/* 1. Introduction */}
      <section id="section-1" className="scroll-mt-24 border-b border-border/60 pb-10">
        <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 font-mono text-xs font-bold text-blue-600 dark:text-cyan-400 border border-blue-500/20">
            01
          </span>
          <span>1. Introduction</span>
        </h2>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p>
            Welcome to DolpBrain. DolpBrain (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or
            &ldquo;our&rdquo;) is a business registered as a Micro, Small and Medium Enterprise
            (MSME) in India under the Ministry of MSME,{" "}
            <Placeholder
              value={placeholders.udyamRegistrationNumber}
              label="Udyam Registration Number"
            />
            , with its registered address at{" "}
            <Placeholder
              value={placeholders.registeredAddress}
              label="Registered Business Address"
            />
            . DolpBrain is currently an MSME-registered business and is not a private limited
            company. If our legal structure changes in future, this Policy will be updated and will
            continue to apply to the successor entity.
          </p>
          <p>
            This Privacy Policy explains how we collect, use, store, share and protect information
            when you visit <Placeholder value={placeholders.websiteDomain} label="Website Domain" />{" "}
            or use our website, mobile application and related services (together, the
            &ldquo;Service&rdquo;). It is published in accordance with the Information Technology
            Act, 2000, the Information Technology (Reasonable Security Practices and Procedures and
            Sensitive Personal Data or Information) Rules, 2011, and the Digital Personal Data
            Protection Act, 2023, as applicable.
          </p>
          <p>
            By accessing or using the Service, or by submitting your information, you agree to this
            Policy together with our Terms and Conditions. If you do not agree, please do not use
            the Service.
          </p>
        </div>
      </section>

      {/* 2. Definitions */}
      <section id="section-2" className="scroll-mt-24 border-b border-border/60 pb-10">
        <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 font-mono text-xs font-bold text-blue-600 dark:text-cyan-400 border border-blue-500/20">
            02
          </span>
          <span>2. Definitions</span>
        </h2>

        <div className="mt-5 overflow-hidden rounded-xl border border-border/70 bg-background/50 backdrop-blur-md shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-foreground">
              <thead className="border-b border-border/70 bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th scope="col" className="px-5 py-3.5 sm:w-1/4">
                    Term
                  </th>
                  <th scope="col" className="px-5 py-3.5">
                    Meaning
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-foreground">Service</td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    The DolpBrain website, mobile app and any related features operated by us, both
                    those available today and those we add in future.
                  </td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-foreground">Personal Data</td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    Any data about an individual who can be identified from that data, alone or
                    together with other information we hold.
                  </td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-foreground">
                    Sensitive Personal Data
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    Personal data such as passwords and financial account information, as defined in
                    the IT Rules, 2011.
                  </td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-foreground">Usage Data</td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    Data collected automatically when you use the Service, for example IP address,
                    pages viewed and time spent.
                  </td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-foreground">Cookies</td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    Small files stored on your device that help the Service remember your actions
                    and preferences.
                  </td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-foreground">Data Fiduciary</td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    The entity that decides the purpose and means of processing Personal Data. For
                    this Policy, this is DolpBrain.
                  </td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-foreground">
                    Data Principal / User
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    The individual to whom the Personal Data relates, being you.
                  </td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-foreground">Service Providers</td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    Third parties that process data on our behalf, such as hosting, analytics,
                    payment and communication vendors.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. Information We Collect */}
      <section id="section-3" className="scroll-mt-24 border-b border-border/60 pb-10">
        <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 font-mono text-xs font-bold text-blue-600 dark:text-cyan-400 border border-blue-500/20">
            03
          </span>
          <span>3. Information We Collect</span>
        </h2>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          We collect only the information we need to provide and improve the Service.
        </p>

        <div className="mt-6 space-y-7 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <div>
            <div className="flex items-center gap-2 pb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              <h3 className="text-base font-semibold text-foreground sm:text-lg">
                3.1 Information you provide
              </h3>
            </div>
            <ul className="space-y-3 pt-1">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />
                <div>
                  <strong className="font-semibold text-foreground">Account details:</strong> name,
                  email address, phone number, password (stored in encrypted form), and profile
                  details you choose to add.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />
                <div>
                  <strong className="font-semibold text-foreground">Communications:</strong>{" "}
                  Messages, feedback, support requests and any attachments you send us.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />
                <div>
                  <strong className="font-semibold text-foreground">Optional details:</strong> age,
                  gender, education or professional information, if a feature asks for them.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />
                <div>
                  <strong className="font-semibold text-foreground">User content:</strong> Content
                  you create or upload on the Service.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />
                <div>
                  <strong className="font-semibold text-foreground">Code &amp; Submissions:</strong>{" "}
                  Source code, algorithm submissions, and performance logs generated within our
                  interactive coding environment. We process these to run your code, score and
                  evaluate it, track your progress, and detect plagiarism or misuse.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />
                <div>
                  <strong className="font-semibold text-foreground">
                    Payment-related details:
                  </strong>{" "}
                  when you buy a paid plan. Card and bank details are entered directly with our
                  payment processors and are not stored by us.
                </div>
              </li>
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 pb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              <h3 className="text-base font-semibold text-foreground sm:text-lg">
                3.2 Information collected automatically
              </h3>
            </div>
            <ul className="space-y-3 pt-1">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />
                <div>
                  IP address, browser type and version, operating system, device model, unique
                  device identifiers and language.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />
                <div>
                  Pages or screens visited, features used, date and time of visits, time spent,
                  referring and exit pages, clickstream data.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />
                <div>Crash reports and diagnostic data.</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />
                <div>Cookies, beacons, tags and similar technologies (see Section 8).</div>
              </li>
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 pb-1">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              <h3 className="text-base font-semibold text-foreground sm:text-lg">
                3.3 Device permissions (mobile app)
              </h3>
            </div>
            <p className="mt-1 pl-3.5">
              If our app requests device permissions such as camera, microphone, storage, contacts
              or location, we use them only for the feature that needs them, and only after you
              grant permission. You can withdraw any permission at any time in your device settings,
              although some features may then stop working.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 pb-1">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              <h3 className="text-base font-semibold text-foreground sm:text-lg">
                3.4 Information from third parties
              </h3>
            </div>
            <p className="mt-1 pl-3.5">
              If you sign in using a social account (for example Google, Facebook, LinkedIn, GitHub
              or Apple), we may receive your name, email address and profile picture, based on your
              settings with that provider.
            </p>
          </div>
        </div>
      </section>

      {/* 4. How We Use Your Information */}
      <section id="section-4" className="scroll-mt-24 border-b border-border/60 pb-10">
        <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 font-mono text-xs font-bold text-blue-600 dark:text-cyan-400 border border-blue-500/20">
            04
          </span>
          <span>4. How We Use Your Information</span>
        </h2>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />
              <div>To provide, operate, maintain and secure the Service and your account.</div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />
              <div>
                To personalise your experience and recommend content, learning paths or features.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />
              <div>
                To understand how the Service is used and to improve it, including developing new
                features.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />
              <div>
                To communicate with you about updates, support, security alerts and, where
                permitted, offers and newsletters.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />
              <div>To process payments and prevent fraud, abuse and unauthorised access.</div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />
              <div>To comply with legal obligations and enforce our Terms and Conditions.</div>
            </li>
          </ul>

          <div className="mt-4 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 text-xs sm:text-sm text-foreground backdrop-blur-xs">
            You can opt out of marketing messages at any time using the unsubscribe link, or by
            writing to us. We will still send you service and security messages that are necessary
            for your account.
          </div>
        </div>
      </section>

      {/* 5. Present and Upcoming Features */}
      <section id="section-5" className="scroll-mt-24 border-b border-border/60 pb-10">
        <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 font-mono text-xs font-bold text-blue-600 dark:text-cyan-400 border border-blue-500/20">
            05
          </span>
          <span>5. Present and Upcoming Features</span>
        </h2>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          We are an early-stage business and the Service will grow. This section tells you how this
          Policy applies to current and future features.
        </p>

        <div className="mt-5 overflow-hidden rounded-xl border border-border/70 bg-background/50 backdrop-blur-md shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-foreground">
              <thead className="border-b border-border/70 bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th scope="col" className="px-5 py-3.5 sm:w-1/4">
                    What it covers
                  </th>
                  <th scope="col" className="px-5 py-3.5">
                    How your data is handled
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-foreground">Present features</td>
                  <td className="px-5 py-3.5 text-muted-foreground space-y-1.5">
                    <div>
                      <Placeholder
                        value={placeholders.presentFeatures}
                        label="Present Features List"
                      />
                    </div>
                    <div className="text-xs text-muted-foreground pt-0.5">
                      Data is collected and used as described in Sections 3 and 4.
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-foreground">Upcoming features</td>
                  <td className="px-5 py-3.5 text-muted-foreground space-y-1.5">
                    <div>
                      <Placeholder
                        value={placeholders.upcomingFeatures}
                        label="Upcoming Features List"
                      />
                    </div>
                    <div className="text-xs text-muted-foreground pt-0.5">
                      Before a new feature that collects a new kind of data or uses data for a new
                      purpose goes live, we will update this Policy and notify you. Where required,
                      we will ask for your fresh consent first.
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p>
            Some features may let us or other users see parts of your activity. We will describe
            each such feature when it launches, and these are examples of what may apply in future:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />
              <div>
                <strong className="font-semibold text-foreground">
                  Public profile and activity:
                </strong>{" "}
                if you opt in to a public profile, your username, profile picture, code badges,
                solved-problem counts and similar achievements will be visible to the public and may
                be indexed by search engines. We will warn you before your activity becomes public,
                and you can switch your profile back to private at any time (content already indexed
                by search engines may take time to disappear).
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />
              <div>
                <strong className="font-semibold text-foreground">
                  Sharing with recruiters or partners:
                </strong>{" "}
                we will share your activity, achievements or profile with recruiters, employers or
                partners only if you opt in, and you can withdraw that consent at any time.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />
              <div>
                <strong className="font-semibold text-foreground">
                  AI and automated code evaluation:
                </strong>{" "}
                we use automated tools to evaluate code optimization, syntax errors, and test-case
                passing rates, and to give feedback on your submissions. If we add AI models to
                these features, we will tell you what data they use. We will not use your personal
                content or code to train models that are shared with others without your consent.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />
              <div>
                <strong className="font-semibold text-foreground">Location-based features:</strong>{" "}
                we will collect location only after you grant permission.
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* 6. Sharing and Disclosure of Information */}
      <section id="section-6" className="scroll-mt-24 border-b border-border/60 pb-10">
        <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 font-mono text-xs font-bold text-blue-600 dark:text-cyan-400 border border-blue-500/20">
            06
          </span>
          <span>6. Sharing and Disclosure of Information</span>
        </h2>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 px-4 py-3 text-sm font-medium text-foreground">
            We do not sell your Personal Data. We may share it only in the following situations:
          </div>

          <ul className="space-y-3 pt-1">
            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />
              <div>
                <strong className="font-semibold text-foreground">Service Providers:</strong>{" "}
                hosting, analytics, communication, customer support, payment processing and similar
                vendors who act on our instructions and are bound to keep data confidential. We
                maintain an internal log of all Data Processors that handle personal data on our
                behalf, and you may request a list of the specific third parties processing your
                personal data by writing to us.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />
              <div>
                <strong className="font-semibold text-foreground">With your consent:</strong> for
                example, when you choose to share your activity with recruiters or partners.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />
              <div>
                <strong className="font-semibold text-foreground">Legal reasons:</strong> where
                required by law, court order or a lawful request from a government authority, or to
                protect the rights, property or safety of DolpBrain, our users or others.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />
              <div>
                <strong className="font-semibold text-foreground">Fraud prevention:</strong> with
                other organisations to detect and prevent fraud, abuse or security incidents.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />
              <div>
                <strong className="font-semibold text-foreground">Business changes:</strong> if
                DolpBrain converts to a private limited company, merges, or transfers its business,
                your data may be transferred to the successor entity, which will be bound by this
                Policy.
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* 7. Third-Party Services */}
      <section id="section-7" className="scroll-mt-24 border-b border-border/60 pb-10">
        <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 font-mono text-xs font-bold text-blue-600 dark:text-cyan-400 border border-blue-500/20">
            07
          </span>
          <span>7. Third-Party Services</span>
        </h2>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p>
            We may use third-party tools for analytics (such as Google Analytics), crash reporting,
            payments, advertising and cloud hosting. These providers have their own privacy policies
            and we do not control their practices.{" "}
            <Placeholder
              value={placeholders.thirdPartyServicesNotice}
              label="Third-Party Services List"
            />
          </p>
          <div className="rounded-xl border border-border/70 bg-background/40 p-4">
            <strong className="font-semibold text-foreground">Payments:</strong> we do not store
            your card, UPI or bank details. They are handled directly by PCI-DSS compliant payment
            processors.
          </div>
          <p>
            <strong className="font-semibold text-foreground">Links to other sites:</strong> the
            Service may link to sites we do not operate. We are not responsible for their content or
            privacy practices and encourage you to read their policies.
          </p>
        </div>
      </section>

      {/* 8. Cookies and Tracking Technologies */}
      <section id="section-8" className="scroll-mt-24 border-b border-border/60 pb-10">
        <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 font-mono text-xs font-bold text-blue-600 dark:text-cyan-400 border border-blue-500/20">
            08
          </span>
          <span>8. Cookies and Tracking Technologies</span>
        </h2>

        <div className="mt-5 overflow-hidden rounded-xl border border-border/70 bg-background/50 backdrop-blur-md shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-foreground">
              <thead className="border-b border-border/70 bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th scope="col" className="px-5 py-3.5 sm:w-1/3">
                    Type
                  </th>
                  <th scope="col" className="px-5 py-3.5">
                    Purpose
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-foreground">Session cookies</td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    Keep you logged in and make the Service work.
                  </td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-foreground">Preference cookies</td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    Remember your settings and choices.
                  </td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-foreground">Security cookies</td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    Protect your account and detect misuse.
                  </td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-foreground">Analytics cookies</td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    Understand traffic and how features are used, using aggregated data.
                  </td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-foreground">Advertising cookies</td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    Show relevant ads and measure their effectiveness, if we run ads.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          You can block or delete cookies in your browser settings. Blocking some cookies may stop
          parts of the Service from working. We do not currently respond to &ldquo;Do Not
          Track&rdquo; browser signals.
        </p>
      </section>

      {/* 9. Data Retention */}
      <section id="section-9" className="scroll-mt-24 border-b border-border/60 pb-10">
        <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 font-mono text-xs font-bold text-blue-600 dark:text-cyan-400 border border-blue-500/20">
            09
          </span>
          <span>9. Data Retention</span>
        </h2>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p>
            We keep your Personal Data for as long as your account is active and as needed to
            provide the Service. When you delete your account, we will delete or anonymise your
            Personal Data within{" "}
            <span className="rounded-md bg-blue-500/10 px-2 py-0.5 font-semibold text-foreground border border-blue-500/20">
              15 days
            </span>
            , except where we must keep certain data to comply with law (for example tax and
            accounting records), resolve disputes or enforce our agreements. Usage Data is kept for
            a shorter period, unless needed for security or legal reasons.
          </p>
        </div>
      </section>

      {/* 10. Data Security */}
      <section id="section-10" className="scroll-mt-24 border-b border-border/60 pb-10">
        <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 font-mono text-xs font-bold text-blue-600 dark:text-cyan-400 border border-blue-500/20">
            10
          </span>
          <span>10. Data Security</span>
        </h2>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p>
            We follow reasonable security practices in line with Indian law, including encryption of
            data in transit, access controls so that only authorised team members can see data on a
            need-to-know basis, and regular review of our systems. However, no method of
            transmission or storage is 100% secure and we cannot guarantee absolute security. Please
            keep your password confidential and log out of shared devices.
          </p>
          <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 text-xs sm:text-sm text-foreground backdrop-blur-xs">
            If a personal data breach occurs that affects you, we will notify you and the relevant
            authority as required by law.
          </div>
        </div>
      </section>

      {/* 11. Data Storage and Transfers */}
      <section id="section-11" className="scroll-mt-24 border-b border-border/60 pb-10">
        <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 font-mono text-xs font-bold text-blue-600 dark:text-cyan-400 border border-blue-500/20">
            11
          </span>
          <span>11. Data Storage and Transfers</span>
        </h2>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p>
            Your data is primarily stored and processed in India. If we use Service Providers whose
            servers are outside India, your data may be transferred there. We will take reasonable
            steps to ensure it is protected to a similar standard, and we will not transfer it to
            any country restricted by the Government of India. If you access the Service from
            outside India, you agree to your data being transferred to and processed in India.
          </p>
        </div>
      </section>

      {/* 12. Your Rights */}
      <section id="section-12" className="scroll-mt-24 border-b border-border/60 pb-10">
        <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 font-mono text-xs font-bold text-blue-600 dark:text-cyan-400 border border-blue-500/20">
            12
          </span>
          <span>12. Your Rights</span>
        </h2>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p>Subject to applicable law, you have the right to:</p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />
              <div>Access a summary of the Personal Data we process about you.</div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />
              <div>Correct or update inaccurate or incomplete data.</div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />
              <div>Erase your data by deleting your account or writing to us.</div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />
              <div>
                Withdraw consent at any time, without affecting processing done before withdrawal.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />
              <div>
                Grievance redressal: to have your complaints heard and resolved (see Section 16).
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />
              <div>
                Nominate another person to exercise your rights in the event of your death or
                incapacity, and modify or withdraw such nomination at any time.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />
              <div>Opt out of marketing communications.</div>
            </li>
          </ul>

          <div className="mt-4 rounded-xl border border-border/70 bg-background/50 p-4">
            To exercise any of these rights, write to us at{" "}
            <Placeholder value={placeholders.supportEmail} label="Support Email" />. We may need to
            verify your identity before acting on your request.
          </div>
        </div>
      </section>

      {/* 13. Children's Privacy */}
      <section id="section-13" className="scroll-mt-24 border-b border-border/60 pb-10">
        <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 font-mono text-xs font-bold text-blue-600 dark:text-cyan-400 border border-blue-500/20">
            13
          </span>
          <span>13. Children&apos;s Privacy</span>
        </h2>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p>
            The Service is not intended for children under 18 years of age. We do not knowingly
            collect Personal Data of children without verifiable consent of a parent or lawful
            guardian. If you believe a child has given us Personal Data without such consent, please
            contact us at <Placeholder value={placeholders.supportEmail} label="Support Email" />{" "}
            and we will delete it. We do not track, profile or show targeted advertising to
            children.
          </p>
        </div>
      </section>

      {/* 14. Commercial Communication */}
      <section id="section-14" className="scroll-mt-24 border-b border-border/60 pb-10">
        <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 font-mono text-xs font-bold text-blue-600 dark:text-cyan-400 border border-blue-500/20">
            14
          </span>
          <span>14. Commercial Communication</span>
        </h2>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p>
            We may send you emails, SMS, WhatsApp messages or calls about our products and offers.
            If your number is registered on a Do Not Disturb (DND) list and you do not want these,
            or you want to stop all commercial communication, email{" "}
            <Placeholder value={placeholders.supportEmail} label="Support Email" /> and we will
            stop.
          </p>
        </div>
      </section>

      {/* 15. Reporting Security Vulnerabilities */}
      <section id="section-15" className="scroll-mt-24 border-b border-border/60 pb-10">
        <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 font-mono text-xs font-bold text-blue-600 dark:text-cyan-400 border border-blue-500/20">
            15
          </span>
          <span>15. Reporting Security Vulnerabilities</span>
        </h2>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p>
            If you find a security issue in the Service, please email{" "}
            <Placeholder value={placeholders.supportEmail} label="Support Email" /> with: a
            description of the issue, the affected URL(s), steps to reproduce, and a screenshot or
            video as proof. Please do not access other users&apos; data or disrupt the Service while
            testing, and give us reasonable time to fix the issue before disclosing it publicly.
          </p>
        </div>
      </section>

      {/* 16. Grievance Officer and Contact */}
      <section id="section-16" className="scroll-mt-24 border-b border-border/60 pb-10">
        <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 font-mono text-xs font-bold text-blue-600 dark:text-cyan-400 border border-blue-500/20">
            16
          </span>
          <span>16. Grievance Officer and Contact</span>
        </h2>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          In accordance with the Information Technology Act, 2000 and the rules made under it, the
          name and contact details of our Grievance Officer are:
        </p>

        <div className="mt-5 overflow-hidden rounded-xl border border-border/70 bg-background/50 backdrop-blur-md shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-foreground">
              <tbody className="divide-y divide-border/50">
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-foreground sm:w-1/3">
                    Business name
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">DolpBrain (MSME registered)</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-foreground">Registration</td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    <Placeholder
                      value={placeholders.udyamRegistrationNumber}
                      label="Udyam Registration Number"
                    />
                  </td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-foreground">Grievance Officer</td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    <Placeholder
                      value={placeholders.grievanceOfficerName}
                      label="Grievance Officer Name"
                    />
                  </td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-foreground">Email</td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    <Placeholder
                      value={placeholders.grievanceOfficerEmail}
                      label="Grievance Email"
                    />
                  </td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-foreground">General support</td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    <Placeholder value={placeholders.supportEmail} label="Support Email" />
                  </td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-foreground">Address</td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    <Placeholder
                      value={placeholders.registeredAddress}
                      label="Registered Office Address"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-blue-500/25 bg-blue-500/10 p-4 text-xs sm:text-sm text-foreground backdrop-blur-xs">
          We will acknowledge your complaint within{" "}
          <strong className="font-bold text-foreground">24 hours</strong> and aim to resolve it
          within <strong className="font-bold text-foreground">15 days</strong> of receipt, or
          sooner where specific emergency timelines are mandated under applicable Indian law and
          Intermediary Rules (for example, complaints about non-consensual intimate content or
          impersonation, which are acted on within 24 to 36 hours).
        </div>
      </section>

      {/* 17. Changes to This Policy */}
      <section id="section-17" className="scroll-mt-24 border-b border-border/60 pb-10">
        <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 font-mono text-xs font-bold text-blue-600 dark:text-cyan-400 border border-blue-500/20">
            17
          </span>
          <span>17. Changes to This Policy</span>
        </h2>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p>
            We may update this Policy from time to time, for example when we launch new features or
            change our legal structure. The &ldquo;Last Updated&rdquo; date at the top shows the
            latest version. For significant changes we will notify you by email or a notice on the
            Service. Your continued use of the Service after the update means you accept the revised
            Policy.
          </p>
        </div>
      </section>

      {/* 18. Governing Law */}
      <section id="section-18" className="scroll-mt-24 pb-4">
        <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 font-mono text-xs font-bold text-blue-600 dark:text-cyan-400 border border-blue-500/20">
            18
          </span>
          <span>18. Governing Law</span>
        </h2>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p>
            This Policy is governed by the laws of India. Courts at{" "}
            <Placeholder value={placeholders.governingCourtsCity} label="City of Jurisdiction" />{" "}
            shall have jurisdiction over any dispute arising from it.
          </p>
        </div>
      </section>
    </article>
  );
}
