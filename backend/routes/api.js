const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

// =======================Leaves==============
router.get("/leaves", async (req, res) => {
  const _leaves = await prisma.leave.findMany();
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
        status: status
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
