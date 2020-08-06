-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 05-08-2020 a las 20:24:26
-- Versión del servidor: 5.7.30-0ubuntu0.18.04.1
-- Versión de PHP: 7.2.24-0ubuntu0.18.04.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `uptask`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto`
--

CREATE TABLE `proyecto` (
  `id_proyecto` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `proyecto`
--

INSERT INTO `proyecto` (`id_proyecto`, `nombre`) VALUES
(47, 'dgdfdg'),
(48, 'sfsdfssg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarea`
--

CREATE TABLE `tarea` (
  `id_tarea` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `estado` int(11) DEFAULT '0',
  `id_proyecto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tarea`
--

INSERT INTO `tarea` (`id_tarea`, `nombre`, `estado`, `id_proyecto`) VALUES
(102, 'dcsvsdsdf', 1, 47),
(105, 'sdgsfsdf', 0, 47);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `usuario`, `password`) VALUES
(1, 'admin', '$2y$12$Px0KSMJpHm1Jr6SF1VLphemGuQ6Qdo8iGNuU13DrjexjymbuaIMCy'),
(2, 'Pedro', '$2y$12$3noIvxrSvK5xxJdldiPExeeneMjPRuiJpdiqgBvv5uNSwjtDYN23W'),
(3, 'Pedro', '$2y$12$6wmRXfZWjKV3QFVZV0DizePuVOfFJL8xECbxKnDFYZxdd4yjtOCSa'),
(4, 'pedro', '$2y$12$H56xuSjTpTLZGirJp25kmefylJb4T2lT0gAj3Ncm.scxobkisV.N2'),
(5, 'sfsfsdf', '$2y$12$fE1LWKJSY0USAG.p24B39uJ60OhbwAOaKb8IC.gdPkiyAM1eYxj7.'),
(6, 'dfdf', '$2y$12$wbO0mCEGZXcpe1c49b/Qk.IqrWVb7dp5ct9z2ee/wesBKPnAGreVK'),
(7, 'dfdf', '$2y$12$30c.Tp.LbQ3N/ntuiEquB.bhnCKTiMaHQaF3kOgIAV.rWGKie5A5O'),
(8, 'caca', '$2y$12$Q1BGpUl70vJHcA.icwnLjONYyknnIyr0SyGpIhZbbe/md8ZCQl4xq'),
(9, 'adad', '$2y$12$TpIc4bMv3ilMoReZrzCUpu4Epy8K/gn73wc92Qe7etov6XMHIVKiC');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD PRIMARY KEY (`id_proyecto`);

--
-- Indices de la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD PRIMARY KEY (`id_tarea`),
  ADD KEY `fk_proyecto` (`id_proyecto`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  MODIFY `id_proyecto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
--
-- AUTO_INCREMENT de la tabla `tarea`
--
ALTER TABLE `tarea`
  MODIFY `id_tarea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD CONSTRAINT `fk_proyecto` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id_proyecto`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
