import mongoose from 'mongoose';
import Course from '../../../models/course';
import Quiz from '../../../models/quiz';
import StudentProfile from '../../../models/student';

async function createQuiz(instructorId, courseId, quizData) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Create the quiz
    const newQuiz = new Quiz({
      ...quizData,
      course: courseId
    });
    await newQuiz.save({ session });

    // Update the course with the new quiz
    await Course.findByIdAndUpdate(
      courseId,
      { $push: { quizzes: newQuiz._id } },
      { session }
    );

    await session.commitTransaction();
    return newQuiz;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

async function attemptQuiz(studentId, courseId, quizId, score) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Update the Quiz model with the student's attempt
    await Quiz.findByIdAndUpdate(
      quizId,
      {
        $push: {
          studentAttempts: {
            student: studentId,
            score: score,
          }
        }
      },
      { session }
    );

    // Update the StudentProfile model
    await StudentProfile.findOneAndUpdate(
      { 
        user: studentId,
        'coursesEnrolled.course': courseId
      },
      {
        $push: {
          'coursesEnrolled.$.completedQuizzes': {
            quiz: quizId,
            score: score
          }
        }
      },
      { session }
    );

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

export { createQuiz, attemptQuiz };