-- AlterTable
ALTER TABLE "recipe" ADD COLUMN     "requiresOven" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "requiresStovetop" BOOLEAN NOT NULL DEFAULT false;
