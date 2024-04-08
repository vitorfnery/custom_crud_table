import { IColumn, Item } from "../../interfaces/CustomTable";

export interface ITableHead {
  columns: IColumn[];
  handleSorting: (field: keyof Item) => void;
  sortField: keyof Item | null;
  sortOrder: "asc" | "desc";
}

export const TableHead = ({
  columns,
  handleSorting,
  sortField,
  sortOrder,
}: ITableHead) => {
  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor, sortable }, i) => {
          const handleSortingOnClick = () =>
            sortable && handleSorting(accessor);
          const cl =
            sortable && sortField === accessor
              ? sortOrder === "asc"
                ? "up"
                : "down"
              : "default";
          return (
            <th onClick={handleSortingOnClick} className={cl} key={i}>
              {label}
            </th>
          );
        })}
        <th>Actions</th>
      </tr>
    </thead>
  );
};
