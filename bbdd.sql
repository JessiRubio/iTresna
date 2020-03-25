-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-03-2020 a las 09:16:01
-- Versión del servidor: 10.4.8-MariaDB
-- Versión de PHP: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `itresna_itresna`
--
DROP DATABASE IF EXISTS `itresna_itresna`;
CREATE DATABASE IF NOT EXISTS `itresna_itresna` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `itresna_itresna`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_clasificacion`
--

DROP TABLE IF EXISTS `t_clasificacion`;
CREATE TABLE `t_clasificacion` (
  `cod_org` int(11) NOT NULL,
  `clasificacion` varchar(64) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `t_clasificacion`
--

INSERT INTO `t_clasificacion` (`cod_org`, `clasificacion`) VALUES
(1, 'Departamento'),
(1, 'Edad'),
(1, 'Hora Semana'),
(2, 'Fecha Ingreso'),
(2, 'Puesto'),
(2, 'Salario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_clasificacion_usuarios`
--

DROP TABLE IF EXISTS `t_clasificacion_usuarios`;
CREATE TABLE `t_clasificacion_usuarios` (
  `cod_org` int(11) NOT NULL,
  `tip_clasificacion` varchar(64) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `categoria` varchar(32) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `cod_usuario` varchar(32) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `t_clasificacion_usuarios`
--

INSERT INTO `t_clasificacion_usuarios` (`cod_org`, `tip_clasificacion`, `categoria`, `cod_usuario`) VALUES
(1, 'Departamento', 'Infor', 'rubiovargas.jessica@gmail.com'),
(1, 'Departamento', 'Matematicas', 'jonanderdecastro@gmail.com'),
(1, 'Edad', '<25', 'jonanderdecastro@gmail.com'),
(1, 'Hora Semana', '15', 'jonanderdecastro@gmail.com'),
(2, 'Fecha Ingreso', '2010', 'unaimarg@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_comentarios`
--

DROP TABLE IF EXISTS `t_comentarios`;
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
-- Volcado de datos para la tabla `t_comentarios`
--

INSERT INTO `t_comentarios` (`cod_comentario`, `cod_senal`, `cod_cop`, `cod_esp`, `cod_org`, `cod_usuario`, `comentario`) VALUES
(1, 2, 1, 1, 1, 'rubiovargas.jessica@gmail.com', 'wow');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_cops`
--

DROP TABLE IF EXISTS `t_cops`;
CREATE TABLE `t_cops` (
  `cod_cop` int(11) NOT NULL,
  `cod_esp` int(11) NOT NULL,
  `cod_org` int(11) NOT NULL,
  `desc_cop` varchar(25) COLLATE utf8_spanish_ci DEFAULT NULL,
  `img_cop` varchar(128) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ind_cop_graficos` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `t_cops`
--

INSERT INTO `t_cops` (`cod_cop`, `cod_esp`, `cod_org`, `desc_cop`, `img_cop`, `ind_cop_graficos`) VALUES
(1, 1, 1, 'Señales Relevantes', 'http://localhost:8080/media/1/1/logo_1.png', NULL),
(1, 5, 1, 'Cop de pruebas', NULL, NULL),
(2, 1, 1, 'Informatica', 'http://itresna.fptxurdinaga.in/media/Cops/informatica.png', NULL),
(3, 1, 1, 'Integración Social', 'http://itresna.fptxurdinaga.in/media/Cops/integracion_social.png', NULL),
(3, 5, 1, 'qwqqqqqqqqqqqqqqqqqq', NULL, NULL),
(4, 1, 1, 'Administración y Finanzas', 'http://itresna.fptxurdinaga.in/media/Cops/administracion_y_finanzas.svg', NULL),
(5, 1, 1, 'F.O.L.', 'http://itresna.fptxurdinaga.in/media/Cops/fol.jpg', NULL),
(6, 2, 1, 'Pre-proyecto', 'http://itresna.fptxurdinaga.in/media/Cops/pre_proyecto.png', NULL),
(7, 2, 1, 'Proyecto en curso', 'http://itresna.fptxurdinaga.in/media/Cops/proyectos.png', NULL),
(11, 4, 2, 'Señales Relevantes', 'http://itresna.fptxurdinaga.in/media/Cops/senales_relevantes_2.png', NULL),
(12, 4, 2, 'Ibermatica Digital', 'http://itresna.fptxurdinaga.in/media/Cops/ibermatica_digital.png', NULL),
(13, 5, 2, 'Pre-proyectos', 'http://itresna.fptxurdinaga.in/media/Cops/pre-proyecto2.png', NULL),
(14, 5, 2, 'Proyecto en curso', 'http://itresna.fptxurdinaga.in/media/Cops/proyectos2.png', NULL),
(15, 6, 2, 'Plan de Explotación', 'http://itresna.fptxurdinaga.in/media/Cops/plan_explotacion2.png', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_espacios`
--

DROP TABLE IF EXISTS `t_espacios`;
CREATE TABLE `t_espacios` (
  `cod_esp` int(11) NOT NULL,
  `cod_org` int(11) NOT NULL,
  `desc_esp` varchar(25) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ind_esp_curacion` tinyint(1) DEFAULT NULL,
  `orden` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `t_espacios`
--

INSERT INTO `t_espacios` (`cod_esp`, `cod_org`, `desc_esp`, `ind_esp_curacion`, `orden`) VALUES
(1, 1, 'Rutina de Innovación', 1, 1),
(2, 1, 'Rutina de Portafolio', 0, 2),
(3, 1, 'Rutina de Explotación', 0, 3),
(4, 2, 'Rutina de Innovación', 1, 1),
(5, 1, 'Espacio para pruebas', 1, 5),
(5, 2, 'Rutina de Portafolio', 0, 2),
(6, 2, 'Rutina de Explotación', 0, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_etiquetas`
--

DROP TABLE IF EXISTS `t_etiquetas`;
CREATE TABLE `t_etiquetas` (
  `cod_etiqueta` int(11) NOT NULL,
  `cod_cop` int(11) NOT NULL,
  `cod_esp` int(11) NOT NULL,
  `cod_org` int(11) NOT NULL,
  `desc_etiqueta` varchar(16) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `t_etiquetas`
--

INSERT INTO `t_etiquetas` (`cod_etiqueta`, `cod_cop`, `cod_esp`, `cod_org`, `desc_etiqueta`) VALUES
(1, 1, 5, 1, 'Etiqueta 1'),
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
(24, 12, 4, 2, 'Software');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_megusta`
--

DROP TABLE IF EXISTS `t_megusta`;
CREATE TABLE `t_megusta` (
  `cod_senal` int(11) NOT NULL,
  `cod_cop` int(11) NOT NULL,
  `cod_esp` int(11) NOT NULL,
  `cod_org` int(11) NOT NULL,
  `cod_usuario` varchar(32) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `t_megusta`
--

INSERT INTO `t_megusta` (`cod_senal`, `cod_cop`, `cod_esp`, `cod_org`, `cod_usuario`) VALUES
(7, 2, 1, 1, 'innovacion@fptxurdinaga.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_org`
--

DROP TABLE IF EXISTS `t_org`;
CREATE TABLE `t_org` (
  `cod_org` int(11) NOT NULL,
  `desc_org` varchar(25) COLLATE utf8_spanish_ci DEFAULT NULL,
  `img_org` varchar(128) COLLATE utf8_spanish_ci DEFAULT NULL,
  `enlace_org` varchar(128) COLLATE utf8_spanish_ci DEFAULT NULL,
  `eslogan_org` varchar(128) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `t_org`
--

INSERT INTO `t_org` (`cod_org`, `desc_org`, `img_org`, `enlace_org`, `eslogan_org`) VALUES
(1, 'FP Txurdinaga', 'http://localhost:8080/media/1/logo_1.png', 'http://www.fptxurdinaga.hezkuntza.net', 'Gaurko eta biharko profesionalak prestatzen'),
(2, 'Ibermatica S.A.', 'http://itresna.fptxurdinaga.in/media/Org/LogoIbermatica.png', 'https://ibermatica.com', 'Ponemos la tecnología y el talento al servicio de tu organización');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_permisos`
--

DROP TABLE IF EXISTS `t_permisos`;
CREATE TABLE `t_permisos` (
  `cod_usuario` varchar(32) COLLATE utf8_spanish_ci NOT NULL,
  `cod_cop` int(11) NOT NULL,
  `cod_esp` int(11) NOT NULL,
  `cod_org` int(11) NOT NULL,
  `ind_admin` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `t_permisos`
--

INSERT INTO `t_permisos` (`cod_usuario`, `cod_cop`, `cod_esp`, `cod_org`, `ind_admin`) VALUES
('innovacion@fptxurdinaga.com', 2, 1, 1, 1),
('jaime.corrales@gmail.com', 1, 1, 1, NULL),
('jcp1@gmail.com', 2, 1, 1, 1),
('jonanderdecastro@gmail.com', 4, 1, 1, 0),
('usuario@usuario.com', 11, 4, 2, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_senales`
--

DROP TABLE IF EXISTS `t_senales`;
CREATE TABLE `t_senales` (
  `cod_senal` int(11) NOT NULL,
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
  `titulo` varchar(128) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `t_senales`
--

INSERT INTO `t_senales` (`cod_senal`, `cod_cop`, `cod_esp`, `cod_org`, `cod_etiqueta`, `cod_usuario`, `desc_senal`, `enlace`, `fecha_hora`, `ind_fich_gest`, `img_senal`, `titulo`) VALUES
(1, 1, 1, 1, 4, 'jonanderdecastro@gmail.com', 'es muy fdf', 'https', '2020-03-05 12:32:12', NULL, 'https', 'infor: Mola'),
(1, 3, 1, 1, 16, 'rubiovargas.jessica@gmail.com', 'p1', 'https://cadenaser.com/ser/2020/03/05/television/1583403446_539273.html', '2020-03-05 12:00:00', NULL, 'https://cadenaser00.epimg.net/ser/imagenes/2020/03/05/television/1583403446_539273_1583403670_rrss_normal.jpg', 'La última de \'Sálvame\': frivoliza con el coronavirus y le llueven las críticas'),
(2, 1, 1, 1, 4, 'rubiovargas.jessica@gmail.com', 'es deddedf', 'https', '2020-03-10 07:15:28', NULL, 'https', 'infor: relevante'),
(2, 2, 1, 1, 1, 'jonanderdecastro@gmail.com', 'murcia ddasda', 'https://www.xataka.com/medicina-y-salud/murciano-que-invento-psicotecnico-carne-conducir-hace-su-agosto-coronavirus', '2020-03-06 12:24:27', NULL, 'https://i.blogs.es/7e507b/cleancall-d/840_560.jpg', 'El murciano que inventó el psicotécnico del carné de conducir hace su agosto con la prevención del coronavirus'),
(3, 2, 1, 1, 2, 'jonanderdecastro@gmail.com', 'google', 'https://www.xataka.com/analisis/google-titan-security-key-analisis-anadir-capa-extra-seguridad-a-nuestras-cuentas-sencillo-como-', '2020-03-06 12:25:15', NULL, 'https://i.blogs.es/ee5ab8/llaves-seguridad-titan-6-/840_560.jpg', 'Google Titan Security Key, análisis: añadir una capa extra de seguridad a nuestras cuentas es tan sencillo como parece'),
(4, 2, 1, 1, 1, 'jonanderdecastro@gmail.com', 'coches', 'https://www.xataka.com/vehiculos/estamos-regulando-coches-electricos-hagan-ruido-nada-impide-que-peatones-usen-auriculares-cance', '2020-03-06 12:26:00', NULL, 'https://i.blogs.es/18f90c/tesla/840_560.jpg', 'Estamos regulando los coches eléctricos para que hagan ruido, pero nada impide que los peatones usen auriculares con cancelación'),
(7, 2, 1, 1, 1, 'innovacion@fptxurdinaga.com', 'Descripción de la Señal II', 'https://www.flimper.com/blog/es/que-es-open-graph-y-como-se-hace', '2020-03-09 19:47:29', NULL, 'https://www.flimper.com/hubfs/BLOG/3.png#keepProtocol', '¿Qué es Open Graph y Cómo se hace?');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_tip_clasificacion`
--

DROP TABLE IF EXISTS `t_tip_clasificacion`;
CREATE TABLE `t_tip_clasificacion` (
  `cod_org` int(11) NOT NULL,
  `tip_clasificacion` varchar(64) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `categoria` varchar(32) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `t_tip_clasificacion`
--

INSERT INTO `t_tip_clasificacion` (`cod_org`, `tip_clasificacion`, `categoria`) VALUES
(1, 'Departamento', 'Infor'),
(1, 'Departamento', 'Matematicas'),
(1, 'Edad', '<25'),
(1, 'Edad', '25<x<50'),
(1, 'Hora Semana', '15'),
(1, 'Hora Semana', '20'),
(2, 'Fecha Ingreso', '2000'),
(2, 'Fecha Ingreso', '2010'),
(2, 'Fecha Ingreso', '2020'),
(2, 'Puesto', 'Analista'),
(2, 'Puesto', 'Programador'),
(2, 'Salario', '<16000'),
(2, 'Salario', '16000<x<20000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_tip_usuario`
--

DROP TABLE IF EXISTS `t_tip_usuario`;
CREATE TABLE `t_tip_usuario` (
  `tip_usuario` int(11) NOT NULL,
  `desc_usuario` varchar(33) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `t_tip_usuario`
--

INSERT INTO `t_tip_usuario` (`tip_usuario`, `desc_usuario`) VALUES
(1, 'Administrador de una Organización'),
(2, 'Usuario de una organización'),
(3, 'Usuario de una Organización');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_tip_variable`
--

DROP TABLE IF EXISTS `t_tip_variable`;
CREATE TABLE `t_tip_variable` (
  `tip_variable` int(11) NOT NULL,
  `desc_variable` varchar(32) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `t_tip_variable`
--

INSERT INTO `t_tip_variable` (`tip_variable`, `desc_variable`) VALUES
(1, 'Recurso económicos'),
(2, 'Recursos horarios'),
(3, 'Impacto y Urgencia'),
(4, 'Incertidumbre'),
(5, 'Carácter Innovador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_usuarios`
--

DROP TABLE IF EXISTS `t_usuarios`;
CREATE TABLE `t_usuarios` (
  `cod_usuario` varchar(32) COLLATE utf8_spanish_ci NOT NULL,
  `tip_usuario` int(11) DEFAULT NULL,
  `cod_org` int(11) DEFAULT NULL,
  `sarbidea` varchar(16) COLLATE utf8_spanish_ci DEFAULT NULL,
  `nombre` varchar(32) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ape1` varchar(32) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ape2` varchar(32) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `t_usuarios`
--

INSERT INTO `t_usuarios` (`cod_usuario`, `tip_usuario`, `cod_org`, `sarbidea`, `nombre`, `ape1`, `ape2`) VALUES
('innovacion@fptxurdinaga.com', 3, 1, '1234', 'Innovación', 'Corrales', 'Pet'),
('jaime.corrales@gmail.com', 1, NULL, 'jaime123', 'Jaime', 'Corrales', 'Petralanda'),
('jcp1@gmail.com', 3, 1, '1111', 'Jaime1', '111111', '222222222'),
('jonanderdecastro@gmail.com', 3, 1, '12345678', 'Jon Ander', 'De Castro', 'Da Silva'),
('rubiovargas.jessica@gmail.com', 2, 1, '12345678', 'Jessica', 'Rubio', 'Vargas'),
('unaimarg@gmail.com', 2, 2, '12345678', 'Unai', 'Martin', 'Gonzalez'),
('usuario@usuario.com', 3, 2, '12345678', 'Usuario', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_variable`
--

DROP TABLE IF EXISTS `t_variable`;
CREATE TABLE `t_variable` (
  `cod_senal` int(11) NOT NULL,
  `cod_cop` int(11) NOT NULL,
  `cod_esp` int(11) NOT NULL,
  `cod_org` int(11) NOT NULL,
  `tip_variable` int(11) DEFAULT NULL,
  `val_variable` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `t_clasificacion`
--
ALTER TABLE `t_clasificacion`
  ADD PRIMARY KEY (`cod_org`,`clasificacion`);

--
-- Indices de la tabla `t_clasificacion_usuarios`
--
ALTER TABLE `t_clasificacion_usuarios`
  ADD PRIMARY KEY (`cod_org`,`tip_clasificacion`,`categoria`,`cod_usuario`),
  ADD KEY `cod_usuario` (`cod_usuario`);

--
-- Indices de la tabla `t_comentarios`
--
ALTER TABLE `t_comentarios`
  ADD PRIMARY KEY (`cod_comentario`,`cod_senal`,`cod_cop`,`cod_esp`,`cod_org`),
  ADD KEY `fk_t_comentario_senal` (`cod_senal`,`cod_cop`,`cod_esp`,`cod_org`),
  ADD KEY `fp_comentario_usuario` (`cod_usuario`);

--
-- Indices de la tabla `t_cops`
--
ALTER TABLE `t_cops`
  ADD PRIMARY KEY (`cod_cop`,`cod_esp`,`cod_org`),
  ADD KEY `fk_t_cops` (`cod_esp`,`cod_org`);

--
-- Indices de la tabla `t_espacios`
--
ALTER TABLE `t_espacios`
  ADD PRIMARY KEY (`cod_esp`,`cod_org`),
  ADD KEY `fk_t_espacios` (`cod_org`);

--
-- Indices de la tabla `t_etiquetas`
--
ALTER TABLE `t_etiquetas`
  ADD PRIMARY KEY (`cod_etiqueta`,`cod_cop`,`cod_esp`,`cod_org`),
  ADD KEY `fk_t_etiquetas` (`cod_cop`,`cod_esp`,`cod_org`);

--
-- Indices de la tabla `t_megusta`
--
ALTER TABLE `t_megusta`
  ADD KEY `fk_t_meguta_usuario` (`cod_usuario`),
  ADD KEY `cod_senal` (`cod_senal`,`cod_cop`,`cod_esp`,`cod_org`) USING BTREE;

--
-- Indices de la tabla `t_org`
--
ALTER TABLE `t_org`
  ADD PRIMARY KEY (`cod_org`);

--
-- Indices de la tabla `t_permisos`
--
ALTER TABLE `t_permisos`
  ADD PRIMARY KEY (`cod_usuario`,`cod_cop`,`cod_esp`,`cod_org`),
  ADD KEY `fk_t_permisos_cop` (`cod_cop`,`cod_esp`,`cod_org`);

--
-- Indices de la tabla `t_senales`
--
ALTER TABLE `t_senales`
  ADD PRIMARY KEY (`cod_senal`,`cod_cop`,`cod_esp`,`cod_org`),
  ADD KEY `fk_t_senales_cop` (`cod_cop`,`cod_esp`,`cod_org`),
  ADD KEY `fk_t_senales_usuario` (`cod_usuario`),
  ADD KEY `fk_t_senales_etiqueta` (`cod_etiqueta`);

--
-- Indices de la tabla `t_tip_clasificacion`
--
ALTER TABLE `t_tip_clasificacion`
  ADD PRIMARY KEY (`cod_org`,`tip_clasificacion`,`categoria`);

--
-- Indices de la tabla `t_tip_usuario`
--
ALTER TABLE `t_tip_usuario`
  ADD PRIMARY KEY (`tip_usuario`);

--
-- Indices de la tabla `t_tip_variable`
--
ALTER TABLE `t_tip_variable`
  ADD PRIMARY KEY (`tip_variable`);

--
-- Indices de la tabla `t_usuarios`
--
ALTER TABLE `t_usuarios`
  ADD PRIMARY KEY (`cod_usuario`),
  ADD KEY `fK_t_usuario_tip` (`tip_usuario`),
  ADD KEY `fk_t_usuario_org` (`cod_org`);

--
-- Indices de la tabla `t_variable`
--
ALTER TABLE `t_variable`
  ADD PRIMARY KEY (`cod_senal`,`cod_cop`,`cod_esp`,`cod_org`),
  ADD KEY `fk_variable_tipo` (`tip_variable`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `t_comentarios`
--
ALTER TABLE `t_comentarios`
  MODIFY `cod_comentario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `t_cops`
--
ALTER TABLE `t_cops`
  MODIFY `cod_cop` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `t_espacios`
--
ALTER TABLE `t_espacios`
  MODIFY `cod_esp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `t_etiquetas`
--
ALTER TABLE `t_etiquetas`
  MODIFY `cod_etiqueta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `t_org`
--
ALTER TABLE `t_org`
  MODIFY `cod_org` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `t_senales`
--
ALTER TABLE `t_senales`
  MODIFY `cod_senal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `t_tip_usuario`
--
ALTER TABLE `t_tip_usuario`
  MODIFY `tip_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `t_tip_variable`
--
ALTER TABLE `t_tip_variable`
  MODIFY `tip_variable` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `t_clasificacion`
--
ALTER TABLE `t_clasificacion`
  ADD CONSTRAINT `t_clasificacion_ibfk_1` FOREIGN KEY (`cod_org`) REFERENCES `t_org` (`cod_org`),
  ADD CONSTRAINT `t_clasificacion_ibfk_2` FOREIGN KEY (`cod_org`) REFERENCES `t_org` (`cod_org`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `t_clasificacion_usuarios`
--
ALTER TABLE `t_clasificacion_usuarios`
  ADD CONSTRAINT `t_clasificacion_usuarios_ibfk_1` FOREIGN KEY (`cod_usuario`) REFERENCES `t_usuarios` (`cod_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `t_clasificacion_usuarios_ibfk_2` FOREIGN KEY (`cod_org`,`tip_clasificacion`,`categoria`) REFERENCES `t_tip_clasificacion` (`cod_org`, `tip_clasificacion`, `categoria`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `t_comentarios`
--
ALTER TABLE `t_comentarios`
  ADD CONSTRAINT `fk_comentario_usuario` FOREIGN KEY (`cod_usuario`) REFERENCES `t_usuarios` (`cod_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_t_comentario_senal` FOREIGN KEY (`cod_senal`,`cod_cop`,`cod_esp`,`cod_org`) REFERENCES `t_senales` (`cod_senal`, `cod_cop`, `cod_esp`, `cod_org`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `t_cops`
--
ALTER TABLE `t_cops`
  ADD CONSTRAINT `fk_t_cops` FOREIGN KEY (`cod_esp`,`cod_org`) REFERENCES `t_espacios` (`cod_esp`, `cod_org`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `t_espacios`
--
ALTER TABLE `t_espacios`
  ADD CONSTRAINT `fk_t_espacios` FOREIGN KEY (`cod_org`) REFERENCES `t_org` (`cod_org`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `t_etiquetas`
--
ALTER TABLE `t_etiquetas`
  ADD CONSTRAINT `fk_t_etiquetas` FOREIGN KEY (`cod_cop`,`cod_esp`,`cod_org`) REFERENCES `t_cops` (`cod_cop`, `cod_esp`, `cod_org`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `t_megusta`
--
ALTER TABLE `t_megusta`
  ADD CONSTRAINT `fk_t_megusta_senal` FOREIGN KEY (`cod_senal`,`cod_cop`,`cod_esp`,`cod_org`) REFERENCES `t_senales` (`cod_senal`, `cod_cop`, `cod_esp`, `cod_org`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_t_meguta_usuario` FOREIGN KEY (`cod_usuario`) REFERENCES `t_usuarios` (`cod_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `t_permisos`
--
ALTER TABLE `t_permisos`
  ADD CONSTRAINT `fk_t_permisos_USUARIO` FOREIGN KEY (`cod_usuario`) REFERENCES `t_usuarios` (`cod_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_t_permisos_cop` FOREIGN KEY (`cod_cop`,`cod_esp`,`cod_org`) REFERENCES `t_cops` (`cod_cop`, `cod_esp`, `cod_org`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `t_senales`
--
ALTER TABLE `t_senales`
  ADD CONSTRAINT `fk_t_senales_cop` FOREIGN KEY (`cod_cop`,`cod_esp`,`cod_org`) REFERENCES `t_cops` (`cod_cop`, `cod_esp`, `cod_org`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_t_senales_etiqueta` FOREIGN KEY (`cod_etiqueta`) REFERENCES `t_etiquetas` (`cod_etiqueta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_t_senales_usuario` FOREIGN KEY (`cod_usuario`) REFERENCES `t_usuarios` (`cod_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `t_tip_clasificacion`
--
ALTER TABLE `t_tip_clasificacion`
  ADD CONSTRAINT `t_tip_clasificacion_ibfk_1` FOREIGN KEY (`cod_org`,`tip_clasificacion`) REFERENCES `t_clasificacion` (`cod_org`, `clasificacion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `t_usuarios`
--
ALTER TABLE `t_usuarios`
  ADD CONSTRAINT `fK_t_usuario_tip` FOREIGN KEY (`tip_usuario`) REFERENCES `t_tip_usuario` (`tip_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_t_usuario_org` FOREIGN KEY (`cod_org`) REFERENCES `t_org` (`cod_org`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `t_variable`
--
ALTER TABLE `t_variable`
  ADD CONSTRAINT `fk_t_variable_senal` FOREIGN KEY (`cod_senal`,`cod_cop`,`cod_esp`,`cod_org`) REFERENCES `t_senales` (`cod_senal`, `cod_cop`, `cod_esp`, `cod_org`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_variable_tipo` FOREIGN KEY (`tip_variable`) REFERENCES `t_tip_variable` (`tip_variable`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
