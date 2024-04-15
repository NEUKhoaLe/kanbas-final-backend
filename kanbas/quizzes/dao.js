import { Mongoose } from "mongoose";
import model from "./model.js";
import { Types } from "mongoose";
export const createQuiz = async (quiz) => {
  quiz = { ...quiz, _id: new Types.ObjectId() };
  return await model.create(quiz);
};
export const findQuizzesForCourseId = (courseId) => model.find({ course: courseId });
export const updateQuizPublish = (quizId, publish) => model.updateOne({ _id: quizId }, { $set: { publish } });
export const updateQuiz = (quizId, quiz) => model.updateOne({ _id: quizId }, { $set: quiz });
export const deleteQuiz = (quizId) => model.deleteOne({ _id: quizId });
export const findQuizById = (quizId) => model.findById(quizId);