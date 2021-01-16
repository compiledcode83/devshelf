/*
  Warnings:

  - You are about to drop the column `avatarUrl` on the `User` table. All the data in the column will be lost.
  - Added the required column `description` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publishedDate` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ratingsCount` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linkToRead` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPublic` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "publishedDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "averageRating" INTEGER,
ADD COLUMN     "ratingsCount" INTEGER NOT NULL,
ADD COLUMN     "thumbnail" TEXT NOT NULL,
ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "linkToRead" TEXT NOT NULL,
ADD COLUMN     "isPublic" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatarUrl",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT E'USER';
