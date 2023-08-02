import React, { useState, useEffect } from "react";
import styles from "./Edit.module.css";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import app from "../../firebase.config";
import { User } from "@/types";
import Swal from "sweetalert2";
import {
  validateEmail,
  validateLastName,
  validateName,
  validatePassword,
  validateRole,
} from "../UserFrom/validationUserForm";
import {
  getAuth,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
} from "firebase/auth";

const firestore = getFirestore(app);

export const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [nameError, setNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [roleError, setRoleError] = useState<string>("");
  const [, setIsFormSubmitted] = useState(false);

  const handleClick = async () => {
    Swal.fire({
      title: "Bien",
      text: "Su Usuario se actualizo",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (id) {
          const userRef = doc(firestore, "users", id);
          const userSnapshot = await getDoc(userRef);
          if (userSnapshot.exists()) {
            const userFromSnapshot: User = {
              ...(userSnapshot.data() as User),
              id: userSnapshot.id,
            };
            setUser(userFromSnapshot);
          } else {
            console.log("El usuario no existe");
          }
        }
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };
    fetchUser();
  }, [id]);

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setUser((prevUser) => {
      if (prevUser) {
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

        return {
          ...prevUser,
          [name]: name === "active" ? value === "true" : value,
        };
      }
      return prevUser;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validar los campos antes de enviar el formulario
    const nameValidation = validateName(user?.name || "");
    const lastNameValidation = validateLastName(user?.lastName || "");
    const emailValidation = validateEmail(user?.email || "");
    const passwordValidation = validatePassword(user?.password || "");
    const roleValidation = validateRole(user?.role || "");

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
      if (user && user.id) {
        const userRef = doc(firestore, "users", user.id);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userToUpdate: User = {
            ...(userSnapshot.data() as User),
            id: userSnapshot.id,
          };

          // Actualizar el correo y contraseña del usuario en Firebase Authentication
          const auth = getAuth();

          try {
            // Buscar al usuario por su dirección de correo electrónico
            const userCredential = await signInWithEmailAndPassword(
              auth,
              userToUpdate.email,
              user.password
            );

            if (userCredential.user) {
              // Si el correo ha sido modificado, actualizarlo en Firebase Authentication
              if (userToUpdate.email !== user.email) {
                await updateEmail(userCredential.user, user.email);
                console.log("Correo actualizado en Firebase Authentication");
              }

              // Si la contraseña ha sido modificada, actualizarla en Firebase Authentication
              if (user.password) {
                await updatePassword(userCredential.user, user.password);
                console.log(
                  "Contraseña actualizada en Firebase Authentication"
                );
              }
            } else {
              console.log(
                "Error al autenticar al usuario para actualizar las credenciales"
              );
            }
          } catch (error) {
            console.error(
              "Error al actualizar las credenciales del usuario:",
              error
            );
            throw new Error("Error al actualizar las credenciales del usuario");
          }

          // Actualizar los datos en Firestore
          await updateDoc(userRef, {
            ...user,
          });
          console.log("Usuario actualizado con ID:", userToUpdate.id);

          Swal.fire({
            title: "Usuario editado exitosamente",
            icon: "success",
            confirmButtonText: "Aceptar",
          });

          // Marcar el formulario como enviado exitosamente
          setIsFormSubmitted(true);
        } else {
          console.log("El usuario no existe en Firestore");
        }
      }
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <form className={styles.editForm} onSubmit={handleSubmit}>
        <h2 className={styles.tit}>Edit User</h2>
        <input
          id="nameId"
          name="name"
          placeholder="Nombre de Usuario"
          className={styles.messageInput}
          value={user.name}
          onChange={handleOnChange}
          required
        />
        <span className={styles.error}>{nameError}</span>

        <input
          id="lastNameId"
          name="lastName"
          placeholder="Apellido"
          className={styles.messageInput}
          type="text"
          value={user.lastName}
          onChange={handleOnChange}
          required
        />
        <span className={styles.error}>{lastNameError}</span>

        <input
          id="emailId"
          name="email"
          type="email"
          placeholder="Email"
          className={styles.messageInput}
          value={user.email}
          onChange={handleOnChange}
          required
        />
        <span className={styles.error}>{emailError}</span>

        <select
          id="roleId"
          name="role"
          className={styles.messageInput}
          value={user.role}
          onChange={handleOnChange}
          required
        >
          <option value="">Roles</option>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>
        <span className={styles.error}>{roleError}</span>

        <select
          name="active"
          id="activeId"
          className={styles.messageInput}
          value={user.active ? "true" : "false"}
          onChange={handleOnChange}
        >
          <option value="true">Activo</option>
          <option value="false">Desactivado</option>
        </select>

        <input
          id="passwordId"
          name="password"
          type="password"
          placeholder="Ingrese Contraseña"
          className={styles.messageInput}
          value={user.password}
          onChange={handleOnChange}
          required
        />
        <span className={styles.error}>{passwordError}</span>

        <button
          name="submit"
          className={styles.btn}
          type="submit"
          onClick={() => {
            handleClick();
          }}
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
};
