import { useState } from "react";
import mockData from "../../data/data.json";
import { Item } from "../../interfaces/CustomTable";
import { CustomTable } from "../CustomTable";
import { PageEnum } from "../../interfaces/Home";
import { ItemForm } from "../Forms";

const options = [5, 10, 15];

const mockItems: Item[] = mockData.map((item) => ({
  ...item,
  startDate: new Date(item.startDate), // Convert string to Date
}));

export const Home = () => {
  const [items, setItems] = useState<Item[]>(mockItems);
  const [showPage, setShowPage] = useState(PageEnum.list);
  const [itemToEdit, setItemToEdit] = useState({} as Item);

  // useEffect(() => {
  //   const listInString = window.localStorage.getItem("items");
  //   if (listInString) {
  //     _setItems(JSON.parse(listInString));
  //   }
  // }, []);

  const onAddItemClickHnd = () => setShowPage(PageEnum.add);

  const showListPage = () => setShowPage(PageEnum.list);

  // const _setItems = (list: Item[]) => {
  //   setItems(list);
  //   window.localStorage.setItem("items", JSON.stringify(list));
  // };

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
            <>
              <input
                type="button"
                value="Add Employee"
                onClick={onAddItemClickHnd}
                className="add-employee-btn"
              />
              <CustomTable
                items={items}
                options={options}
                onDeleteClickHnd={deleteItem}
                onEdit={editItem}
              />
            </>
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
