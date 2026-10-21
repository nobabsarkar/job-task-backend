/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `projects` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentId` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "studentId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "projects_studentId_key" ON "projects"("studentId");

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;
