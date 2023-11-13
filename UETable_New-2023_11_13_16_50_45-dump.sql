-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: mysql-2a9c5153-uetable.a.aivencloud.com    Database: defaultdb
-- ------------------------------------------------------
-- Server version	8.0.30

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;

--
-- GTID state at the beginning of the backup 
--

--
-- Table structure for table `Auths`
--

DROP TABLE IF EXISTS `Auths`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Auths` (
  `StudentId` varchar(255) NOT NULL,
  `CodeHash` varchar(255) NOT NULL,
  `CreateAt` date NOT NULL,
  PRIMARY KEY (`StudentId`),
  CONSTRAINT `Auths_ibfk_1` FOREIGN KEY (`StudentId`) REFERENCES `Users` (`StudentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Classes`
--

DROP TABLE IF EXISTS `Classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Classes` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Code` varchar(255) NOT NULL,
  `Location` varchar(255) NOT NULL,
  `Teacher` text,
  `number` int NOT NULL,
  `weekday` int NOT NULL,
  `lessonStart` int NOT NULL,
  `lessonEnd` int NOT NULL,
  `group` varchar(20) DEFAULT NULL,
  `SubjectId` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `SubjectId` (`SubjectId`),
  CONSTRAINT `Classes_ibfk_1` FOREIGN KEY (`SubjectId`) REFERENCES `Subjects` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Comments`
--

DROP TABLE IF EXISTS `Comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Comments` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `PageType` char(1) DEFAULT 'C',
  `createdAt` datetime DEFAULT NULL,
  `Like` int NOT NULL DEFAULT '0',
  `Content` text NOT NULL,
  `UserId` int NOT NULL,
  `PreCommentId` int DEFAULT NULL,
  `ParentId` int DEFAULT NULL,
  `PageId` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `Id` (`Id`,`PageType`),
  KEY `UserId` (`UserId`),
  KEY `ParentId` (`ParentId`),
  KEY `PreCommentId` (`PreCommentId`),
  CONSTRAINT `Comments_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `Users` (`Id`),
  CONSTRAINT `Comments_ibfk_3` FOREIGN KEY (`ParentId`) REFERENCES `Comments` (`Id`),
  CONSTRAINT `Comments_ibfk_4` FOREIGN KEY (`PreCommentId`) REFERENCES `Comments` (`Id`),
  CONSTRAINT `Comments_ibfk_5` FOREIGN KEY (`Id`, `PageType`) REFERENCES `Pages` (`PageId`, `PageType`) ON DELETE CASCADE,
  CONSTRAINT `Comments_chk_1` CHECK ((`PageType` = _utf8mb4'C'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`avnadmin`@`%`*/ /*!50003 TRIGGER `before_comment_create` BEFORE INSERT ON `Comments` FOR EACH ROW BEGIN
    DECLARE last_id int;

    INSERT INTO Pages(PageType, PageUrl)
        VALUES ('C', 'XYZ');

    SELECT LAST_INSERT_ID() into last_id;

    Set NEW.Id = last_id;

end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Documents`
--

DROP TABLE IF EXISTS `Documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Documents` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `PageType` char(1) DEFAULT 'D',
  `Name` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `Like` int NOT NULL DEFAULT '0',
  `Download` int NOT NULL DEFAULT '0',
  `Category` varchar(255) NOT NULL,
  `Link` text NOT NULL,
  `UserId` int NOT NULL,
  `SubjectId` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `Id` (`Id`,`PageType`),
  KEY `UserId` (`UserId`),
  KEY `SubjectId` (`SubjectId`),
  CONSTRAINT `Documents_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `Users` (`Id`),
  CONSTRAINT `Documents_ibfk_3` FOREIGN KEY (`SubjectId`) REFERENCES `Subjects` (`Id`),
  CONSTRAINT `Documents_ibfk_4` FOREIGN KEY (`Id`, `PageType`) REFERENCES `Pages` (`PageId`, `PageType`) ON DELETE CASCADE,
  CONSTRAINT `Documents_chk_1` CHECK ((`PageType` = _utf8mb4'D'))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`avnadmin`@`%`*/ /*!50003 TRIGGER `before_document_create` BEFORE INSERT ON `Documents` FOR EACH ROW BEGIN
    DECLARE last_id int;

    INSERT INTO Pages(PageType, PageUrl)
        VALUES ('D', 'XYZ');

    SELECT LAST_INSERT_ID() into last_id;

    Set NEW.Id = last_id;

end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `EventClasses`
--

DROP TABLE IF EXISTS `EventClasses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EventClasses` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `EventId` int NOT NULL,
  `ClassId` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `EventId` (`EventId`),
  KEY `ClassId` (`ClassId`),
  CONSTRAINT `EventClasses_ibfk_1` FOREIGN KEY (`EventId`) REFERENCES `Events` (`Id`),
  CONSTRAINT `EventClasses_ibfk_2` FOREIGN KEY (`ClassId`) REFERENCES `Classes` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Events`
--

DROP TABLE IF EXISTS `Events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Events` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `timestart` time DEFAULT NULL,
  `timeend` time DEFAULT NULL,
  `Location` varchar(255) NOT NULL,
  `Info` text,
  `ScheduleId` int NOT NULL,
  `day` date DEFAULT NULL,
  `color` text,
  PRIMARY KEY (`Id`),
  KEY `ScheduleId` (`ScheduleId`),
  CONSTRAINT `Events_ibfk_1` FOREIGN KEY (`ScheduleId`) REFERENCES `Schedules` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Majors`
--

DROP TABLE IF EXISTS `Majors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Majors` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Code` varchar(255) NOT NULL,
  `Info` text NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PageComments`
--

DROP TABLE IF EXISTS `PageComments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PageComments` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `PageId` int NOT NULL,
  `PageType` char(1) DEFAULT NULL,
  `CommentId` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `PageId` (`PageId`,`PageType`),
  KEY `CommentId` (`CommentId`),
  CONSTRAINT `PageComments_ibfk_2` FOREIGN KEY (`CommentId`) REFERENCES `Comments` (`Id`),
  CONSTRAINT `PageComments_ibfk_3` FOREIGN KEY (`PageId`, `PageType`) REFERENCES `Pages` (`PageId`, `PageType`),
  CONSTRAINT `PageComments_chk_1` CHECK ((`PageType` in (_utf8mb4'D',_utf8mb4'S',_utf8mb4'R')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PageReports`
--

DROP TABLE IF EXISTS `PageReports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PageReports` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `PageId` int NOT NULL,
  `PageType` char(1) DEFAULT NULL,
  `ReportId` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `PageId` (`PageId`,`PageType`),
  KEY `ReportId` (`ReportId`),
  CONSTRAINT `PageReports_ibfk_2` FOREIGN KEY (`ReportId`) REFERENCES `Reports` (`Id`),
  CONSTRAINT `PageReports_ibfk_3` FOREIGN KEY (`PageId`, `PageType`) REFERENCES `Pages` (`PageId`, `PageType`),
  CONSTRAINT `PageReports_chk_1` CHECK ((`PageType` in (_utf8mb4'D',_utf8mb4'S',_utf8mb4'R')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Pages`
--

DROP TABLE IF EXISTS `Pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Pages` (
  `PageId` int NOT NULL AUTO_INCREMENT,
  `PageType` char(1) NOT NULL,
  `PageUrl` varchar(64) NOT NULL,
  PRIMARY KEY (`PageId`,`PageType`),
  UNIQUE KEY `page_super-key` (`PageId`,`PageType`),
  CONSTRAINT `Pages_chk_1` CHECK ((`PageType` in (_utf8mb4'D',_utf8mb4'S',_utf8mb4'R',_utf8mb4'C')))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Reports`
--

DROP TABLE IF EXISTS `Reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reports` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `PageType` char(1) DEFAULT 'R',
  `Content` text NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `Status` int NOT NULL DEFAULT '1',
  `Type` int NOT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `Id` (`Id`,`PageType`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `Reports_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `Users` (`Id`),
  CONSTRAINT `Reports_ibfk_3` FOREIGN KEY (`Id`, `PageType`) REFERENCES `Pages` (`PageId`, `PageType`) ON DELETE CASCADE,
  CONSTRAINT `Reports_chk_1` CHECK ((`PageType` = _utf8mb4'R'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`avnadmin`@`%`*/ /*!50003 TRIGGER `before_report_create` BEFORE INSERT ON `Reports` FOR EACH ROW BEGIN
    DECLARE last_id int;

    INSERT INTO Pages(PageType, PageUrl)
        VALUES ('R', 'XYZ');

    SELECT LAST_INSERT_ID() into last_id;

    Set NEW.Id = last_id;

end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Schedules`
--

DROP TABLE IF EXISTS `Schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Schedules` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `Schedules_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Subjects`
--

DROP TABLE IF EXISTS `Subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Subjects` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `PageType` char(1) DEFAULT 'S',
  `Name` varchar(255) NOT NULL,
  `Code` varchar(255) NOT NULL,
  `Credit` int NOT NULL,
  `MajorId` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `Id` (`Id`,`PageType`),
  KEY `MajorId` (`MajorId`),
  CONSTRAINT `Subjects_ibfk_2` FOREIGN KEY (`MajorId`) REFERENCES `Majors` (`Id`),
  CONSTRAINT `Subjects_ibfk_3` FOREIGN KEY (`Id`, `PageType`) REFERENCES `Pages` (`PageId`, `PageType`) ON DELETE CASCADE,
  CONSTRAINT `Subjects_chk_1` CHECK ((`PageType` = _utf8mb4'S'))
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`avnadmin`@`%`*/ /*!50003 TRIGGER `before_subject_create` BEFORE INSERT ON `Subjects` FOR EACH ROW BEGIN
    DECLARE last_id int;

    INSERT INTO Pages(PageType, PageUrl)
        VALUES ('S', 'XYZ');

    SELECT LAST_INSERT_ID() into last_id;

    Set NEW.Id = last_id;

end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `UserLike`
--

DROP TABLE IF EXISTS `UserLike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserLike` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int NOT NULL,
  PRIMARY KEY (`UserId`),
  CONSTRAINT `UserLike_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `UserLikes`
--

DROP TABLE IF EXISTS `UserLikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserLikes` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `CommentId` int NOT NULL,
  `UserId` int NOT NULL,
  `Score` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `CommentId` (`CommentId`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `UserLikes_ibfk_1` FOREIGN KEY (`CommentId`) REFERENCES `Comments` (`Id`),
  CONSTRAINT `UserLikes_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `Users` (`Id`),
  CONSTRAINT `UserLikes_chk_1` CHECK ((`Score` in (_utf8mb4'1',_utf8mb4'-1')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `UserScores`
--

DROP TABLE IF EXISTS `UserScores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserScores` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Score` float NOT NULL,
  `Semester` int NOT NULL,
  `UserId` int NOT NULL,
  `SubjectId` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `UserId` (`UserId`),
  KEY `SubjectId` (`SubjectId`),
  CONSTRAINT `UserScores_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`Id`),
  CONSTRAINT `UserScores_ibfk_2` FOREIGN KEY (`SubjectId`) REFERENCES `Subjects` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `PasswordHash` varchar(255) DEFAULT NULL,
  `Birth` date NOT NULL,
  `StudentId` varchar(255) DEFAULT NULL,
  `Role` int NOT NULL DEFAULT '0',
  `Score` int DEFAULT '0',
  `Credits` int NOT NULL DEFAULT '0',
  `Avatar` text,
  `Status` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `StudentId` (`StudentId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-13 16:51:16
