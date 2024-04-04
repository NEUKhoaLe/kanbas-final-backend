import express from 'express';
import cors from 'cors';
import Hello from './Hello.js';
import Lab5 from "./Lab5.js";
import CourseRoutes from "./kanbas/courses/routes.js";
import ModuleRoutes from './kanbas/modules/routes.js';
import quizRouter from "../kanbas-final-backend/kanbas/quizzes/routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/quizzes', quizRouter);
Hello(app);
CourseRoutes(app);
ModuleRoutes(app);
Lab5(app);
app.listen(process.env.PORT || 4000);