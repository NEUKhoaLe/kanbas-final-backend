import model from "./model.js";
export const createModule = (courseId, module) => {
  delete module._id;
  module.course = courseId;
  model.create(module);
  return model.findOne({ id: module.id });
};
export const findModulesForCourseId = (courseId) => model.find({ course: courseId });
export const deleteModule = (moduleId) => model.deleteOne({ _id: moduleId });
export const updateModule = (moduleId, module) => model.updateOne({ _id: moduleId }, { $set: module });