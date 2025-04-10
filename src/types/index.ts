export interface UserDate {
  data: User[];
  count: number;
}

export interface FormUserData {
  name: string;
  extra: string;
  phone: string;
  vehicle: string;
  wash: string;
  plate: string;
  price: number;
  finished: boolean;
}
export interface User extends FormUserData {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Services {
  _id?: string;
  service: Service[];
  vehicleType: string;
}

export interface Service {
  _id?: string;
  nameService: string;
  price: number;
}

export interface UsersUnfinished {
  count: number;
  data: User[];
}

export interface ServiceProps {
  vehicleType: string;
  service: Service[];
}

export interface NewVehicleProps {
  service: Services;
  setService: React.Dispatch<React.SetStateAction<Services>>;
  updateService: () => void;
}

//Expenses Pages
export interface ExpenseProps {
  name: string;
  price: number;
  type: string;
}
export interface TypeExpenseProps {
  _id?: string;
  name: string;
}
export interface DataTableProps extends ExpenseProps {
  _id: string;
  day: number;
}

export interface DataMonthProps {
  averagePerDay: number;
  totalUsers: number;
}
export interface SingleDataReport {
  label: string;
  price: number;
}

export interface DataReport {
  expenses: SingleDataReport[];
  incomes: SingleDataReport[];
  balance: SingleDataReport[];
}

export interface SingleComparative {
  label: string;
  val1: number;
  val2: number;
}
export interface ComparativeDataReport {
  expenses: SingleComparative[];
  incomes: SingleComparative[];
  balance: SingleComparative[];
}
export interface DataExtraProps {
  name: string;
  price: number;
}
