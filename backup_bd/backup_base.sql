-- MySQL dump 10.13  Distrib 8.0.25, for macos11 (x86_64)
--
-- Host: localhost    Database: celke
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `abouts`
--

DROP TABLE IF EXISTS `abouts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `abouts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title_about` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `desc_about` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_about` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `abouts`
--

LOCK TABLES `abouts` WRITE;
/*!40000 ALTER TABLE `abouts` DISABLE KEYS */;
INSERT INTO `abouts` VALUES (1,'Teste','Texto testeo','premium_v5.jpg','2021-09-21 14:37:37','2023-08-07 21:01:47');
/*!40000 ALTER TABLE `abouts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contents_contacts`
--

DROP TABLE IF EXISTS `contents_contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contents_contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title_contact` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `desc_contact` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon_company` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title_company` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `desc_company` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `desc_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `desc_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title_form` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contents_contacts`
--

LOCK TABLES `contents_contacts` WRITE;
/*!40000 ALTER TABLE `contents_contacts` DISABLE KEYS */;
INSERT INTO `contents_contacts` VALUES (1,'Titulos','Descricao','fas fa-user','Empresa','Celke','fas fa-map-marker-alt','Endereço','Rua X','fas fa-envelope','E-mail','cesar@celke.com.br','Mensagem de Contato','2021-09-21 16:30:56','2023-08-07 21:02:17');
/*!40000 ALTER TABLE `contents_contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `footers`
--

DROP TABLE IF EXISTS `footers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `footers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `footer_desc` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `footer_text_link` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `footer_link` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `footers`
--

LOCK TABLES `footers` WRITE;
/*!40000 ALTER TABLE `footers` DISABLE KEYS */;
INSERT INTO `footers` VALUES (1,'Created by','Celke','https://google.com.br','2023-08-07 17:13:48','2023-08-07 17:13:48');
/*!40000 ALTER TABLE `footers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `homes`
--

DROP TABLE IF EXISTS `homes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `homes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title_top_one` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title_top_two` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title_top_three` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `btn_text_top` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `btn_link_top` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_top` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ser_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ser_icon_one` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ser_title_one` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ser_desc_one` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ser_icon_two` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ser_title_two` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ser_desc_two` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ser_icon_three` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ser_title_three` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ser_desc_three` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title_ser_prem` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle_ser_prem` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `desc_ser_prem` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `btn_text_ser_prem` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `btn_link_ser_prem` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_ser_prem` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `homes`
--

LOCK TABLES `homes` WRITE;
/*!40000 ALTER TABLE `homes` DISABLE KEYS */;
INSERT INTO `homes` VALUES (1,'Temos a solução!','que a sua empresa precisa?','Podemos ajudar a sua empresa!','Entrar em Contat','http://localhost:3000/contato','16915038283171.jpg','Serviços','fas fa-wifi','Wifi veloz','Sed iaculis massa quis mauris sollicitudin sollicitudin. Magna et fermentum imperdiet.','fas fa-rocket','Espaço inspirador','Sed iaculis massa quis mauris sollicitudin sollicitudin. Magna et fermentum imperdiet.','fas fa-handshake','Reuniões','Sed iaculis massa quis mauris sollicitudin sollicitudin. Magna et fermentum imperdiet.','Serviço Premium','Desenvolvido para você atingir seus melhores índices de produtividade, criatividade e bem-estar.','Sed laoreet cursus commodo. Quisque pharetra nisl vitae diam egestas lacinia. Integer at arcu ac turpis blandit ullamcorper at vitae diam. Donec quam est, aliquam non nisl non, feugiat suscipit eros. Pellentesque condimentum est quam, auctor faucibus velit euismod eget. Nam a diam sed metus molestie tincidunt. Quisque et aliquet risus. Sed et sem quis massa sagittis feugiat at sed risus. Sed semper tortor elit.','Contato','http://localhost:3000/contato','premium_v5.jpg','2021-09-20 17:42:10','2023-08-08 14:10:28');
/*!40000 ALTER TABLE `homes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `msgs_contacts`
--

DROP TABLE IF EXISTS `msgs_contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `msgs_contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `msgs_contacts`
--

LOCK TABLES `msgs_contacts` WRITE;
/*!40000 ALTER TABLE `msgs_contacts` DISABLE KEYS */;
INSERT INTO `msgs_contacts` VALUES (1,'Marcio Camollez Junior','marciocamollez@hotmail.com','Teste','aaaassasa','2021-09-21 17:08:10','2021-09-21 17:08:10'),(2,'MARCIO C JUNIOR','a@aa.com','assas','sdasdas','2021-09-21 17:14:20','2021-09-21 17:14:20');
/*!40000 ALTER TABLE `msgs_contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seos`
--

DROP TABLE IF EXISTS `seos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `page` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seos`
--

LOCK TABLES `seos` WRITE;
/*!40000 ALTER TABLE `seos` DISABLE KEYS */;
INSERT INTO `seos` VALUES (1,'Contato','Contato com a empresa','Celke - Contato','2023-08-07 17:16:49','2023-08-07 17:16:49'),(2,'home','Site Sobre...','Celke - Home','2023-08-07 17:18:29','2023-08-07 17:18:29'),(3,'sobre-empresa','Página da empresa.','Celke - Sobre Empresa','2023-08-07 17:19:25','2023-08-07 17:19:25'),(4,'contato','Contato com a empresa.','Celke - Contato','2023-08-07 17:20:13','2023-08-07 17:20:13');
/*!40000 ALTER TABLE `seos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `recover_password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `recover_password_app` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Marcio','marciocamollez@hotmail.com','$2a$08$9GfNJkt1tQGYAhnBHdC4J.lHkWeuPavavb4nV9eqNvkA7IYkPEogG',NULL,NULL,NULL,'2023-08-07 14:39:23','2023-08-07 14:39:23'),(2,'Cesar','cesar@celke.com.br','$2a$08$/efI3r3N5/BO2fi9uHVgeOBza6LIUt1QUnqPIm8zpPKMWKcyocULW',NULL,NULL,NULL,'2023-08-07 14:40:10','2023-08-07 14:40:10'),(3,'Marcio2','marciocamollez2@hotmail.com','$2a$08$P7RKhFQ4gwMpCGkL5oikeeaPnzbB4sid3ywZUpjN4qIGWMX66Nzl2',NULL,NULL,NULL,'2023-08-07 18:13:27','2023-08-07 18:13:27'),(4,'Marcio3','marciocamollez@gmail.com','$2a$08$jm3qSRf7uG2IV9k89QwcxO60bc11HHo7Cz0Ff1TwvZQgEptWHvNfK',NULL,NULL,NULL,'2023-08-07 18:55:38','2023-08-07 18:55:38');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-08 11:16:44
