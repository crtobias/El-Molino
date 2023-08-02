// import { IMenu } from "@/types";
// import DeleteSvg from "@/assets/delete.svg"
import { useDispatch, useSelector } from "react-redux"
import styles from "./cart.module.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { removeDish, agregarPlato } from "@/redux"

const sv = "http://resto-back-production-2867.up.railway.app/mpcreate-order"

export const Cart = () => {
  const { cart, currentTable } = useSelector((state: any) => state)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const createPreference = async () => {
    try {
      const response = await axios.post(sv, {
        // @ts-ignore
        item: cart.map(i => ({
          dish: i.dish,
          quantity: i.quantity,
          totalPrice: i.totalPrice,
          observation: i.observation
        })),
        table: currentTable,
        // @ts-ignore
        totalPrice: cart.reduce((acc, curr) => acc + (curr.totalPrice * curr.quantity), 0),
      }, 
      {
        headers: {
          Accept: "*/*",
        }
      })

      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const handleBuy = async () => {
    const link = await createPreference()
    window.location.replace(link)
  }

  const handleAddDish = (dish: any) => {
    const newDish = {
      title: dish.title,
      dish: dish.dish,
      quantity: 1,
      totalPrice: dish.totalPrice,
      observation: "Lo quiero con hielo",
    }
    
    dispatch(agregarPlato(newDish))
  }

  const handleRemoveDish = (dish: any) => {
    const newDish = {
      title: dish.title,
      dish: dish.dish,
      quantity: 1,
      totalPrice: dish.totalPrice,
      observation: "Lo quiero con hielo",
    }
    dispatch(removeDish(newDish))
  }

  return (
    <section className={styles.cart}>
      <div className={styles.container}>
      <h2 className={styles.title}>Pedido</h2>
        {
          /* @ts-ignore */
          cart.map(item => (
            <div key={'cart-' + item.dish} className={styles.dish}>
              <h6>{item.title} x {item.quantity}</h6>
              <div className={styles.buttons}>
                <button 
                  className={`${styles.containerBoton} ${styles.buttonLeft}`} 
                  onClick={() => handleAddDish(item)}
                >+
                </button>
                <button 
                  className={`${styles.containerBoton} ${styles.buttonRight}`} 
                  onClick={() => handleRemoveDish(item)}
                >-
                </button>
              </div>

            </div>))
        }
        
        {/* @ts-ignore */}
        <h2>TOTAL: ${cart.reduce((acc, curr) => acc + (curr.totalPrice * curr.quantity), 0)}</h2>
       
       <div className={styles.a}>
       {
          cart.length ? <button className={styles.buttonPagar} onClick={handleBuy}>Pagar</button> : ''
        }
        
      <button className={styles.cerrar} onClick={() => navigate(-1)}>Cerrar</button>
       </div>


     
      </div>
    </section>
  )
}


