/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `food` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `food` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "food" ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "unit" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "food_name_key" ON "food"("name");
