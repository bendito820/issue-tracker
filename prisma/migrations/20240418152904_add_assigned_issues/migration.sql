-- AlterTable
ALTER TABLE `issue` ADD COLUMN `assgnedToUserId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assgnedToUserId_fkey` FOREIGN KEY (`assgnedToUserId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
