import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AmbientBackground } from "@/components/AmbientBackground";
import { PrivacyHeader } from "@/components/privacy/PrivacyHeader";
import { PrivacyHero } from "@/components/privacy/PrivacyHero";
import { PrivacyTableOfContents } from "@/components/privacy/PrivacyTableOfContents";
import { PrivacyContent } from "@/components/privacy/PrivacyContent";
import { BackToTop } from "@/components/privacy/BackToTop";
import { Footer } from "@/components/Footer";
import { PRIVACY_POLICY_CONFIG } from "@/lib/privacy-policy-config";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | DolpStack" },
      {
        name: "description",
        content:
          "DolpBrain Privacy Policy describes how we collect, use, store, share, and protect personal information across our website, mobile application, and developer services.",
      },
      { property: "og:title", content: "Privacy Policy | DolpStack" },
      {
        property: "og:description",
        content:
          "DolpBrain Privacy Policy describes how we collect, use, store, share, and protect personal information.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  const [activeSectionId, setActiveSectionId] = useState<string>("section-1");

  useEffect(() => {
    // If there is an initial hash in the URL, highlight it and scroll
    const hash = window.location.hash.replace("#", "");
    if (hash && PRIVACY_POLICY_CONFIG.sections.some((s) => s.id === hash)) {
      setActiveSectionId(hash);
    }

    const observerOptions = {
      root: null,
      rootMargin: "-15% 0px -70% 0px",
      threshold: 0,
    };

    const sectionElements = PRIVACY_POLICY_CONFIG.sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSectionId(entry.target.id);
        }
      });
    }, observerOptions);

    sectionElements.forEach((el) => observer.observe(el));

    return () => {
      sectionElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-transparent text-foreground antialiased overflow-x-hidden selection:bg-primary/20">
      <AmbientBackground />
      <PrivacyHeader />

      <main className="relative z-10">
        <PrivacyHero />

        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pb-20">
          <div className="lg:grid lg:grid-cols-[300px_1fr] lg:gap-8 xl:gap-12 items-start">
            {/* Table of contents sidebar */}
            <div className="min-w-0">
              <PrivacyTableOfContents
                activeSectionId={activeSectionId}
                onSectionClick={(id) => setActiveSectionId(id)}
              />
            </div>

            {/* Main policy body */}
            <div className="min-w-0">
              <PrivacyContent />
            </div>
          </div>
        </div>
      </main>

      <BackToTop />
      <Footer />
    </div>
  );
}
