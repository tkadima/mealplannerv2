/*
  Warnings:

  - Added the required column `food_id` to the `ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ingredient" ADD COLUMN     "food_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ingredient" ADD CONSTRAINT "ingredient_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "food"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
