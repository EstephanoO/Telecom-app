-- AlterTable
ALTER TABLE `Carpeta` ADD COLUMN `padreId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Carpeta` ADD CONSTRAINT `Carpeta_padreId_fkey` FOREIGN KEY (`padreId`) REFERENCES `Carpeta`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
