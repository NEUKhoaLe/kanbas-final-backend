import express from "express";
import * as dao from "./dao.js";

const quizRouter = express.Router();

// gets all quizzes for a course with the given course_id
quizRouter.get('/:course_id', async (req, res) => {
  const { course_id } = req.params;
  const quizzes = await dao.findQuizzesForCourseId(course_id);
  res.json({ quizzes: quizzes });
});


// creates a new quiz for a course with the given course_id
quizRouter.post('/:course_id', async (req, res) => {
  const { course_id } = req.params;
  const quiz = {
    ...req.body.quiz,
    course: course_id,
  };

  const newQuiz = await dao.createQuiz(quiz);
  res.json({ quiz: newQuiz });
});


// publishes/unpublishes a quiz with the given quiz_id
quizRouter.patch('/:course_id/:quiz_id/publish', async (req, res) => {
  const { quiz_id } = req.params;
  const newBool = req.body.publish;

  const response = await dao.updateQuizPublish(quiz_id, newBool);

  if (response.acknowledged && response.modifiedCount == 1) {
    res.status(200).json({ status: '200', message: 'Quiz updated successfully.' });
  } else {
    res.status(500).json({ status: '500', message: 'Failed to update quiz.' });
  }
});

// copies a quiz with the given quiz_id to a new course with the given new_course_id
quizRouter.post('/:course_id/:quiz_id/copy', async (req, res) => {
  const { quiz_id } = req.params;
  const { new_course_id } = req.body;

  const originalQuiz = await dao.findQuizById(quiz_id);
  if (!originalQuiz) {
    return res.status(404).json({
      status: "404",
      message: "Original quiz not found."
    });
  }

  const newQuizData = originalQuiz.toObject();
  newQuizData.course = new_course_id;
  delete newQuizData._id;

  const newQuiz = await dao.createQuiz(newQuizData);
  res.status(201).json({
    status: "201",
    message: "Quiz successfully copied.",
    quiz: newQuiz
  });
});

// deletes a quiz with the given quiz_id
quizRouter.delete('/:course_id/:quiz_id', async (req, res) => {
  const { quiz_id } = req.params;

  const result = await dao.deleteQuiz(quiz_id);

  if (result.deletedCount === 0) {
    return res.status(404).json({
      status: "404",
      message: "No quiz found with the provided ID."
      });
  }

  res.status(200).json({
    status: "200",
    message: "Quiz successfully deleted."
  });
});

// updates a quiz with the given quiz_id
quizRouter.patch('/:course_id/:quiz_id', async (req, res) => {
  const { quiz_id } = req.params;

  const updatedQuiz = await dao.updateQuiz(quiz_id, req.body.quiz);
  
  if (updatedQuiz.matchedCount === 0) {
    return res.status(404).json({
      status: "404",
      message: "No quiz found with the provided ID."
    });
  }
  if (updatedQuiz.modifiedCount === 0) {
    return res.status(500).json({
      status: "500",
      message: "Failed to update quiz."
    });
  }

  res.json({ quiz: updatedQuiz });
});

// gets a quiz with the given quiz_id
quizRouter.get('/:course_id/:quiz_id', async (req, res) => {
  const { quiz_id } = req.params;
  const quiz = await dao.findQuizById(quiz_id);

  if (!quiz) {
    return res.status(404).json({
      status: "404",
      message: "No quiz found with the provided ID."
    });
  }

  res.json({ quiz: quiz });
});


export default quizRouter;