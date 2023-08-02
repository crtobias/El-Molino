import { useNavigate } from "react-router-dom"
import styles from "./WithoutPermissions.module.css"

export const WithoutPermissions = () => {

    const navigate = useNavigate()

    const handleClick = () => {

        navigate(-1)
    }

    return(

        <div className={styles.contenedorForbidden}>

            <p>No tienes permisos para acceder a esta pagina</p>
            <button onClick={handleClick}>VOLVER</button>

        </div>

    )

}