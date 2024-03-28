export interface IPagination {
  options: number[];
  itemsPerPage: number;
  totalPages: number;
  handleItemsPerPage: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleCurrentPage: (pageNum: number) => void;
}

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
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button onClick={() => handleCurrentPage(i + 1)}>{i + 1}</button>
        ))}
      </div>
    </div>
  );
};
