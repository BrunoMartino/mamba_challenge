/*
  Warnings:

  - Made the column `dateInitial` on table `Campaign` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Campaign` MODIFY `dateInitial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
