-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-11-2019 a las 15:26:47
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
-- Base de datos: `bditresna`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_comentarios`
--

CREATE TABLE `t_comentarios` (
  `cod_org` decimal(9,0) NOT NULL,
  `cod_esp` decimal(2,0) NOT NULL,
  `cod_cop` decimal(2,0) NOT NULL,
  `cod_señal` decimal(2,0) NOT NULL,
  `cod_usuario` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `cod_comentario` varchar(9) COLLATE utf8_spanish_ci NOT NULL,
  `comentario` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_megusta`
--

CREATE TABLE `t_megusta` (
  `cod_usuario` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `cod_org` decimal(9,0) NOT NULL,
  `cod_esp` decimal(2,0) NOT NULL,
  `cod_cop` decimal(2,0) NOT NULL,
  `cod_señal` decimal(2,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_senales`
--

CREATE TABLE `t_senales` (
  `cod_señal` decimal(2,0) NOT NULL,
  `cod_org` decimal(9,0) NOT NULL,
  `cod_esp` decimal(2,0) NOT NULL,
  `cod_cop` decimal(2,0) NOT NULL,
  `cod_etiqueta` decimal(2,0) DEFAULT NULL,
  `desc_señal` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  `enlace` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `fecha_hora` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `cod_usuario` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ind_fich_gest` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `t_senales`
--

INSERT INTO `t_senales` (`cod_señal`, `cod_org`, `cod_esp`, `cod_cop`, `cod_etiqueta`, `desc_señal`, `enlace`, `fecha_hora`, `cod_usuario`, `ind_fich_gest`) VALUES
('11', '15763', '1', '0', NULL, 'Desc 1 kkkkk 1', 'url', '2019-11-27 14:26:31', NULL, 1),
('21', '15763', '1', '1', NULL, 'Desc 2 kkkkk 1', 'url', '2019-11-27 14:26:31', NULL, 0);

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
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `t_comentarios`
--
ALTER TABLE `t_comentarios`
  ADD PRIMARY KEY (`cod_org`,`cod_esp`,`cod_cop`,`cod_señal`,`cod_usuario`,`cod_comentario`);

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
  ADD PRIMARY KEY (`cod_usuario`,`cod_org`,`cod_esp`,`cod_cop`,`cod_señal`);

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
  ADD PRIMARY KEY (`cod_señal`,`cod_esp`,`cod_org`,`cod_cop`);

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
