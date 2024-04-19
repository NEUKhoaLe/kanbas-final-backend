import model from "./model.js";
import { Types } from "mongoose";
export const createCourse = async (course) => {
  course = { ...course, _id: new Types.ObjectId() };
  return await model.create(course);
};
export const findAllCourses = () => model.find();
export const updateCourse = (courseId, course) => model.updateOne({ _id: courseId }, { $set: course });
export const deleteCourse = (courseId) => model.deleteOne({ _id: courseId });
export const findCourseById = (courseId) => model.findOne({ id: courseId });