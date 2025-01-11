/*
  Warnings:

  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `delivaryId` to the `DietChart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pantryId` to the `DietChart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_delivaryId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_dietChartId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_pantryId_fkey";

-- AlterTable
ALTER TABLE "DietChart" ADD COLUMN     "delivaryId" INTEGER NOT NULL,
ADD COLUMN     "pantryId" INTEGER NOT NULL,
ADD COLUMN     "status" "TaskStatus" NOT NULL DEFAULT 'PENDING';

-- DropTable
DROP TABLE "Task";

-- AddForeignKey
ALTER TABLE "DietChart" ADD CONSTRAINT "DietChart_pantryId_fkey" FOREIGN KEY ("pantryId") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DietChart" ADD CONSTRAINT "DietChart_delivaryId_fkey" FOREIGN KEY ("delivaryId") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;
