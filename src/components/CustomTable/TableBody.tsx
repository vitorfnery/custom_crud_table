
import { ITableBody } from "../../interfaces/CustomTable";

export const TableBody = ({ items }: ITableBody) => {
  return (
    <tbody>
      {items.map((item) => (
        <tr key={item.id}>
          <td>{item.fullName}</td>
          <td>{item.email}</td>
          <td>{item.age}</td>
          <td>{item.startDate.toLocaleDateString()}</td>
        </tr>
      ))}
    </tbody>
  );
};
