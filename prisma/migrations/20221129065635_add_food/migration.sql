-- CreateTable
CREATE TABLE "food" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "aliases" TEXT[],

    CONSTRAINT "food_pkey" PRIMARY KEY ("id")
);
