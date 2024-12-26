-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 26 Des 2024 pada 20.09
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mynotebook`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `notes`
--

CREATE TABLE `notes` (
  `id_notes` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `tittle` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `pinned` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `notes`
--

INSERT INTO `notes` (`id_notes`, `id_user`, `tittle`, `content`, `pinned`) VALUES
(1, 1, 'Ello Hari Ini', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet ullam sequi quasi, nesciunt inventore autem velit, doloremque, quia qui officia exercitationem ipsam vitae eligendi numquam ad. Quod mollitia a est.', 0),
(10, 1, 'Wishlist', 'Rakit PC', 1),
(12, 1, 'Rencana Belajar', 'React JS', 1),
(14, 1, 'Produktivitas', '1. Mulai hari dengan segelas air putih.\r\n2. Buat daftar tugas sebelum memulai pekerjaan.\r\n3. Ambil jeda singkat setiap 30 menit.\r\n4. Hindari multitasking.\r\n5. Belajar sesuatu yang baru setiap hari.\r\n', 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id_user`, `username`, `password`) VALUES
(1, 'ElloRabyndra', '$2a$10$CosHCKK5ky639.DUDqlijOcyHA54csU5ccra4t2Hf8A/G4zot81W6'),
(2, 'BudionoSiregar', '$2a$10$l.2TlBBR/2YQELqh57sSvOMDo8CqogZLqzxm5OIEZa1tu8p9/9pgy');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id_notes`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `notes`
--
ALTER TABLE `notes`
  MODIFY `id_notes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
