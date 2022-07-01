/*
  Warnings:

  - The primary key for the `employee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `employee` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `leave` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `leave` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `employee` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `role` ENUM('EMPLOYEE', 'HR_MANAGER') NULL DEFAULT 'EMPLOYEE',
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `leave` DROP PRIMARY KEY,
    ADD COLUMN `employeeID` INTEGER NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NULL DEFAULT 'PENDING',
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `leave` ADD CONSTRAINT `leave_employeeID_fkey` FOREIGN KEY (`employeeID`) REFERENCES `Employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
