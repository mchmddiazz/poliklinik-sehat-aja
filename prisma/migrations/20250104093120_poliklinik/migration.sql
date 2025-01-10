-- CreateTable
CREATE TABLE `pasien` (
    `nomor_pendaftaran` VARCHAR(191) NOT NULL,
    `diagnosa` VARCHAR(191) NULL,
    `last_update` DATETIME(3) NULL,

    PRIMARY KEY (`nomor_pendaftaran`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resep` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomor_pendaftaran` VARCHAR(191) NOT NULL,
    `resep_obat` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
