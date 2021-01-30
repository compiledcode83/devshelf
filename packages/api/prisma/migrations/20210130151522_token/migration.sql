/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[token]` on the table `Session`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[userId]` on the table `Session`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Session.token_unique" ON "Session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Session_userId_unique" ON "Session"("userId");
