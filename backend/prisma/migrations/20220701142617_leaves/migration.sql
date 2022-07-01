/*
  Warnings:

  - Added the required column `leave_end_date` to the `leave` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leave_start_date` to the `leave` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_of_days` to the `leave` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `leave` ADD COLUMN `leave_end_date` VARCHAR(191) NOT NULL,
    ADD COLUMN `leave_start_date` VARCHAR(191) NOT NULL,
    ADD COLUMN `number_of_days` INTEGER NOT NULL;
