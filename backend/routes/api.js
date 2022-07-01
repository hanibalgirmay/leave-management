const express = require("express");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const jwt = require("../utils/jwt");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!user) {
    return { status: false, message: "User not registered" };
  }
  const checkPassword = await bcrypt.compareSync(password, user.password);
  if (!checkPassword)
    return { status: false, message: "Email address or password not valid" };
  delete user.password;
  const accessToken = await jwt.signAccessToken(user);
  res.json({ ...user, accessToken });
});

router.post("/register", async (req, res, next) => {
  try {
    let { username, password } = req.body;
    password = bcrypt.hashSync(password, 8);
    let user = await prisma.user.create({
      data: {
        username,
        password,
      },
    });
    let accessToken = await jwt.signAccessToken(user);

    res.json(accessToken);
  } catch (e) {
    next(e);
  }
});

// =======================Leaves==============
router.get("/leaves", async (req, res) => {
  const _leaves = await prisma.leave.findMany({});
  return res.json(_leaves);
});

router.get("/leaves/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const _leave = await prisma.leave.findUnique({
      where: {
        id: parseInt(id),
      },
      // include: { category: true },
    });
    res.json(_leave);
  } catch (error) {
    next(error);
  }
});

router.get("/leaves/employee/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const _leave = await prisma.leave.findMany({
      where: {
        employeeID: Number(id),
      },
      include: { employee: true },
    });
    res.json(_leave);
  } catch (error) {
    next(error);
  }
});

router.post("/leaves", async (req, res, next) => {
  try {
    const data = req.body;
    console.log("++ ", data);
    const newLeave = await prisma.leave.create({
      data: data,
    });
    res.json({ message: "Leave created successfully!", newLeave });
  } catch (error) {
    next(error);
  }
});

router.put("/leaves/status/:id", async (req, res, next) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const updateLeave = await prisma.leave.update({
      where: {
        id: Number(id),
      },
      data: {
        status: status,
      },
    });
    res.json({ message: "Leave Status updated!", updateLeave });
  } catch (error) {
    next(error);
  }
});

router.patch("/leaves/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateLeave = await prisma.leave.update({
      where: {
        id: Number(id),
      },
      data: req.body,
      // include: { leave: true },
    });
    res.json({ message: "Employee Leave successfully updated!", updateLeave });
  } catch (error) {
    next(error);
  }
});

router.delete("/leaves/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const leaves = await prisma.leave.delete({
      where: {
        id: parseInt(id),
      },
    });
    console.log(leaves);
    res.json({ message: "Employee Leave successfully deleted!" });
  } catch (error) {
    next(error);
  }
});

// =======================Employee==============
router.get("/employee", async (req, res, next) => {
  try {
    const _allEmployess = await prisma.employee.findMany({
      include: { leave: true },
    });
    return res.json(_allEmployess);
  } catch (error) {
    next(error);
  }
});

router.get("/employee/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const emp = await prisma.employee.findUnique({
      where: {
        id: parseInt(id),
      },
      include: { leave: true },
    });
    res.json(emp);
  } catch (error) {
    next(error);
  }
});

router.post("/employee", async (req, res, next) => {
  try {
    const data = req.body;
    const newEmp = await prisma.employee.create({
      data: data,
    });
    res.json({ message: "Employee created successfully!", newEmp });
  } catch (error) {
    next(error);
  }
});

router.patch("/employee/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateEmpl = await prisma.employee.update({
      where: {
        id: Number(id),
      },
      data: req.body,
      include: { leave: true },
    });
    res.json({ message: "Employee Data successfully updated!", updateEmpl });
  } catch (error) {
    next(error);
  }
});

router.delete("/employee/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await prisma.employee.delete({
      where: {
        id: parseInt(id),
      },
    });
    console.log(employee);
    res.json({ message: "Employee successfully deleted!" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
