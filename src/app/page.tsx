import React from "react";
import HeaderWrapper from "@/components/HeaderWrapper";
import HeroWrapper from "@/components/HeroWrapper";
import AboutWrapper from "@/components/AboutWrapper";
import WhyChooseUsWrapper from "@/components/WhyChooseUsWrapper";
import StatisticsWrapper from "@/components/StatisticsWrapper";
import ServicesWrapper from "@/components/ServicesWrapper";
import CertificatesWrapper from "@/components/CertificatesWrapper";
import PhotoGalleryWrapper from "@/components/PhotoGalleryWrapper";
import BlogWrapper from "@/components/BlogWrapper";
import DownloadAppWrapper from "@/components/DownloadAppWrapper";
import FooterWrapper from "@/components/FooterWrapper";
import CoursesWrapper from "@/components/CoursesWrapper";
import CoursesByCategoryWrapper from "@/components/CoursesByCategoryWrapper";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import { getSectionOrder } from "@/lib/section-order";
import type { SectionId } from "@/constants/sectionOrder";

// Section component mapping
const sectionComponents: Record<string, () => React.ReactElement> = {
  header: () => <HeaderWrapper />,
  hero: () => <HeroWrapper />,
  about: () => <AboutWrapper />,
  courses: () => <CoursesWrapper />,
  whyChooseUs: () => <WhyChooseUsWrapper />,
  coursesByCategory: () => <CoursesByCategoryWrapper />,
  statistics: () => <StatisticsWrapper />,
  services: () => <ServicesWrapper />,
  certificates: () => <CertificatesWrapper />,
  testimonials: () => <Testimonials />,
  photoGallery: () => <PhotoGalleryWrapper />,
  blog: () => <BlogWrapper />,
  downloadApp: () => <DownloadAppWrapper />,
  footer: () => <FooterWrapper />,
};

const sectionShellClass: Partial<Record<SectionId, string>> = {
  about:
    "relative overflow-hidden bg-white/95 backdrop-blur-sm",
  courses:
    "relative overflow-hidden bg-gradient-to-b from-[#f8fbff] to-[#f3f8f7]",
  whyChooseUs:
    "relative overflow-hidden bg-white",
  coursesByCategory:
    "relative overflow-hidden bg-gradient-to-b from-[#f3f8f7] to-white",
  statistics:
    "relative overflow-hidden bg-[#f8fbff]",
  services:
    "relative overflow-hidden bg-white",
  certificates:
    "relative overflow-hidden bg-gradient-to-b from-white to-[#f3f8f7]",
  testimonials:
    "relative overflow-hidden bg-[#f8fbff]",
  photoGallery:
    "relative overflow-hidden bg-white",
  blog:
    "relative overflow-hidden bg-gradient-to-b from-white to-[#f6faf9]",
  downloadApp:
    "relative overflow-hidden bg-white",
};

export default async function Home() {
  // Get section order from CMS
  const sectionOrder = await getSectionOrder();
  
  // Filter enabled sections and sort by order
  const enabledSections = sectionOrder
    .filter(section => section.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <main className="home-page relative isolate overflow-x-hidden bg-[#f4f8f7] [&_.max-w-7xl]:!max-w-[1320px]">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(circle_at_15%_5%,rgba(14,116,144,0.18),transparent_45%),radial-gradient(circle_at_85%_15%,rgba(217,119,6,0.14),transparent_45%)]" />

      {/* Header and Hero are always in the background div */}
      {enabledSections.some((s) => s.id === "header" || s.id === "hero") && (
        <div
          className="relative overflow-hidden bg-[linear-gradient(130deg,#eef6fb_0%,#ffffff_45%,#ecf7f3_100%)]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 12% 4%, rgba(14,116,144,0.2), transparent 32%), radial-gradient(circle at 87% 8%, rgba(217,119,6,0.12), transparent 30%)",
          }}
        >
          {enabledSections
            .filter((s) => s.id === "header" || s.id === "hero")
            .map((section) => {
              const Component = sectionComponents[section.id];
              return Component ? <Component key={section.id} /> : null;
            })}
        </div>
      )}

      {/* Render other sections in order */}
      {enabledSections
        .filter((s) => s.id !== "header" && s.id !== "hero")
        .map((section) => {
          const Component = sectionComponents[section.id];
          if (!Component) return null;

          const shell = sectionShellClass[section.id as SectionId];
          if (!shell) {
            return <Component key={section.id} />;
          }

          return (
            <section key={section.id} className={shell}>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/80 to-transparent" />
              <Component />
            </section>
          );
        })}
    </main>
  );
}
