-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 10, 2025 at 07:18 PM
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
  `diagnosa` varchar(255) DEFAULT NULL,
  `resep_obat` varchar(255) NOT NULL,
  `status_ticket` text NOT NULL,
  `created_at` datetime NOT NULL,
  `last_update` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pasien`
--

INSERT INTO `pasien` (`id`, `nama`, `jenis_kelamin`, `tanggal_lahir`, `usia`, `poliklinik`, `kartu_berobat`, `nomor_pendaftaran`, `diagnosa`, `resep_obat`, `status_ticket`, `created_at`, `last_update`) VALUES
(15, 'diaz', 'Laki-laki', '2000-12-01', 24, 'Umum', 'PSA-9772-040755', 'A-2484-040776', '', '', 'waiting', '2024-12-31 21:24:00', '2024-12-31 21:24:00'),
(18, 'tes data', 'Laki-laki', '1111-11-11', 1, 'Umum', 'PSA-8187-263046', 'A-6273-263071', '', '', 'waiting', '2024-12-31 22:01:03', '2024-12-31 22:01:03'),
(19, 'diaz', 'Laki-laki', '1111-11-11', 1, 'Umum', 'PSA-7283-621215', 'A-9573-621226', '', '', 'waiting', '2025-01-01 13:23:41', '2025-01-01 13:23:41'),
(20, 'tesa', 'Perempuan', '1999-01-21', 23, 'Umum', 'PSA-4607-740788', 'A-4675-740820', '', '', 'waiting', '2025-01-01 17:19:00', '2025-01-01 17:19:00'),
(21, 'diaz', 'Laki-laki', '1111-11-11', 1, 'Umum', 'PSA-9907-864694', 'A-8978-864714', '', '', 'waiting', '2025-01-01 19:34:24', '2025-01-01 19:34:24'),
(22, 'tess', 'Laki-laki', '1111-11-11', 24, 'Bidan', 'PSA-4064-526261', 'A-7162-526311', '', '', 'waiting', '2025-01-02 10:28:46', '2025-01-02 10:28:46'),
(23, 'diazz tess', 'Laki-laki', '0111-11-11', 1, 'Umum', 'PSA-6371-610281', 'A-3064-610390', '', '', 'waiting', '2025-01-02 11:53:30', '2025-01-02 11:53:30'),
(24, 'diaz', 'Laki-laki', '1111-11-11', 1, 'Anak', 'PSA-3862-665766', 'A-6272-665785', '', '', 'waiting', '2025-01-02 18:51:05', '2025-01-02 18:51:05'),
(25, 'tes', 'Laki-laki', '1111-11-11', 1, 'Umum', 'PSA-1865-724910', 'A-9765-724930', 'tes', 'tes', 'examined', '2025-01-08 20:58:44', '2025-01-08 21:08:35'),
(26, 'testing data', 'Laki-laki', '2012-12-12', 1, 'Umum', 'PSA-3900-628519', 'A-8572-628529', 'testing', 'tesss', 'examined', '2025-01-10 18:13:48', '2025-01-10 19:15:17'),
(27, 'tes', 'Perempuan', '0111-11-11', 1, 'Anak', 'PSA-5249-498532', 'A-4254-498568', 'testing', 'obat tes', 'examined', '2025-01-11 00:18:18', '2025-01-11 00:19:35');

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
(1, 'tes', 'tess', 'admin', '2025-01-02 13:20:46', '2025-01-02 13:20:46'),
(2, 'dokter', 'dokter', 'dokter', '2025-01-08 14:57:47', '2025-01-08 14:57:47'),
(3, 'obat', 'obat', 'apoteker', '2025-01-08 14:57:47', '2025-01-08 14:57:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pasien`
--
ALTER TABLE `pasien`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kartu_berobat` (`kartu_berobat`),
  ADD UNIQUE KEY `nomor_pendaftaran` (`nomor_pendaftaran`),
  ADD KEY `kartu_berobat_2` (`kartu_berobat`,`nomor_pendaftaran`,`diagnosa`),
  ADD KEY `kartu_berobat_3` (`kartu_berobat`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;