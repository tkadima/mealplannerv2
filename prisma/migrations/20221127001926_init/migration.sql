-- CreateTable
CREATE TABLE "ingredient" (
    "id" SERIAL NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "quantity" DECIMAL(5,2),
    "quantity_2" DECIMAL(5,2),
    "unit_of_measure_id" VARCHAR(50),
    "unit_of_measure" VARCHAR(50),
    "description" TEXT NOT NULL,
    "is_group_header" BOOLEAN NOT NULL,

    CONSTRAINT "ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "instructions" TEXT,
    "prep_time" INTEGER,
    "cook_time" INTEGER,
    "yields" DECIMAL(10,2),

    CONSTRAINT "recipe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ingredient" ADD CONSTRAINT "ingredient_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
