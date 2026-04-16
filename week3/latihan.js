// variabel, menampung 1 data
const nim = "06543";

// variabel array, menampung multiple data tapi 1 tipe data
const list_nim = ["06543", "06545", "12543"];

// object, menampung multiple data dan multiple tipe data
const mahasiswa = {
    // key: value
    // key nya ada nim nama dan status
    // key punya value masing masing
    nim: "06543",
    nama: "Rudi Santoso",
    umur: 21,
    status: true,
};

console.log(mahasiswa);

// array of object
const list_mahasiswa = [
    {
        nama: "mahasiswa 1",
        nim: "A11.123123",
        umur: 17
    },
    {
        nama: "mahasiswa 2",
        nim: "A11.1111",
        umur: 18
    }
];

console.log(list_mahasiswa);

// destructuring object, ambil value dari key object
const mahasiswa2 = {
    nim: "06543",
    nama: "Rudi Santoso",
    umur: 21,
    status: true,
};

// const umur = mahasiswa2.umur;
// console.log(umur);

// if(umur > 21){
//     console.log("yee tua");
// }else{
//     console.log("umur tidak pantasts");
// }

// lanjutkan untuk ambil data nim, nama dan statusnya
// buat tampilan output biodata diri

// const nama = mahasiswa2.nama;
// const nim = mahasiswa2.nim;
// const status = mahasiswa2.status;

const { nama, umur, status } = mahasiswa2;

console.log("Nama: "+nama+", umur: "+umur);

// literal output, konsep penggabungan variabel dengan string
console.log(`Nama: ${nama}, umur: ${umur}`);

// array of objects
const listMahasiswa = [
    { nim: "123", nama: "jhon", umur: 18, status:true },
    { nim: "4421", nama: "yanti", umur: 21, status:false },
    { nim: "1231", nama: "pantasts", umur: 24, status:true },
];

// spread, nambah data
const mhs3 = { nim: "21s21", nama: "yuhuu", umur: 20, status:true };

// spread ke array, tambahkan data ke array
const new_listMahasiswa = [
    ...listMahasiswa,
    mhs3
];

// data before 3, data after 4
console.log(new_listMahasiswa);

const ipk = 3.7;

// spread ke object
const new_mhs3 = {
    ...mhs3,
    ipk
};

console.log(new_mhs3);