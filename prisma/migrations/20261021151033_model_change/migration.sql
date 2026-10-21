/*
  Warnings:

  - A unique constraint covering the columns `[studentId,repoUrl]` on the table `projects` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "projects_studentId_repoUrl_key" ON "projects"("studentId", "repoUrl");
