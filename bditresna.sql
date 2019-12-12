-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-12-2019 a las 16:07:06
-- Versión del servidor: 10.4.8-MariaDB
-- Versión de PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bditresna`
--
DROP DATABASE bditresna;
CREATE DATABASE bditresna;
USE bditresna;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_comentarios`
--

CREATE TABLE `t_comentarios` (
  `cod_org` decimal(9,0) NOT NULL,
  `cod_esp` decimal(2,0) NOT NULL,
  `cod_cop` decimal(2,0) NOT NULL,
  `cod_senal` decimal(2,0) NOT NULL,
  `cod_usuario` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `cod_comentario` varchar(9) COLLATE utf8_spanish_ci NOT NULL,
  `comentario` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `t_comentarios`
--

INSERT INTO `t_comentarios` (`cod_org`, `cod_esp`, `cod_cop`, `cod_senal`, `cod_usuario`, `cod_comentario`, `comentario`) VALUES
('15763', '1', '1', '51', 'usu-05@org1.com', '', 'aaaaaaaaaaaaaaa'),
('15763', '1', '2', '61', 'usu-05@org1.com', '', 'bbbb bbbbb'),
('15763', '2', '1', '71', 'usu-03@org1.com', '', 'ccc ccc ccc'),
('15763', '2', '2', '81', 'usu-03@org1.com', '', 'dddd ddddd dddd dd'),
('15763', '3', '1', '91', 'usu-05@org1.com', '', 'eeee'),
('444555', '1', '0', '12', 'usu-01@org2.com', '', 'ffffffffffffff'),
('444555', '1', '2', '22', 'usu-01@org2.com', '', 'mdmdmdmdm I dkldk'),
('444555', '1', '5', '32', 'usu-04@org2.com', '', 'ajkhdjkah sdah sdhakjdfhajk fh'),
('444555', '1', '5', '42', 'usu-04@org2.com', '', 'cdfsgarsa safdegdrae ggadref gare'),
('444555', '1', '5', '52', 'usu-04@org2.com', '', 'ooooooooooooooooooorrr rrrr'),
('444555', '2', '1', '62', 'usu-04@org2.com', '', 'drfsgoiwesdhguewfewuifuv eufewui ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_cops`
--

CREATE TABLE `t_cops` (
  `cod_cop` decimal(2,0) NOT NULL,
  `cod_org` decimal(9,0) NOT NULL,
  `cod_esp` decimal(2,0) NOT NULL,
  `desc_cop` varchar(25) COLLATE utf8_spanish_ci DEFAULT NULL,
  `img_cop` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ind_cop_graficos` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `t_cops`
--

INSERT INTO `t_cops` (`cod_cop`, `cod_org`, `cod_esp`, `desc_cop`, `img_cop`, `ind_cop_graficos`) VALUES
('0', '15763', '1', 'Señales Relevantes ORG1', NULL, 0),
('0', '444555', '1', 'Señales Relevantes ORG2', NULL, 0),
('1', '15763', '1', 'Informática', NULL, 0),
('1', '15763', '2', 'Pre-proyectos ORG1', NULL, 1),
('1', '15763', '3', 'Plan de Explotación ORG1', NULL, 0),
('1', '444555', '2', 'Pre-Proyecto ORG2', NULL, 1),
('1', '444555', '3', 'Plan de explotación ORG2', NULL, 0),
('2', '15763', '1', 'Kimika', NULL, 0),
('2', '15763', '2', 'Poyectos en curso ORG1', NULL, 0),
('2', '444555', '1', 'Administración y finanzas', NULL, 0),
('2', '444555', '2', 'Proyectos en curso ORG2', NULL, 0),
('5', '444555', '1', 'Integración social', NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_espacios`
--

CREATE TABLE `t_espacios` (
  `cod_esp` decimal(2,0) NOT NULL,
  `cod_org` decimal(9,0) NOT NULL,
  `desc_esp` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ind_esp_curacion` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `t_espacios`
--

INSERT INTO `t_espacios` (`cod_esp`, `cod_org`, `desc_esp`, `ind_esp_curacion`) VALUES
('1', '15763', 'Rutina de Innovación ORG1', 1),
('1', '444555', 'Rutina de Innovación ORG2', 1),
('2', '15763', 'Rutina de Portafolio ORG1', 0),
('2', '444555', 'Rutina de Portafolio ORG2', 0),
('3', '15763', 'Rutina de Explotación ORG1', 0),
('3', '444555', 'Rutina de Explotación ORG2', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_etiquetas`
--

CREATE TABLE `t_etiquetas` (
  `cod_etiqueta` decimal(2,0) NOT NULL,
  `cod_org` decimal(9,0) NOT NULL,
  `cod_esp` decimal(2,0) NOT NULL,
  `cod_cop` decimal(2,0) NOT NULL,
  `desc_etiqueta` varchar(15) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `t_etiquetas`
--

INSERT INTO `t_etiquetas` (`cod_etiqueta`, `cod_org`, `cod_esp`, `cod_cop`, `desc_etiqueta`) VALUES
('0', '15763', '1', '0', 'General'),
('0', '444555', '1', '0', 'General'),
('0', '15763', '1', '1', 'General'),
('0', '15763', '1', '2', 'General'),
('0', '444555', '1', '2', 'General'),
('0', '444555', '1', '5', 'General'),
('0', '15763', '2', '1', 'General'),
('0', '444555', '2', '1', 'General'),
('0', '15763', '2', '2', 'General'),
('0', '444555', '2', '2', 'General'),
('0', '15763', '3', '1', 'General'),
('0', '444555', '3', '1', 'General'),
('1', '15763', '1', '1', 'Software'),
('1', '444555', '1', '5', 'Ayudas domicili'),
('2', '15763', '1', '1', 'Hardware'),
('2', '444555', '1', '5', 'Domótica'),
('3', '15763', '1', '1', 'Realidad Virtua');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_megusta`
--

CREATE TABLE `t_megusta` (
  `cod_usuario` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `cod_org` decimal(9,0) NOT NULL,
  `cod_esp` decimal(2,0) NOT NULL,
  `cod_cop` decimal(2,0) NOT NULL,
  `cod_senal` decimal(2,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `t_megusta`
--

INSERT INTO `t_megusta` (`cod_usuario`, `cod_org`, `cod_esp`, `cod_cop`, `cod_senal`) VALUES
('usu-01@org2.com', '444555', '1', '0', '12'),
('usu-01@org2.com', '444555', '1', '2', '22'),
('usu-03@org1.com', '15763', '2', '1', '71'),
('usu-03@org1.com', '15763', '2', '2', '81'),
('usu-04@org2.com', '444555', '1', '5', '32'),
('usu-04@org2.com', '444555', '1', '5', '42'),
('usu-04@org2.com', '444555', '1', '5', '52'),
('usu-04@org2.com', '444555', '2', '1', '62'),
('usu-05@org1.com', '15763', '1', '1', '51'),
('usu-05@org1.com', '15763', '1', '2', '61'),
('usu-05@org1.com', '15763', '3', '1', '91');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_org`
--

CREATE TABLE `t_org` (
  `cod_org` decimal(8,0) NOT NULL,
  `desc_org` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `t_org`
--

INSERT INTO `t_org` (`cod_org`, `desc_org`) VALUES
('15763', 'Primera Organización Pruebas 15763'),
('444555', 'Segunda Organización Pruebas 44555');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_permisos`
--

CREATE TABLE `t_permisos` (
  `cod_usuario` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `cod_org` decimal(9,0) NOT NULL,
  `cod_esp` decimal(2,0) NOT NULL,
  `cod_cop` decimal(2,0) NOT NULL,
  `ind_admin` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `t_permisos`
--

INSERT INTO `t_permisos` (`cod_usuario`, `cod_org`, `cod_esp`, `cod_cop`, `ind_admin`) VALUES
('usu-01@org1.com', '15763', '1', '0', 0),
('usu-01@org2.com', '444555', '1', '0', 0),
('usu-02@org1.com', '15763', '1', '0', 0),
('usu-02@org1.com', '15763', '1', '1', 0),
('usu-02@org1.com', '15763', '1', '2', 0),
('usu-02@org1.com', '15763', '2', '2', 0),
('usu-02@org2.com', '444555', '1', '0', 0),
('usu-02@org2.com', '444555', '1', '1', 0),
('usu-02@org2.com', '444555', '1', '2', 0),
('usu-02@org2.com', '444555', '2', '2', 0),
('usu-03@org1.com', '15763', '1', '0', 0),
('usu-03@org1.com', '15763', '1', '3', 1),
('usu-03@org1.com', '15763', '2', '1', 0),
('usu-03@org2.com', '444555', '1', '0', 0),
('usu-03@org2.com', '444555', '1', '3', 1),
('usu-03@org2.com', '444555', '2', '1', 0),
('usu-04@org1.com', '15763', '1', '0', 0),
('usu-04@org1.com', '15763', '1', '3', 0),
('usu-04@org1.com', '15763', '2', '2', 1),
('usu-04@org2.com', '444555', '1', '0', 0),
('usu-04@org2.com', '444555', '1', '3', 0),
('usu-04@org2.com', '444555', '2', '2', 1),
('usu-05@org1.com', '15763', '1', '0', 0),
('usu-05@org1.com', '15763', '1', '1', 1),
('usu-05@org1.com', '15763', '1', '2', 1),
('usu-05@org1.com', '15763', '2', '1', 0),
('usu-05@org2.com', '15763', '2', '1', 1),
('usu-05@org2.com', '444555', '1', '0', 0),
('usu-05@org2.com', '444555', '1', '1', 1),
('usu-05@org2.com', '444555', '2', '1', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_senales`
--

CREATE TABLE `t_senales` (
  `cod_senal` decimal(2,0) NOT NULL,
  `cod_org` decimal(9,0) NOT NULL,
  `cod_esp` decimal(2,0) NOT NULL,
  `cod_cop` decimal(2,0) NOT NULL,
  `cod_etiqueta` decimal(2,0) DEFAULT NULL,
  `desc_senal` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  `enlace` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `fecha_hora` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `cod_usuario` varchar(30) COLLATE utf8_spanish_ci DEFAULT '',
  `ind_fich_gest` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `t_senales`
--

INSERT INTO `t_senales` (`cod_senal`, `cod_org`, `cod_esp`, `cod_cop`, `cod_etiqueta`, `desc_senal`, `enlace`, `fecha_hora`, `cod_usuario`, `ind_fich_gest`) VALUES
('11', '15763', '1', '0', NULL, 'Desc 1 kkkkk 1', 'url', '2019-12-10 15:12:51', 'usu-01@org1.com', 1),
('12', '444555', '1', '0', NULL, 'Desc 1 kkkkk 2', 'url', '2019-12-11 15:04:16', 'usu-03@org1.com', 1),
('21', '15763', '1', '1', NULL, 'Desc 2 kkkkk 1', 'url', '2019-12-11 15:06:19', 'usu-04@org1.com', 0),
('22', '444555', '1', '2', NULL, 'Desc 2 kkkkk 2', 'url', '2019-12-11 15:06:19', 'usu-05@org1.com', 0),
('31', '15763', '1', '1', NULL, 'Desc 3 kkkkk 1', 'url', '2019-12-11 15:06:19', 'usu-01@org1.com', 0),
('32', '444555', '1', '5', NULL, 'Desc 3 kkkkk 2', 'url', '2019-12-11 15:06:19', 'usu-01@org1.com', 0),
('41', '15763', '1', '1', NULL, 'Desc 4 kkkkk 1', 'url', '2019-12-11 15:06:19', 'usu-05@org1.com', 0),
('42', '444555', '1', '5', NULL, 'Desc 4 kkkkk 2', 'url', '2019-12-11 15:06:19', 'usu-02@org1.com', 0),
('51', '15763', '1', '1', NULL, 'Desc 5 kkkkk 1', 'url', '2019-12-05 15:15:44', '', 0),
('52', '444555', '1', '5', NULL, 'Desc 5 kkkkk 2', 'url', '2019-12-05 15:15:44', '', 0),
('61', '15763', '1', '2', NULL, 'Desc 6 kkkkk 1', 'url', '2019-12-11 15:06:19', 'usu-02@org1.com', 0),
('62', '444555', '2', '1', NULL, 'Desc 6 kkkkk 2', 'url', '2019-12-11 15:06:19', 'usu-01@org1.com', 0),
('71', '15763', '2', '1', NULL, 'Desc 7 kkkkk 1', 'url', '2019-12-11 15:06:19', 'usu-02@org1.com', 0),
('72', '444555', '2', '2', NULL, 'Desc 7 kkkkk 2', 'url', '2019-12-05 15:15:44', '', 0),
('81', '15763', '2', '2', NULL, 'Desc 8 kkkkk 1', 'url', '2019-12-11 15:06:19', 'usu-02@org1.com', 0),
('82', '444555', '3', '1', NULL, 'Desc 8 kkkkk 2', 'url', '2019-12-11 15:06:19', 'usu-01@org1.com', 0),
('91', '15763', '1', '0', NULL, 'Desc 9 kkkkk 1', 'url', '2019-12-10 15:25:08', 'usu-02@org1.com', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_tip_usuario`
--

CREATE TABLE `t_tip_usuario` (
  `tip_usuario` decimal(2,0) NOT NULL,
  `desc_usuario` varchar(25) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `t_tip_usuario`
--

INSERT INTO `t_tip_usuario` (`tip_usuario`, `desc_usuario`) VALUES
('1', 'Administración general de'),
('2', 'Administrador de una Orga'),
('3', 'Usuario de una organizaci');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_tip_variable`
--

CREATE TABLE `t_tip_variable` (
  `tip_variable` decimal(2,0) NOT NULL,
  `desc_variable` varchar(25) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `t_tip_variable`
--

INSERT INTO `t_tip_variable` (`tip_variable`, `desc_variable`) VALUES
('1', 'Recurso económicos'),
('2', 'Recursos horarios'),
('3', 'Impacto y Urgencia'),
('4', 'Incertidumbre'),
('5', 'Carácter Innovador'),
('6', 'Variable 1'),
('7', 'Variable 2'),
('8', 'Variable 3'),
('9', 'Variable 4');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_usuarios`
--

CREATE TABLE `t_usuarios` (
  `cod_usuario` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `tip_usuario` decimal(2,0) DEFAULT NULL,
  `cod_org` decimal(9,0) NOT NULL,
  `sarbidea` decimal(8,0) DEFAULT NULL,
  `nombre` varchar(15) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ape1` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ape2` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `t_usuarios`
--

INSERT INTO `t_usuarios` (`cod_usuario`, `tip_usuario`, `cod_org`, `sarbidea`, `nombre`, `ape1`, `ape2`) VALUES
('Adm_gnrl@iTresna.com', '1', '15763', '12345678', 'ADM-1', 'Adminape1', 'Adminape2'),
('Adm-ORG-1@@ORG1.COM', '2', '15763', '12345678', 'ADM-1', 'Ap21', 'Ap22'),
('usu-01@org1.com', '4', '15763', '12345678', 'JCP2', 'Ap21', 'Ap22'),
('usu-02@org1.com', '4', '15763', '12345678', 'JCP2', 'Ap21', 'Ap22'),
('usu-03@org1.com', '4', '15763', '12345678', 'JCP2', 'Ap21', 'Ap22'),
('usu-04@org1.com', '4', '15763', '12345678', 'JCP2222', 'Ap21', 'Ap22'),
('usu-05@org1.com', '4', '15763', '12345678', 'JCP22', 'Ap21', 'Ap22'),
('usu-01@org2.com', '4', '444555', '12345678', 'UB3', 'Ap31', 'Ap32'),
('usu-02@org2.com', '4', '444555', '12345678', 'UB3', 'Ap31', 'Ap32'),
('usu-03@org2.com', '4', '444555', '12345678', 'UB3', 'Ap31', 'Ap32'),
('usu-04@org2.com', '4', '444555', '12345678', 'UB3', 'Ap31', 'Ap32'),
('usu-05@org2.com', '4', '444555', '12345678', 'UB3', 'Ap31', 'Ap32');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_variable`
--

CREATE TABLE `t_variable` (
  `cod_org` decimal(9,0) NOT NULL,
  `cod_esp` decimal(2,0) NOT NULL,
  `cod_cop` decimal(2,0) NOT NULL,
  `cod_señal` decimal(2,0) NOT NULL,
  `tip_variable` decimal(2,0) NOT NULL,
  `val_variable` decimal(2,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `t_variable`
--

INSERT INTO `t_variable` (`cod_org`, `cod_esp`, `cod_cop`, `cod_señal`, `tip_variable`, `val_variable`) VALUES
('15763', '2', '1', '71', '1', '45'),
('15763', '2', '1', '71', '2', '57'),
('15763', '2', '1', '71', '3', '4'),
('15763', '2', '1', '71', '4', '23'),
('15763', '2', '1', '72', '1', '78'),
('15763', '2', '1', '72', '2', '21'),
('15763', '2', '1', '72', '3', '2'),
('15763', '2', '1', '72', '4', '4'),
('444555', '2', '1', '62', '1', '88'),
('444555', '2', '1', '62', '2', '9'),
('444555', '2', '1', '62', '3', '12'),
('444555', '2', '1', '62', '4', '33'),
('444555', '2', '1', '63', '1', '44'),
('444555', '2', '1', '63', '2', '55'),
('444555', '2', '1', '63', '3', '66'),
('444555', '2', '1', '63', '4', '77');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `t_comentarios`
--
ALTER TABLE `t_comentarios`
  ADD PRIMARY KEY (`cod_org`,`cod_esp`,`cod_cop`,`cod_senal`,`cod_usuario`,`cod_comentario`);

--
-- Indices de la tabla `t_cops`
--
ALTER TABLE `t_cops`
  ADD PRIMARY KEY (`cod_cop`,`cod_org`,`cod_esp`);

--
-- Indices de la tabla `t_espacios`
--
ALTER TABLE `t_espacios`
  ADD PRIMARY KEY (`cod_esp`,`cod_org`);

--
-- Indices de la tabla `t_etiquetas`
--
ALTER TABLE `t_etiquetas`
  ADD PRIMARY KEY (`cod_etiqueta`,`cod_esp`,`cod_cop`,`cod_org`);

--
-- Indices de la tabla `t_megusta`
--
ALTER TABLE `t_megusta`
  ADD PRIMARY KEY (`cod_usuario`,`cod_org`,`cod_esp`,`cod_cop`,`cod_senal`);

--
-- Indices de la tabla `t_org`
--
ALTER TABLE `t_org`
  ADD PRIMARY KEY (`cod_org`);

--
-- Indices de la tabla `t_permisos`
--
ALTER TABLE `t_permisos`
  ADD PRIMARY KEY (`cod_usuario`,`cod_org`,`cod_esp`,`cod_cop`);

--
-- Indices de la tabla `t_senales`
--
ALTER TABLE `t_senales`
  ADD PRIMARY KEY (`cod_senal`,`cod_esp`,`cod_org`,`cod_cop`);

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
  ADD PRIMARY KEY (`cod_org`,`cod_usuario`);

--
-- Indices de la tabla `t_variable`
--
ALTER TABLE `t_variable`
  ADD PRIMARY KEY (`cod_org`,`cod_esp`,`cod_cop`,`cod_señal`,`tip_variable`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
