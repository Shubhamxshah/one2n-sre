import { Router } from "express";
import { prisma } from "../lib/prisma";

export const studentRouter = Router();

studentRouter.post("/student", async (req, res) => {
  const { rollId, name, standard } = req.body;

  if (typeof name !== "string" || typeof standard !== "number" || typeof rollId !== "number") {
    res.status(300).json({message: `incorrect input types`})
  }

  try {
  const student = await prisma.student.create({
    data: {
      rollId: rollId,   
      name: name, 
      standard: standard,
    },
  })
  res.status(200).json({message: `new student ${student.name} created`})

  } catch(e) {
    res.status(400).json({message: `error creating student ${name}`})
  }
})

studentRouter.get("/all-students", async (_, res) => {
  try {
    const students = await prisma.student.findMany()
    res.status(201).json(students)
  } catch (error) {
    res.status(401).json({message: "error getting all students"})
  }
})

studentRouter.get("/student", async (req, res) => {
  const {rollId} = req.body;

  if (typeof rollId !== "number") {
    res.status(300).json({message: `incorrect inputs`})
  }

  try {
    const student = await prisma.student.findMany({
      where: {
      rollId,
    }
    })

    res.status(201).json(student)
  } catch (error) {
    res.status(400).json({message: "error getting student"}) 
  }
})

studentRouter.put("/student" , async (req, res) => {
  const {rollId, name, standard} = req.body;

  if (typeof rollId !== "number" || typeof name !== "string" || typeof standard !== "number") {
    res.status(300).json({message: `incorrect input types`})
  }

  try {
    const student = await prisma.student.update({
      where: {
        rollId,  
      }, 
      data: {
        rollId: rollId, 
        name: name, 
        standard: standard
      }
    })

    res.status(201).json({message: `student details updated ${student.name} ${student.standard}`})
  } catch (error) {
    res.status(400).json({message: `error updating student details`})
  }
})

studentRouter.delete("/student", async (req, res) => {
  const {rollId} = req.body; 

  try {
    const student = await prisma.student.delete({
      where: {
        rollId: rollId,
      }
    }) 

    res.status(201).json({message: `student with id ${student.rollId} deleted `})
  } catch (error) {
    res.status(400).json({message: `error deleting student with id ${rollId}`})
  }
})
