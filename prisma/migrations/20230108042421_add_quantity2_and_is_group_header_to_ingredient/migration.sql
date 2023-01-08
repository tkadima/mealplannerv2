-- AlterTable
ALTER TABLE "ingredient" ADD COLUMN     "isGroupHeader" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "quantity2" DECIMAL(5,2);
