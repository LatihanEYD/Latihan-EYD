document.addEventListener("DOMContentLoaded", function () {
  // Variabel untuk menyimpan data kata
  let kataData = [];

  // Muat data dari file JSON
  fetch("kataData.json")
    .then((response) => response.json())
    .then((data) => {
      kataData = data;
      maxJumlahSoal = kataData.length; // Update maksimal jumlah soal setelah data dimuat
      document.getElementById("soal-input").max = maxJumlahSoal;

      // Aktifkan tombol mulai setelah data dimuat
      mulaiBtn.disabled = false;
    })
    .catch((error) => {
      console.error("Error memuat data kata:", error);
      alert("Gagal memuat data kata. Silakan muat ulang halaman.");
    });

  // Elemen-elemen UI
  const berandaEl = document.querySelector(".beranda");
  const kataBakuEl = document.querySelector(".kata-baku");
  const soalEl = document.querySelector(".soal");
  const containerEl = document.querySelector(".container");
  const kataBakuBtn = document.getElementById("kata-baku");
  const mulaiBtn = document.querySelector(".mulai-btn");
  const kurangSoalBtn = document.getElementById("kurang-soal");
  const tambahSoalBtn = document.getElementById("tambah-soal");
  const jumlahSoalEl = document.getElementById("jumlah-soal");
  const kurangTimerBtn = document.getElementById("kurang-timer");
  const tambahTimerBtn = document.getElementById("tambah-timer");
  const jumlahTimerEl = document.getElementById("jumlah-timer");
  const opsiBtn1 = document.getElementById("soal-1");
  const opsiBtn2 = document.getElementById("soal-2");
  const lanjutSelesaiBtn = document.querySelector(".lanjut-selesai-btn");
  const resultHeaderEl = document.querySelector(".result-header");
  const kataBakuDivEl = document.querySelector(".result-body .kata-baku");
  const tidakBakuEl = document.querySelector(".result-body .tidak-baku");
  const artiListEl = document.querySelector(".result-body .arti-list");
  const body = document.body;

  // 1. Tambahkan tombol kembali ke beranda awal
  const kembaliBtn = document.createElement("button");
  kembaliBtn.className = "kembali-btn";
  kembaliBtn.textContent = "KEMBALI";
  const cardKataBaku = kataBakuEl.querySelector(".card-2");
  cardKataBaku.appendChild(kembaliBtn);

  // Tambahkan elemen timer ke soal
  const timerContainer = document.createElement("div");
  timerContainer.className = "timer-container";
  timerContainer.innerHTML = `
          <div class="timer-display">
            <span id="detik">00</span> detik
          </div>
        `;
  soalEl
    .querySelector(".card-3")
    .insertBefore(timerContainer, soalEl.querySelector(".menu-3"));

  // Tambahkan tombol dark mode ke beranda
  const darkModeToggle = document.createElement("div");
  darkModeToggle.className = "dark-mode-toggle";
  darkModeToggle.innerHTML = `
          <button id="mode-toggle">🌙</button>
        `;
  document.body.appendChild(darkModeToggle);

  // CSS tambahan untuk dark mode, timer, dan tombol kembali
  const styleElement = document.createElement("style");
  styleElement.textContent = `
          .dark-mode-toggle {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
          }
          
          #mode-toggle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #333;
            color: #fff;
            border: none;
            font-size: 20px;
            cursor: pointer;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
          }
      
          .dark-mode {
            background: linear-gradient(to bottom, #1e3a5a, #0f1d2d);
            color: #eee;
          }
      
          .dark-mode .card,
          .dark-mode .card-2,
          .dark-mode .card-3,
          .dark-mode .result-box {
            background-color: #2d3748;
            box-shadow: 0px 6px #222, 0px 8px 0px 5px #345170;
          }
      
          .dark-mode .judul,
          .dark-mode .judul-2,
          .dark-mode .judul-3,
          .dark-mode .subjudul,
          .dark-mode .kata-baku,
          .dark-mode .tidak-baku,
          .dark-mode .arti-list {
            color: #eee;
          }
      
          .dark-mode .setting {
            background-color: #3a5577;
            box-shadow: 0px 6px 0 #2a3e59, 0px 8px 0px 5px #1e2a3c;
          }
      
          .dark-mode .setting-title {
            color: #b5daf0;
          }
      
          .dark-mode .setting-control {
            border-top: 1.5px solid #5a85b7;
          }
        
          .dark-mode .value-box {
            background-color: #4a6890;
            color: #fff;
          }
      
          .dark-mode .pilihan,
          .dark-mode .menu,
          .dark-mode .container-lanjut-selesai {
            border-top: 1.5px solid #4a6890;
          }
      
          .dark-mode .menu {
            border-bottom: 1.5px solid #4a6890;
          }

          .dark-mode .menu-3 {
            border-top: 1.5px solid #4a6890;
          }
      
          .timer-container {
            padding: 10px 0;
            text-align: center;
            border-top: 1.5px solid #d8d8d8;
          }
      
          .timer-display {
            font-size: 1.5rem;
            font-weight: bold;
            color: #499abe;
          }
      
          .dark-mode .timer-container {
            border-top: 1.5px solid #4a6890;
          }
      
          .dark-mode .timer-display {
            color: #72bce0;
          }
          
          /* Styling untuk tombol kembali */
          .kembali-btn {
            background-color: #e74c3c;
            color: white;
            padding: 0.8rem 2rem;
            border: none;
            border-radius: 10px;
            font-weight: bold;
            font-size: 1rem;
            margin: 1.5rem;
            box-shadow: 0px 4px 0 #c0392b, 0px 6px 0px 1px #d9d9d9;
            cursor: pointer;
            transition: transform 0.1s ease, box-shadow 0.1s ease;
          }
          
          .kembali-btn:active {
            transform: translateY(4px);
            box-shadow: 1px 1px 0 #c0392b, 0px 1px 0px 0px #d9d9d9;
          }
          
          .dark-mode .kembali-btn {
            box-shadow: 0px 4px 0 #c0392b, 0px 6px 0px 1px #d9d9d9;
          }

          .dark-mode .kembali-btn:active {
            box-shadow: 1px 1px 0 #c0392b, 0px 1px 0px 0px #d9d9d9;
            transform: translateY(4px);
          }
          
          /* 4. Styling untuk input number */
          .value-box {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .value-input {
            width: 100%;
            background: transparent;
            border: none;
            color: inherit;
            font-weight: bold;
            font-size: 1.08rem;
            text-align: center;
            outline: none;
          }
          
          /* Menghilangkan arrow pada input number */
          .value-input::-webkit-outer-spin-button,
          .value-input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          
          .value-input[type=number] {
            -moz-appearance: textfield;
          }
        `;
  document.head.appendChild(styleElement);

  // Variabel aplikasi
  let jumlahSoal = 5; // Default jumlah soal
  let maxJumlahSoal = kataData.length; // Maksimal jumlah soal berdasarkan data
  let jumlahTimer = 15; // Default jumlah timer (detik) - 3x lipat jumlah soal default
  let soalSekarang = 0;
  let soalDataAcak = [];
  let jawabanBenar = 0;
  let timer = null;
  let sisaDetik = 0;
  let darkMode = false;
  let timerBerjalan = false;

  // 4. Ubah value-box menjadi input untuk diisi manual
  function createInputElements() {
    // Untuk jumlah soal
    const soalValueBox = document.getElementById("jumlah-soal");
    soalValueBox.innerHTML = `<input type="number" id="soal-input" class="value-input" value="${jumlahSoal}" min="1" max="${maxJumlahSoal}">`;

    // Untuk jumlah timer
    const timerValueBox = document.getElementById("jumlah-timer");
    timerValueBox.innerHTML = `<input type="number" id="timer-input" class="value-input" value="${jumlahTimer}" min="0">`;

    // Event listener untuk input soal
    const soalInput = document.getElementById("soal-input");
    soalInput.addEventListener("change", function () {
      const value = parseInt(this.value);
      if (value < 1) {
        this.value = 1;
        jumlahSoal = 1;
      } else if (value > maxJumlahSoal) {
        this.value = maxJumlahSoal;
        jumlahSoal = maxJumlahSoal;
      } else {
        jumlahSoal = value;
      }
      updateMaxTimer();
    });

    // Event listener untuk input timer
    const timerInput = document.getElementById("timer-input");
    timerInput.addEventListener("change", function () {
      const value = parseInt(this.value);
      const maxTimer = jumlahSoal * 3; // 3x lipat jumlah soal
      if (value < 0) {
        this.value = 0;
        jumlahTimer = 0;
      } else if (value > maxTimer) {
        this.value = maxTimer;
        jumlahTimer = maxTimer;
      } else {
        jumlahTimer = value;
      }
    });
  }

  // Panggil fungsi untuk membuat elemen input
  createInputElements();

  // Inisialisasi nilai yang ditampilkan
  document.getElementById("soal-input").value = jumlahSoal;
  document.getElementById("timer-input").value = jumlahTimer;

  // 1. Event listener untuk tombol kembali
  kembaliBtn.addEventListener("click", function () {
    kataBakuEl.style.display = "none";
    berandaEl.style.display = "flex";
  });

  // Mulai: Beranda Awal -> Beranda Kata Baku
  kataBakuBtn.addEventListener("click", function () {
    berandaEl.style.display = "none";
    kataBakuEl.style.display = "flex";
  });

  // Pengaturan jumlah soal
  kurangSoalBtn.addEventListener("click", function () {
    if (jumlahSoal > 1) {
      jumlahSoal--;
      document.getElementById("soal-input").value = jumlahSoal;
      // Update maksimal timer setiap kali jumlah soal berubah
      updateMaxTimer();
    }
  });

  tambahSoalBtn.addEventListener("click", function () {
    if (jumlahSoal < maxJumlahSoal) {
      jumlahSoal++;
      document.getElementById("soal-input").value = jumlahSoal;
      // Update maksimal timer setiap kali jumlah soal berubah
      updateMaxTimer();
    }
  });

  // Toggle dark mode
  const modeToggleBtn = document.getElementById("mode-toggle");
  modeToggleBtn.addEventListener("click", function () {
    darkMode = !darkMode;
    if (darkMode) {
      body.classList.add("dark-mode");
      modeToggleBtn.textContent = "☀️";
    } else {
      body.classList.remove("dark-mode");
      modeToggleBtn.textContent = "🌙";
    }
  });

  // 3. Update pengaturan timer dengan aturan baru
  function updateMaxTimer() {
    const maxTimer = jumlahSoal * 3; // 3x lipat jumlah soal
    const timerInput = document.getElementById("timer-input");

    // Aktifkan tombol timer
    tambahTimerBtn.disabled = false;
    kurangTimerBtn.disabled = false;
    tambahTimerBtn.style.opacity = 1;
    kurangTimerBtn.style.opacity = 1;

    // Jika timer saat ini lebih dari maksimal, atur ke maksimal
    if (jumlahTimer > maxTimer) {
      jumlahTimer = maxTimer;
      timerInput.value = jumlahTimer;
    }
  }

  // Update maksimal timer saat pertama kali dimuat
  updateMaxTimer();

  kurangTimerBtn.addEventListener("click", function () {
    if (jumlahTimer > 0) {
      jumlahTimer--;
      document.getElementById("timer-input").value = jumlahTimer;
    }
  });

  tambahTimerBtn.addEventListener("click", function () {
    const maxTimer = jumlahSoal * 3; // 3x lipat jumlah soal
    if (jumlahTimer < maxTimer) {
      jumlahTimer++;
      document.getElementById("timer-input").value = jumlahTimer;
    }
  });

  // Acak array data
  function acakArray(array) {
    const arraySalin = [...array];
    for (let i = arraySalin.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arraySalin[i], arraySalin[j]] = [arraySalin[j], arraySalin[i]];
    }
    return arraySalin;
  }

  // 3. Fungsi untuk memulai timer (diubah agar tidak reset untuk setiap soal)
  function mulaiTimer() {
    const timerContainer = document.querySelector(".timer-container");

    // Jika timer 0, sembunyikan timer container dan return
    if (jumlahTimer <= 0) {
      timerContainer.style.display = "none";
      return;
    } else {
      timerContainer.style.display = "block"; // Tampilkan timer jika > 0
    }

    if (!timerBerjalan) {
      // Hanya set waktu di awal permainan
      sisaDetik = jumlahTimer;
      timerBerjalan = true;
    }

    // Tampilkan waktu awal
    updateTimerDisplay();

    // Jalankan timer
    timer = setInterval(function () {
      sisaDetik--;
      updateTimerDisplay();

      // Jika waktu habis
      if (sisaDetik <= 0) {
        clearInterval(timer);
        timerBerjalan = false;
        // Otomatis tampilkan halaman hasil dengan pesan waktu habis
        soalEl.style.display = "none";
        resultHeaderEl.style.backgroundColor = "#e74c3c"; // Merah
        resultHeaderEl.querySelector("h1").textContent = "WAKTU HABIS!";

        // Isi konten penjelasan dengan data soal terakhir
        const data = soalDataAcak[soalSekarang];
        kataBakuDivEl.textContent = data.baku;
        tidakBakuEl.innerHTML = `bentuk tidak baku: <strong>${data.tidakBaku}</strong>`;

        // Update arti kata
        artiListEl.innerHTML = "";
        data.arti.forEach((art) => {
          const li = document.createElement("li");
          li.innerHTML = `<span class="merah">${data.jenis}</span> ${art}`;
          artiListEl.appendChild(li);
        });

        containerEl.style.display = "flex";

        // Update tombol
        if (soalSekarang === jumlahSoal - 1) {
          lanjutSelesaiBtn.textContent = "SELESAI";
        } else {
          lanjutSelesaiBtn.textContent = "LANJUT";
        }
      }
    }, 1000);
  }

  // Fungsi untuk menghentikan timer
  function hentikanTimer() {
    if (timer) {
      clearInterval(timer);
    }
  }

  // Fungsi untuk memperbarui tampilan timer
  function updateTimerDisplay() {
    document.getElementById("detik").textContent = sisaDetik
      .toString()
      .padStart(2, "0");
  }

  // Mulai permainan
  mulaiBtn.addEventListener("click", function () {
    // Dapatkan nilai terbaru dari input
    jumlahSoal = parseInt(document.getElementById("soal-input").value);
    jumlahTimer = parseInt(document.getElementById("timer-input").value);

    // Acak urutan data kata
    soalDataAcak = acakArray(kataData).slice(0, jumlahSoal);
    soalSekarang = 0;
    jawabanBenar = 0;
    timerBerjalan = false; // Reset status timer

    kataBakuEl.style.display = "none";
    tampilkanSoal();
    soalEl.style.display = "flex";

    // Mulai timer saat game dimulai
    mulaiTimer();
  });

  // Tampilkan soal
  function tampilkanSoal() {
    const data = soalDataAcak[soalSekarang];

    // Acak posisi kata baku dan tidak baku
    const acakPosisi = Math.random() > 0.5;

    if (acakPosisi) {
      opsiBtn1.textContent = data.baku;
      opsiBtn2.textContent = data.tidakBaku;
    } else {
      opsiBtn1.textContent = data.tidakBaku;
      opsiBtn2.textContent = data.baku;
    }
  }

  // Handler klik opsi jawaban
  opsiBtn1.addEventListener("click", function () {
    cekJawaban(opsiBtn1.textContent);
  });

  opsiBtn2.addEventListener("click", function () {
    cekJawaban(opsiBtn2.textContent);
  });

  // Cek jawaban
  function cekJawaban(jawaban) {
    // Hentikan timer saat user menjawab
    hentikanTimer();

    const data = soalDataAcak[soalSekarang];
    const benar = jawaban === data.baku;

    if (benar) {
      jawabanBenar++;
    }

    tampilkanHasil(benar, data);
  }

  // Tampilkan hasil
  function tampilkanHasil(benar, data) {
    soalEl.style.display = "none";
    containerEl.style.display = "flex";

    // Update header hasil
    if (benar) {
      resultHeaderEl.style.backgroundColor = "#58b36d"; // Hijau
      resultHeaderEl.querySelector("h1").textContent = "BENAR!";
    } else {
      resultHeaderEl.style.backgroundColor = "#e74c3c"; // Merah
      resultHeaderEl.querySelector("h1").textContent = "SALAH!";
    }

    // Update konten hasil
    kataBakuDivEl.textContent = data.baku;
    tidakBakuEl.innerHTML = `bentuk tidak baku: <strong>${data.tidakBaku}</strong>`;

    // Gunakan fungsi updateArtiKata baru
    updateArtiKata(data);

    // Update tombol lanjut/selesai
    if (soalSekarang === jumlahSoal - 1) {
      lanjutSelesaiBtn.textContent = "SELESAI";
    } else {
      lanjutSelesaiBtn.textContent = "LANJUT";
    }
  }

  // Handler tombol lanjut/selesai
  lanjutSelesaiBtn.addEventListener("click", function () {
    containerEl.style.display = "none";

    if (soalSekarang === jumlahSoal - 1) {
      // Soal terakhir, kembali ke beranda
      berandaEl.style.display = "flex";
      timerBerjalan = false; // Reset status timer saat game selesai
    } else {
      // Lanjut ke soal berikutnya
      soalSekarang++;
      tampilkanSoal();
      soalEl.style.display = "flex";

      // Jalankan timer lagi saat pindah ke soal berikutnya
      // Timer tidak direset (lanjut dari waktu yang tersisa)
      if (jumlahTimer > 0) {
        mulaiTimer();
      }
    }
  });

  function updateArtiKata(data) {
    artiListEl.innerHTML = "";

    // Periksa format data.arti
    if (typeof data.arti[0] === "object") {
      // Format baru dengan multiple jenis kata
      data.arti.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `<span class="merah">${item.jenis}</span> ${item.definisi}`;
        artiListEl.appendChild(li);
      });
    } else {
      // Format lama (satu jenis kata)
      data.arti.forEach((art) => {
        const li = document.createElement("li");
        const jenisKata = Array.isArray(data.jenis)
          ? data.jenis[0]
          : data.jenis;
        li.innerHTML = `<span class="merah">${jenisKata}</span> ${art}`;
        artiListEl.appendChild(li);
      });
    }
  }
});
