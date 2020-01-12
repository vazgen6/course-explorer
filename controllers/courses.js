/**
 * @description Get all courses
 * @route   GET /api/v1/courses
 * @access  Public
 */
exports.getCourses = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Get Courses" });
};

/**
 * @description Get single course
 * @route   GET /api/v1/courses/:id
 * @access  Public
 */
exports.getCourse = (req, res, next) => {
  res.send({ success: true, msg: `get course of id ${req.params.id}` });
};

/**
 * @description Create new course
 * @route   POST /api/v1/courses/:id
 * @access  Private
 */
exports.createCourse = (req, res, next) => {
  res.send({ success: true, msg: `create course` });
};

/**
 * @description Update course
 * @route   PUT /api/v1/courses/:id
 * @access  Private
 */
exports.updateCourse = (req, res, next) => {
  res.send({ success: true, msg: `update course of id ${req.params.id}` });
};

/**
 * @description Delete course
 * @route   DELETE /api/v1/courses/:id
 * @access  Private
 */
exports.deleteCourse = (req, res, next) => {
  res.send({ success: true, msg: `delete course of id ${req.params.id}` });
};
