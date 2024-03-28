import { useState } from "react";

import { IColumn, Item } from "../../interfaces/CustomTable";
import { TableHead } from "./TableHead";
import { TableBody } from "./TableBody";
import { Pagination } from "./Pagination";

export interface ICustomTable {
  items: Item[];
  options: number[];
  onDeleteClickHnd: (item: Item) => void;
  onEdit: (item: Item) => void;
}

export const CustomTable = ({
  items,
  options,
  onDeleteClickHnd,
  onEdit,
}: ICustomTable) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [sortField, setSortField] = useState<keyof Item | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

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

  const sortItems = (items: Item[]): Item[] => {
    if (!sortField) return items;

    return [...items].sort((a, b) => {
      if (a[sortField] < b[sortField]) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (a[sortField] > b[sortField]) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const handleSorting = (field: keyof Item) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const sortedItems = sortItems(items);
  const itemsDisplayed = sortedItems.slice(startIndex, endIndex);
  const columns: IColumn[] = [
    { label: "Full Name", accessor: "fullName", sortable: true },
    { label: "Email", accessor: "email", sortable: true },
    { label: "Age", accessor: "age", sortable: true },
    { label: "Start date", accessor: "startDate", sortable: true },
  ];

  return (
    <div>
      <table>
        <caption>Sortable Table with Pagination</caption>
        <TableHead
          columns={columns}
          handleSorting={handleSorting}
          sortField={sortField}
          sortOrder={sortOrder}
        />
        <TableBody
          items={itemsDisplayed}
          onDeleteClickHnd={onDeleteClickHnd}
          onEdit={onEdit}
        />
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
