/*
  Warnings:

  - You are about to alter the column `leave_type` on the `leave` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("leave_leave_type")`.
  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_email_key` ON `user`;

-- AlterTable
ALTER TABLE `leave` MODIFY `leave_type` ENUM('SICK_LEAVE', 'CASUAL_LEAVE', 'PATERNITY_LEAVE', 'MATERNITY_LEAVE') NOT NULL DEFAULT 'SICK_LEAVE';

-- AlterTable
ALTER TABLE `user` DROP COLUMN `email`,
    ADD COLUMN `username` VARCHAR(191) NOT NULL,
    MODIFY `role` ENUM('EMPLOYEE', 'HR_MANAGER') NULL DEFAULT 'EMPLOYEE';

-- CreateTable
CREATE TABLE `remainingLeave` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeID` INTEGER NULL,
    `total_leave_days` INTEGER NOT NULL DEFAULT 15,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

-- AddForeignKey
ALTER TABLE `remainingLeave` ADD CONSTRAINT `remainingLeave_employeeID_fkey` FOREIGN KEY (`employeeID`) REFERENCES `Employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
