import "dotenv/config";
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import mongoose from "mongoose";
import Hello from './Hello.js';
import Lab5 from "./Lab5.js";
import CourseRoutes from "./kanbas/courses/routes.js";
import ModuleRoutes from './kanbas/modules/routes.js';
import UserRoutes from "./users/routes.js";
import quizRouter from "./kanbas/quizzes/routes.js";
const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.json());
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  console.log("Using secure session cookies");
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.HTTP_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));
mongoose.connect(process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas');
app.use('/api/quizzes', quizRouter);
Hello(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
Lab5(app);
app.listen(process.env.PORT || 4000);