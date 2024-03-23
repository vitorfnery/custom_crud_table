import { CustomTable } from "./components/CustomTable";
import data from "./data/data.json";
import { Item } from "./interfaces/CustomTable";

const options = [5, 10, 15];

const items: Item[] = data.map((item) => ({
  ...item,
  startDate: new Date(item.startDate), // Convert string to Date
}));

const App = () => {
  return (
    <div className="table_container">
      <CustomTable items={items} options={options} />
    </div>
  );
};

export default App;
