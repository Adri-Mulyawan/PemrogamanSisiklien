import fs from "fs";
import path from "path";

// Koleksi data yang diizinkan (harus sama dengan nama file di folder db/)
const VALID_COLLECTIONS = ["dosen", "kelas", "mahasiswa", "mata-kuliah", "user"];

// Data disimpan di memory selama instance function ini "hangat".
// Direset otomatis kalau ada deploy baru atau function idle lama (cold start).
let db = null;

function loadDb() {
    if (db) return db;
    const filePath = path.join(process.cwd(), "db.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    db = JSON.parse(raw);
    return db;
}

function generateId(items) {
    const maxId = items.reduce((max, item) => {
        const n = Number(item.id);
        return Number.isFinite(n) && n > max ? n : max;
    }, 0);
    return String(maxId + 1);
}

export default function handler(req, res) {
    // Izinkan request dari mana saja (aman karena data ini cuma data dummy latihan)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    const data = loadDb();

    const rawSlug = req.query.slug;
    const parts = Array.isArray(rawSlug) ? rawSlug : rawSlug ? [rawSlug] : [];
    const [collection, id] = parts;

    if (!VALID_COLLECTIONS.includes(collection)) {
        return res.status(404).json({ error: `Collection '${collection}' tidak ditemukan` });
    }

    if (!Array.isArray(data[collection])) {
        data[collection] = [];
    }
    const items = data[collection];

    // query params selain path (misal ?email=...)
    const { slug: _slug, ...filters } = req.query;

    switch (req.method) {
        case "GET": {
            if (id) {
                const item = items.find((it) => String(it.id) === String(id));
                if (!item) return res.status(404).json({ error: "Data tidak ditemukan" });
                return res.status(200).json(item);
            }
            let result = items;
            for (const [key, value] of Object.entries(filters)) {
                result = result.filter((it) => String(it[key]) === String(value));
            }
            return res.status(200).json(result);
        }

        case "POST": {
            const body = req.body || {};
            const newItem = { id: generateId(items), ...body };
            items.push(newItem);
            return res.status(201).json(newItem);
        }

        case "PUT": {
            if (!id) return res.status(400).json({ error: "ID diperlukan" });
            const idx = items.findIndex((it) => String(it.id) === String(id));
            if (idx === -1) return res.status(404).json({ error: "Data tidak ditemukan" });
            const body = req.body || {};
            items[idx] = { ...items[idx], ...body, id: items[idx].id };
            return res.status(200).json(items[idx]);
        }

        case "DELETE": {
            if (!id) return res.status(400).json({ error: "ID diperlukan" });
            const idx = items.findIndex((it) => String(it.id) === String(id));
            if (idx === -1) return res.status(404).json({ error: "Data tidak ditemukan" });
            const [deleted] = items.splice(idx, 1);
            return res.status(200).json(deleted);
        }

        default:
            return res.status(405).json({ error: "Method tidak didukung" });
    }
}
