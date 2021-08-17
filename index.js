const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

// GETs
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// POST
app.post("/api/courses", (req, res) => {
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

// PUT
app.put("/api/courses/:id", (req, res) => {
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

// DELETE
app.delete("/api/courses/:id", (req, res) => {
  //look uo the course
  //not exist return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  //delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  //return the same course
  res.send(course);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");
  res.send(course);
});

//
//

// Functions
function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return (result = Joi.validate(course, schema));
}

//Listener
const port = process.env.PORT || 3000; // Look for Port Environment Variable ('set' cmd)
app.listen(port, () => console.log(`Listening on port ${port}`));
