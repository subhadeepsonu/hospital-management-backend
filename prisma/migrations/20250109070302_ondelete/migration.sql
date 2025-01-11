/*
  Warnings:

  - The values [SNACK] on the enum `MealType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `staff` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'pantry', 'delivery');

-- AlterEnum
BEGIN;
CREATE TYPE "MealType_new" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER');
ALTER TABLE "DietChart" ALTER COLUMN "mealType" TYPE "MealType_new" USING ("mealType"::text::"MealType_new");
ALTER TYPE "MealType" RENAME TO "MealType_old";
ALTER TYPE "MealType_new" RENAME TO "MealType";
DROP TYPE "MealType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "DietChart" DROP CONSTRAINT "DietChart_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_dietChartId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_staffId_fkey";

-- AlterTable
ALTER TABLE "DietChart" ALTER COLUMN "ingredients" SET NOT NULL,
ALTER COLUMN "ingredients" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "staff";

-- DropEnum
DROP TYPE "role";

-- CreateTable
CREATE TABLE "Staff" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "contactInfo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Staff_email_key" ON "Staff"("email");

-- AddForeignKey
ALTER TABLE "DietChart" ADD CONSTRAINT "DietChart_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_dietChartId_fkey" FOREIGN KEY ("dietChartId") REFERENCES "DietChart"("id") ON DELETE CASCADE ON UPDATE CASCADE;
