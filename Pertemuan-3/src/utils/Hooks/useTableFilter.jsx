import { useState, useMemo } from "react";

/**
 * Hook untuk filter (search) + sort data tabel secara client-side.
 *
 * @param {Array}  data         - Array data asli dari React Query
 * @param {Array}  searchFields - Field-field yang ikut dicari, e.g. ["nim", "nama"]
 * @returns {{ searchQuery, setSearchQuery, sortConfig, handleSort, filteredAndSorted }}
 */
export const useTableFilter = (data = [], searchFields = []) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, order: "asc" });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      order: prev.key === key && prev.order === "asc" ? "desc" : "asc",
    }));
  };

  const filteredAndSorted = useMemo(() => {
    let result = [...data];

    // --- Search / Filter ---
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((item) =>
        searchFields.some((field) =>
          String(item[field] ?? "").toLowerCase().includes(q)
        )
      );
    }

    // --- Sort ---
    if (sortConfig.key) {
      result.sort((a, b) => {
        const valA = String(a[sortConfig.key] ?? "").toLowerCase();
        const valB = String(b[sortConfig.key] ?? "").toLowerCase();
        if (valA < valB) return sortConfig.order === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.order === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
    // searchFields bersifat konstan (didefinisikan di luar komponen), aman diabaikan
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, searchQuery, sortConfig]);

  return {
    searchQuery,
    setSearchQuery,
    sortConfig,
    handleSort,
    filteredAndSorted,
  };
};
