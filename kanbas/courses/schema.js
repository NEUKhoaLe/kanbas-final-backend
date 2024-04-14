import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    number: { type: String, required: true },
    startDate: String,
    endDate: String,
    department: String,
    credits: Number,
    description: String,
  },
  { collection: "courses" });
export default courseSchema;