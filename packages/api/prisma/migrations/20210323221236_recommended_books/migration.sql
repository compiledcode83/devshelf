/*
  Warnings:

  - You are about to alter the column `averageRating` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "isRecommended" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "averageRating" SET DATA TYPE DOUBLE PRECISION;
