import { Router } from "express";
import { prisma } from "../lib/prisma";

export const studentRouter = Router();

studentRouter.post("/student", async (req, res): Promise<void> => {
  const { rollId, name, standard } = req.body;

  if (
    !name ||
    !standard ||
    !rollId ||
    typeof name !== "string" ||
    typeof standard !== "number" ||
    typeof rollId !== "number"
  ) {
    console.log("incorrect input types");
    res.status(300).json({ message: `incorrect input types` });
    return;
  }

  try {
    const student = await prisma.student.create({
      data: {
        rollId: rollId,
        name: name,
        standard: standard,
      },
    });
    res.status(200).json({ message: `new student ${student.name} created` });
  } catch {
    console.log("error creating a new student");
    res.status(400).json({ message: `error creating student ${name}` });
  }
});

studentRouter.get("/all-students", async (_, res) => {
  try {
    const students = await prisma.student.findMany();
    console.log("students fetched");
    res.status(201).json(students);
  } catch {
    console.log("error getting all students from database");
    res.status(401).json({ message: "error getting all students" });
  }
});

studentRouter.get("/student", async (req, res) => {
  const { rollId } = req.body;

  if (!rollId || typeof rollId !== "number") {
    res.status(300).json({ message: `incorrect inputs` });
    return;
  }

  try {
    const student = await prisma.student.findMany({
      where: {
        rollId,
      },
    });

    res.status(201).json(student);
  } catch (e) {
    console.log("error getting a particular student from db");
    res.status(400).json({ message: e });
  }
});

studentRouter.put("/student", async (req, res) => {
  const { rollId, name, standard } = req.body;

  if (
    !rollId ||
    !name ||
    !standard ||
    typeof rollId !== "number" ||
    typeof name !== "string" ||
    typeof standard !== "number"
  ) {
    console.log("incorrect input types for editing student details");
    res.status(300).json({ message: `incorrect input types` });
    return;
  }

  try {
    const student = await prisma.student.update({
      where: {
        rollId,
      },
      data: {
        rollId: rollId,
        name: name,
        standard: standard,
      },
    });

    res.status(201).json({
      message: `student details updated ${student.name} ${student.standard}`,
    });
  } catch {
    console.log("error editing student details");
    res.status(400).json({ message: `error updating student details` });
  }
});

studentRouter.delete("/student", async (req, res) => {
  const { rollId } = req.body;

  if (!rollId || typeof rollId !== "number") {
    res.status(300).json({ message: "Incorrect inputs" });
    return;
  }

  try {
    const student = await prisma.student.delete({
      where: {
        rollId: rollId,
      },
    });

    res
      .status(201)
      .json({ message: `student with id ${student.rollId} deleted ` });
  } catch {
    res
      .status(400)
      .json({ message: `error deleting student with id ${rollId}` });
  }
});
