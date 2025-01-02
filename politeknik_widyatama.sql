-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 31, 2024 at 03:26 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `politeknik_widyatama`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `jenis_kelamin` text NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `usia` int(10) NOT NULL,
  `poliklinik` varchar(50) NOT NULL,
  `kartu_berobat` varchar(255) DEFAULT NULL,
  `nomor_pendaftaran` varchar(255) DEFAULT NULL,
  `status_ticket` text NOT NULL,
  `created_at` datetime NOT NULL,
  `last_update` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `nama`, `jenis_kelamin`, `tanggal_lahir`, `usia`, `poliklinik`, `kartu_berobat`, `nomor_pendaftaran`, `status_ticket`, `created_at`, `last_update`) VALUES
(15, 'diaz', 'Laki-laki', '2000-12-01', 24, 'Umum', 'PSA-9772-040755', 'A-2484-040776', 'waiting', '2024-12-31 21:24:00', '2024-12-31 21:24:00'),
(16, 'tes data', 'Laki-laki', '1111-11-11', 1, 'Umum', 'PSA-6231-159663', 'A-2715-159683', 'waiting', '2024-12-31 21:25:59', '2024-12-31 21:25:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kartu_berobat` (`kartu_berobat`),
  ADD UNIQUE KEY `nomor_pendaftaran` (`nomor_pendaftaran`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;