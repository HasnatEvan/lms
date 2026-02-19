"use client";

import Image from "next/image";

export default function ContactHero() {
  return (
    // pb-0 যুক্ত করা হয়েছে যাতে নিচে কোনো প্যাডিং না থাকে
    <section className="relative overflow-hidden bg-[#FDFEFF] pt-10 lg:pt-14 pb-0">
      {/* Background Glows */}
      <div className="absolute top-[-15%] left-[-5%] w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-36">
          
          {/* LEFT CONTENT AREA */}
          <div className="order-2 lg:order-1 pb-10 lg:pb-14">
            {/* Breadcrumb / Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                কোর্সসমূহ <span className="mx-1 text-slate-300">/</span> প্রফেশনাল স্কিলস
              </span>
            </div>

            {/* Main Headline */}
            <div className="relative mb-6">
              <h1 className="text-4xl md:text-5xl lg:text-[4.8rem] font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                ক্যারিয়ারে আনুন <br />
                <span className="text-indigo-600 italic font-black">প্রফেশনাল</span> 
                <span className="inline-block ml-3 px-4 py-0.5 bg-indigo-50 text-indigo-700 rounded-xl border border-indigo-100 text-[0.7em]">শ্রেষ্ঠত্ব</span>
              </h1>
            </div>

            {/* Description Text */}
            <p className="text-base md:text-lg text-slate-600 max-w-xl leading-relaxed mb-8">
              আধুনিক কর্পোরেট জগতের চ্যালেঞ্জ নিতে নিজেকে দক্ষ করে তুলুন। আমাদের 
              <span className="text-slate-900 font-semibold"> নেগোসিয়েশন </span> ও 
              <span className="text-slate-900 font-semibold"> লিডারশিপ </span> 
              প্রোগ্রামগুলো ডিজাইন করা হয়েছে সরাসরি ইন্ডাস্ট্রি এক্সপার্টদের মাধ্যমে।
            </p>

            {/* Call to Actions & Social Proof */}
            <div className="flex flex-wrap items-center gap-6">
              <button className="group relative px-8 py-4 bg-slate-900 hover:bg-indigo-600 text-white text-base font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-indigo-200 flex items-center gap-3 active:scale-95">
                কোর্সগুলো দেখুন
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              
              <div className="flex items-center gap-4 border-l border-slate-200 pl-6 hidden sm:flex">
                <div className="flex -space-x-2.5">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-9 w-9 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden shadow-sm" />
                  ))}
                  <div className="h-9 w-9 rounded-full border-2 border-white bg-indigo-600 flex items-center justify-center text-white text-[9px] font-bold">
                    +৫ক
                  </div>
                </div>
                <div className="leading-tight">
                  <p className="font-bold text-slate-900 text-sm">৫,০০০+ শিক্ষার্থী</p>
                  <p className="text-slate-500 text-[10px] font-medium uppercase tracking-tighter">সফলভাবে যুক্ত</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE AREA */}
          <div className="order-1 lg:order-2 relative self-end">
            <div className="relative z-10 p-2 pb-0  ">
              <div className="overflow-hidden rounded-t-[2.2rem]">
                <Image
                  src="/images/Contact/contact-hero.jpeg"
                  alt="Professional Excellence"
                  width={600}
                  height={650}
                  className="object-cover w-full h-[350px] lg:h-[500px] transform transition-transform duration-1000 hover:scale-105"
                  priority
                />
              </div>

              {/* Floating Status Card */}
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-4 animate-bounce-slow">
                <div className="h-10 w-10 bg-green-500 rounded-xl flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Verified</p>
                  <p className="text-lg font-black text-slate-900 leading-none">১০০% সাকসেস</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}