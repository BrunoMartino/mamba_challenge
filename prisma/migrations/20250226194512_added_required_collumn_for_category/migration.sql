/*
  Warnings:

  - Made the column `category` on table `Campaign` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Campaign` MODIFY `category` ENUM('SEO', 'SOCIAL_MEDIA', 'ADS', 'EMAIL_MARKETING', 'CONTENT_MARKETING', 'ANALYTICS') NOT NULL;
