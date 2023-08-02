import { TableData } from '@/types';
import styles from './Table.module.css';
import { useState, ChangeEvent, FormEvent } from 'react';


export const Table = () => {
  const initialData: TableData = {
    name: '',
    waiter: '',
    subject: '',
  };

  const [dataForm, setDataForm] = useState<TableData>(initialData);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setDataForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(dataForm);
  };

  return (
    <form className={styles.formTable} onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Numero de mesa"
        className={styles.messageInput}
        value={dataForm.name}
        onChange={handleOnChange}
        required
      />
      <input
        name="waiter"
        placeholder="Camarero Asociado"
        className={styles.messageInput}
        type="text"
        value={dataForm.waiter}
        onChange={handleOnChange}
        required
      />
      <textarea
        name="subject"
        placeholder="Notas"
        className={styles.message}
        value={dataForm.subject}
        onChange={handleOnChange}
        required
      ></textarea>
      <button name="submit" className={styles.btn} type="submit">
        Guardar
      </button>
    </form>
  );
};
