const mataKuliahList = {
	mataKuliah: [
		{ kode: "MK001", nama: "Basis Data", sks: 3 },
		{ kode: "MK002", nama: "Alpro", sks: 3 },
		{ kode: "MK003", nama: "Daspro", sks: 3 }
	]
};

const mahasiswaList = {
	mahasiswa: [
		{
			nim: "A11.2023.14926",
			nama: "Adri Mulyawan",
			status: true,
			matkul: [
				{ matkulId: "MK001", tugas: 80, uts: 85, uas: 90 },
				{ matkulId: "MK002", tugas: 75, uts: 80, uas: 85 }
			]
		},
		{
			nim: "22002",
			nama: "Zia Ahmada",
			status: true,
			matkul: [
				{ matkulId: "MK003", tugas: 85, uts: 88, uas: 90 }
			]
		}
	]
};


// menampilkan semua data mahasiswa dan mata kuliah
const show = () => {

	mahasiswaList.mahasiswa.forEach((mhs) => {
		console.log(`NIM: ${mhs.nim}, Nama: ${mhs.nama}, Status: ${mhs.status ? "Aktif" : "Tidak Aktif"}`);
		console.log("Mata Kuliah:");
		
		mhs.matkul.forEach((mk) => {
			const matkulName = mataKuliahList.mataKuliah.find((m) => m.kode === mk.matkulId).nama;
			console.log(`- ${matkulName}: Tugas ${mk.tugas}, UTS ${mk.uts}, UAS ${mk.uas}`);
		});
	});
};

show();


// menambahkan data mahasiswa ke dalam array
const add = (mahasiswa) => mahasiswaList.mahasiswa.push(mahasiswa);

add({
	nim: "A11.2023",
	nama: "Andi Setiawan",
	status: true,
	matkul: [{ matkulId: "MK003", tugas: 88, uts: 85, uas: 90 }]
});

console.log(mahasiswaList);


// mengupdate data mahasiswa berdasarkan NIM
const update = (nim, dataBaru) => {

	mahasiswaList.mahasiswa = mahasiswaList.mahasiswa.map((m) =>
		m.nim === nim ? { ...m, ...dataBaru } : m
	);
};

update("22001", { status: false });

console.log(mahasiswaList);


// menghapus mahasiswa berdasarkan NIM
const deleteById = (nim) => {
	mahasiswaList.mahasiswa = mahasiswaList.mahasiswa.filter((m) => m.nim !== nim);
};

deleteById("22002");

console.log(mahasiswaList);


// menghitung total nilai (tugas + uts + uas)
const totalNilai = (nim) => {

	const mahasiswa = mahasiswaList.mahasiswa.find((m) => m.nim === nim);		
	if (!mahasiswa) return "Mahasiswa tidak ditemukan";
	
	return mahasiswa.matkul.map((mk) => {
		const total = mk.tugas + mk.uts + mk.uas;
		return { matkulId: mk.matkulId, total };
	});
};

console.log(totalNilai("22001"));


// menentukan kategori nilai (A, B, C, D, E)
const kategoriNilai = (nilai) => {

	if (nilai >= 85) return "A";
	if (nilai >= 75) return "B";
	if (nilai >= 65) return "C";
	if (nilai >= 50) return "D";
	
	return "E";
};

console.log(kategoriNilai(88)); // Output: A
console.log(kategoriNilai(72)); // Output: B


// menghitung IPS berdasarkan nilai dan SKS
const IPS = (nim) => {

	const mahasiswa = mahasiswaList.mahasiswa.find((m) => m.nim === nim);
	
	if (!mahasiswa) return "Mahasiswa tidak ditemukan";
	
	const totalSks = mahasiswa.matkul.reduce((sum, mk) => {
		const matkul = mataKuliahList.mataKuliah.find((m) => m.kode === mk.matkulId);
		return sum + matkul.sks;
	}, 0);
	
	const totalNilai = mahasiswa.matkul.reduce((sum, mk) => {
		const total = mk.tugas * 0.3 + mk.uts * 0.3 + mk.uas * 0.4;
		const matkul = mataKuliahList.mataKuliah.find((m) => m.kode === mk.matkulId);
		return sum + total * matkul.sks;
	}, 0);
	
	return (totalNilai / totalSks).toFixed(2);
};

console.log(`IPS Mahasiswa 22001: ${IPS("22001")}`);


// menghitung jumlah mahasiswa
const jumlahMahasiswa = () => mahasiswaList.mahasiswa.length;

console.log(`Jumlah Mahasiswa: ${jumlahMahasiswa()}`);


// mengurutkan mahasiswa berdasarkan NIM
const sortByNIM = () => mahasiswaList.mahasiswa.sort((a, b) => a.nim.localeCompare(b.nim));

sortByNIM();

console.log(mahasiswaList);


// menghitung jumlah mahasiswa aktif dan tidak aktif
const jumlahAktifTidak = () => {
	return {
		aktif: mahasiswaList.mahasiswa.filter((m) => m.status).length,
		tidakAktif: mahasiswaList.mahasiswa.filter((m) => !m.status).length,
	};
};

console.log(jumlahAktifTidak());

// menghapus semua data mahasiswa
const clear = () => {
	mahasiswaList.mahasiswa = [];
};

clear();


// mengurutkan mahasiswa berdasarkan status (aktif dulu)
const sortByStatus = () => {
	mahasiswaList.mahasiswa.sort((a, b) => b.status - a.status);
};

sortByStatus();

console.log(mahasiswaList);


// clear array (alias hapus semua data)
const clearArray = () => {
	mahasiswaList.mahasiswa = [];
};

clearArray();