const express = require("express");
const cors = require("cors");
const app = express();

const { initializeDatabase } = require("./db/db.connect");
const { Student } = require("./models/students.model");
const { Teacher } = require("./models/teachers.model");

app.use(cors());
app.use(express.json());

initializeDatabase();

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/students", async (req, res) => {
  const { name, age, grade } = req.body;

  try {
    const student = new Student({ name, age, grade });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/students/:id", async (req, res) => {
  const studentId = req.params.id;
  const updatedStudentData = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      updatedStudentData,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/students/:id", async (req, res) => {
  const studentId = req.params.id;

  try {
    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({
      message: "Student deleted successfully",
      student: deletedStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Teachers API Requests

app.get("/teachers", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json({ message: "Found All Teachers", teachers: teachers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/teachers", async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    const savedTeacher = await teacher.save();

    if (savedTeacher) {
      res
        .status(201)
        .json({ message: "Teacher added successfully", teacher: teacher });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/teachers/:id", async (req, res) => {
  const dataId = req.params.id;
  const dataToUpdate = req.body;

  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      dataId,
      dataToUpdate,
      { new: true }
    );

    if (updatedTeacher) {
      res.status(200).json({
        message: "Data updated successfully",
        updatedTeacher: updatedTeacher,
      });
    } else {
      res.status(404).json({ message: "Teacher not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({ error: "Internal Server" });
  }
});

app.delete("/teachers/:id", async (req, res) => {
  const dataId = req.params.id;

  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(dataId);

    if (deletedTeacher) {
      res
        .status(200)
        .json({ message: "Teacher got deleted", teacher: deletedTeacher });
    } else {
      res.status(404).json({ message: "Teacher not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
