import { useState } from "react";
import { Item } from "../../interfaces/CustomTable";
import { PageEnum } from "../../interfaces/Home";

interface IItemForm {
  formType: PageEnum.add | PageEnum.edit;
  item?: Item;
  onBackBtnClickHnd: () => void;
  onSubmitClickHnd: (item: Item) => void;
}

export const ItemForm = ({
  formType,
  item,
  onBackBtnClickHnd,
  onSubmitClickHnd,
}: IItemForm) => {
  const [fullName, setFullName] = useState<string>(
    formType === PageEnum.edit && item ? item.fullName : ""
  );
  const [email, setEmail] = useState<string>(
    formType === PageEnum.edit && item ? item.email : ""
  );
  const [age, setAge] = useState<number>(
    formType === PageEnum.edit && item ? item.age : 0
  );
  const [startDate, setStartDate] = useState<Date>(
    formType === PageEnum.edit && item ? item.startDate : new Date()
  );
  const onFullNameChangeHnd = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFullName(e.target.value);
  const onEmailChangeHnd = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const onAgeChangeHnd = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAge(parseInt(e.target.value, 10));
  const onStartDateChangeHnd = (e: React.ChangeEvent<HTMLInputElement>) =>
    setStartDate(new Date(e.target.value));
  const onSubmitBtnClickHnd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let submitId: number;
    if (formType === PageEnum.add) {
      submitId = new Date().getTime();
    } else if (item) {
      submitId = item.id;
    } else {
      submitId = Number();
    }
    const submitData: Item = {
      id: submitId,
      fullName: fullName,
      age: age,
      email: email,
      startDate: startDate,
    };
    onSubmitClickHnd(submitData);
    onBackBtnClickHnd();
  };
  const formInfo = formType === PageEnum.add ? "Add" : "Edit";
  const handleConvertDateToString = (startDate: Date) =>
    startDate.toISOString().slice(0, 10);
  const getConvertDateToString = handleConvertDateToString(startDate);
  return (
    <div className="form-container">
      <div>
        <h3>{formInfo} Item Form</h3>
      </div>
      <form onSubmit={onSubmitBtnClickHnd}>
        <div>
          <label htmlFor="firsName">Full Name : </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={onFullNameChangeHnd}
          />
        </div>
        <div>
          <label htmlFor="emailAdd">Email Add. : </label>
          <input
            type="email"
            id="emailAdd"
            value={email}
            onChange={onEmailChangeHnd}
          />
        </div>
        <div>
          <label htmlFor="age">Age : </label>
          <input type="number" id="age" value={age} onChange={onAgeChangeHnd} />
        </div>
        <div>
          <label htmlFor="startDate">Start Date : </label>
          <input
            type="date"
            id="startDate"
            value={getConvertDateToString}
            onChange={onStartDateChangeHnd}
          />
        </div>
        <div className="item_form_actions">
          <input
            type="button"
            value="Back"
            onClick={onBackBtnClickHnd}
            className="action_button"
          />
          <input
            type="submit"
            value={`${formInfo} Employee`}
            className="action_button"
          />
        </div>
      </form>
    </div>
  );
};
