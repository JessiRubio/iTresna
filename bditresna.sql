-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 25, 2020 at 11:58 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bditresna`
--

-- --------------------------------------------------------

--
-- Table structure for table `t_comentarios`
--

CREATE TABLE `t_comentarios` (
  `cod_comentario` int(11) NOT NULL,
  `cod_senal` int(11) NOT NULL,
  `cod_cop` int(11) NOT NULL,
  `cod_esp` int(11) NOT NULL,
  `cod_org` int(11) NOT NULL,
  `cod_usuario` varchar(32) COLLATE utf8_spanish_ci DEFAULT NULL,
  `comentario` varchar(128) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `t_comentarios`
--

INSERT INTO `t_comentarios` (`cod_comentario`, `cod_senal`, `cod_cop`, `cod_esp`, `cod_org`, `cod_usuario`, `comentario`) VALUES
(1, 5, 1, 1, 1, 'rubiovargas.jessica@gmail.com', NULL),
(1, 8, 2, 1, 1, 'rubiovargas.jessica@gmail.com', '12323rgedfv'),
(1, 10, 2, 1, 1, 'rubiovargas.jessica@gmail.com', NULL),
(1, 11, 3, 1, 1, 'rubiovargas.jessica@gmail.com', 'ddddd'),
(2, 10, 2, 1, 1, 'rubiovargas.jessica@gmail.com', NULL),
(3, 10, 2, 1, 1, 'rubiovargas.jessica@gmail.com', NULL),
(9, 3, 5, 1, 1, 'rubiovargas.jessica@gmail.com', 'hola'),
(10, 3, 5, 1, 1, 'usuario@usuario.com', 'hi');

-- --------------------------------------------------------

--
-- Table structure for table `t_cops`
--

CREATE TABLE `t_cops` (
  `cod_cop` int(11) NOT NULL,
  `cod_esp` int(11) NOT NULL,
  `cod_org` int(11) NOT NULL,
  `desc_cop` varchar(25) COLLATE utf8_spanish_ci DEFAULT NULL,
  `img_cop` varchar(128) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ind_cop_graficos` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `t_cops`
--

INSERT INTO `t_cops` (`cod_cop`, `cod_esp`, `cod_org`, `desc_cop`, `img_cop`, `ind_cop_graficos`) VALUES
(1, 1, 1, 'Señales Relevantes', 'http:\\\\localhost:8080\\media\\Cops\\prueba.png', NULL),
(2, 1, 1, 'Informatica', 'http:\\\\localhost:8080\\media\\Cops\\informatica.png', NULL),
(3, 1, 1, 'Integración Social', 'http:\\\\localhost:8080\\media\\Cops\\integracion_social.png', NULL),
(4, 1, 1, 'Administración y Finanzas', 'http:\\\\localhost:8080\\media\\Cops\\administracion_y_finanzas.svg', NULL),
(5, 1, 1, 'F.O.L.', 'http:\\\\localhost:8080\\media\\Cops\\fol.jpg', NULL),
(6, 2, 1, 'Pre-proyecto', 'http:\\\\localhost:8080\\media\\Cops\\pre_proyecto.png', NULL),
(7, 2, 1, 'Proyecto en curso', 'http:\\\\localhost:8080\\media\\Cops\\proyectos.png', NULL),
(8, 3, 1, 'Plan de Explotación', 'http:\\\\localhost:8080\\media\\Cops\\plan_explotacion.jpg', NULL),
(11, 4, 2, 'Señales Relevantes', 'http:\\\\localhost:8080\\media\\Cops\\senales_relevantes_2.png', NULL),
(12, 4, 2, 'Ibermatica Digital', 'http:\\\\localhost:8080\\media\\Cops\\ibermatica_digital.png', NULL),
(13, 5, 2, 'Pre-proyectos', 'http:\\\\localhost:8080\\media\\Cops\\pre-proyecto2.png', NULL),
(14, 5, 2, 'Proyecto en curso', 'http:\\\\localhost:8080\\media\\Cops\\proyectos2.png', NULL),
(15, 6, 2, 'Plan de Explotación', 'http:\\\\localhost:8080\\media\\Cops\\plan_explotacion2.png', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `t_espacios`
--

CREATE TABLE `t_espacios` (
  `cod_esp` int(11) NOT NULL,
  `cod_org` int(11) NOT NULL,
  `desc_esp` varchar(25) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ind_esp_curacion` tinyint(1) DEFAULT NULL,
  `orden` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `t_espacios`
--

INSERT INTO `t_espacios` (`cod_esp`, `cod_org`, `desc_esp`, `ind_esp_curacion`, `orden`) VALUES
(1, 1, 'Rutina de Innovación', 1, 1),
(2, 1, 'Rutina de Portafolio', 0, 2),
(3, 1, 'Rutina de Explotación', 0, 3),
(4, 2, 'Rutina de Innovación', 1, 1),
(5, 2, 'Rutina de Portafolio', 0, 2),
(6, 2, 'Rutina de Explotación', 0, 3);

-- --------------------------------------------------------

--
-- Table structure for table `t_etiquetas`
--

CREATE TABLE `t_etiquetas` (
  `cod_etiqueta` int(11) NOT NULL,
  `cod_cop` int(11) NOT NULL,
  `cod_esp` int(11) NOT NULL,
  `cod_org` int(11) NOT NULL,
  `desc_etiqueta` varchar(16) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `t_etiquetas`
--

INSERT INTO `t_etiquetas` (`cod_etiqueta`, `cod_cop`, `cod_esp`, `cod_org`, `desc_etiqueta`) VALUES
(1, 2, 1, 1, 'Hardware'),
(2, 2, 1, 1, 'Software'),
(3, 5, 1, 1, 'Nominas'),
(4, 1, 1, 1, 'Interesante'),
(5, 1, 1, 1, 'Química'),
(6, 1, 1, 1, 'Informática'),
(7, 1, 1, 1, 'Cocina'),
(8, 1, 1, 1, 'FOL'),
(16, 3, 1, 1, 'Sociedad'),
(17, 4, 1, 1, 'Finanzas'),
(18, 4, 1, 1, 'Administración'),
(21, 6, 2, 1, 'Información'),
(22, 7, 2, 1, 'Recursos'),
(23, 8, 3, 1, 'Útil'),
(24, 12, 4, 2, 'Software');

-- --------------------------------------------------------

--
-- Table structure for table `t_megusta`
--

CREATE TABLE `t_megusta` (
  `cod_senal` int(11) NOT NULL,
  `cod_cop` int(11) NOT NULL,
  `cod_esp` int(11) NOT NULL,
  `cod_org` int(11) NOT NULL,
  `cod_usuario` varchar(32) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `t_megusta`
--

INSERT INTO `t_megusta` (`cod_senal`, `cod_cop`, `cod_esp`, `cod_org`, `cod_usuario`) VALUES
(3, 5, 1, 1, 'usuario@usuario.com'),
(4, 2, 1, 1, 'rubiovargas.jessica@gmail.com'),
(13, 11, 4, 2, 'jaime.corrales@gmail.com'),
(10, 2, 1, 1, 'rubiovargas.jessica@gmail.com'),
(13, 11, 4, 2, 'usuario@usuario.com');

-- --------------------------------------------------------

--
-- Table structure for table `t_org`
--

CREATE TABLE `t_org` (
  `cod_org` int(11) NOT NULL,
  `desc_org` varchar(25) COLLATE utf8_spanish_ci DEFAULT NULL,
  `img_org` varchar(128) COLLATE utf8_spanish_ci DEFAULT NULL,
  `enlace_org` varchar(128) COLLATE utf8_spanish_ci DEFAULT NULL,
  `eslogan_org` varchar(128) COLLATE utf8_spanish_ci DEFAULT NULL,
  `clasif1` varchar(32) COLLATE utf8_spanish_ci NOT NULL,
  `clasif2` varchar(32) COLLATE utf8_spanish_ci NOT NULL,
  `clasif3` varchar(32) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `t_org`
--

INSERT INTO `t_org` (`cod_org`, `desc_org`, `img_org`, `enlace_org`, `eslogan_org`, `clasif1`, `clasif2`, `clasif3`) VALUES
(1, 'FP Txurdinaga', 'http://localhost:8080/media/1/logo_1.png', 'http://www.fptxurdinaga.hezkuntza.net', 'Gaurko eta biharko profesionalak prestatzen', 'Departamento', 'Edad', 'horas semanas'),
(2, 'Ibermatica', 'http://localhost:8080/media/2/logo_2.png', 'https://ibermatica.com', 'Ponemos la tecnología y el talento al servicio de tu organización', 'Puesto', 'Salario', 'fecha_ingreso');

-- --------------------------------------------------------

--
-- Table structure for table `t_permisos`
--

CREATE TABLE `t_permisos` (
  `cod_usuario` varchar(32) COLLATE utf8_spanish_ci NOT NULL,
  `cod_cop` int(11) NOT NULL,
  `cod_esp` int(11) NOT NULL,
  `cod_org` int(11) NOT NULL,
  `ind_admin` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `t_permisos`
--

INSERT INTO `t_permisos` (`cod_usuario`, `cod_cop`, `cod_esp`, `cod_org`, `ind_admin`) VALUES
('jaime.corrales@gmail.com', 1, 1, 1, NULL),
('usuario@usuario.com', 11, 4, 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `t_senales`
--

CREATE TABLE `t_senales` (
  `cod_senal` int(11) NOT NULL,
  `cod_cop` int(11) NOT NULL,
  `cod_esp` int(11) NOT NULL,
  `cod_org` int(11) NOT NULL,
  `cod_etiqueta` int(11) DEFAULT NULL,
  `cod_usuario` varchar(32) COLLATE utf8_spanish_ci DEFAULT NULL,
  `desc_senal` varchar(128) COLLATE utf8_spanish_ci DEFAULT NULL,
  `enlace` varchar(128) COLLATE utf8_spanish_ci DEFAULT NULL,
  `fecha_hora` date DEFAULT current_timestamp(),
  `ind_fich_gest` tinyint(4) DEFAULT NULL,
  `titulo` varchar(256) COLLATE utf8_spanish_ci NOT NULL,
  `img_senal` varchar(128) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `t_senales`
--

INSERT INTO `t_senales` (`cod_senal`, `cod_cop`, `cod_esp`, `cod_org`, `cod_etiqueta`, `cod_usuario`, `desc_senal`, `enlace`, `fecha_hora`, `ind_fich_gest`, `titulo`, `img_senal`) VALUES
(3, 5, 1, 1, 3, 'jaime.corrales@gmail.com', 'noticia', 'https://github.com/', '2019-12-10', NULL, '', ''),
(4, 2, 1, 1, 2, 'jonanderdecastro@gmail.com', 'noticia', 'https://github.com/', '2019-11-20', NULL, '', ''),
(5, 1, 1, 1, 6, 'usuario@usuario.com', 'noticia', 'https://github.com/', '2019-12-21', NULL, '', ''),
(6, 5, 1, 1, 3, 'rubiovargas.jessica@gmail.com', 'noticia', 'https://github.com/', '2019-11-11', NULL, '', ''),
(7, 12, 4, 2, 24, 'unaimarg@gmail.com', 'noticia', 'https://github.com/', '2020-01-14', NULL, '', ''),
(8, 2, 1, 1, 2, 'usuario@usuario.com', 'noticia', 'https://github.com/', '2019-12-23', NULL, '', ''),
(9, 2, 1, 1, 1, 'rubiovargas.jessica@gmail.com', 'noticia', 'https://github.com/', '2019-12-13', NULL, '', ''),
(10, 2, 1, 1, 1, 'jonanderdecastro@gmail.com', 'noticias', 'https://github.com/', '2019-12-01', NULL, '', ''),
(11, 3, 1, 1, 16, 'rubiovargas.jessica@gmail.com', 'noticia', 'https://github.com/', '2020-02-13', NULL, '', ''),
(12, 8, 3, 1, 4, 'usuario@usuario.com', 'noticia', 'https://github.com/', '2019-12-13', NULL, '', ''),
(13, 11, 4, 2, 24, 'rubiovargas.jessica@gmail.com', 'noticia', 'https://github.com/', '2019-12-30', NULL, '', ''),
(19, 2, 1, 1, 1, 'rubiovargas.jessica@gmail.com', 'qegqerg', 'https://github.com/', NULL, NULL, '', NULL),
(20, 2, 1, 1, 2, 'rubiovargas.jessica@gmail.com', 'ergqerg', 'https://github.com/', NULL, NULL, '', NULL),
(21, 2, 1, 1, 2, 'rubiovargas.jessica@gmail.com', 'He aqui un controlador de versiones', 'https://github.com/', NULL, NULL, '', NULL),
(22, 2, 1, 1, 1, 'rubiovargas.jessica@gmail.com', 'blablacar', 'https://stackoverflow.com/questions/698914/how-can-i-access-the-mysql-command-line-with-xampp-for-windows', '2020-02-25', NULL, '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `t_tip_clasificacion`
--

CREATE TABLE `t_tip_clasificacion` (
  `cod_org` int(11) NOT NULL,
  `cod_tip` int(1) NOT NULL,
  `tip_clasificacion` varchar(32) COLLATE utf8_spanish2_ci NOT NULL,
  `categoria` varchar(32) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `t_tip_clasificacion`
--

INSERT INTO `t_tip_clasificacion` (`cod_org`, `cod_tip`, `tip_clasificacion`, `categoria`) VALUES
(1, 1, 'Departamento', 'Matematicas'),
(1, 1, 'Departamento', 'Informatica'),
(1, 1, 'Departamento', 'Kimika'),
(1, 2, 'Edad', '18<x<25'),
(1, 1, 'Departamento', 'F.O.L'),
(1, 2, 'Edad', '25<x<30'),
(1, 2, 'Edad', '30<x<45'),
(1, 2, 'Edad', '45<x'),
(2, 1, 'Puesto', 'Analista'),
(2, 1, 'Puesto', 'Programador junior'),
(2, 1, 'Puesto', 'Programador señor'),
(2, 1, 'Puesto', 'Jefe de equipo'),
(2, 2, 'Sueldo', 'x<1000'),
(2, 2, 'Sueldo', '1000<x<1500'),
(2, 2, 'Sueldo', '1500<x<2000'),
(2, 2, 'Sueldo', '2000<x<3000'),
(2, 2, 'Sueldo', '3000<x<5000'),
(2, 2, 'Sueldo', '5000<x');

-- --------------------------------------------------------

--
-- Table structure for table `t_tip_usuario`
--

CREATE TABLE `t_tip_usuario` (
  `tip_usuario` int(11) NOT NULL,
  `desc_usuario` varchar(33) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `t_tip_usuario`
--

INSERT INTO `t_tip_usuario` (`tip_usuario`, `desc_usuario`) VALUES
(1, 'Administrador de una Organización'),
(2, 'Usuario de una organización'),
(3, 'Usuario de una Organización');

-- --------------------------------------------------------

--
-- Table structure for table `t_tip_variable`
--

CREATE TABLE `t_tip_variable` (
  `tip_variable` int(11) NOT NULL,
  `desc_variable` varchar(32) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `t_tip_variable`
--

INSERT INTO `t_tip_variable` (`tip_variable`, `desc_variable`) VALUES
(1, 'Recurso económicos'),
(2, 'Recursos horarios'),
(3, 'Impacto y Urgencia'),
(4, 'Incertidumbre'),
(5, 'Carácter Innovador');

-- --------------------------------------------------------

--
-- Table structure for table `t_url_senal`
--

CREATE TABLE `t_url_senal` (
  `cod_enlace` int(11) NOT NULL,
  `cod_senal` int(11) NOT NULL,
  `cod_cop` int(11) NOT NULL,
  `cod_esp` int(11) NOT NULL,
  `cod_org` int(11) NOT NULL,
  `enlace` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `t_usuarios`
--

CREATE TABLE `t_usuarios` (
  `cod_usuario` varchar(32) COLLATE utf8_spanish_ci NOT NULL,
  `tip_usuario` int(11) DEFAULT NULL,
  `cod_org` int(11) DEFAULT NULL,
  `sarbidea` varchar(16) COLLATE utf8_spanish_ci DEFAULT NULL,
  `nombre` varchar(32) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ape1` varchar(32) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ape2` varchar(32) COLLATE utf8_spanish_ci DEFAULT NULL,
  `campo_clasificador1` varchar(40) COLLATE utf8_spanish_ci DEFAULT NULL,
  `campo_clasificador2` varchar(40) COLLATE utf8_spanish_ci DEFAULT NULL,
  `campo_clasificador3` varchar(40) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `t_usuarios`
--

INSERT INTO `t_usuarios` (`cod_usuario`, `tip_usuario`, `cod_org`, `sarbidea`, `nombre`, `ape1`, `ape2`, `campo_clasificador1`, `campo_clasificador2`, `campo_clasificador3`) VALUES
('jaime.corrales@gmail.com', 1, NULL, 'jaime123', 'Jaime', 'Corrales', 'Petralanda', '', '', ''),
('jonanderdecastro@gmail.com', 3, 1, '12345678', 'Jon Ander', 'De Castro', 'Da Silva', 'Matematicas', '19', ''),
('rubiovargas.jessica@gmail.com', 2, 1, '12345678', 'Jessica', 'Rubio', 'Vargas', 'Informatica', '22', ''),
('unaimarg@gmail.com', 2, 2, '12345678', 'Unai', 'Martin', 'Gonzalez', 'Jefe de Equipo', '2000', ''),
('usuario@usuario.com', 3, 2, '12345678', 'Usuario', '', '', 'Programador', '1000', '');

-- --------------------------------------------------------

--
-- Table structure for table `t_variable`
--

CREATE TABLE `t_variable` (
  `cod_senal` int(11) NOT NULL,
  `cod_cop` int(11) NOT NULL,
  `cod_esp` int(11) NOT NULL,
  `cod_org` int(11) NOT NULL,
  `tip_variable` int(11) DEFAULT NULL,
  `val_variable` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `t_variable`
--

INSERT INTO `t_variable` (`cod_senal`, `cod_cop`, `cod_esp`, `cod_org`, `tip_variable`, `val_variable`) VALUES
(4, 2, 1, 1, 3, 23),
(6, 5, 1, 1, 5, 66),
(13, 11, 4, 2, 1, 50);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `t_comentarios`
--
ALTER TABLE `t_comentarios`
  ADD PRIMARY KEY (`cod_comentario`,`cod_senal`,`cod_cop`,`cod_esp`,`cod_org`),
  ADD KEY `fk_t_comentario_senal` (`cod_senal`,`cod_cop`,`cod_esp`,`cod_org`),
  ADD KEY `fp_comentario_usuario` (`cod_usuario`);

--
-- Indexes for table `t_cops`
--
ALTER TABLE `t_cops`
  ADD PRIMARY KEY (`cod_cop`,`cod_esp`,`cod_org`),
  ADD KEY `fk_t_cops` (`cod_esp`,`cod_org`);

--
-- Indexes for table `t_espacios`
--
ALTER TABLE `t_espacios`
  ADD PRIMARY KEY (`cod_esp`,`cod_org`),
  ADD KEY `fk_t_espacios` (`cod_org`);

--
-- Indexes for table `t_etiquetas`
--
ALTER TABLE `t_etiquetas`
  ADD PRIMARY KEY (`cod_etiqueta`,`cod_cop`,`cod_esp`,`cod_org`),
  ADD KEY `fk_t_etiquetas` (`cod_cop`,`cod_esp`,`cod_org`);

--
-- Indexes for table `t_megusta`
--
ALTER TABLE `t_megusta`
  ADD KEY `fk_t_meguta_usuario` (`cod_usuario`),
  ADD KEY `cod_senal` (`cod_senal`,`cod_cop`,`cod_esp`,`cod_org`) USING BTREE;

--
-- Indexes for table `t_org`
--
ALTER TABLE `t_org`
  ADD PRIMARY KEY (`cod_org`);

--
-- Indexes for table `t_permisos`
--
ALTER TABLE `t_permisos`
  ADD PRIMARY KEY (`cod_usuario`,`cod_cop`,`cod_esp`,`cod_org`),
  ADD KEY `fk_t_permisos_cop` (`cod_cop`,`cod_esp`,`cod_org`);

--
-- Indexes for table `t_senales`
--
ALTER TABLE `t_senales`
  ADD PRIMARY KEY (`cod_senal`,`cod_cop`,`cod_esp`,`cod_org`),
  ADD KEY `fk_t_senales_cop` (`cod_cop`,`cod_esp`,`cod_org`),
  ADD KEY `fk_t_senales_usuario` (`cod_usuario`),
  ADD KEY `fk_t_senales_etiqueta` (`cod_etiqueta`);

--
-- Indexes for table `t_tip_usuario`
--
ALTER TABLE `t_tip_usuario`
  ADD PRIMARY KEY (`tip_usuario`);

--
-- Indexes for table `t_tip_variable`
--
ALTER TABLE `t_tip_variable`
  ADD PRIMARY KEY (`tip_variable`);

--
-- Indexes for table `t_url_senal`
--
ALTER TABLE `t_url_senal`
  ADD PRIMARY KEY (`cod_enlace`,`cod_senal`,`cod_cop`,`cod_esp`,`cod_org`),
  ADD KEY `FK_URL_SENAL` (`cod_senal`,`cod_cop`,`cod_esp`,`cod_org`);

--
-- Indexes for table `t_usuarios`
--
ALTER TABLE `t_usuarios`
  ADD PRIMARY KEY (`cod_usuario`),
  ADD KEY `fK_t_usuario_tip` (`tip_usuario`),
  ADD KEY `fk_t_usuario_org` (`cod_org`);

--
-- Indexes for table `t_variable`
--
ALTER TABLE `t_variable`
  ADD PRIMARY KEY (`cod_senal`,`cod_cop`,`cod_esp`,`cod_org`),
  ADD KEY `fk_variable_tipo` (`tip_variable`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `t_comentarios`
--
ALTER TABLE `t_comentarios`
  MODIFY `cod_comentario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `t_cops`
--
ALTER TABLE `t_cops`
  MODIFY `cod_cop` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `t_espacios`
--
ALTER TABLE `t_espacios`
  MODIFY `cod_esp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `t_etiquetas`
--
ALTER TABLE `t_etiquetas`
  MODIFY `cod_etiqueta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `t_org`
--
ALTER TABLE `t_org`
  MODIFY `cod_org` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `t_senales`
--
ALTER TABLE `t_senales`
  MODIFY `cod_senal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `t_tip_usuario`
--
ALTER TABLE `t_tip_usuario`
  MODIFY `tip_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `t_tip_variable`
--
ALTER TABLE `t_tip_variable`
  MODIFY `tip_variable` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `t_comentarios`
--
ALTER TABLE `t_comentarios`
  ADD CONSTRAINT `fk_comentario_usuario` FOREIGN KEY (`cod_usuario`) REFERENCES `t_usuarios` (`cod_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_t_comentario_senal` FOREIGN KEY (`cod_senal`,`cod_cop`,`cod_esp`,`cod_org`) REFERENCES `t_senales` (`cod_senal`, `cod_cop`, `cod_esp`, `cod_org`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `t_cops`
--
ALTER TABLE `t_cops`
  ADD CONSTRAINT `fk_t_cops` FOREIGN KEY (`cod_esp`,`cod_org`) REFERENCES `t_espacios` (`cod_esp`, `cod_org`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `t_espacios`
--
ALTER TABLE `t_espacios`
  ADD CONSTRAINT `fk_t_espacios` FOREIGN KEY (`cod_org`) REFERENCES `t_org` (`cod_org`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `t_etiquetas`
--
ALTER TABLE `t_etiquetas`
  ADD CONSTRAINT `fk_t_etiquetas` FOREIGN KEY (`cod_cop`,`cod_esp`,`cod_org`) REFERENCES `t_cops` (`cod_cop`, `cod_esp`, `cod_org`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `t_megusta`
--
ALTER TABLE `t_megusta`
  ADD CONSTRAINT `fk_t_megusta_senal` FOREIGN KEY (`cod_senal`,`cod_cop`,`cod_esp`,`cod_org`) REFERENCES `t_senales` (`cod_senal`, `cod_cop`, `cod_esp`, `cod_org`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_t_meguta_usuario` FOREIGN KEY (`cod_usuario`) REFERENCES `t_usuarios` (`cod_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `t_permisos`
--
ALTER TABLE `t_permisos`
  ADD CONSTRAINT `fk_t_permisos_USUARIO` FOREIGN KEY (`cod_usuario`) REFERENCES `t_usuarios` (`cod_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_t_permisos_cop` FOREIGN KEY (`cod_cop`,`cod_esp`,`cod_org`) REFERENCES `t_cops` (`cod_cop`, `cod_esp`, `cod_org`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `t_senales`
--
ALTER TABLE `t_senales`
  ADD CONSTRAINT `fk_t_senales_cop` FOREIGN KEY (`cod_cop`,`cod_esp`,`cod_org`) REFERENCES `t_cops` (`cod_cop`, `cod_esp`, `cod_org`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_t_senales_etiqueta` FOREIGN KEY (`cod_etiqueta`) REFERENCES `t_etiquetas` (`cod_etiqueta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_t_senales_usuario` FOREIGN KEY (`cod_usuario`) REFERENCES `t_usuarios` (`cod_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `t_url_senal`
--
ALTER TABLE `t_url_senal`
  ADD CONSTRAINT `FK_URL_SENAL` FOREIGN KEY (`cod_senal`,`cod_cop`,`cod_esp`,`cod_org`) REFERENCES `t_senales` (`cod_senal`, `cod_cop`, `cod_esp`, `cod_org`);

--
-- Constraints for table `t_usuarios`
--
ALTER TABLE `t_usuarios`
  ADD CONSTRAINT `fK_t_usuario_tip` FOREIGN KEY (`tip_usuario`) REFERENCES `t_tip_usuario` (`tip_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_t_usuario_org` FOREIGN KEY (`cod_org`) REFERENCES `t_org` (`cod_org`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `t_variable`
--
ALTER TABLE `t_variable`
  ADD CONSTRAINT `fk_t_variable_senal` FOREIGN KEY (`cod_senal`,`cod_cop`,`cod_esp`,`cod_org`) REFERENCES `t_senales` (`cod_senal`, `cod_cop`, `cod_esp`, `cod_org`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_variable_tipo` FOREIGN KEY (`tip_variable`) REFERENCES `t_tip_variable` (`tip_variable`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
