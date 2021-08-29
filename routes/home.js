const express = require("express");
const router = express.Router();

// Home
router.get("/", (req, res) => {
  res.render("index", {
    title: "Courses App - Express",
    message: "Hello :-P ",
  });
});

// Export
module.exports = router;
