const router = require("express").Router();
const User = require("../model/User.js");
const Exam = require("../model/Exam.js");
const Class = require("../model/Class.js");
const { default: mongoose } = require("mongoose");

//Students APIs

router.get("/student/allUsers", async (req, res) => {
  const users = await User.find({});
  return res.json({
    status: "ok",
    users,
    msg: "fetched all users",
  });
});

router.post("/student/validateUser", async (req, res) => {
  const user = await User.find({
    email: req.body.email,
    password: req.body.password,
  });
  return res.json({
    status: "ok",
    user,
  });
});

router.post("/student/newUser", async (req, res) => {
  const user = new User({
    id: req.body.class + req.body.roll_no,
    password: req.body.class + req.body.roll_no,
    name: req.body.name,
    roll_no: req.body.roll_no,
    class: req.body.class,
    reset: false,
    active: true,
  });
  await user.save();
  return res.status(200).json({
    status: "ok",
    user,
  });
});

router.post("/student/newMultipleUsers", async (req, res) => {
  let users = req.body.users;
  let allUsers = [];
  users.forEach((user) => {
    allUsers.push({
      email: user.email,
      password: user.class + user.roll_no,
      fullname: user.fullname,
      roll_no: user.roll_no,
      class: user.class,
      reset: false,
      active: true,
      solutions: {},
    });
  });
  const result = await User.collection.insertMany(allUsers);
  return res.status(200).json({
    status: "ok",
    users,
    msg: result.insertedCount + " records inserted",
  });
});

router.post("/student/deactivateUser/:id", async (req, res) => {
  let id = req.params.id;
  const result = await User.updateOne(
    { _id: id },
    { active: false },
    { upsert: false }
  );
  return res.status(200).json({
    status: "ok",
    result,
    msg: "user deactivated successfully",
  });
});

router.post("/student/activateUser/:id", async (req, res) => {
  let id = req.params.id;
  const result = await User.updateOne(
    { _id: id },
    { active: true },
    { upsert: false }
  );
  return res.status(200).json({
    status: "ok",
    result,
    msg: "user activated successfully",
  });
});

router.post("/student/deleteUser/:id", async (req, res) => {
  let id = req.params.id;
  User.deleteOne({ _id: new mongoose.Types.ObjectId(id) })
    .then(function () {
      return res.status(200).json({
        status: "ok",
        msg: "User deleted",
      });
    })
    .catch(function (error) {});
});

router.post("/student/submitExam/:studentId/:examId", async (req, res) => {
  let studentId = new mongoose.Types.ObjectId(req.params.studentId);
  let examId = new mongoose.Types.ObjectId(req.params.examId);
  const userFromDB = await User.findOne({ _id: studentId });
  if (userFromDB) {
    userFromDB.solutions[examId] = req.body.solution;
    await userFromDB.save();
  }
  return res.status(200).json({
    status: "ok",
    msg: "Answers saved successfully",
  });
});

//Classes APIs

router.get("/class/allClasses", async (req, res) => {
  const classes = await Class.find({});
  return res.json({
    status: "ok",
    classes,
    msg: "fetched all classes",
  });
});

router.post("/class/newClass", async (req, res) => {
  const newClass = new Class({
    name: req.body.name,
  });
  await newClass.save();
  return res.status(200).json({
    status: "ok",
    newClass,
  });
});

router.post("/class/newMultipleClasses", async (req, res) => {
  let classes = req.body.classes;
  let allClasses = [];
  classes.forEach((singlesClass) => {
    allClasses.push({
      name: singlesClass,
    });
  });
  const result = await Class.collection.insertMany(allClasses);
  return res.status(200).json({
    status: "ok",
    classes,
    msg: result.insertedCount + " classes inserted",
  });
});

router.post("/class/modifyClass/:id", async (req, res) => {
  let id = new mongoose.Types.ObjectId(req.params.id);
  const result = await Class.updateOne(
    { _id: id },
    { name: req.body.name },
    { upsert: false }
  );
  return res.json({
    status: "ok",
    result,
    msg: "class updated sucessfully",
  });
});

router.post("/class/deleteClass/:id", async (req, res) => {
  let id = req.params.id;
  Class.deleteOne({ _id: new mongoose.Types.ObjectId(id) })
    .then(function () {
      return res.status(200).json({
        status: "ok",
        msg: "Class deleted",
      });
    })
    .catch(function (error) {});
});

//Exams APIs

router.get("/exam/allExams", async (req, res) => {
  let exams = await Exam.find({});
  return res.json({
    status: "ok",
    exams,
    msg: "fetched all exams",
  });
});

router.get("/exam/viewQuestions/:id", async (req, res) => {
  let id = req.params.id;
  let exams = await Exam.find({ _id: new mongoose.Types.ObjectId(id) });
  return res.json({
    status: "ok",
    exams,
    msg: "fetched all exams",
  });
});

router.post("/exam/newExam", async (req, res) => {
  const exam = new Exam({
    name: req.body.name,
    desc: req.body.desc,
    class: req.body.class,
    startTime: req.body.startTime,
    duration: req.body.duration,
  });
  await exam.save();
  return res.status(200).json({
    status: "ok",
    exam,
  });
});

router.post("/exam/modifyQuestions/:id", async (req, res) => {
  let id = new mongoose.Types.ObjectId(req.params.id);
  const result = await Exam.updateOne(
    { _id: id },
    { qa: req.body.qa },
    { upsert: false }
  );
  return res.json({
    status: "ok",
    result,
  });
});

module.exports = router;
