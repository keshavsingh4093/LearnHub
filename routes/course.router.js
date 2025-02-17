import { showAllCourses, showMyCourses } from "../controllers/course controller/showCourses.controller.js";
import { authenticationCheck } from "../middlewares/user.middleware.js";
import { Router } from "express";

const courseRouter = Router();

// get All courses before login with filtering(title, category, subcategory) and pagination (page, limit) in query params
courseRouter.get("/", showAllCourses);

// Authentication check before accessing private routes
courseRouter.use(authenticationCheck);

// get enrolled courses after login with filtering(title, category, subcategory) and pagination (page, limit) in query params
courseRouter.get("/mycourses", showMyCourses);

export { courseRouter };