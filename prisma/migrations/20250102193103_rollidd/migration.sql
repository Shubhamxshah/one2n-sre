-- CreateTable
CREATE TABLE "student" (
    "id" SERIAL NOT NULL,
    "rollId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "standard" INTEGER NOT NULL,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);
