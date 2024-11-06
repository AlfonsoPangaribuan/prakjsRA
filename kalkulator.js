        // Fungsi untuk validasi input hanya angka dan maksimal 3 digit serta tidak lebih dari 100
function validateInput(input) {
            // Hanya angka yang diterima, dan maksimal 3 digit
     input.value = input.value.replace(/[^0-9]/g, ''); // Menghapus karakter yang bukan angka
        if (input.value.length > 3) {
              input.value = input.value.slice(0, 3); // Batasi panjang input hanya 3 digit
        }
      
            // Batasi angka maksimal 100
        if (parseInt(input.value) > 100) {
              input.value = 100; // Jika lebih dari 100, set ke 100
         }
}
function hitungNilai() {
    const BOBOT_TUGAS = 0.3;
    const BOBOT_UTS = 0.3;
    const BOBOT_UAS = 0.4;
    const BATAS_LULUS = 60;

    let nama = document.getElementById("nama").value;
    let mataKuliah = document.getElementById("mataKuliah").value;
    let nilaiTugas = parseFloat(document.getElementById("nilaiTugas").value);
    let nilaiUTS = parseFloat(document.getElementById("nilaiUTS").value);
    let nilaiUAS = parseFloat(document.getElementById("nilaiUAS").value);

    if (!nama || !mataKuliah || isNaN(nilaiTugas) || isNaN(nilaiUTS) || isNaN(nilaiUAS)) {
        alert("Masukkan semua data dengan benar.");
        return;
    }

    let rataRata = (nilaiTugas * BOBOT_TUGAS) + (nilaiUTS * BOBOT_UTS) + (nilaiUAS * BOBOT_UAS);
    let nilaiHuruf = rataRata >= 90 ? "A" : rataRata >= 80 ? "B" : rataRata >= 70 ? "C" : rataRata >= 60 ? "D" : "E";
    let status = rataRata >= BATAS_LULUS ? "Lulus" : "Gagal";
    let statusClass = rataRata >= BATAS_LULUS ? "result-pass" : "result-fail";

    // Ambil data yang ada di localStorage dan pastikan itu array
    let hasilData = JSON.parse(localStorage.getItem("hasilData"));
    if (!Array.isArray(hasilData)) {
        hasilData = []; // Jika bukan array, inisialisasi sebagai array kosong
    }

    hasilData.push({
        nama,
        mataKuliah,
        nilaiTugas,
        nilaiUTS,
        nilaiUAS,
        rataRata: rataRata.toFixed(2),
        nilaiHuruf,
        status,
        statusClass
    });

    // Simpan array hasilData ke localStorage
    localStorage.setItem("hasilData", JSON.stringify(hasilData));

    document.getElementById("hasil").innerHTML = `
        <p>Nama: ${nama}</p>
        <p>Mata Kuliah: ${mataKuliah}</p>
        <p>Nilai Tugas (30%): ${nilaiTugas}</p>
        <p>Nilai UTS (30%): ${nilaiUTS}</p>
        <p>Nilai UAS (40%): ${nilaiUAS}</p>
        <p>Rata-rata Tertimbang: ${rataRata.toFixed(2)}</p>
        <p>Nilai Huruf: ${nilaiHuruf}</p>
        <p class="${statusClass}">Status: ${status}</p>
    `;

    const notification = document.createElement("div");
    notification.className = "alert alert-success mt-4";
    notification.textContent = "Data berhasil ditambahkan ke tabel!";
    document.querySelector(".container").prepend(notification);

    setTimeout(() => notification.remove(), 15000);
}
