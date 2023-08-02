
import { useSelector } from "react-redux"
import styles from "./MenuDetail.module.css"
import { useNavigate, useParams } from "react-router-dom"
import { IMenu, State } from "@/types"
import { Button } from "@/components"

export const MenuDetail = () => {

  const { menus } = useSelector((state: State) => state)
  const params = useParams()

  const navigate = useNavigate()

  const { menuId } = params
  
  // @ts-ignore
  const detail = menus.find((menu: IMenu) => menu._id === menuId) as IMenu

  if (!detail?.title) return <div>Loading...</div>

  return (
    <section className={styles.menuDetail}>
      <div className={styles.menuDetailContainer}>
        <h1>{ detail.title }</h1>
        <div className={styles.middle}>
          <div className={styles.image} data-price={`$ ${detail.price}`}>
            <img src={detail.image}/>
          </div>
          <div className={styles.description}>
            <h6>Descripcion</h6>
            <p>{detail.description}</p>
          </div>
          <div className={styles.other}>
          </div>
        </div>
        <Button action={() => navigate(-1)}>Cerrar</Button>
      </div>
    </section>
  )
}
