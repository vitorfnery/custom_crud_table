import { Item } from "../../interfaces/CustomTable";

interface IModal {
  onClose: () => void;
  data: Item;
}

export const ItemModal = ({ onClose, data }: IModal) => {
  const { fullName, email, age, startDate } = data;
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h3>Item Data</h3>
        <div>
          <div>
            <label>Full Name : {fullName}</label>
          </div>
          <div>
            <label>Email : {email}</label>
          </div>
          <div>
            <label>Age : {age}</label>
          </div>
          <div>
            <label>Start Date : {startDate.toLocaleDateString()}</label>
          </div>
        </div>
      </div>
    </div>
  );
};
