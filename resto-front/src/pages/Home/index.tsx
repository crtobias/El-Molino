import styles from "./Home.module.css"
import { millLogo } from "@/assets"
import { Button } from "@/components"
import { State } from "@/types"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export const Home = () => {
  const { userRol } = useSelector((state: State) => state)

  const navigate = useNavigate()

  return (
    <section className={styles.home}>
      <div className={styles.titleContainer}>
        <h1>El</h1><img src={millLogo}/><h1>molino</h1>
        <p className={styles.text}>
          La Plata Diag 74 y 7 <br />
          
             +54 221 362 9688

        </p>
      </div>
      <Button action={() => navigate("/menu")}>Ver menus</Button>
      {userRol !== 'employee' ? <Button action={() => navigate("/login")}>Admin</Button> :null}
      
    </section>
  )
}
