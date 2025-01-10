-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 02, 2025 at 02:44 PM
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
-- Table structure for table `pasien`
--

CREATE TABLE `pasien` (
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
-- Dumping data for table `pasien`
--

INSERT INTO `pasien` (`id`, `nama`, `jenis_kelamin`, `tanggal_lahir`, `usia`, `poliklinik`, `kartu_berobat`, `nomor_pendaftaran`, `status_ticket`, `created_at`, `last_update`) VALUES
(15, 'diaz', 'Laki-laki', '2000-12-01', 24, 'Umum', 'PSA-9772-040755', 'A-2484-040776', 'waiting', '2024-12-31 21:24:00', '2024-12-31 21:24:00'),
(16, 'tes data', 'Laki-laki', '1111-11-11', 1, 'Umum', 'PSA-6231-159663', 'A-2715-159683', 'waiting', '2024-12-31 21:25:59', '2024-12-31 21:25:59'),
(17, 'tesss', 'Perempuan', '1111-11-11', 24, 'Bidan', 'PSA-3771-116092', 'A-5847-116100', 'waiting', '2024-12-31 21:41:56', '2024-12-31 21:41:56'),
(18, 'tes data', 'Laki-laki', '1111-11-11', 1, 'Umum', 'PSA-8187-263046', 'A-6273-263071', 'waiting', '2024-12-31 22:01:03', '2024-12-31 22:01:03'),
(19, 'diaz', 'Laki-laki', '1111-11-11', 1, 'Umum', 'PSA-7283-621215', 'A-9573-621226', 'waiting', '2025-01-01 13:23:41', '2025-01-01 13:23:41'),
(20, 'tesa', 'Perempuan', '1999-01-21', 23, 'Umum', 'PSA-4607-740788', 'A-4675-740820', 'waiting', '2025-01-01 17:19:00', '2025-01-01 17:19:00'),
(21, 'diaz', 'Laki-laki', '1111-11-11', 1, 'Umum', 'PSA-9907-864694', 'A-8978-864714', 'waiting', '2025-01-01 19:34:24', '2025-01-01 19:34:24'),
(22, 'tess', 'Laki-laki', '1111-11-11', 24, 'Bidan', 'PSA-4064-526261', 'A-7162-526311', 'waiting', '2025-01-02 10:28:46', '2025-01-02 10:28:46'),
(23, 'diazz tess', 'Laki-laki', '0111-11-11', 1, 'Umum', 'PSA-6371-610281', 'A-3064-610390', 'waiting', '2025-01-02 11:53:30', '2025-01-02 11:53:30'),
(24, 'diaz', 'Laki-laki', '1111-11-11', 1, 'Anak', 'PSA-3862-665766', 'A-6272-665785', 'waiting', '2025-01-02 18:51:05', '2025-01-02 18:51:05');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(15) NOT NULL,
  `created_at` datetime NOT NULL,
  `last_login` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `role`, `created_at`, `last_login`) VALUES
(1, 'tes', 'tess', 'admin', '2025-01-02 13:20:46', '2025-01-02 13:20:46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pasien`
--
ALTER TABLE `pasien`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kartu_berobat` (`kartu_berobat`),
  ADD UNIQUE KEY `nomor_pendaftaran` (`nomor_pendaftaran`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pasien`
--
ALTER TABLE `pasien`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;