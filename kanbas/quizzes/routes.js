import express from "express";
import database from "../database/index.js";

const quizRouter = express.Router();

quizRouter.get('/:course_id', (req, res) => {
    const { course_id } = req.params;

    const quizzes = database.quizzes.filter((q) => {
        return q.course === course_id
    })

    console.log(database.quizzes)
    console.log(quizzes)

    res.json({quizzes: quizzes});
});

quizRouter.post('/:course_id', (req, res) => {
    const { course_id } = req.params;
    const quiz = req.body.quiz;
    const newQuiz = {
        ...quiz,
        course: course_id,
    }

    database.quizzes.append(newQuiz);

    res.json({quiz: newQuiz});
})

quizRouter.patch('/:course_id/:quiz_id/publish', (req, res) => {
    const { course_id, quiz_id } = req.params;
    const { publish: newBool } = res.body;

    database.quizzes = database.quizzes.map(q => {
        if (course_id === q.course && quiz_id === q.quiz_id) {
            return {...q, publish: newBool }
        }
        return q;
    })

    res.json({status: '200'})
})

quizRouter.post('/:course_id/:quiz_id/copy', (req, res) => {
    const { new_course_id } = req.body;
    const { quiz_id } = req.params;
    const quiz = { ...database.quizzes.find(q => q.quiz_id === quiz_id), course: new_course_id };

    database.quizzes.append(quiz);

    res.json({quiz: quiz});
})

quizRouter.delete('/:course_id/:quiz_id', (req, res) => {
    const { course_id, quiz_id } = req.params;

    database.quizzes = database.quizzes.filter(q => {
        if (course_id === q.course) {
            return quiz_id !== q.quiz_id;
        }

        return true;
    })

    res.json({status: "200"});
})

quizRouter.patch('/:course_id/:quiz_id', (req, res) => {
    const { course_id, quiz_id } = req.params;
    const newQuiz = res.body.quiz;

    database.quizzes = database.quizzes.map(q => {
        if (course_id === q.course && quiz_id === q.quiz_id) {
            return {...q, ...newQuiz }
        }
        return q;
    })

    res.json({quiz: newQuiz});
})

export default quizRouter;