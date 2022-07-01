-- AlterTable
ALTER TABLE `user` ADD COLUMN `employeeID` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_employeeID_fkey` FOREIGN KEY (`employeeID`) REFERENCES `Employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
