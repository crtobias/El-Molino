import { useNavigate } from "react-router-dom"
import styles from "./NotFound.module.css"


export const NotFound = () => {
  
    const navigate = useNavigate()

    const handleClick = () => {

        navigate(-1)
    }

    return (

        <div className={styles.contenedorNotFound}>
        
          <p>Pagina no encontrada ;(</p>
          <button onClick={handleClick}>VOLVER</button>
      
        </div>
  
    )
}
