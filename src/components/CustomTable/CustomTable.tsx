import { useState } from "react";
import { ICustomTable } from "../../interfaces/CustomTable";
import { Pagination } from "./Pagination";

export const CustomTable = ({ items, options }: ICustomTable) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handleCurrentPage = (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  const handleItemsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsDisplayed = items.slice(startIndex, endIndex);

  return (
    <div>
      <table>
        <caption>Sortable Table with Pagination</caption>
      </table>
      <Pagination
        options={options}
        itemsPerPage={itemsPerPage}
        totalPages={totalPages}
        handleItemsPerPage={handleItemsPerPage}
        handleCurrentPage={handleCurrentPage}
      />
    </div>
  );
};
