const Courses = require("../models/Course");
const ErrorResponse = require("../utils/error-response")
/**
 * @description Get all courses
 * @route   GET /api/v1/courses
 * @access  Public
 */
exports.getCourses = async (req, res, next) => {
  try {
    const courses = await Courses.find();
    res
      .status(200)
      .json({ success: true, data: courses, count: courses.length });
  } catch (e) {
    next(e);
  }
};

/**
 * @description Get single course
 * @route   GET /api/v1/courses/:id
 * @access  Public
 */
exports.getCourse = async (req, res, next) => {
  try {
    const course = await Courses.findById(req.params.id);
    if (!course) {
      return next(new ErrorResponse(`Course Not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: course });
  } catch (err) {
    next(err);
  }
};

/**
 * @description Create new course
 * @route   POST /api/v1/courses/:id
 * @access  Private
 */
exports.createCourse = async (req, res, next) => {
  try {
    const course = await Courses.create(req.body);
    res.status(201).send({ success: true, data: course });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Update course
 * @route   PUT /api/v1/courses/:id
 * @access  Private
 */
exports.updateCourse = async (req, res, next) => {
  try {
    const course = await Courses.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!course) {
      return next(new ErrorResponse(`Course Not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({ success: true, data: course });
  } catch (e) {
    next(e);
  }
};

/**
 * @description Delete course
 * @route   DELETE /api/v1/courses/:id
 * @access  Private
 */
exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Courses.findByIdAndDelete(req.params.id);
    if (!course) {
      return next(new ErrorResponse(`Course Not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
