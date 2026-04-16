// latihan soal

// 1. buat 1 object mahasiswa terdiri:
//    - nama
//    - nim
// 2. buat array object listMatkul, tiap object terdiri dari:
//    - matkulId
//    - nilai
//    - matkulNama
// 3. spread arry listMatkul ke dalam obj mahasiswa
// 4. tampilkan dengan literal, output biodata mahasiswa dan matkul yang di ambil

const mahasiswa = {
   nama: "syaifur",
   nim: "A11.2012"
};

const listMatkul = [
   {
      matkulId: 2,
      matkulNama: "Basis Data",
      nilai: 90
   },
   {
      matkulId: 3,
      matkulNama: "Alpro",
      nilai: 100
   },
   {
      matkulId: 60,
      matkulNama: "Daspro",
      nilai: 99
   },
];

const new_mahasiswa = {
   ...mahasiswa,
   listMatkul
};

console.log(new_mahasiswa);