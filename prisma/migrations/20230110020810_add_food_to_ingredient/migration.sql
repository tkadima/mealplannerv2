-- AlterTable
ALTER TABLE "ingredient" ADD COLUMN     "foodId" INTEGER;

-- CreateTable
CREATE TABLE "food" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "unit" TEXT NOT NULL,
    "have" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "food_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ingredient" ADD CONSTRAINT "ingredient_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "food"("id") ON DELETE SET NULL ON UPDATE CASCADE;
