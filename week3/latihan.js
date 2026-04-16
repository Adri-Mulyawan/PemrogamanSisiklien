const nim = "A11.2023.14926";

const list_nim = ["A11.2023.14926", "A11.2023.11111", "A11.2023.22222"];

const mahasiswa = {
    nim: "A11.2023.14926",
    nama: "Adri Mulyawan",
    umur: 21,
    status: true,
};

console.log(mahasiswa);

const list_mahasiswa = [
    {
        nama: "Zia Ahmada",
        nim: "A11.2023.33333",
        umur: 17
    },
    {
        nama: "Arkan Syauqi",
        nim: "A11.2023.44444",
        umur: 18
    }
];

console.log(list_mahasiswa);

const mahasiswa2 = {
    nim: "A11.2023.14926",
    nama: "Adri Mulyawan",
    umur: 21,
    status: true,
};

const { nama, umur, status } = mahasiswa2;

console.log("Nama: " + nama + ", umur: " + umur);

console.log(`Nama: ${nama}, umur: ${umur}`);

const listMahasiswa = [
    { nim: "A11.2023.14926", nama: "Adri Mulyawan", umur: 21, status: true },
    { nim: "A11.2023.55555", nama: "Zia Ahmada", umur: 21, status: false },
    { nim: "A11.2023.66666", nama: "Arkan Syauqi", umur: 24, status: true },
];

const mhs3 = { nim: "A11.2023.77777", nama: "Arkan Syauqi", umur: 20, status: true };

const new_listMahasiswa = [
    ...listMahasiswa,
    mhs3
];

console.log(new_listMahasiswa);

const ipk = 3.7;

const new_mhs3 = {
    ...mhs3,
    ipk
};

console.log(new_mhs3);