import styles from "./Show.module.css";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import app from "../../firebase.config";
import { useState, useEffect } from "react";
import UserCard from "../Users/index";
import { State, User } from "@/types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const firestore = getFirestore(app);

export const ShowCreatedUser = () => {
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

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "users"));
      const usersData = querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as User)
      );
      // console.log('Users Data:', usersData);
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSoftDelete = async (userId: string) => {
    console.log("Handling soft delete for user ID:", userId);
    try {
      const userRef = doc(firestore, "users", userId);
      await updateDoc(userRef, { active: false });
      console.log("User deactivated successfully");

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, active: false } : user
        )
      );

      Swal.fire({
        title: "Usuario desactivado exitosamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      console.error("Error deactivating user:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.tit} >Usuarios</h2>
      <div  className={styles.cardShowUser}>
        {users.map((user) => (
          <UserCard key={user.id} user={user} onDelete={() => handleSoftDelete(user.id)} />
        ))}
      </div>
    </div>
  );
};
