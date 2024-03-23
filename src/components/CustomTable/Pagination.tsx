import { IPagination } from "../../interfaces/CustomTable";

export const Pagination = ({
  options,
  itemsPerPage,
  totalPages,
  handleItemsPerPage,
  handleCurrentPage,
}: IPagination) => {
  return (
    <div>
      <div>
        <label htmlFor="howManyPerPage">Select how many items per page</label>
        <select
          id="howManyPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPage}
        >
          {options.map((option, index) => (
            <option value={option} key={index}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        {Array.from({ length: totalPages }, (_, i) => (
          <button onClick={() => handleCurrentPage(i + 1)}>{i + 1}</button>
        ))}
      </div>
    </div>
  );
};
