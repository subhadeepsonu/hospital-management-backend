/*
  Warnings:

  - You are about to drop the column `staffId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Task` table. All the data in the column will be lost.
  - Added the required column `delivaryId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pantryId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "TaskStatus" ADD VALUE 'DELIVERED';

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_staffId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "staffId",
DROP COLUMN "type",
ADD COLUMN     "delivaryId" INTEGER NOT NULL,
ADD COLUMN     "pantryId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "TaskType";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_pantryId_fkey" FOREIGN KEY ("pantryId") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_delivaryId_fkey" FOREIGN KEY ("delivaryId") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;
