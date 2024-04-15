import model from "./model.js";
export const createQuiz = async (quiz) => {
  delete quiz._id;
  const newQuiz = await model.create(quiz);
  return newQuiz;
};
export const findQuizzesForCourseId = (courseId) => model.find({ course: courseId });
export const updateQuizPublish = (quizId, publish) => model.updateOne({ _id: quizId }, { $set: { publish } });
export const updateQuiz = (quizId, quiz) => model.updateOne({ _id: quizId }, { $set: quiz });
export const deleteQuiz = (quizId) => model.deleteOne({ _id: quizId });
export const findQuizById = (quizId) => model.findById(quizId);