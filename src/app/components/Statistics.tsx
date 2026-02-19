"use client";

import { useEffect, useState, useRef } from "react";
import { LuUsers, LuBookOpen, LuGraduationCap, LuAward } from "react-icons/lu";
import type { StatisticsContent } from "@/constants/statisticsContent";
import { defaultStatisticsContent } from "@/constants/statisticsContent";

interface StatisticsProps {
  initialContent?: StatisticsContent;
}

// Icon Renderer (unchanged)
const IconRenderer = ({
  iconType,
}: {
  iconType: "students" | "courses" | "tutors" | "awards";
}) => {
  const iconProps = {
    size: 48,
    className: "text-white",
  };

  switch (iconType) {
    case "students":
      return <LuUsers {...iconProps} />;
    case "courses":
      return <LuBookOpen {...iconProps} />;
    case "tutors":
      return <LuGraduationCap {...iconProps} />;
    case "awards":
      return <LuAward {...iconProps} />;
    default:
      return null;
  }
};

export default function Statistics({ initialContent }: StatisticsProps = {}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [statisticsContent, setStatisticsContent] =
    useState<StatisticsContent>(initialContent || defaultStatisticsContent);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!initialContent) {
      fetch("/api/website-content")
        .then((res) => res.json())
        .then(
          (data) =>
            data.data?.statistics &&
            setStatisticsContent(data.data.statistics)
        )
        .catch(console.error);
    }
    setIsLoaded(true);
  }, [initialContent]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            animateCounts();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [isVisible]);

  const animateCounts = () => {
    const targets = statisticsContent.items.map((item) =>
      parseInt(item.number)
    );
    const steps = 60;
    const duration = 2000;

    targets.forEach((target, index) => {
      let step = 0;
      const increment = target / steps;
      const interval = duration / steps;

      const timer = setInterval(() => {
        step++;
        setCounts((prev) => {
          const next = [...prev];
          next[index] = Math.min(Math.floor(step * increment), target);
          return next;
        });

        if (step >= steps) {
          clearInterval(timer);
        }
      }, interval);
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#dbecff] px-4 py-14 sm:py-16 md:px-6 lg:px-8 lg:py-20"
    >
      <div className="pointer-events-none absolute -left-20 top-8 h-56 w-56 rounded-full bg-cyan-200/45 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <span className="inline-flex rounded-full border border-cyan-700/20 bg-cyan-700/10 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-cyan-800 uppercase">
            Impact Snapshot
          </span>
          <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl md:text-4xl">
            আমাদের শেখার যাত্রার পরিসংখ্যান
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statisticsContent.items.map((stat, index) => (
            <div
              key={stat.id}
              className={`group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-[0_10px_28px_-18px_rgba(15,23,42,0.6)] transition-all hover:-translate-y-1.5 hover:shadow-[0_18px_35px_-20px_rgba(15,23,42,0.7)] md:p-8 ${
                isLoaded ? "animate-fade-in-up" : "animate-on-load"
              }`}
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              {/* Soft Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-amber-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative flex flex-col items-center text-center">
                {/* Icon */}
                <div className="relative mb-4 flex h-16 w-16 items-center justify-center">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-700 via-teal-600 to-emerald-600 transition-transform duration-300 group-hover:scale-110" />
                  <div className="relative z-10 scale-[0.7]">
                    <IconRenderer iconType={stat.iconType} />
                  </div>
                </div>

                {/* Number */}
                <div className="mb-2">
                  <span
                    className="text-3xl font-extrabold text-slate-900 md:text-4xl lg:text-5xl"
                    style={{ fontFamily: "var(--font-bengali), sans-serif" }}
                  >
                    {isVisible ? counts[index] : 0}
                    <sup className="ml-0.5 text-xl text-cyan-700 md:text-2xl">
                      {stat.suffix}
                    </sup>
                  </span>
                </div>

                {/* Label */}
                <p
                  className="text-sm font-semibold text-slate-600 md:text-base"
                  style={{ fontFamily: "var(--font-bengali), sans-serif" }}
                >
                  {stat.labelBengali}
                </p>

                {/* Hover Border */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent bg-gradient-to-r from-cyan-600 via-emerald-500 to-amber-500 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
