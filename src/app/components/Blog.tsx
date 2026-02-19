"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  LuUser,
  LuMessageSquare,
  LuArrowRight,
  LuCalendar,
  LuSparkles,
} from "react-icons/lu";
import type { BlogContent } from "@/constants/blogContent";
import { defaultBlogContent } from "@/constants/blogContent";

interface BlogProps {
  initialContent?: BlogContent;
}

export default function Blog({ initialContent }: BlogProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [blogContent, setBlogContent] = useState<BlogContent>(
    initialContent || defaultBlogContent
  );

  useEffect(() => {
    setIsLoaded(true);
    if (!initialContent) {
      fetch("/api/website-content")
        .then((res) => res.json())
        .then((data) => data.data?.blog && setBlogContent(data.data.blog))
        .catch(console.error);
    }
  }, [initialContent]);

  return (
    <section className="relative overflow-hidden bg-[#fcfdff] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      {/* Background Decorative Blobs */}
      <div className="absolute -top-24 -right-24 h-[500px] w-[500px] rounded-full bg-pink-200/20 blur-[100px] animate-pulse" />
      <div className="absolute -bottom-24 -left-24 h-[500px] w-[500px] rounded-full bg-indigo-200/20 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center text-center sm:mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 shadow-sm border border-slate-100">
            <LuSparkles className="h-4 w-4 text-pink-500 animate-bounce" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
              {blogContent.label.text}
            </span>
          </div>

          <h2 className="max-w-2xl text-2xl font-black tracking-tight text-slate-900 sm:text-3xl md:text-5xl lg:leading-[1.2]">
            আমাদের সর্বশেষ{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              খবর এবং ব্লগ
            </span>
          </h2>

          <div className="mt-6 h-1.5 w-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {blogContent.posts.map((post) => (
            <article
              key={post.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200/60 shadow-lg shadow-slate-200/40 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-indigo-200/50"
            >
              {/* Image */}
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-t-2xl">
                <Image
                  src={post.image}
                  alt={post.titleBengali}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Date */}
                <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-lg bg-white/95 backdrop-blur-md px-3 py-1.5 shadow-md border border-white/40">
                  <LuCalendar className="h-3.5 w-3.5 text-indigo-600" />
                  <span className="text-[10px] font-black uppercase tracking-tight text-slate-800">
                    {post.date}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                {/* Meta */}
                <div className="mb-5 flex items-center justify-between border-b border-slate-50 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 p-[2px]">
                      <div className="flex h-full w-full items-center justify-center rounded-md bg-white">
                        <LuUser className="h-3.5 w-3.5 text-indigo-600" />
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-600">
                      {post.authorBengali}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 rounded-md bg-slate-50 px-2.5 py-1">
                    <LuMessageSquare className="h-3.5 w-3.5 text-indigo-500" />
                    <span className="text-[10px] font-bold text-indigo-600">
                      {post.commentsBengali}
                    </span>
                  </div>
                </div>

                {/* Title & Desc */}
                <h3 className="mb-3 text-lg font-extrabold leading-snug text-slate-900 transition-colors group-hover:text-indigo-600">
                  {post.titleBengali}
                </h3>

                <p className="mb-6 line-clamp-2 text-sm font-medium leading-relaxed text-slate-500">
                  {post.descriptionBengali}
                </p>

                {/* Button */}
                <button className="group/btn relative isolate mt-auto overflow-hidden rounded-lg px-5 py-3.5 text-xs font-bold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-300/50 active:scale-95">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" />

                  <div className="relative flex items-center justify-center gap-2">
                    <span>{blogContent.buttonText}</span>
                    <LuArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </div>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Shimmer Animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite linear;
        }
      `}</style>
    </section>
  );
}
