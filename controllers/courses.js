const Courses = require("../models/Course");
const ErrorResponse = require("../utils/error-response")
const asyncHandler = require('../middlewares/async');

/**
 * @description Get all courses
 * @route   GET /api/v1/courses
 * @access  Public
 */
exports.getCourses = asyncHandler(async (req, res, next) => {
  const reqQuery = { ...req.query };

  // exclude fields

  const removeFields = ['select', 'sort'];
  removeFields.forEach(f => delete reqQuery[f]);

  let queryStr = JSON.stringify(reqQuery);

  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  const query = Courses.find(JSON.parse(queryStr));

  if (req.query.select) {
    const fields = req.query.select.replace(',', ' ');
    query.select(fields);
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.replace(',', ' ');
    query.sort(sortBy);
  } else {
    query.sort('-createdAt');
  }

  const courses = await Courses.find(query);
  res
    .status(200)
    .json({ success: true, data: courses, count: courses.length });
});

/**
 * @description Get single course
 * @route   GET /api/v1/courses/:id
 * @access  Public
 */
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Courses.findById(req.params.id);
  if (!course) {
    return next(new ErrorResponse(`Course Not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({ success: true, data: course });
});

/**
 * @description Create new course
 * @route   POST /api/v1/courses/:id
 * @access  Private
 */
exports.createCourse = asyncHandler(async (req, res, next) => {
  const course = await Courses.create(req.body);
  res.status(201).send({ success: true, data: course });
});

/**
 * @description Update course
 * @route   PUT /api/v1/courses/:id
 * @access  Private
 */
exports.updateCourse = asyncHandler(async (req, res, next) => {
  const course = await Courses.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!course) {
    return next(new ErrorResponse(`Course Not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: course });
});

/**
 * @description Delete course
 * @route   DELETE /api/v1/courses/:id
 * @access  Private
 */
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Courses.findByIdAndDelete(req.params.id);
  if (!course) {
    return next(new ErrorResponse(`Course Not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({ success: true, data: {} });
});
