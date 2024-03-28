import { useState } from "react";
import { Item } from "../../interfaces/CustomTable";
import { ItemModal } from "./ItemModal";

export interface ITableBody {
  items: Item[];
  onDeleteClickHnd: (item: Item) => void;
  onEdit: (item: Item) => void;
}

export const TableBody = ({ items, onDeleteClickHnd, onEdit }: ITableBody) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [dataToShow, setDataToShow] = useState(null as Item | null);
  const handleViewItem = (showModal: boolean) => setShowModal(!showModal);
  const handleClickViewItem = () => handleViewItem(showModal);
  const viewItem = (item: Item) => {
    setDataToShow(item);
    handleClickViewItem();
  };
  return (
    <>
      <tbody>
        {items.map((item) => {
          const handleDeleteItem = () => onDeleteClickHnd(item);
          const handleEditItem = () => onEdit(item);
          const handleShowModalInfo = () => viewItem(item);
          return (
            <tr key={item.id}>
              <td>{item.fullName}</td>
              <td>{item.email}</td>
              <td>{item.age}</td>
              <td>
                {item.startDate instanceof Date
                  ? item.startDate.toLocaleDateString()
                  : "Invalid Date"}
              </td>
              <td>
                <div className="row_actions">
                  <input
                    type="button"
                    value="View"
                    onClick={handleShowModalInfo}
                    className="action_button"
                  />
                  <input
                    type="button"
                    value="Edit"
                    onClick={handleEditItem}
                    className="action_button"
                  />
                  <input
                    type="button"
                    value="Delete"
                    onClick={handleDeleteItem}
                    className="action_button"
                  />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
      {showModal && dataToShow !== null && (
        <ItemModal onClose={handleClickViewItem} data={dataToShow} />
      )}
    </>
  );
};
