import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

interface CourseCardProps {
  course: {
    id?: number;
    courseId?: string;
    image: string;
    title: string;
    description?: string;
    category: string;
    price: number;
  };
  index?: number;
  isLoaded?: boolean;
  animationDelay?: string;
}

export default function CourseCard({ course, isLoaded = true, animationDelay }: CourseCardProps) {
  const courseHref = course.courseId ? `/course/${course.courseId}` : `/course/${course.id ?? ""}`;

  return (
    <div
      className={`bg-white border border-[#E8E8E8] rounded-md transition-all duration-300 hover:shadow-xl text-center group overflow-hidden flex flex-col h-full ${
        isLoaded ? "animate-fade-in-up" : "animate-on-load"
      }`}
      style={animationDelay ? { animationDelay } : undefined}
    >
      {/* 1. Course Image */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={course.image}
          alt={course.category}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* 2. Content Area */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Category Heading (Title) */}
        <h3 className="text-[#252B42] font-bold text-base mb-2 leading-tight">
          {course.category}
        </h3>

        {/* --- স্টার রেটিং এখানে সবচেয়ে প্রফেশনাল লাগে --- */}
        <div className="flex justify-center items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} size={11} className="text-[#FFCE31]" />
          ))}
          <span className="text-[10px] text-gray-400 ml-1">(4.5)</span>
        </div>

        {/* Short Description */}
        <p className="text-[#737373] text-[12px] leading-[20px] mb-6 line-clamp-2 px-2 flex-grow">
          {course.description || "Lorem ipsum dolor sit amet consectetur adipiscing elit. Aliquam at dignissim nunc id dignissim."}
        </p>

        {/* 3. Footer: Price & Learn More Button */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <span className="text-[#252B42] font-extrabold text-sm">
            ${course.price.toFixed(2)}
          </span>
          
          <Link 
            href={courseHref}
            className="border-2 border-[#F37021] text-[#F37021] text-[10px] uppercase tracking-wider font-black py-2 px-5 rounded-full transition-all duration-300 hover:bg-[#F37021] hover:text-white"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
