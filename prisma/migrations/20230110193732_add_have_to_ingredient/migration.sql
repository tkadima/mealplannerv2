/*
  Warnings:

  - You are about to drop the column `foodId` on the `ingredient` table. All the data in the column will be lost.
  - You are about to drop the `food` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ingredient" DROP CONSTRAINT "ingredient_foodId_fkey";

-- AlterTable
ALTER TABLE "ingredient" DROP COLUMN "foodId",
ADD COLUMN     "have" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "food";
