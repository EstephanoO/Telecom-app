/*
  Warnings:

  - Added the required column `usuarioId` to the `Rol` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Rol` ADD COLUMN `usuarioId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Rol` ADD CONSTRAINT `Rol_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
