const express = require("express");

const {
    getAllStudents,
    getOneStudent,
    getAllCourses,
    getOneCourse,
    getCoursesByStudent,
    getStudentsInCourse,
    createNewStudent
} = require("./controllers");

const router = express.Router();
router.get("/", (req, res)=>res.send('<html><style>.center {text-align: center}</style><h2 class="center">welcome to sqlite and node.js demo</h2></html>'));
router.get("/students", getAllStudents); // find all students
router.get("/student/:id", getOneStudent); // find one student of given id
router.get("/courses", getAllCourses); // find all courses, OPEN first
router.get("/course/:id", getOneCourse); //find an course of given  id
router.get("/studentsincourse/:id", getStudentsInCourse); //find students in a given course id
router.get("/coursesbystudent/:id", getCoursesByStudent); //find all courses taken by  a given student id
router.post("/addstudent", createNewStudent); //add a new student

module.exports = router;
