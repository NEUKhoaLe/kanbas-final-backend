import mongoose from "mongoose";

const AssignToSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
});

const QuizDetailsSchema = new mongoose.Schema({
  quiz_type: { type: String, required: true },
  total_points: { type: Number, required: true },
  assignment_group: { type: String, required: true },
  shuffle_answers: { type: Boolean, default: false },
  time_limit: { type: Number },
  multiple_attempts: { type: Boolean, default: false },
  show_correct: { type: Boolean, default: false },
  access_code: { type: String },
  one_question: { type: Boolean, default: false },
  webcam: { type: Boolean, default: false },
  lock_question: { type: Boolean, default: false },
  available_date: { type: Date },
  until_date: { type: Date },
});

const QuizQuestionSchema = new mongoose.Schema({
  question_number: { type: Number, required: true },
  question_type: { type: String, required: true },
  question_description: { type: String, required: true },
  question_choices: [{ type: String }],
});

const QuizAnswerSchema = new mongoose.Schema({
  question_number: { type: Number, required: true },
  answer: { type: String, required: true },
});

const QuizSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
  name: { type: String, required: true },
  course: { type: String, required: true },
  publish: { type: Boolean, required: true },
  assign_to: [AssignToSchema],
  details: QuizDetailsSchema,
  questions: [QuizQuestionSchema],
  answers: [QuizAnswerSchema],
}, { collection: "quizzes" });
export default QuizSchema;