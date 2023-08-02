import { Dish } from "@/components"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { fetchMenus } from "../../redux"
import styles from "./Dishes.module.css"

const elemsPerPage = 10
// TODO change type && separate code
export const Dishes = ({ menu }: any) => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const newTotalPages =
      Math.ceil(Object.entries(menu).length / elemsPerPage) - 1
    console.log(newTotalPages)
    setTotalPages(newTotalPages)
    dispatch<any>(fetchMenus())
  }, [])

  if (!Object.entries(menu).length)
    return (
      <div className={styles.dishes}>
        <h1>
          No se encontraron menus que apliquen a los filtros especificados
        </h1>
      </div>
    )

  return (
    <section className={styles.fakeback}>
      <h2 className={styles.title}>Menu</h2>
      <div className={styles.dishes}>
        {Object.entries(menu)
          .slice(page * elemsPerPage, elemsPerPage * (page + 1))
          .map(([key, value]: [key: string, value: any]) => {
            return (
              <ul key={key}>
                <h4>
                  {key === "MAIN"
                    ? "Plato Principal"
                    : key === "DESSERT"
                    ? "Postres"
                    : key === "APPETIZER"
                    ? "Entradas"
                    : key === "DRINK"
                    ? "Bebidas"
                    : ""}
                </h4>
                {value.map((dish: any) =>
                  dish.active ? <Dish key={dish.title} dish={dish} /> : null
                )}
              </ul>
            )
          })}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              onClick={() =>
                setPage((prev) => {
                  if (prev - 1 < 0) return prev
                  return --prev
                })
              }
            >
              -
            </button>
            <button>{page + 1}</button>
            <button
              onClick={() =>
                setPage((prev) => {
                  if (prev + 1 > totalPages) return prev
                  return ++prev
                })
              }
            >
              +
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
