-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 16-09-2020 a las 16:37:17
-- Versión del servidor: 10.5.5-MariaDB-1:10.5.5+maria~focal
-- Versión de PHP: 7.4.9


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `database`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jornada`
--

CREATE TABLE `jornada` (
  `num_jornada` varchar(15) NOT NULL,
  `liga` varchar(15) NOT NULL,
  `puntos` int(11) NOT NULL,
  `encestados` int(11) NOT NULL,
  `realizados` int(11) NOT NULL,
  `nombreUsuario` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `jornada`
--

INSERT INTO `jornada` (`num_jornada`, `liga`, `puntos`, `encestados`, `realizados`, `nombreUsuario`) VALUES
('ACBV0001', 'ACB',10, 5, 7, 'Vicen12'),
('ACBP0001', 'ACB',4, 2, 7, 'pedro1'),
('LBOU0001', 'LebOro', 15, 6, 14, 'unaicastro');


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sesion`
--

CREATE TABLE `sesion` (
  `id` int(11) NOT NULL,
  `nombreUsuario` varchar(15) NOT NULL,
  `fechahora` timestamp NOT NULL DEFAULT current_timestamp(),
  `exito` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sesion`
--

INSERT INTO `sesion` (`id`, `nombreUsuario`, `fechahora`, `exito`) VALUES
(4, 'SrJowy', '2021-12-09 10:50:04', 0);
--
--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `nombre` varchar(15) NOT NULL,
  `apellidos` varchar(30) NOT NULL,
  `dni` varchar(9) NOT NULL,
  `telefono` int(11) NOT NULL,
  `fecha_nac` date NOT NULL,
  `email` varchar(50) NOT NULL,
  `contra` varchar(50) NOT NULL,
  `cuenta` varchar(60) NOT NULL,
  `salt` varchar(50) NOT NULL,
  `nombreUsuario` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`nombre`, `apellidos`, `dni`, `telefono`, `fecha_nac`, `email`, `contra`, `cuenta`, `salt`, `nombreUsuario`) VALUES
('Vicen', 'Ayarza', '12368536V', 663332547, '2001-04-27', 'vicen@gmail.com', '63zUgDBQ0t3ao', '54kYD7BgrFl+UsLvGi3Z4NIv0z5xJmwi//xgAV2kOU8=', '63684b6ac495842a6dae68521310e9f8', 'Vicen12');
/*('Unai', 'Castro', '00000012T', 618589404, '2000-10-13', 'unai@gmail.com', '987654321', 'unaicastro'),
('Pedro', 'Martín', '72106470K', 618589405, '2000-02-13', 'pedro@gmail.com', '987654321', 'pedro1');*/


--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `jornada`
--
ALTER TABLE `jornada`
  ADD PRIMARY KEY (`num_jornada`,`nombreUsuario`);

--
-- Indices de la tabla `sesion`

--
ALTER TABLE `sesion`
  ADD PRIMARY KEY (`id`);

--

-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`nombreUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `sesion`
--
ALTER TABLE `sesion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3927;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
