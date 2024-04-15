export default [{
    _id: "1",
    name: "quiz",
    course: "RS102",
    publish: true,
    assign_to: [
        {
            first_name: "Khoa",
            last_name: "Le",
            email: "le.kho@northeastern.edu",
        }
    ],
    details: {
        quiz_type: "GRADED",
        total_points: 100,
        assignment_group: "Quizzes",
        shuffle_answers: true,
        time_limit: 60,
        multiple_attempts: true,
        show_correct: true,
        access_code: "",
        one_question: true,
        webcam: true,
        lock_question: true,
        available_date: "04/10/2024",
        until_date: "04/17/2024",
    },
    questions: [
        {
            question_number: 1,
            question_type: "MULTIPLE",
            question_description: "Question 1",
            question_choices: [
                "Choice 1", "Choice 2", "Choice 3"
            ],
        },
    ],
    answers: [
        {
            question_number: 1,
            answer: "Choice 1"
        }
    ]
}]