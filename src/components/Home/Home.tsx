import { useState } from "react";

import mockData from "../../data/data.json";
import { Item } from "../../interfaces/CustomTable";
import { CustomTable } from "../CustomTable";
import { PageEnum } from "../../interfaces/Home";
import { ItemForm } from "../Forms";
import "./style.css";

const options = [5, 10, 15];

const mockItems: Item[] = mockData.map((item) => ({
  ...item,
  startDate: new Date(item.startDate),
}));

export const Home = () => {
  const [items, setItems] = useState<Item[]>(mockItems);
  const [showPage, setShowPage] = useState(PageEnum.list);
  const [itemToEdit, setItemToEdit] = useState({} as Item);

  const onAddItemClickHnd = () => setShowPage(PageEnum.add);

  const showListPage = () => setShowPage(PageEnum.list);

  const addItem = (item: Item) => setItems([...items, item]);

  const deleteItem = (item: Item) => {
    // To Index from array i,e items
    // Splice that
    // Update new record

    const indexToDelete = items.indexOf(item);
    const tempList = [...items];
    tempList.splice(indexToDelete, 1);
    setItems(tempList);
  };

  const editItem = (item: Item) => {
    setShowPage(PageEnum.edit);
    setItemToEdit(item);
  };

  const updateItem = (item: Item) => {
    const filteredData = items.filter((x) => x.id === item.id)[0];
    const indexOfRecord = items.indexOf(filteredData);
    const tempData = [...items];
    tempData[indexOfRecord] = item;
    setItems(tempData);
  };

  return (
    <>
      <article className="article-header">
        <header>
          <h1>Custom Table: Sortable, Pagination and CRUD</h1>
        </header>
      </article>
      <section>
        {showPage === PageEnum.list && (
          <div className="table_container">
            <div className="add_container">
              <input
                type="button"
                value="Add Employee"
                onClick={onAddItemClickHnd}
                className="add_button"
              />
              <CustomTable
                items={items}
                options={options}
                onDeleteClickHnd={deleteItem}
                onEdit={editItem}
              />
            </div>
          </div>
        )}
        {showPage === PageEnum.add && (
          <ItemForm
            formType={PageEnum.add}
            onBackBtnClickHnd={showListPage}
            onSubmitClickHnd={addItem}
          />
        )}
        {showPage === PageEnum.edit && (
          <ItemForm
            formType={PageEnum.edit}
            item={itemToEdit}
            onBackBtnClickHnd={showListPage}
            onSubmitClickHnd={updateItem}
          />
        )}
      </section>
    </>
  );
};
