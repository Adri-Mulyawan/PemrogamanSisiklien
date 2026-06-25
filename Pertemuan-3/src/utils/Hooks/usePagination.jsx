import { useState, useMemo, useEffect } from "react";

// Hook untuk pagination data
export const usePagination = (data = [], initialItemsPerPage = 5) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));

  // Kalau jumlah data berubah, kembali ke halaman pertama
  useEffect(() => {
    setCurrentPage(1);
  }, [data.length]);

  // Mencegah halaman melebihi total halaman yang tersedia
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);

  const paginatedData = useMemo(
    () => data.slice(startIndex, endIndex),
    [data, startIndex, endIndex]
  );

  const goToPage = (page) => {
    const clamped = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(clamped);
  };

  const goToNext = () => goToPage(currentPage + 1);

  const goToPrev = () => goToPage(currentPage - 1);

  const handleSetItemsPerPage = (n) => {
    setItemsPerPage(Number(n));
    setCurrentPage(1);
  };

  return {
    currentPage,
    totalPages,
    paginatedData,
    startIndex,
    endIndex,
    totalItems: data.length,
    goToPage,
    goToNext,
    goToPrev,
    itemsPerPage,
    setItemsPerPage: handleSetItemsPerPage,
  };
};