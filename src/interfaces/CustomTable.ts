export interface Item {
  id: number;
  fullName: string;
  email: string;
  age: number;
  startDate: Date;
}

export interface IColumn {
  label: string;
  accessor: keyof Item;
  sortable: boolean;
}
