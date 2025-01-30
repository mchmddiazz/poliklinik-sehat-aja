-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 30, 2025 at 09:28 AM
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
  `kartu_berobat` bigint(20) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `jenis_kelamin` text NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `usia` int(10) NOT NULL,
  `poliklinik` varchar(50) NOT NULL,
  `nomor_pendaftaran` varchar(255) DEFAULT NULL,
  `diagnosa` varchar(255) DEFAULT NULL,
  `resep_obat` varchar(255) NOT NULL,
  `status_ticket` text NOT NULL,
  `created_at` datetime NOT NULL,
  `last_update` datetime NOT NULL,
  `harga` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pasien`
--

INSERT INTO `pasien` (`kartu_berobat`, `nama`, `jenis_kelamin`, `tanggal_lahir`, `usia`, `poliklinik`, `nomor_pendaftaran`, `diagnosa`, `resep_obat`, `status_ticket`, `created_at`, `last_update`, `harga`) VALUES
(10450291013, 'defrannnnn', 'Laki-laki', '2004-05-14', 20, 'Umum', '16244291049', 'fluu', '[{\"resepObat\":\"ultra flu\",\"banyakObat\":\"2\",\"anjuranPakai\":\"2x 1\",\"keterangan\":\"-\"}]', 'completed', '2025-01-18 16:24:51', '2025-01-18 16:32:06', '20000'),
(14744358369, 'defran', 'Laki-laki', '2000-12-12', 20, 'Penyakit Dalam', '14997358390', 'pusing', '[{\"resepObat\":\"paracetamol\",\"banyakObat\":\"12\",\"anjuranPakai\":\"2 x 1\",\"keterangan\":\"setelah makan\"},{\"resepObat\":\"aspirin\",\"banyakObat\":\"12\",\"anjuranPakai\":\"2 x 1\",\"keterangan\":\"setelah makan\"}]', 'completed', '2025-01-27 23:45:58', '2025-01-27 23:59:26', '15000');

--
-- Triggers `pasien`
--
DELIMITER $$
CREATE TRIGGER `after_pasien_delete` AFTER DELETE ON `pasien` FOR EACH ROW BEGIN
    DELETE FROM pasien_register
    WHERE kartu_berobat = OLD.kartu_berobat;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_pasien_insert` AFTER INSERT ON `pasien` FOR EACH ROW BEGIN
    INSERT INTO pasien_register (kartu_berobat, created_at)
    VALUES (NEW.kartu_berobat, CURDATE());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_pasien_update` AFTER UPDATE ON `pasien` FOR EACH ROW BEGIN
    UPDATE pasien_register
    SET kartu_berobat = NEW.kartu_berobat
    WHERE kartu_berobat = OLD.kartu_berobat;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `pasien_register`
--

CREATE TABLE `pasien_register` (
  `id` int(1) NOT NULL,
  `kartu_berobat` bigint(20) DEFAULT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pasien_register`
--

INSERT INTO `pasien_register` (`id`, `kartu_berobat`, `created_at`) VALUES
(6, 10450291013, '2025-01-18 00:00:00'),
(7, 14744358369, '2025-01-27 00:00:00');

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
(5, 'admin', '$2b$10$z1SJ9d1VVRzM2zKNnUUxUOXchrE2h/pJ.eroSp3snYpT//EWsv6AW', 'admin', '2025-01-16 14:12:54', '2025-01-16 14:12:54'),
(6, 'dokter', '$2b$10$Kz3nlFmcj9I9FRYZ5MEwMuvE5CfDNGrtBgqbPiIRE2L5BvMAKOS9y', 'dokter', '2025-01-08 14:57:47', '2025-01-08 14:57:47'),
(7, 'obat', '$2b$10$RFfDfYGULyA8elCOT3AADumBeb0tM3AVKHwXgQd1R..3OqVvJhuAG', 'apoteker', '2025-01-08 14:57:47', '2025-01-08 14:57:47'),
(8, 'admin2', '$2b$10$4aLz2nbPPuq5yWRpbnmXDu6njeLI6JnKxyo2rDAqXp6tbSjkAnRm2', 'administrasi', '2025-01-16 15:15:54', '2025-01-16 15:15:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pasien`
--
ALTER TABLE `pasien`
  ADD PRIMARY KEY (`kartu_berobat`);

--
-- Indexes for table `pasien_register`
--
ALTER TABLE `pasien_register`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_kartu_berobat` (`kartu_berobat`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pasien_register`
--
ALTER TABLE `pasien_register`
  MODIFY `id` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pasien_register`
--
ALTER TABLE `pasien_register`
  ADD CONSTRAINT `fk_kartu_berobat` FOREIGN KEY (`kartu_berobat`) REFERENCES `pasien` (`kartu_berobat`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;