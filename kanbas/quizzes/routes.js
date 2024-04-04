import express from "express";
import database from "../database/index.js";

const quizRouter = express.Router();

quizRouter.get('/:course_id', (req, res) => {
    const { course_id } = req.params;

    console.log(course_id)

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

    res.json({quizzes: newQuiz});
})

quizRouter.patch('/:course_id/:quiz_id/publish', (req, res) => {
    const { course_id, quiz_id } = req.params;
    const newBool = res.body.publish;

    database.quizzes = database.quizzes.map(q => {
        if (course_id === q.course && quiz_id === q.quiz_id) {
            return {...q, publish: newBool }
        }
        return q;
    })

    res.json({status: '200'})
})

quizRouter.post('/:course_id/:quiz_id', (req, res) => {
    const { course_id, quiz_id } = req.params;
    const { new_course_id } = req.query;
    const quiz = { ...req.body.quiz, course: new_course_id };


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

    res.json({code: "200"});
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