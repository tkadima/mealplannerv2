/*
  Warnings:

  - You are about to drop the column `have` on the `ingredient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "food" ADD COLUMN     "have" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ingredient" DROP COLUMN "have";
