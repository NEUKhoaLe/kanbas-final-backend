import mongoose from "mongoose";

const AssignToSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
});

const QuizDetailsSchema = new mongoose.Schema({
  quiz_type: { type: String, required: true },
  description: { type: String, default: "" },
  assignment_group: { type: String, required: true },
  shuffle_answers: { type: Boolean, default: true },
  time_limit: { type: Number, default: 20 },
  multiple_attempts: { type: Boolean, default: false },
  time_till_show_correct: { type: Number, default: 0 },
  access_code: { type: String, default: "" },
  one_question: { type: Boolean, default: true },
  webcam: { type: Boolean, default: false },
  lock_question: { type: Boolean, default: false },
  due_date: { type: Date, required: true },
  available_date: { type: Date, required: true },
  until_date: { type: Date, required: true },
});

const QuizQuestionChoicesSchema = new mongoose.Schema( {
  name: { type: String, required: true },
  isCorrect: {type: Boolean, required: true},
})

const QuizQuestionSchema = new mongoose.Schema({
  question_number: { type: Number, required: true },
  question_type: { type: String, required: true },
  question_description: { type: String, required: true },
  question_choices: [QuizQuestionChoicesSchema],
  question_title: { type: String, required: true },
  question_points: { type: Number, required: true },
});

const QuizSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  course: { type: String, required: true },
  publish: { type: Boolean, default: false },
  assign_to: [AssignToSchema],
  details: QuizDetailsSchema,
  questions: [QuizQuestionSchema],
}, { collection: "quizzes" });
export default QuizSchema;