//////////////////
//  Courses.js  //
//////////////////

// REQ
const express = require("express");
const router = express.Router();
const Joi = require("joi");

// Courses Object Array (for dev)
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

// GET courses
router.get("/", (req, res) => {
  res.send(courses);
});

// POST courses
router.post("/", (req, res) => {
  // validate course; if invalid return 400 - bad request
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length++,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

// PUT course
router.put("/:id", (req, res) => {
  // lookup course; if does exist return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  // validate course; if invalid return 400 - bad request
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // update course
  course.name = req.body.name;
  // return the updated course
  res.send(course);
});

// DELETE course
router.delete("/:id", (req, res) => {
  // look up the course
  // not exist return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  // delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  // return the same course
  res.send(course);
});

// GET a course
router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");
  res.send(course);
});

// f(x)
function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return (result = Joi.validate(course, schema));
}

// Export
module.exports = router;
