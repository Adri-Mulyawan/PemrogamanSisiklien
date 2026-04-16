const mahasiswa = {
   nama: "Adri Mulyawan",
   nim: "A11.2023.14926"
};

const listMatkul = [
   {
      matkulId: 2,
      matkulNama: "Basis Data",
      nilai: 95
   },
   {
      matkulId: 3,
      matkulNama: "Alpro",
      nilai: 100
   },
   {
      matkulId: 60,
      matkulNama: "Daspro",
      nilai: 90
   },
];

const new_mahasiswa = {
   ...mahasiswa,
   listMatkul
};

console.log(new_mahasiswa);
