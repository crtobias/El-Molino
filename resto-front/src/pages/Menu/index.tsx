import styles from "./Menu.module.css"
import { Dishes } from "@/components"
import { useMenus } from "@/hooks"
import { Outlet } from "react-router-dom"

export const Menu = () => {

  const menu = useMenus()

  return (
    <>
      <section className={styles.menu}>
        <Dishes menu={menu}/>
      </section>
      <Outlet />
    </>
  )
}

