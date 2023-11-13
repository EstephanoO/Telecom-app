/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `Rol` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Rol` DROP FOREIGN KEY `Rol_usuarioId_fkey`;

-- AlterTable
ALTER TABLE `Rol` DROP COLUMN `usuarioId`;

-- CreateTable
CREATE TABLE `_RolToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_RolToUser_AB_unique`(`A`, `B`),
    INDEX `_RolToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_RolToUser` ADD CONSTRAINT `_RolToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Rol`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RolToUser` ADD CONSTRAINT `_RolToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
