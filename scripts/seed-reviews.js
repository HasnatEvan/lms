require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');

// Course Review Schema
const courseReviewSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
    index: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: 'Rating must be a whole number'
    }
  },
  reviewType: {
    type: String,
    enum: ['text', 'video'],
    required: true,
    default: 'text'
  },
  title: {
    type: String,
    trim: true,
    maxlength: 100
  },
  comment: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  videoUrl: {
    type: String,
    trim: true
  },
  videoThumbnail: {
    type: String,
    trim: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  helpfulVotes: {
    type: Number,
    default: 0,
    min: 0
  },
  reportedCount: {
    type: Number,
    default: 0,
    min: 0
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  isDisplayed: {
    type: Boolean,
    default: false
  },
  displayOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Compound index to ensure one review per student per course
courseReviewSchema.index({ course: 1, student: 1 }, { unique: true });

const CourseReview = mongoose.model('CourseReview', courseReviewSchema);

// Enrollment Schema (needed to create enrollments for reviews)
const enrollmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
    index: true
  },
  enrolledAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'dropped', 'suspended'],
    default: 'active',
    required: true,
    index: true
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
    required: true
  },
  lastAccessedAt: {
    type: Date,
    default: Date.now
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded', 'failed'],
    default: 'paid',
    required: true,
    index: true
  },
  paymentAmount: {
    type: Number,
    min: 0
  }
}, {
  timestamps: true
});

enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

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

// Sample video review URLs (YouTube videos)
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

async function seedReviews() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/codezon-lms';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Fetch all courses
    const Course = mongoose.model('Course', new mongoose.Schema({}, { strict: false }));
    const courses = await Course.find({}).limit(50);
    
    if (courses.length === 0) {
      console.log('❌ No courses found. Please create courses first.');
      await mongoose.disconnect();
      process.exit(1);
    }

    console.log(`📚 Found ${courses.length} courses`);

    // Fetch all students
    const User = mongoose.model('User', new mongoose.Schema({}, { strict: false }));
    const students = await User.find({ role: 'student' }).limit(100);
    
    if (students.length === 0) {
      console.log('❌ No students found. Please create students first.');
      await mongoose.disconnect();
      process.exit(1);
    }

    console.log(`👥 Found ${students.length} students`);

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
              paymentAmount: course.price || course.finalPrice || 0
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

          if (reviewsCreated % 10 === 0) {
            console.log(`   Created ${reviewsCreated} reviews...`);
          }
        } catch (error) {
          if (error.code === 11000) {
            // Duplicate key error (review already exists)
            reviewsSkipped++;
          } else {
            console.error(`   Error creating review for course ${course.title}:`, error.message);
          }
        }
      }
    }

    console.log('\n✅ Seed completed successfully!');
    console.log(`📊 Statistics:`);
    console.log(`   - Reviews created: ${reviewsCreated}`);
    console.log(`   - Enrollments created: ${enrollmentsCreated}`);
    console.log(`   - Reviews skipped (already exist): ${reviewsSkipped}`);

  } catch (error) {
    console.error('❌ Error seeding reviews:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  }
}

seedReviews();
