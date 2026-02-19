"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { WhyChooseUsContent } from "@/constants/whyChooseUsContent";
import { defaultWhyChooseUsContent } from "@/constants/whyChooseUsContent";

interface WhyChooseUsProps {
  initialContent?: WhyChooseUsContent;
}

// Icon components (unchanged)
const IconRenderer = ({
  iconType,
}: {
  iconType: "money" | "instructor" | "flexible" | "community";
}) => {
  switch (iconType) {
    case "money":
      return (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path d="M12 2v20" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <path
            d="M17 5H9.5a4.5 4.5 0 0 0 0 9h5a4.5 4.5 0 0 1 0 9H7"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "instructor":
      return (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2.5" />
          <path
            d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <polyline
            points="17 11 19 13 23 9"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "flexible":
      return (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2.5" />
          <polyline
            points="12 6 12 12 16 14"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "community":
      return (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2.5" />
          <circle cx="15" cy="7" r="4" stroke="white" strokeWidth="2.5" />
          <path
            d="M17 21v-2a4 4 0 0 0-3-3.87"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M7 21v-2a4 4 0 0 1 3-3.87"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return null;
  }
};

export default function WhyChooseUs({ initialContent }: WhyChooseUsProps = {}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [whyChooseUsContent, setWhyChooseUsContent] =
    useState<WhyChooseUsContent>(
      initialContent || defaultWhyChooseUsContent
    );

  useEffect(() => {
    if (!initialContent) {
      fetch("/api/website-content")
        .then((res) => res.json())
        .then(
          (data) =>
            data.data?.whyChooseUs &&
            setWhyChooseUsContent(data.data.whyChooseUs)
        )
        .catch(console.error);
    }
    setIsLoaded(true);
  }, [initialContent]);

  return (
    <section className="relative overflow-hidden px-4 py-14 sm:py-16 md:px-6 lg:px-8 lg:py-20">
      {/* Background Micro Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="pointer-events-none absolute -left-16 top-8 h-56 w-56 rounded-full bg-cyan-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-emerald-200/45 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">

          {/* Left Column */}
          <div className="w-full lg:w-1/2">
            <div
              className={`mb-4 inline-flex items-center gap-3 rounded-full border border-cyan-700/25 bg-cyan-700/10 px-5 py-2.5 ${
                isLoaded ? "animate-fade-in-up" : "animate-on-load"
              }`}
              style={{
                animationDelay: "0.1s",
              }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-900">
                {whyChooseUsContent.label.text}
              </span>
            </div>

            <h2
              className={`mb-6 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl ${
                isLoaded ? "animate-fade-in-up" : "animate-on-load"
              }`}
              style={{ animationDelay: "0.3s" }}
            >
              <span className="text-slate-900">
                {whyChooseUsContent.title.part1}
              </span>{" "}
              <span className="text-cyan-700">
                {whyChooseUsContent.title.part2}
              </span>{" "}
              <span className="text-emerald-600">
                {whyChooseUsContent.title.part3}
              </span>{" "}
              <span className="text-amber-600">
                {whyChooseUsContent.title.part4}
              </span>{" "}
              <span className="text-slate-900">
                {whyChooseUsContent.title.part5}
              </span>
            </h2>

            <p
              className={`mb-8 text-slate-600 ${
                isLoaded ? "animate-fade-in-up" : "animate-on-load"
              }`}
              style={{ animationDelay: "0.5s" }}
            >
              {whyChooseUsContent.description}
            </p>

            <div
              className={`relative h-56 w-full overflow-hidden rounded-3xl border border-white/70 shadow-[0_20px_40px_-24px_rgba(2,132,199,0.4)] md:h-64 lg:h-72 ${
                isLoaded ? "animate-fade-in-scale" : "animate-on-load"
              }`}
              style={{ animationDelay: "0.7s" }}
            >
              <Image
                src={whyChooseUsContent.image}
                alt="Why Choose Us"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/40 via-transparent to-cyan-700/30" />
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {whyChooseUsContent.features.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-[0_10px_28px_-18px_rgba(15,23,42,0.6)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_35px_-20px_rgba(15,23,42,0.7)] ${
                    isLoaded ? "animate-fade-in-up" : "animate-on-load"
                  }`}
                  style={{
                    animationDelay: `${0.3 + index * 0.1}s`,
                  }}
                >
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-700 via-teal-600 to-emerald-600">
                    <div className="scale-[0.72]">
                      <IconRenderer iconType={feature.iconType} />
                    </div>
                  </div>

                  <h3 className="mb-3 text-lg font-bold text-slate-800 sm:text-xl">
                    {feature.titleBn}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {feature.descriptionBn}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
