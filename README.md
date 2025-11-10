# 🤖 Discord Command ID Viewer

![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen?style=flat-square&logo=node.js)
![discord.js](https://img.shields.io/badge/discord.js-v14-blue?style=flat-square&logo=discord)
![License](https://img.shields.io/badge/license-MIT-lightgrey?style=flat-square)

> Bot Discord sederhana berbasis **discord.js v14** untuk melihat daftar **slash command dan Command ID** dari bot lain menggunakan Application ID dan Token bot target.

---

## ✨ Fitur Utama

✅ **/getcommands_other** — Menampilkan semua command milik bot lain (nama + command ID)  
💡 Berguna untuk developer Discord yang ingin:
- Mengecek command ID untuk integrasi API  
- Memverifikasi command global yang sudah didaftarkan  
- Melihat struktur command bot lain milik sendiri  

---

## 🧩 Teknologi yang Digunakan

- [Node.js 18+](https://nodejs.org/)
- [discord.js v14](https://discord.js.org)
- [Discord API v10](https://discord.com/developers/docs/intro)
- [dotenv](https://www.npmjs.com/package/dotenv) untuk keamanan token  

---

## ⚙️ Cara Instalasi

### 1️⃣ Clone Repository
```bash
git clone https://github.com/<username>/<repository>.git
cd <repository>
```

### 2️⃣ Install Dependencies
```bash
npm install discord.js dotenv
```

### 3️⃣ Buat File `.env`
Isi dengan token dan Application ID bot kamu:
```env
TOKEN=token_bot_kamu
CLIENT_ID=application_id_bot_kamu
```

### 4️⃣ Jalankan Bot
```bash
node index.js
```

---

## 🚀 Cara Menggunakan

### Slash Command: `/getcommands_other`
Digunakan untuk mengambil daftar command + ID dari bot lain.

**Parameter:**
- `application_id` → ID Aplikasi bot target  
- `token` → Token bot target  

**Contoh penggunaan:**
```
/getcommands_other application_id:123456789012345678 token:OTYxMzU1...
```

**Hasilnya:**
```
🧾 Daftar Command Bot `123456789012345678`:
/ping — 1142342324234343
/help — 1142332342342354
```

> ⚠️ Command ini membutuhkan token bot target agar bisa mengakses command-nya.  
> Tidak semua bot memiliki command publik, jadi pastikan kamu memiliki akses ke bot tersebut.

---

## 📸 Preview (Contoh Tampilan)
*(Tambahkan screenshot Discord kamu di sini kalau mau)*

---

## 🛡️ Keamanan

- Token disimpan di `.env` (tidak pernah ditulis di kode publik).  
- Token bot lain **tidak disimpan** — hanya digunakan sekali saat permintaan API.

---

## 👨‍💻 Developer

**Author:** [Naqent](https://github.com/Naqent)  
Made with ❤️ for Discord Developers.

---

## 📜 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

## ⭐ Dukung Proyek Ini

Kalau bot ini membantu kamu:
- 🌟 Beri **Star** di repo ini  
- 🐛 Laporkan bug di *Issues*  
- 🧠 Bantu kembangkan lewat *Pull Request*
- 
