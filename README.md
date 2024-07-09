# Open Music API

Proyek ini adalah submission pertama pada learning path **Back-End Developer** pada course **Belajar Fundamental Aplikasi Back-End** di [Dicoding](dicoding.com).

## How to run

### - Locally

- Prerequisites

  - Node.js installed on your local machine. You can download it from [nodejs.org](https://nodejs.org/).
  - Postgresql database installed on your local machine. You can download it from [postgresql.org](https://www.postgresql.org/download/).

- Installation

  Clone the repository and install dependencies.

  ```bash
  git clone <repository-url>
  cd <project-directory>
  npm install
  ```

- Running

  Make sure you have started your database server and then run this
  ```bash
  npm run migrate up
  npm start
  ```

### - DevContainer (Docker)

- Prerequisites

  Make sure you have the following installed:

  - **Visual Studio Code** ([VS Code](https://code.visualstudio.com/download))
  - **Docker** (Docker Engine with Compose plugin or [Docker Desktop](https://www.docker.com/products/docker-desktop/))
  - **Remote Development** extension pack for VS Code (Install from the VS Code Extensions marketplace)

- Installation

  1. Clone the repository:

      ```bash
      git clone <repository-url>
      cd <project-directory>
      ````

  2. Open the project in VS Code

      Make sure docker is running.

  3. Reopen in Container:

      Once you have the Remote - Containers extension installed, you'll see a green Remote indicator in the bottom-left corner of the VS Code window.
      Click on the green indicator, or use Ctrl/Cmd + Shift + P to open the Command Palette and search for Remote-Containers: Reopen in Container.
      Select your desired development container configuration (e.g., Node.js), and VS Code will reopen the project inside the container.
  
  4. Open Terminal and run this

      ```bash
      npm install
      ```
  
- Running

  ```bash
  npm run migrate up
  npm start
  ```

## Studi Kasus

Anda sebagai seorang Back-End Developer mendedikasikan diri untuk bergabung dengan tim TSC (Technical Steering Committee) dalam mengembangkan aplikasi pemutar musik terbuka bernama OpenMusic. Sesuai namanya, aplikasi ini menyediakan musik yang berlisensi gratis untuk semua orang.

Aplikasi ini dikembangkan secara berangsur hingga nantinya memiliki fitur seperti menambahkan lagu, membuat playlist, memasukan lagu ke dalam playlist, hingga membagikan playlist kepada pengguna lain. Aplikasi ini akan menjadi nomor satu di dunia!

Aplikasi OpenMusic dikembangkan secara berangsur, begitu pula API-nya. Sekarang aplikasi OpenMusic sudah ditahap versi pertama. Namun karena API-nya masih belum siap, aplikasi tersebut tidak bisa dirilis ke publik. Pada tahap ini, OpenMusic diharapkan dapat menambahkan, menghapus, dan mengubah data album dan lagu yang dimasukkan oleh pengguna aplikasi.

Nah, tugas Anda--sebagai tim TSC--adalah membuat API dari aplikasi OpenMusic dengan kriteria yang akan dijelaskan pada materi selanjutnya.

## Kriteria Penilaian

### Kriteria 1 : Pengelolaan Data Album

API harus menyediakan endpoint untuk pengelolaan album dengan spesifikasi berikut:

![Kriteria 1](https://dicoding-web-img.sgp1.cdn.digitaloceanspaces.com/original/academy/dos:b285d8d8f11c5d2f72d5ab51df9376e820211215133446.png) \*_any: merupakan nilai string apa pun selama tidak kosong._

Untuk lebih jelasnya, berikut adalah struktur response body yang harus ditampilkan pada endpoint:

- GET /albums/{id}
  ```json
  {
    "status": "success",
    "data": {
      "album": {
        "id": "album-Mk8AnmCp210PwT6B",
        "name": "Viva la Vida",
        "year": 2008
      }
    }
  }
  ```

### Kriteria 2 : Pengelolaan Data Song

API harus menyediakan endpoint untuk pengelolaan song (lagu) dengan spesifikasi berikut:

![Kriteria 2](https://dicoding-web-img.sgp1.cdn.digitaloceanspaces.com/original/academy/dos:49e70f7e35f9fa4ef0bd7500f3716c1b20220304101538.png)
**?: Boleh null atau undefined.\*
**any: merupakan nilai string apa pun selama nilainya tidak kosong.\*

Untuk lebih jelasnya, berikut adalah struktur response body yang harus ditampilkan pada endpoint:

- GET /songs

  ```json
  {
    "status": "success",
    "data": {
      "songs": [
        {
          "id": "song-Qbax5Oy7L8WKf74l",
          "title": "Life in Technicolor",
          "performer": "Coldplay"
        },
        {
          "id": "song-poax5Oy7L8WKllqw",
          "title": "Centimeteries of London",
          "performer": "Coldplay"
        },
        {
          "id": "song-Qalokam7L8WKf74l",
          "title": "Lost!",
          "performer": "Coldplay"
        }
      ]
    }
  }
  ```

- GET /songs/{id}

  ```json
  {
    "status": "success",
    "data": {
      "song": {
        "id": "song-Qbax5Oy7L8WKf74l",
        "title": "Life in Technicolor",
        "year": 2008,
        "performer": "Coldplay",
        "genre": "Indie",
        "duration": 120,
        "albumId": "album-Mk8AnmCp210PwT6B"
      }
    }
  }
  ```

Objek song yang disimpan harus memiliki struktur seperti contoh di bawah ini:

```json
{
  "id": "song-Qbax5Oy7L8WKf74l",
  "title": "Life in Technicolor",
  "year": 2008,
  "performer": "Coldplay",
  "genre": "Indie",
  "duration": 120,
  "albumId": "album-Mk8AnmCp210PwT6B"
}
```

### Kriteria 3 : Menerapkan Data Validation

Wajib menerapkan proses Data Validation pada Request Payload sesuai spesifikasi berikut:

- POST /albums

  - name : string, required.
  - year : number, required.

- PUT /albums

  - name : string, required.
  - year : number, required.

- POST /songs

  - title : string, required.
  - year : number, required.
  - genre : string, required.
  - performer : string, required.
  - duration : number.
  - albumId: string.

- PUT /songs
  - title : string, required.
  - year : number, required.
  - genre : string, required.
  - performer : string, required.
  - duration : number.
  - albumId : string.

### Kriteria 4 : Penanganan Eror (Error Handling)

Ketika proses validasi data pada request payload tidak sesuai (gagal), server harus mengembalikan response:

```
status code: 400 (Bad Request)
response body:
status: fail
message: <apa pun selama tidak kosong>
```

Ketika pengguna mengakses resource yang tidak ditemukan, server harus mengembalikan response:

```
status code: 404 (Not Found)
response body:
status: fail
message: <apa pun selama tidak kosong>
```

Ketika terjadi server eror, server harus mengembalikan response:
status code: 500 (Internal Server Error)

```
response body:
status: error
message: <apa pun selama tidak kosong>
```

### Kriteria 5 : Menggunakan Database dalam Menyimpan Data album dan lagu

- Data lagu harus disimpan di dalam database menggunakan PostgreSQL agar ketika di-restart data tidak akan hilang.
- Wajib menggunakan teknik migrations dalam mengelola struktur tabel pada database.
- Wajib menyimpan nilai host, post, maupun kredensial dalam mengakses database pada environment variable dengan ketentuan:
  - PGUSER : menyimpan nilai user untuk mengakses database.
  - PGPASSWORD : menyimpan nilai password dari user database.
  - PGDATABASE : menyimpan nilai nama database yang digunakan.
  - PGHOST : menyimpan nilai host yang digunakan oleh database.
  - PGPORT : menyimpan nilai port yang digunakan oleh database.
- Wajib menggunakan package dotenv serta berkas .env dalam mengelola environment variable.

### Kriteria Opsional

Selain kriteria utama, terdapat kriteria opsional yang yang dapat Anda penuhi agar mendapat nilai yang baik.

#### Kriteria Opsional 1: Memunculkan daftar lagu di dalam detail album

API harus memunculkan daftar lagu di dalam album pada endpoint GET /albums/{albumId}. Berikut contoh response yang harus dihasilkan:

```json
{
  "status": "success",
  "data": {
    "album": {
      "id": "album-Mk8AnmCp210PwT6B",
      "name": "Viva la Vida",
      "year": 2008,
      "songs": [
        {
          "id": "song-Qbax5Oy7L8WKf74l",
          "title": "Life in Technicolor",
          "performer": "Coldplay"
        },
        {
          "id": "song-poax5Oy7L8WKllqw",
          "title": "Centimeteries of London",
          "performer": "Coldplay"
        },
        {
          "id": "song-Qalokam7L8WKf74l",
          "title": "Lost!",
          "performer": "Coldplay"
        }
      ]
    }
  }
}
```

#### Kriteria Opsional 2: Query Parameter untuk Pencarian Lagu

Menerapkan query parameter pada endpoint GET /songs untuk fitur pencarian lagu. Berikut ketentuan parameternya:

```
?title: mencari lagu berdasarkan judul lagu.
?performer: mencari lagu berdasarkan performer.
```

Catatan: Penggunaan kedua parameter tersebut dapat dikombinasikan.

## Pengujian

Tes dengan berkas Postman Collection dan Environment yang telah disediakan.

## Submission akan Ditolak bila

- Kriteria wajib OpenMusic API versi 1 tidak terpenuhi.
- Ketentuan berkas submission tidak terpenuhi.
- Menggunakan Database lain selain PostgreSQL.
- Menggunakan JavaScript Environment lain selain Node.js.
- Menggunakan Framework Node.js selain Hapi Framework.
- Melakukan kecurangan seperti tindakan plagiasi.
