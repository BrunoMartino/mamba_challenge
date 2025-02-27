/*
  Warnings:

  - You are about to drop the `Campaing` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Campaing`;

-- CreateTable
CREATE TABLE `Campaign` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `dateInsert` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateInitial` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateEnd` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `status` ENUM('ATIVA', 'PAUSADA', 'EXPIRADA') NOT NULL DEFAULT 'PAUSADA',
    `category` ENUM('SEO', 'SOCIAL_MEDIA', 'ADS', 'EMAIL_MARKETING', 'CONTENT_MARKETING', 'ANALYTICS') NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
