import { UserCardProps } from "@/types";
import styles from "./User.module.css";
import { NavLink } from "react-router-dom";

const UserCard = ({ user, onDelete }: UserCardProps) => {
  return (
    <div className={styles.cardShow}>
      <p>Name: {user.name}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Email: {user.email}</p>
      <div>{user.role ? <p>Role: {user.role}</p> : <p>Role: cliente</p>}</div>

      <div className={styles.butons}>
        <button className={styles.but} onClick={onDelete}>
          Eliminar
        </button>

        <NavLink to={`/editlist/${user.id}`}>
          <button className={styles.but}>Editar</button>
        </NavLink>
      </div>
    </div>
  );
};

export default UserCard;
