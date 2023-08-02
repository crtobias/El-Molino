// DishForm.tsx
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postMenu } from '../../redux';
import { validateDishForm } from '../../utils';
import { DishDataError, Dishdata, State } from '@/types';
import styles from './Dish.module.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const DishForm = () => {
  
  const handleClick = async () => {
    Swal.fire({
      title: 'Bien',
      text: 'Se creo el menu',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
  };

  const { userRol } = useSelector((state: State) => state)
  const navigate = useNavigate()

  const protectedRoute = () => {
    if (userRol !== 'admin') {
      navigate('/')
    }
  }

  useEffect(() => {
    protectedRoute()
  }, [userRol])

  const dispatch = useDispatch(); 

  const initialData: Dishdata = {
    title: '',
    price: 0,
    description: '',
    categories: '',
    image: '',
    reviews: [],
    active: true,
  };

  const initialErrorData: DishDataError = {
    title: '',
    price: '',
    description: '',
    categories: '',
    image: '',
  };

  const [form, setForm] = useState<Dishdata>(initialData);
  const [errors, setErrors] = useState<DishDataError>(initialErrorData);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors(validateDishForm({ ...form, [name]: value }));
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'elmolino');

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dlnfio0dn/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          setForm((prevState) => ({
            ...prevState,
            image: data.url,
          }));
          Swal.fire({
            position: "center",
            heightAuto: true,
            imageUrl:data.url,
            text: "Imagen Cargada Correctamente.",
            width: 350,
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: "Error",
          });
          setErrors(validateDishForm({ ...form, image: data.url }));
        } else {
          console.error('Error al cargar la imagen');
        }
      } catch (error) {
        console.error('Error al cargar la imagen:', error);
      }
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Object.keys(errors).length > 0) return;

    dispatch<any>(postMenu(form));
    clearForm();
  }
    
  const clearForm = () => {
    setForm(initialData);
    setErrors(initialErrorData);
  };

  return (
    <form className={styles.formDish} onSubmit={handleSubmit}>
      <h4 className={styles.title}>Crear Menu</h4>
      <label htmlFor='title'>Nombre</label>
      <input name='title' placeholder='Nombre' className={styles.titleform} onChange={handleOnChange} value={form.title} />
      {errors.title ? <p className={styles.error}>{errors.title}</p> : ''}
      <label htmlFor='price'>Precio</label>
      <input name='price' placeholder='Precio' className={styles.titleform} type='number' onChange={handleOnChange} value={form.price} />
      {errors.price ? <p className={styles.error}>{errors.price}</p> : ''}
      <label htmlFor='image'>Imágen</label>
      <input name='image' placeholder='Imagen' className={styles.titleform} type='file' accept='image/*' onChange={handleImageUpload} />
      {errors.image ? <p className={styles.error}>{errors.image}</p> : ''}
      <label htmlFor='description'>Descripción</label>
      <textarea name='description' placeholder='Notas' className={styles.message} onChange={handleOnChange} value={form.description}></textarea>
      {errors.description ? <p className={styles.error}>{errors.description}</p> : ''}
      <label htmlFor='categories'>Categoría</label>
      <select name='categories' className={styles.categories} onChange={handleOnChange} value={form.categories}>
        <option>Elije una opción</option>
        <option value='main'>Plato principal</option>
        <option value='appetizer'>Entrada</option>
        <option value='dessert'>Postre</option>
        <option value='drink'>Bebida</option>
      </select>
      {errors.categories ? <p className={styles.error}>{errors.categories}</p> : ''}
      <button name='submit' className={styles.btn} type='submit'  onClick={()=>{handleClick()}}>
        Guardar
      </button>
    </form>
  );
};

export default DishForm;
