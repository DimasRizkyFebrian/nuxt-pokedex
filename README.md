# Pokédex dengan Nuxt 4 🎮

![Nuxt 4](https://img.shields.io/badge/Nuxt-4-00DC82?style=for-the-badge&logo=nuxt.js)
![Nuxt UI](https://img.shields.io/badge/Nuxt_UI-18181B?style=for-the-badge&logo=nuxt.js)
![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

Proyek ini adalah aplikasi web Pokédex yang dibangun sebagai sarana belajar framework **Nuxt 4**. Aplikasi ini mengambil data dari [PokéAPI](https://pokeapi.co/) publik dan menampilkannya dengan berbagai fitur interaktif.

## 📸 Screenshot Aplikasi

![Screenshot Pokédex Nuxt 4](docs\images\homepage-preview.png)
![Screenshot Pokédex Nuxt 4](docs\images\detailpage-preview.png)

## ✨ Fitur Utama

- **Daftar Pokémon**: Menampilkan daftar Pokémon dengan _scrolling_.
- **Halaman Detail**: Halaman dinamis untuk setiap Pokémon yang menampilkan informasi lengkap.
- **Pencarian Real-time**: Mencari Pokémon berdasarkan nama secara instan.
- **Filter Berdasarkan Tipe**: Menyaring daftar Pokémon berdasarkan tipenya (Fire, Water, Grass, dll.).
- **Rantai Evolusi**: Menampilkan alur evolusi lengkap di halaman detail.
- **Efektivitas Tipe**: Menampilkan informasi kelemahan, ketahanan, dan imunitas Pokémon.
- **Desain Tematik**: Tampilan custom ala game retro Pokémon dengan font pixel dan latar belakang yang sesuai.
- **Animasi & Transisi**: Transisi halaman yang halus dan animasi pada daftar untuk pengalaman pengguna yang lebih baik.

## 🚀 Teknologi yang Digunakan

- **Framework**: [Nuxt 4](https://nuxt.com/)
- **UI Library**: [Nuxt UI](https://ui.nuxt.com/) (dibangun di atas [Tailwind CSS](https://tailwindcss.com/))
- **API**: [PokéAPI V2](https://pokeapi.co/)
- **Module Tambahan**: [@nuxtjs/google-fonts](https://google-fonts.nuxtjs.org/) untuk font kustom.

## 🧠 Konsep yang Dipelajari

Proyek ini dirancang untuk mendalami konsep-konsep inti dan lanjutan dari Nuxt 4:

- **Pengambilan Data API**: Penggunaan `useFetch` dan `useAsyncData` secara ekstensif.
- **Routing Dinamis**: Membuat halaman dinamis berdasarkan parameter (contoh: `/pokemon/[name]`).
- **State Management**: Penggunaan `useState` untuk mengelola state sederhana seperti kata kunci pencarian dan filter aktif.
- **Reaktivitas**: Pemanfaatan `computed` untuk data turunan (daftar terfilter) dan `watch` / `watchEffect` untuk merespons perubahan state.
- **Arsitektur Berbasis Komponen**: Memecah UI menjadi komponen-komponen kecil yang dapat digunakan kembali (`PokemonCard`, `EvolutionStage`).
- **Integrasi Modul Nuxt**: Menambahkan dan mengkonfigurasi modul eksternal.
- **Penanganan Data Lanjutan**:
  - Pemanggilan API berantai (_Chained Fetches_) untuk rantai evolusi.
  - Pemanggilan API paralel dengan `Promise.all` untuk data efektivitas tipe.
  - Normalisasi data dari berbagai struktur API yang berbeda.
- **Kustomisasi Desain**: Mengkonfigurasi Tailwind CSS (`tailwind.config.js`) untuk tema kustom.
- **UI/UX Polish**: Implementasi transisi halaman dan animasi daftar (`<TransitionGroup>`).

## ⚙️ Instalasi dan Penggunaan

Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

1.  **Clone repositori ini:**
    ```bash
    git clone [https://github.com/dimasrizkyfebrian/nuxt-pokedex.git](https://github.com/dimasrizkyfebrian/nuxt-pokedex.git)
    ```
2.  **Masuk ke direktori proyek:**
    ```bash
    cd nuxt-pokedex
    ```
3.  **Install semua dependensi:**
    ```bash
    npm install
    ```
4.  **Jalankan server pengembangan:**
    ```bash
    npm run dev
    ```
    Aplikasi akan tersedia di `http://localhost:3000`.

## 🙏 Apresiasi

Proyek ini tidak akan mungkin terwujud tanpa data luar biasa yang disediakan oleh [PokéAPI](https://pokeapi.co/).

## 📄 Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT. Lihat file `LICENSE` untuk detailnya.
