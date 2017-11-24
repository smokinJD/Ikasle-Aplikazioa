-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 21-11-2017 a las 10:51:51
-- Versión del servidor: 5.7.19
-- Versión de PHP: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `eskola`
--

DELIMITER $$
--
-- Procedimientos
--
DROP PROCEDURE IF EXISTS `sp_borrar_ikasle`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_borrar_ikasle` (IN `p_id_ikasle` INT)  NO SQL
    DETERMINISTIC
BEGIN
	DELETE FROM ikasleak WHERE id = p_id_ikasle;
END$$

DROP PROCEDURE IF EXISTS `sp_insertar_ikasle`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insertar_ikasle` (IN `p_nombre` VARCHAR(30), IN `p_edad` INT, IN `p_curso` INT)  NO SQL
BEGIN
 INSERT INTO ikasleak(Nombre, Edad, Curso)                 VALUES (p_nombre,p_edad,p_curso);
END$$

DROP PROCEDURE IF EXISTS `sp_mostrar_ikasleak`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_mostrar_ikasleak` ()  NO SQL
    DETERMINISTIC
SELECT *
FROM
ikasleak$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ikasleak`
--

DROP TABLE IF EXISTS `ikasleak`;
CREATE TABLE IF NOT EXISTS `ikasleak` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(30) NOT NULL,
  `Edad` int(11) NOT NULL,
  `Curso` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `ikasleak`
--

INSERT INTO `ikasleak` (`id`, `Nombre`, `Edad`, `Curso`) VALUES
(1, 'Ane', 21, 1),
(2, 'Mikel', 23, 2),
(3, 'Gorka', 21, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `moduluak`
--

DROP TABLE IF EXISTS `moduluak`;
CREATE TABLE IF NOT EXISTS `moduluak` (
  `id_modulo` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(30) NOT NULL,
  `Curso` int(11) NOT NULL,
  PRIMARY KEY (`id_modulo`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
