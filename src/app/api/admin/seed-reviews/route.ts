import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import CourseReview from '@/models/CourseReview';
import Enrollment from '@/models/Enrollment';
import Course from '@/models/Course';
import User from '@/models/User';

// Sample review comments
const sampleComments = [
  {
    title: "Excellent Course!",
    comment: "This course exceeded my expectations. The instructor explains complex concepts clearly and the practical examples are very helpful. Highly recommended!",
    rating: 5
  },
  {
    title: "Great Learning Experience",
    comment: "I learned a lot from this course. The content is well-structured and easy to follow. The assignments helped me understand the material better.",
    rating: 5
  },
  {
    title: "Very Informative",
    comment: "The course covers all the important topics. The instructor is knowledgeable and provides good examples. Some sections could use more detail though.",
    rating: 4
  },
  {
    title: "Good Foundation",
    comment: "This course provides a solid foundation. The explanations are clear and the pace is good. I would have liked more advanced topics.",
    rating: 4
  },
  {
    title: "Decent Course",
    comment: "The course is okay overall. Some parts are explained well, but others could be clearer. The exercises are helpful for practice.",
    rating: 3
  },
  {
    title: "Could Be Better",
    comment: "The course content is decent but the delivery could be improved. Some videos are too long and could be broken down into smaller segments.",
    rating: 3
  },
  {
    title: "Needs Improvement",
    comment: "The course covers the basics but lacks depth in some areas. The instructor could provide more real-world examples and case studies.",
    rating: 2
  },
  {
    title: "Not What I Expected",
    comment: "I found the course structure confusing and some explanations unclear. The content doesn't match the course description well.",
    rating: 2
  },
  {
    title: "Amazing Instructor!",
    comment: "The instructor is fantastic! They make complex topics easy to understand. The course materials are comprehensive and well-organized.",
    rating: 5
  },
  {
    title: "Worth Every Penny",
    comment: "This course is absolutely worth it. I've learned so much and the practical projects are excellent. The community support is also great.",
    rating: 5
  },
  {
    title: "Solid Course",
    comment: "Good course with clear explanations. The instructor knows their stuff. Some sections could use more examples, but overall it's good.",
    rating: 4
  },
  {
    title: "Helpful Content",
    comment: "The course helped me understand the fundamentals. The step-by-step approach is effective. Looking forward to more advanced courses.",
    rating: 4
  },
  {
    title: "Good but Not Great",
    comment: "The course is informative but could be more engaging. Some parts feel rushed. Overall, it's a decent learning resource.",
    rating: 3
  },
  {
    title: "Comprehensive Coverage",
    comment: "This course covers a lot of ground. The instructor explains things well and provides good resources. Highly recommend for beginners.",
    rating: 5
  },
  {
    title: "Well Structured",
    comment: "I appreciate the well-organized structure of this course. Each module builds on the previous one. The quizzes help reinforce learning.",
    rating: 4
  }
];

// Sample video review URLs
const sampleVideoReviews = [
  {
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    videoThumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    title: "Video Review: My Experience",
    rating: 5
  },
  {
    videoUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    videoThumbnail: "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg",
    title: "Quick Review Video",
    rating: 4
  },
  {
    videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
    videoThumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg",
    title: "Detailed Course Review",
    rating: 5
  },
  {
    videoUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
    videoThumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg",
    title: "Honest Course Review",
    rating: 4
  },
  {
    videoUrl: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
    videoThumbnail: "https://img.youtube.com/vi/fJ9rUzIMcZQ/maxresdefault.jpg",
    title: "What I Learned",
    rating: 5
  },
  {
    videoUrl: "https://www.youtube.com/watch?v=OPf0YbXqDm0",
    videoThumbnail: "https://img.youtube.com/vi/OPf0YbXqDm0/maxresdefault.jpg",
    title: "Course Walkthrough",
    rating: 4
  },
  {
    videoUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    videoThumbnail: "https://img.youtube.com/vi/ScMzIvxBSi4/maxresdefault.jpg",
    title: "My Thoughts on This Course",
    rating: 5
  },
  {
    videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
    videoThumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg",
    title: "Is This Course Worth It?",
    rating: 4
  },
  {
    videoUrl: "https://www.youtube.com/watch?v=JGwWNGJdvx8",
    videoThumbnail: "https://img.youtube.com/vi/JGwWNGJdvx8/maxresdefault.jpg",
    title: "Complete Course Review",
    rating: 5
  },
  {
    videoUrl: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
    videoThumbnail: "https://img.youtube.com/vi/2Vv-BfVoq4g/maxresdefault.jpg",
    title: "Student Review Video",
    rating: 4
  },
  {
    videoUrl: "https://www.youtube.com/watch?v=YQHsXMglC9A",
    videoThumbnail: "https://img.youtube.com/vi/YQHsXMglC9A/maxresdefault.jpg",
    title: "After Completing This Course",
    rating: 5
  },
  {
    videoUrl: "https://www.youtube.com/watch?v=oyEuk8j8imI",
    videoThumbnail: "https://img.youtube.com/vi/oyEuk8j8imI/maxresdefault.jpg",
    title: "Course Highlights Review",
    rating: 4
  },
  {
    videoUrl: "https://www.youtube.com/watch?v=7wtfhZwyrcc",
    videoThumbnail: "https://img.youtube.com/vi/7wtfhZwyrcc/maxresdefault.jpg",
    title: "My Honest Opinion",
    rating: 3
  },
  {
    videoUrl: "https://www.youtube.com/watch?v=ZbZSe6N_BXs",
    videoThumbnail: "https://img.youtube.com/vi/ZbZSe6N_BXs/maxresdefault.jpg",
    title: "Course Review & Feedback",
    rating: 4
  },
  {
    videoUrl: "https://www.youtube.com/watch?v=YtHqZ2nqRjM",
    videoThumbnail: "https://img.youtube.com/vi/YtHqZ2nqRjM/maxresdefault.jpg",
    title: "What You'll Learn",
    rating: 5
  }
];

// POST /api/admin/seed-reviews - Seed reviews for courses
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Only admins can access this endpoint
    if (session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    await connectDB();

    // Fetch all courses
    const courses = await Course.find({}).limit(50).lean();
    
    if (courses.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No courses found. Please create courses first.'
      }, { status: 400 });
    }

    // Fetch all students
    const students = await User.find({ role: 'student' }).limit(100).lean();
    
    if (students.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No students found. Please create students first.'
      }, { status: 400 });
    }

    let reviewsCreated = 0;
    let enrollmentsCreated = 0;
    let reviewsSkipped = 0;

    // Create reviews for each course
    for (const course of courses) {
      // Select random students for this course (3-8 students per course)
      const numReviews = Math.floor(Math.random() * 6) + 3;
      const selectedStudents = students
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.min(numReviews, students.length));

      for (const student of selectedStudents) {
        try {
          // Check if enrollment exists, create if not
          let enrollment = await Enrollment.findOne({
            student: student._id,
            course: course._id
          });

          if (!enrollment) {
            enrollment = new Enrollment({
              student: student._id,
              course: course._id,
              status: Math.random() > 0.7 ? 'completed' : 'active',
              progress: Math.floor(Math.random() * 100),
              paymentStatus: 'paid',
              paymentAmount: (course as any).price || (course as any).finalPrice || 0
            });
            await enrollment.save();
            enrollmentsCreated++;
          }

          // Check if review already exists
          const existingReview = await CourseReview.findOne({
            course: course._id,
            student: student._id
          });

          if (existingReview) {
            reviewsSkipped++;
            continue;
          }

          // Determine review type (50% text, 50% video)
          const isVideoReview = Math.random() < 0.5;
          let reviewData;

          if (isVideoReview && sampleVideoReviews.length > 0) {
            const videoReview = sampleVideoReviews[Math.floor(Math.random() * sampleVideoReviews.length)];
            reviewData = {
              course: course._id,
              student: student._id,
              rating: videoReview.rating,
              reviewType: 'video',
              title: videoReview.title,
              videoUrl: videoReview.videoUrl,
              videoThumbnail: videoReview.videoThumbnail,
              isVerified: true,
              isPublic: true,
              isApproved: Math.random() > 0.2, // 80% approved
              helpfulVotes: Math.floor(Math.random() * 20),
              reportedCount: 0
            };
          } else {
            const textReview = sampleComments[Math.floor(Math.random() * sampleComments.length)];
            reviewData = {
              course: course._id,
              student: student._id,
              rating: textReview.rating,
              reviewType: 'text',
              title: textReview.title,
              comment: textReview.comment,
              isVerified: true,
              isPublic: true,
              isApproved: Math.random() > 0.2, // 80% approved
              helpfulVotes: Math.floor(Math.random() * 20),
              reportedCount: 0
            };
          }

          // Create review
          const review = new CourseReview(reviewData);
          await review.save();
          reviewsCreated++;

        } catch (error: any) {
          if (error.code === 11000) {
            // Duplicate key error (review already exists)
            reviewsSkipped++;
          } else {
            console.error(`Error creating review for course ${(course as any).title}:`, error.message);
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Reviews seeded successfully',
      data: {
        reviewsCreated,
        enrollmentsCreated,
        reviewsSkipped
      }
    });

  } catch (error: any) {
    console.error('Error seeding reviews:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to seed reviews' },
      { status: 500 }
    );
  }
}
