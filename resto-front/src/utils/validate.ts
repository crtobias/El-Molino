import { SetStateAction } from "react";
import { DishDataError, Dishdata, LoginData } from "../types";

export const validateDishForm = ({ title, price, description, categories, image }: Dishdata): DishDataError => {
  const errors: SetStateAction<Partial<DishDataError> | Record<string, never>> = {};
  
  if (!title) {
    errors.title = 'Nombre del plato es requerido';
  }

  if (title.length > 75) {
    errors.title = 'Máximo de 75 caracteres';
  }
  
  if (!description) {
    errors.description = 'La descripción del plato es requerida';
  }
  
  if (description.length > 300) {
    errors.title = 'Máximo de 300 caracteres';
  }

  if (!image) {
    errors.image = 'La foto del plato es requerida';
  }

  if (!price) {
    errors.price = 'Precio del plato es requerido';
  }

  if (price <= 0) {
    errors.price = 'Precio debe ser mayor a 0'
  }

  if (!categories) {
    errors.categories = 'Debe seleccionar una categoría'
  }

  if (!['main', 'appetizer', 'dessert', 'drink'].includes(categories)) {
    errors.categories = 'La selección debe ser Plato principal, Entrada, Postre o Bebida'
  }
  
  return errors as DishDataError;
}

export const validateLoginForm = ({email, password}: LoginData) => {
  const errors: SetStateAction<Partial<{email: string, password: string}> | Record<string, never>> = {};      

  if(email.length === 0 ){
      errors.email = "Debe ingresar un email"
  }

  if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "el email no es valido"
  }

  if(email.length > 35) {
      errors.email = "el email no puede sobrepasar 35 caracteres"
  }

  if(!/.*\d+.*/.test(password)) {
      errors.password = "la contraseña debe contener al menos un número"
  }

  if(password.length < 6 || password.length > 10) {
      errors.password = "la contraseña debe tener entre 6 y 10 caracteres"
  }

  return errors as LoginData;
}