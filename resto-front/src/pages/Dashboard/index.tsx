import styles from "./Dashboard.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { fetchOrders, setUserRolLogout } from "../../redux/index";
import {  cargando, checkB, entregado, sesionB } from "@/assets";
import Swal from "sweetalert2";

import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { State } from "@/types";

export const Dashboard = () => {

  const { userRol } = useSelector((state: State) => state)
  
  const protectedRoute = () => {
    if (userRol !=='admin'&& userRol !== 'employee') {
      navigate('/')
    }
  }

  useEffect(() => {
    protectedRoute()
  }, [userRol]);

  const { orders } = useSelector((state: any) => state);
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async () => {
    Swal.fire({
      title: 'Bien',
      text: 'Se actualizo el estado de la orden',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
    await dispatch<any>(fetchOrders())
  };

  useEffect(() => {
    dispatch<any>(fetchOrders())
    console.log('Orders fetched');
  }, [dispatch]);

  const deleteOrder = async (id: string) => {
    try {
      await fetch(`http://resto-back-production-2867.up.railway.app/order/delete/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateOrderState = async (id: string, newState: string) => {
    try {
      const response = await fetch(`http://resto-back-production-2867.up.railway.app/order/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ state: newState }),
      });

      if (response.ok) {
        console.log("Estado de la orden actualizado correctamente");
      } else {
        console.error("Error al actualizar el estado de la orden");
      }
    } catch (error) {
      console.error("Error en la solicitud PUT:", error);
    }
  };

  const activeOrders = orders
    .filter((order: any) => order.active)
    .filter((order: any) => {
      if (order.state === 'init') return false;
      if (order.state === 'cancelled') return false;
      return true;
    })

  // init, cancelado, no activado

  const handleLogout = () => {
    signOut(auth).then(() => {
      sessionStorage.clear()
      
      Swal.fire({
        title: 'Bien',
        text: 'Has cerrado sesión correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
    })

      dispatch(setUserRolLogout())
      navigate('/');
  }

  if (orders.length===0) {
    return <h1>Loading...</h1>;
  }

  return (
    <section className={styles.fakeback}>


  
<button onClick={handleLogout}  className={styles.iimg}>
        <img className={styles.iimg} src={sesionB} alt="log out" />
      </button>



      <h2 className={styles.title}>Ordenes</h2>

      <div className={styles.dashboard}>
      
      {activeOrders.map((order: any) => (
        <div className={styles.orden} key={order._id}>
          <h2>Table: {order.table}</h2>
          <h2>Status: {order.state}</h2>

          <div className={styles.containerbotones}>
          {order.state !== "delivered" && (
            <>
              <button className={styles.boton}
                onClick={() => {updateOrderState(order._id, "in progress"); handleClick()}}
              >
                <img className={styles.img} src={cargando} alt="" />
              </button>
              <button  className={styles.boton}
               onClick={() => {updateOrderState(order._id, "ready"); handleClick()}}>
                <img className={styles.img} src={checkB} alt="Listo" />
              </button>
              <button className={styles.boton}
              onClick={() => {updateOrderState(order._id, "delivered"); handleClick()}}>
                <img className={styles.img} src={entregado} alt="entregado" />
              </button>
            </>
          )}

          {order.state === "delivered" && (
            <button onClick={() => {
              deleteOrder(order._id);
              handleClick();
            }}>BORRAR</button>
          )}

          </div>
          
          <ul>
            {order.item.map((item: any) => (
              <li className={styles.table} key={item._id}>
                <h3>{item.title}</h3>
                <p>Quantity: {item.quantity}</p>
                {item.observation && <p>Observation: {item.observation}</p>}
              </li>
            ))}
          </ul>
          
        </div>
      ))}
    </div>
    </section>
  );
};
