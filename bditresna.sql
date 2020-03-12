-- MariaDB dump 10.17  Distrib 10.4.8-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: itresna_itresna
-- ------------------------------------------------------
-- Server version	10.4.8-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `itresna_itresna`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `itresna_itresna` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `itresna_itresna`;

--
-- Table structure for table `t_clasificacion`
--

DROP TABLE IF EXISTS `t_clasificacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_clasificacion` (
  `cod_org` int(11) NOT NULL,
  `clasificacion` varchar(64) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`cod_org`,`clasificacion`),
  CONSTRAINT `t_clasificacion_ibfk_1` FOREIGN KEY (`cod_org`) REFERENCES `t_org` (`cod_org`),
  CONSTRAINT `t_clasificacion_ibfk_2` FOREIGN KEY (`cod_org`) REFERENCES `t_org` (`cod_org`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_clasificacion`
--

LOCK TABLES `t_clasificacion` WRITE;
/*!40000 ALTER TABLE `t_clasificacion` DISABLE KEYS */;
INSERT INTO `t_clasificacion` VALUES (1,'Departamento'),(1,'Edad'),(1,'Hora Semana'),(2,'Fecha Ingreso'),(2,'Puesto'),(2,'Salario');
/*!40000 ALTER TABLE `t_clasificacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_clasificacion_usuarios`
--

DROP TABLE IF EXISTS `t_clasificacion_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_clasificacion_usuarios` (
  `cod_org` int(11) NOT NULL,
  `tip_clasificacion` varchar(64) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `categoria` varchar(32) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `cod_usuario` varchar(32) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`cod_org`,`tip_clasificacion`,`categoria`,`cod_usuario`),
  KEY `cod_usuario` (`cod_usuario`),
  CONSTRAINT `t_clasificacion_usuarios_ibfk_1` FOREIGN KEY (`cod_usuario`) REFERENCES `t_usuarios` (`cod_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `t_clasificacion_usuarios_ibfk_2` FOREIGN KEY (`cod_org`, `tip_clasificacion`, `categoria`) REFERENCES `t_tip_clasificacion` (`cod_org`, `tip_clasificacion`, `categoria`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_clasificacion_usuarios`
--

LOCK TABLES `t_clasificacion_usuarios` WRITE;
/*!40000 ALTER TABLE `t_clasificacion_usuarios` DISABLE KEYS */;
INSERT INTO `t_clasificacion_usuarios` VALUES (1,'Departamento','Informatica','rubiovargas.jessica@gmail.com'),(1,'Departamento','Matematicas','jonanderdecastro@gmail.com'),(1,'Edad','<25','jonanderdecastro@gmail.com'),(1,'Hora Semana','15','jonanderdecastro@gmail.com'),(2,'Fecha Ingreso','2010','unaimarg@gmail.com');
/*!40000 ALTER TABLE `t_clasificacion_usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_comentarios`
--

DROP TABLE IF EXISTS `t_comentarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_comentarios` (
  `cod_comentario` int(11) NOT NULL AUTO_INCREMENT,
  `cod_senal` int(11) NOT NULL,
  `cod_cop` int(11) NOT NULL,
  `cod_esp` int(11) NOT NULL,
  `cod_org` int(11) NOT NULL,
  `cod_usuario` varchar(32) COLLATE utf8_spanish_ci DEFAULT NULL,
  `comentario` varchar(128) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`cod_comentario`,`cod_senal`,`cod_cop`,`cod_esp`,`cod_org`),
  KEY `fk_t_comentario_senal` (`cod_senal`,`cod_cop`,`cod_esp`,`cod_org`),
  KEY `fp_comentario_usuario` (`cod_usuario`),
  CONSTRAINT `fk_comentario_usuario` FOREIGN KEY (`cod_usuario`) REFERENCES `t_usuarios` (`cod_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_t_comentario_senal` FOREIGN KEY (`cod_senal`, `cod_cop`, `cod_esp`, `cod_org`) REFERENCES `t_senales` (`cod_senal`, `cod_cop`, `cod_esp`, `cod_org`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_comentarios`
--

LOCK TABLES `t_comentarios` WRITE;
/*!40000 ALTER TABLE `t_comentarios` DISABLE KEYS */;
INSERT INTO `t_comentarios` VALUES (1,2,1,1,1,'rubiovargas.jessica@gmail.com','wow');
/*!40000 ALTER TABLE `t_comentarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_cops`
--

DROP TABLE IF EXISTS `t_cops`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_cops` (
  `cod_cop` int(11) NOT NULL AUTO_INCREMENT,
  `cod_esp` int(11) NOT NULL,
  `cod_org` int(11) NOT NULL,
  `desc_cop` varchar(25) COLLATE utf8_spanish_ci DEFAULT NULL,
  `img_cop` varchar(128) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ind_cop_graficos` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`cod_cop`,`cod_esp`,`cod_org`),
  KEY `fk_t_cops` (`cod_esp`,`cod_org`),
  CONSTRAINT `fk_t_cops` FOREIGN KEY (`cod_esp`, `cod_org`) REFERENCES `t_espacios` (`cod_esp`, `cod_org`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_cops`
--

LOCK TABLES `t_cops` WRITE;
/*!40000 ALTER TABLE `t_cops` DISABLE KEYS */;
INSERT INTO `t_cops` VALUES (1,1,1,'Señales Relevantes','http://localhost:8080/media/1/1/logo_1.png',NULL),(1,5,1,'Cop de pruebas',NULL,NULL),(2,1,1,'Informatica','http://itresna.fptxurdinaga.in/media/Cops/informatica.png',NULL),(3,1,1,'Integración Social','http://itresna.fptxurdinaga.in/media/Cops/integracion_social.png',NULL),(3,5,1,'qwqqqqqqqqqqqqqqqqqq',NULL,NULL),(4,1,1,'Administración y Finanzas','http://itresna.fptxurdinaga.in/media/Cops/administracion_y_finanzas.svg',NULL),(5,1,1,'F.O.L.','http://itresna.fptxurdinaga.in/media/Cops/fol.jpg',NULL),(6,2,1,'Pre-proyecto','http://itresna.fptxurdinaga.in/media/Cops/pre_proyecto.png',NULL),(7,2,1,'Proyecto en curso','http://itresna.fptxurdinaga.in/media/Cops/proyectos.png',NULL),(11,4,2,'Señales Relevantes','http://itresna.fptxurdinaga.in/media/Cops/senales_relevantes_2.png',NULL),(12,4,2,'Ibermatica Digital','http://itresna.fptxurdinaga.in/media/Cops/ibermatica_digital.png',NULL),(13,5,2,'Pre-proyectos','http://itresna.fptxurdinaga.in/media/Cops/pre-proyecto2.png',NULL),(14,5,2,'Proyecto en curso','http://itresna.fptxurdinaga.in/media/Cops/proyectos2.png',NULL),(15,6,2,'Plan de Explotación','http://itresna.fptxurdinaga.in/media/Cops/plan_explotacion2.png',NULL);
/*!40000 ALTER TABLE `t_cops` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_espacios`
--

DROP TABLE IF EXISTS `t_espacios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_espacios` (
  `cod_esp` int(11) NOT NULL AUTO_INCREMENT,
  `cod_org` int(11) NOT NULL,
  `desc_esp` varchar(25) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ind_esp_curacion` tinyint(1) DEFAULT NULL,
  `orden` int(2) NOT NULL,
  PRIMARY KEY (`cod_esp`,`cod_org`),
  KEY `fk_t_espacios` (`cod_org`),
  CONSTRAINT `fk_t_espacios` FOREIGN KEY (`cod_org`) REFERENCES `t_org` (`cod_org`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_espacios`
--

LOCK TABLES `t_espacios` WRITE;
/*!40000 ALTER TABLE `t_espacios` DISABLE KEYS */;
INSERT INTO `t_espacios` VALUES (1,1,'Rutina de Innovación',1,1),(2,1,'Rutina de Portafolio',0,2),(3,1,'Rutina de Explotación',0,3),(4,2,'Rutina de Innovación',1,1),(5,1,'Espacio para pruebas',1,5),(5,2,'Rutina de Portafolio',0,2),(6,2,'Rutina de Explotación',0,3);
/*!40000 ALTER TABLE `t_espacios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_etiquetas`
--

DROP TABLE IF EXISTS `t_etiquetas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_etiquetas` (
  `cod_etiqueta` int(11) NOT NULL AUTO_INCREMENT,
  `cod_cop` int(11) NOT NULL,
  `cod_esp` int(11) NOT NULL,
  `cod_org` int(11) NOT NULL,
  `desc_etiqueta` varchar(16) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`cod_etiqueta`,`cod_cop`,`cod_esp`,`cod_org`),
  KEY `fk_t_etiquetas` (`cod_cop`,`cod_esp`,`cod_org`),
  CONSTRAINT `fk_t_etiquetas` FOREIGN KEY (`cod_cop`, `cod_esp`, `cod_org`) REFERENCES `t_cops` (`cod_cop`, `cod_esp`, `cod_org`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_etiquetas`
--

LOCK TABLES `t_etiquetas` WRITE;
/*!40000 ALTER TABLE `t_etiquetas` DISABLE KEYS */;
INSERT INTO `t_etiquetas` VALUES (1,1,5,1,'Etiqueta 1'),(1,2,1,1,'Hardware'),(2,2,1,1,'Software'),(3,5,1,1,'Nominas'),(4,1,1,1,'Interesante'),(5,1,1,1,'Química'),(6,1,1,1,'Informática'),(7,1,1,1,'Cocina'),(8,1,1,1,'FOL'),(16,3,1,1,'Sociedad'),(17,4,1,1,'Finanzas'),(18,4,1,1,'Administración'),(21,6,2,1,'Información'),(22,7,2,1,'Recursos'),(24,12,4,2,'Software');
/*!40000 ALTER TABLE `t_etiquetas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_megusta`
--

DROP TABLE IF EXISTS `t_megusta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_megusta` (
  `cod_senal` int(11) NOT NULL,
  `cod_cop` int(11) NOT NULL,
  `cod_esp` int(11) NOT NULL,
  `cod_org` int(11) NOT NULL,
  `cod_usuario` varchar(32) COLLATE utf8_spanish_ci DEFAULT NULL,
  KEY `fk_t_meguta_usuario` (`cod_usuario`),
  KEY `cod_senal` (`cod_senal`,`cod_cop`,`cod_esp`,`cod_org`) USING BTREE,
  CONSTRAINT `fk_t_megusta_senal` FOREIGN KEY (`cod_senal`, `cod_cop`, `cod_esp`, `cod_org`) REFERENCES `t_senales` (`cod_senal`, `cod_cop`, `cod_esp`, `cod_org`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_t_meguta_usuario` FOREIGN KEY (`cod_usuario`) REFERENCES `t_usuarios` (`cod_usuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_megusta`
--

LOCK TABLES `t_megusta` WRITE;
/*!40000 ALTER TABLE `t_megusta` DISABLE KEYS */;
INSERT INTO `t_megusta` VALUES (7,2,1,1,'innovacion@fptxurdinaga.com');
/*!40000 ALTER TABLE `t_megusta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_org`
--

DROP TABLE IF EXISTS `t_org`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_org` (
  `cod_org` int(11) NOT NULL AUTO_INCREMENT,
  `desc_org` varchar(25) COLLATE utf8_spanish_ci DEFAULT NULL,
  `img_org` varchar(128) COLLATE utf8_spanish_ci DEFAULT NULL,
  `enlace_org` varchar(128) COLLATE utf8_spanish_ci DEFAULT NULL,
  `eslogan_org` varchar(128) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`cod_org`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_org`
--

LOCK TABLES `t_org` WRITE;
/*!40000 ALTER TABLE `t_org` DISABLE KEYS */;
INSERT INTO `t_org` VALUES (1,'FP Txurdinaga','http://localhost:8080/media/1/logo_1.png','http://www.fptxurdinaga.hezkuntza.net','Gaurko eta biharko profesionalak prestatzen'),(2,'Ibermatica S.A.','http://itresna.fptxurdinaga.in/media/Org/LogoIbermatica.png','https://ibermatica.com','Ponemos la tecnología y el talento al servicio de tu organización');
/*!40000 ALTER TABLE `t_org` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_permisos`
--

DROP TABLE IF EXISTS `t_permisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_permisos` (
  `cod_usuario` varchar(32) COLLATE utf8_spanish_ci NOT NULL,
  `cod_cop` int(11) NOT NULL,
  `cod_esp` int(11) NOT NULL,
  `cod_org` int(11) NOT NULL,
  `ind_admin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`cod_usuario`,`cod_cop`,`cod_esp`,`cod_org`),
  KEY `fk_t_permisos_cop` (`cod_cop`,`cod_esp`,`cod_org`),
  CONSTRAINT `fk_t_permisos_USUARIO` FOREIGN KEY (`cod_usuario`) REFERENCES `t_usuarios` (`cod_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_t_permisos_cop` FOREIGN KEY (`cod_cop`, `cod_esp`, `cod_org`) REFERENCES `t_cops` (`cod_cop`, `cod_esp`, `cod_org`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_permisos`
--

LOCK TABLES `t_permisos` WRITE;
/*!40000 ALTER TABLE `t_permisos` DISABLE KEYS */;
INSERT INTO `t_permisos` VALUES ('innovacion@fptxurdinaga.com',2,1,1,1),('jaime.corrales@gmail.com',1,1,1,NULL),('jcp1@gmail.com',2,1,1,1),('jonanderdecastro@gmail.com',4,1,1,0),('usuario@usuario.com',11,4,2,0);
/*!40000 ALTER TABLE `t_permisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_senales`
--

DROP TABLE IF EXISTS `t_senales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_senales` (
  `cod_senal` int(11) NOT NULL AUTO_INCREMENT,
  `cod_cop` int(11) NOT NULL,
  `cod_esp` int(11) NOT NULL,
  `cod_org` int(11) NOT NULL,
  `cod_etiqueta` int(11) DEFAULT NULL,
  `cod_usuario` varchar(32) COLLATE utf8_spanish_ci DEFAULT NULL,
  `desc_senal` varchar(128) COLLATE utf8_spanish_ci DEFAULT NULL,
  `enlace` varchar(128) COLLATE utf8_spanish_ci DEFAULT NULL,
  `fecha_hora` timestamp NULL DEFAULT current_timestamp(),
  `ind_fich_gest` tinyint(4) DEFAULT NULL,
  `img_senal` varchar(128) COLLATE utf8_spanish_ci DEFAULT NULL,
  `titulo` varchar(128) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`cod_senal`,`cod_cop`,`cod_esp`,`cod_org`),
  KEY `fk_t_senales_cop` (`cod_cop`,`cod_esp`,`cod_org`),
  KEY `fk_t_senales_usuario` (`cod_usuario`),
  KEY `fk_t_senales_etiqueta` (`cod_etiqueta`),
  CONSTRAINT `fk_t_senales_cop` FOREIGN KEY (`cod_cop`, `cod_esp`, `cod_org`) REFERENCES `t_cops` (`cod_cop`, `cod_esp`, `cod_org`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_t_senales_etiqueta` FOREIGN KEY (`cod_etiqueta`) REFERENCES `t_etiquetas` (`cod_etiqueta`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_t_senales_usuario` FOREIGN KEY (`cod_usuario`) REFERENCES `t_usuarios` (`cod_usuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_senales`
--

LOCK TABLES `t_senales` WRITE;
/*!40000 ALTER TABLE `t_senales` DISABLE KEYS */;
INSERT INTO `t_senales` VALUES (1,1,1,1,4,'jonanderdecastro@gmail.com','es muy fdf','https','2020-03-05 12:32:12',NULL,'https','infor: Mola'),(1,3,1,1,16,'rubiovargas.jessica@gmail.com','p1','https://cadenaser.com/ser/2020/03/05/television/1583403446_539273.html','2020-03-05 12:00:00',NULL,'https://cadenaser00.epimg.net/ser/imagenes/2020/03/05/television/1583403446_539273_1583403670_rrss_normal.jpg','La última de \'Sálvame\': frivoliza con el coronavirus y le llueven las críticas'),(2,1,1,1,4,'rubiovargas.jessica@gmail.com','es deddedf','https','2020-03-10 07:15:28',NULL,'https','infor: relevante'),(2,2,1,1,1,'jonanderdecastro@gmail.com','murcia ddasda','https://www.xataka.com/medicina-y-salud/murciano-que-invento-psicotecnico-carne-conducir-hace-su-agosto-coronavirus','2020-03-06 12:24:27',NULL,'https://i.blogs.es/7e507b/cleancall-d/840_560.jpg','El murciano que inventó el psicotécnico del carné de conducir hace su agosto con la prevención del coronavirus'),(3,2,1,1,2,'jonanderdecastro@gmail.com','google','https://www.xataka.com/analisis/google-titan-security-key-analisis-anadir-capa-extra-seguridad-a-nuestras-cuentas-sencillo-como-','2020-03-06 12:25:15',NULL,'https://i.blogs.es/ee5ab8/llaves-seguridad-titan-6-/840_560.jpg','Google Titan Security Key, análisis: añadir una capa extra de seguridad a nuestras cuentas es tan sencillo como parece'),(4,2,1,1,1,'jonanderdecastro@gmail.com','coches','https://www.xataka.com/vehiculos/estamos-regulando-coches-electricos-hagan-ruido-nada-impide-que-peatones-usen-auriculares-cance','2020-03-06 12:26:00',NULL,'https://i.blogs.es/18f90c/tesla/840_560.jpg','Estamos regulando los coches eléctricos para que hagan ruido, pero nada impide que los peatones usen auriculares con cancelación'),(7,2,1,1,1,'innovacion@fptxurdinaga.com','Descripción de la Señal II','https://www.flimper.com/blog/es/que-es-open-graph-y-como-se-hace','2020-03-09 19:47:29',NULL,'https://www.flimper.com/hubfs/BLOG/3.png#keepProtocol','¿Qué es Open Graph y Cómo se hace?');
/*!40000 ALTER TABLE `t_senales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_tip_clasificacion`
--

DROP TABLE IF EXISTS `t_tip_clasificacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_tip_clasificacion` (
  `cod_org` int(11) NOT NULL,
  `tip_clasificacion` varchar(64) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `categoria` varchar(32) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`cod_org`,`tip_clasificacion`,`categoria`),
  CONSTRAINT `t_tip_clasificacion_ibfk_1` FOREIGN KEY (`cod_org`, `tip_clasificacion`) REFERENCES `t_clasificacion` (`cod_org`, `clasificacion`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_tip_clasificacion`
--

LOCK TABLES `t_tip_clasificacion` WRITE;
/*!40000 ALTER TABLE `t_tip_clasificacion` DISABLE KEYS */;
INSERT INTO `t_tip_clasificacion` VALUES (1,'Departamento','Informatica'),(1,'Departamento','Matematicas'),(1,'Edad','<25'),(1,'Edad','25<x<50'),(1,'Hora Semana','15'),(1,'Hora Semana','20'),(2,'Fecha Ingreso','2000'),(2,'Fecha Ingreso','2010'),(2,'Fecha Ingreso','2020'),(2,'Puesto','Analista'),(2,'Puesto','Programador'),(2,'Salario','<16000'),(2,'Salario','16000<x<20000');
/*!40000 ALTER TABLE `t_tip_clasificacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_tip_usuario`
--

DROP TABLE IF EXISTS `t_tip_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_tip_usuario` (
  `tip_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `desc_usuario` varchar(33) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`tip_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_tip_usuario`
--

LOCK TABLES `t_tip_usuario` WRITE;
/*!40000 ALTER TABLE `t_tip_usuario` DISABLE KEYS */;
INSERT INTO `t_tip_usuario` VALUES (1,'Administrador de una Organización'),(2,'Usuario de una organización'),(3,'Usuario de una Organización');
/*!40000 ALTER TABLE `t_tip_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_tip_variable`
--

DROP TABLE IF EXISTS `t_tip_variable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_tip_variable` (
  `tip_variable` int(11) NOT NULL AUTO_INCREMENT,
  `desc_variable` varchar(32) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`tip_variable`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_tip_variable`
--

LOCK TABLES `t_tip_variable` WRITE;
/*!40000 ALTER TABLE `t_tip_variable` DISABLE KEYS */;
INSERT INTO `t_tip_variable` VALUES (1,'Recurso económicos'),(2,'Recursos horarios'),(3,'Impacto y Urgencia'),(4,'Incertidumbre'),(5,'Carácter Innovador');
/*!40000 ALTER TABLE `t_tip_variable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_usuarios`
--

DROP TABLE IF EXISTS `t_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_usuarios` (
  `cod_usuario` varchar(32) COLLATE utf8_spanish_ci NOT NULL,
  `tip_usuario` int(11) DEFAULT NULL,
  `cod_org` int(11) DEFAULT NULL,
  `sarbidea` varchar(16) COLLATE utf8_spanish_ci DEFAULT NULL,
  `nombre` varchar(32) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ape1` varchar(32) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ape2` varchar(32) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`cod_usuario`),
  KEY `fK_t_usuario_tip` (`tip_usuario`),
  KEY `fk_t_usuario_org` (`cod_org`),
  CONSTRAINT `fK_t_usuario_tip` FOREIGN KEY (`tip_usuario`) REFERENCES `t_tip_usuario` (`tip_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_t_usuario_org` FOREIGN KEY (`cod_org`) REFERENCES `t_org` (`cod_org`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_usuarios`
--

LOCK TABLES `t_usuarios` WRITE;
/*!40000 ALTER TABLE `t_usuarios` DISABLE KEYS */;
INSERT INTO `t_usuarios` VALUES ('innovacion@fptxurdinaga.com',3,1,'1234','Innovación','Corrales','Pet'),('jaime.corrales@gmail.com',1,NULL,'jaime123','Jaime','Corrales','Petralanda'),('jcp1@gmail.com',3,1,'1111','Jaime1','111111','222222222'),('jonanderdecastro@gmail.com',3,1,'12345678','Jon Ander','De Castro','Da Silva'),('rubiovargas.jessica@gmail.com',2,1,'12345678','Jessica','Rubio','Vargas'),('unaimarg@gmail.com',2,2,'12345678','Unai','Martin','Gonzalez'),('usuario@usuario.com',3,2,'12345678','Usuario','','');
/*!40000 ALTER TABLE `t_usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_variable`
--

DROP TABLE IF EXISTS `t_variable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_variable` (
  `cod_senal` int(11) NOT NULL,
  `cod_cop` int(11) NOT NULL,
  `cod_esp` int(11) NOT NULL,
  `cod_org` int(11) NOT NULL,
  `tip_variable` int(11) DEFAULT NULL,
  `val_variable` int(11) DEFAULT NULL,
  PRIMARY KEY (`cod_senal`,`cod_cop`,`cod_esp`,`cod_org`),
  KEY `fk_variable_tipo` (`tip_variable`),
  CONSTRAINT `fk_t_variable_senal` FOREIGN KEY (`cod_senal`, `cod_cop`, `cod_esp`, `cod_org`) REFERENCES `t_senales` (`cod_senal`, `cod_cop`, `cod_esp`, `cod_org`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_variable_tipo` FOREIGN KEY (`tip_variable`) REFERENCES `t_tip_variable` (`tip_variable`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_variable`
--

LOCK TABLES `t_variable` WRITE;
/*!40000 ALTER TABLE `t_variable` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_variable` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-12 15:36:12
