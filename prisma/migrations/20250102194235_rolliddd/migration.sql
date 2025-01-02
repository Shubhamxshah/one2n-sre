/*
  Warnings:

  - A unique constraint covering the columns `[rollId]` on the table `student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "student_rollId_key" ON "student"("rollId");
