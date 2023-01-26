/*
  Warnings:

  - A unique constraint covering the columns `[foodId]` on the table `ingredient` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ingredient" ADD COLUMN     "foodId" INTEGER;

-- CreateTable
CREATE TABLE "food" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" DECIMAL(5,2) NOT NULL,
    "unitOfMeasure" TEXT NOT NULL,
    "calories" INTEGER NOT NULL,

    CONSTRAINT "food_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ingredient_foodId_key" ON "ingredient"("foodId");

-- AddForeignKey
ALTER TABLE "ingredient" ADD CONSTRAINT "ingredient_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "food"("id") ON DELETE SET NULL ON UPDATE CASCADE;
