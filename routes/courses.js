const express = require("express");
const router = express.Router();

const {
  getCourses,
  getCourse,
  updateCourse,
  createCourse,
  deleteCourse
} = require("../controllers/courses");

router
  .route("/")
  .get(getCourses)
  .post(createCourse);

router
  .route("/:id")
  .get(getCourse)
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;
