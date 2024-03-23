import { ITableHead } from "../../interfaces/CustomTable";

export const TableHead = ({
  columns,
  handleSorting,
  sortField,
  sortOrder,
}: ITableHead) => {
  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor, sortable }) => {
          const handleSortingOnClick = () =>
            sortable && handleSorting(accessor);
          const cl =
            sortable && sortField === accessor
              ? sortOrder === "asc"
                ? "up"
                : "down"
              : "default";
          return (
            <th onClick={handleSortingOnClick} className={cl}>
              {label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
