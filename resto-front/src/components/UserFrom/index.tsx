import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./User.module.css";
import { State, TableUser } from "@/types";
import app from "../../firebase.config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import {
  validateName,
  validateLastName,
  validateEmail,
  validatePassword,
  validateRole,
} from "./validationUserForm";

const firestore = getFirestore(app);

export const UserForm = () => {
  const { userRol } = useSelector((state: State) => state);
  const navigate = useNavigate();

  const protectedRoute = () => {
    if (userRol !== "admin") {
      navigate("/");
    }
  };

  useEffect(() => {
    protectedRoute();
  }, [userRol]);

  const initialData: TableUser = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    active: false,
  };
  const [dataForm, setDataForm] = useState<TableUser>(initialData);
  const [nameError, setNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [roleError, setRoleError] = useState<string>("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleClick = () => {
    Swal.fire({
      title: "Bien",
      text: "Se creó el usuario",
      icon: "success",
      confirmButtonText: "Aceptar",
    }).then(() => {
      clearFormFields(); // Limpia los campos después de crear al usuario
    });
  };

  // Limpiar los campos del form
  const clearFormFields = () => {
    setDataForm(initialData);
    setNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");
    setRoleError("");
    setIsFormSubmitted(false);
  };

  const handleOnChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setDataForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Validación de los campos
    if (name === "name") {
      const nameValidation = validateName(value);
      setNameError(nameValidation.message);
    } else if (name === "lastName") {
      const lastNameValidation = validateLastName(value);
      setLastNameError(lastNameValidation.message);
    } else if (name === "email") {
      const emailValidation = validateEmail(value);
      setEmailError(emailValidation.message);
    } else if (name === "password") {
      const passwordValidation = validatePassword(value);
      setPasswordError(passwordValidation.message);
    } else if (name === "role") {
      const roleValidation = validateRole(value);
      setRoleError(roleValidation.message);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validación de los campos antes de enviar el formulario
    const nameValidation = validateName(dataForm.name);
    const lastNameValidation = validateLastName(dataForm.lastName);
    const emailValidation = validateEmail(dataForm.email);
    const passwordValidation = validatePassword(dataForm.password);
    const roleValidation = validateRole(dataForm.role);

    if (!nameValidation.isValid) {
      setNameError(nameValidation.message);
      return;
    }

    if (!lastNameValidation.isValid) {
      setLastNameError(lastNameValidation.message);
      return;
    }

    if (!emailValidation.isValid) {
      setEmailError(emailValidation.message);
      return;
    }

    if (!passwordValidation.isValid) {
      setPasswordError(passwordValidation.message);
      return;
    }

    if (!roleValidation.isValid) {
      setRoleError(roleValidation.message);
      return;
    }

    try {
      const auth = getAuth();
      const { email, password } = dataForm;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Usuario creado y autenticado:", userCredential.user);

      const usersCollectionRef = collection(firestore, "users");
      const docRef = await addDoc(usersCollectionRef, dataForm);
      console.log("Usuario creado con ID:", docRef.id);

      // Marcar el formulario como enviado exitosamente
      setIsFormSubmitted(true);

      handleClick();
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  return (
    <form id="userForm" className={styles.formTable} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Usuarios</h2>
      <input
        id="nameId"
        name="name"
        placeholder="Nombre de Usuario"
        className={styles.messageInput}
        value={dataForm.name}
        onChange={handleOnChange}
        required
      />
      {nameError && <span className={styles.error}>{nameError}</span>}{" "}
      <input
        id="lastNameId"
        name="lastName"
        placeholder="Apellido"
        className={styles.messageInput}
        type="text"
        value={dataForm.lastName}
        onChange={handleOnChange}
        required
      />
      {lastNameError && <span className={styles.error}>{lastNameError}</span>}{" "}
      <input
        id="emailId"
        name="email"
        type="email"
        placeholder="Email"
        className={styles.messageInput}
        value={dataForm.email}
        onChange={handleOnChange}
        required
      ></input>
      {emailError && <span className={styles.error}>{emailError}</span>}{" "}
      <select
        id="roleId"
        name="role"
        className={styles.messageInput}
        value={dataForm.role}
        onChange={handleOnChange}
        required
      >
        <option value="">Roles</option>
        <option value="admin">Admin</option>
        <option value="employee">Employee</option>
      </select>
      {roleError && <span className={styles.error}>{roleError}</span>}{" "}
      <select
        name="active"
        id="activeId"
        className={styles.messageInput}
        onChange={handleOnChange}
        required
      >
        <option value="">Estado</option>
        <option value="true">Activo</option>
        <option value="false">Desactivado</option>
      </select>
      <input
        id="passwordId"
        name="password"
        placeholder="Ingrese Contraseña"
        className={styles.messageInput}
        value={dataForm.password}
        onChange={handleOnChange}
        type="password"
        required
      ></input>
      {passwordError && <span className={styles.error}>{passwordError}</span>}{" "}
      <div className={styles.botones}>
        <button
          name="submit"
          className={`${styles.btn} ${
            isFormSubmitted ? styles.disabledButton : ""
          }`}
          type="submit"
          disabled={isFormSubmitted}
        >
          Guardar
        </button>
        <Link to="/list">
          <button
            name="submit"
            className={styles.btn}
            type="submit"
            disabled={isFormSubmitted}
          >
            Ver Usuarios
          </button>
        </Link>
      </div>
    </form>
  );
};
