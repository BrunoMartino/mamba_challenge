-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: localhost    Database: desafio_mamba
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Campaign`
--

DROP TABLE IF EXISTS `Campaign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Campaign` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dateInsert` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `dateInitial` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `dateEnd` datetime(3) NOT NULL,
  `deletedAt` datetime(3) DEFAULT NULL,
  `status` enum('ATIVA','PAUSADA','EXPIRADA') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PAUSADA',
  `category` enum('SEO','SOCIAL_MEDIA','ADS','EMAIL_MARKETING','CONTENT_MARKETING','ANALYTICS') COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Campaign`
--

LOCK TABLES `Campaign` WRITE;
/*!40000 ALTER TABLE `Campaign` DISABLE KEYS */;
INSERT INTO `Campaign` VALUES ('_XA7Lv3z','Campanha 5','Desc da Campanha 5','2025-02-26 20:09:04.591','2025-02-26 17:05:00.000','2025-02-27 18:07:00.000',NULL,'EXPIRADA','CONTENT_MARKETING'),('0Xuqh6Ab','Campanha 14','Desc da Campanha 14','2025-02-26 20:10:53.141','2025-02-26 17:05:00.000','2025-03-04 18:07:00.000',NULL,'ATIVA','SOCIAL_MEDIA'),('AfBsIcU-','Teste criação de Rota 2','','2025-02-26 23:35:45.581','2025-02-26 20:35:00.000','2025-02-27 20:35:00.000','2025-02-27 00:02:10.927','EXPIRADA','SOCIAL_MEDIA'),('d2XX4jK-','Teste criação de Rota','','2025-02-26 23:19:17.018','2025-02-26 20:18:00.000','2025-02-27 20:19:00.000',NULL,'PAUSADA','SEO'),('DcC8pi8R','Campanha 4','Desc da Campanha 4','2025-02-26 20:08:43.406','2025-02-26 17:05:00.000','2025-03-03 18:07:00.000',NULL,'ATIVA','EMAIL_MARKETING'),('dh4jagDQ','Campanha 3','Desc da Campanha 3','2025-02-26 20:08:23.092','2025-02-26 17:05:00.000','2025-03-01 18:07:00.000',NULL,'PAUSADA','ADS'),('dOPYo5HN','Teste criação de Rota 2','','2025-02-26 23:37:12.784','2025-02-26 20:35:00.000','2025-02-27 20:35:00.000','2025-02-27 00:00:18.067','EXPIRADA','SOCIAL_MEDIA'),('G5SGgZdl','Campanha 13','Desc da Campanha 13','2025-02-26 20:10:39.936','2025-02-26 17:05:00.000','2025-03-04 18:07:00.000',NULL,'PAUSADA','SEO'),('hmCWR-vA','Teste criação de Rota 3','','2025-02-26 23:25:49.881','2025-02-27 02:24:00.000','2025-02-28 02:24:00.000',NULL,'ATIVA','SOCIAL_MEDIA'),('IVelHDIE','Campanha 11','Desc da Campanha 11','2025-02-26 20:10:17.554','2025-02-26 17:05:00.000','2025-03-04 18:07:00.000',NULL,'PAUSADA','CONTENT_MARKETING'),('jgOEfY5N','Teste criação de Rota','','2025-02-26 23:24:24.408','2025-02-26 20:24:00.000','2025-02-27 20:24:00.000',NULL,'ATIVA','SOCIAL_MEDIA'),('jQma-q3r','Teste criação de Rota','descriçao nova da campanha','2025-02-26 23:46:20.786','2025-02-26 23:45:00.000','2025-02-27 23:46:00.000','2025-02-26 23:47:14.594','EXPIRADA','SOCIAL_MEDIA'),('l2AmewBd','Campanha 7','Desc da Campanha 7','2025-02-26 20:09:27.578','2025-02-26 17:05:00.000','2025-02-27 18:07:00.000',NULL,'PAUSADA','SEO'),('qbwr2Q4n','Campanha 12','Desc da Campanha 12','2025-02-26 20:10:31.881','2025-02-26 17:05:00.000','2025-03-04 18:07:00.000',NULL,'PAUSADA','ANALYTICS'),('R1O68hSk','Campanha 1','Desc da Campanha 1','2025-02-26 20:07:55.773','2025-02-27 02:05:00.000','2025-03-01 03:07:00.000',NULL,'ATIVA','SEO'),('R7s7ZSBY','Campanha 2','Desc da Campanha 2','2025-02-26 20:08:08.417','2025-02-26 23:05:00.000','2025-02-28 00:07:00.000',NULL,'EXPIRADA','SOCIAL_MEDIA'),('sOCYbVdg','Campanha 6','Desc da Campanha 6','2025-02-26 20:09:16.676','2025-02-26 17:05:00.000','2025-02-27 18:07:00.000',NULL,'EXPIRADA','ANALYTICS'),('uZAeqpPa','Campanha 10','Desc da Campanha 10','2025-02-26 20:10:07.004','2025-02-26 17:05:00.000','2025-03-04 18:07:00.000',NULL,'ATIVA','EMAIL_MARKETING'),('vG2rxq4o','Campanha 15','Desc da Campanha 15','2025-02-26 20:11:11.392','2025-02-26 17:05:00.000','2025-02-28 18:07:00.000',NULL,'EXPIRADA','SEO'),('XsLt3R8K','Teste criação de Rota 2','','2025-02-26 23:38:20.054','2025-02-26 20:35:00.000','2025-02-27 20:35:00.000','2025-02-27 00:00:01.664','EXPIRADA','SOCIAL_MEDIA'),('YqAE3AFI','Campanha 8','Desc da Campanha 8','2025-02-26 20:09:49.761','2025-02-26 17:05:00.000','2025-03-04 18:07:00.000',NULL,'ATIVA','SOCIAL_MEDIA'),('yZOXXASI','Campanha 9','Desc da Campanha 9','2025-02-26 20:09:57.625','2025-02-26 17:05:00.000','2025-03-04 18:07:00.000',NULL,'ATIVA','ADS'),('zJiHE-nm','Teste criação de Rota 2','','2025-02-26 23:34:06.325','2025-02-26 20:33:00.000','2025-02-27 20:33:00.000','2025-02-27 00:02:18.526','EXPIRADA','SOCIAL_MEDIA');
/*!40000 ALTER TABLE `Campaign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('3d7b9d70-da24-4342-840b-9b2f10f331fe','6679c4507002c4db2eb126bb98bd7ba3157a654fc56723d9ecb24c61d8b3fdeb','2025-02-23 16:57:55.022','20250223165754_fix_typo_in_model_name',NULL,NULL,'2025-02-23 16:57:54.947',1),('abe24614-191a-4791-89df-af6e775f09de','6e325ce5b99f8ee66fd36375ca90a85c3d5bf73171610a7a92688bde0c72fdcb','2025-02-26 19:45:12.868','20250226194512_added_required_collumn_for_category',NULL,NULL,'2025-02-26 19:45:12.799',1),('beb682a0-df80-4760-8f82-ac3014cb7022','ebb1926e2bab8c02d50f2e61d4384700df7fc6e4dc95274870d427cda168ccd6','2025-02-23 15:50:35.068','20250223155035_clone_backend_prisma_model',NULL,NULL,'2025-02-23 15:50:35.018',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-27  0:24:48
