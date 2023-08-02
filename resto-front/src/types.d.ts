/// <reference types="vite/client" />

export interface A {
  name: number
}

// export type Menu = {
//   name        : string
//   img         : string
//   price       : string
//   tipo        : string
//   description : string
// }
export interface Order  {
  id:number
  items: Menu[]
}



export type State = {
  cart: Menu[]
  menus: IMenu[]
  orders: Order[]
  order: Order[]
  currentTable: number | null
  // priceFilter: number
  // reviewFilter: number
  searchFilter: string
  lessThanPriceFilter: number
  moreThanPriceFilter: number
  lessThanReviewFilter: number
  moreThanReviewFilter: number
  categoryFilter: string
  userRol: string
}

export interface FormMenuData { 
  name: string
  precio: string
  descripcion: string
  tipo: string
} 

export type InputSelect = React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>

export interface Props {
  children: string | JSX.Element | JSX.Element[]
}

export interface ButtonProps extends Props {
  action: Function
}

export interface IMenu {
  _id: number | string 
  title: string
  ingredients: string[]
  price: string
  categories: string
  reviews: number[]
  image: string
  description: string
  active:boolean
}

export interface IProcessedMenu {
  [key: string]: Omit<IMenu, "categories">
}

export interface Dishdata {
  title: string,
  price: number,
  description: string,
  categories: string,
  image: string,
  reviews: number[],
  active: boolean
}

export interface DishDataError {
  title: string,
  price: string,
  description: string,
  categories: string,
  image: file,
}

export interface LoginData {
  email: string;
  password: string;
}

interface TableData {
  name: string;
  waiter: string;
  subject: string;
}
interface TableUser {
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  active:boolean;
}
interface User {
  id: string; 
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  active: boolean;
  deleted: boolean;
}
interface UserCardProps {
  user: User;
  onDelete: () => Promise<void>;
}