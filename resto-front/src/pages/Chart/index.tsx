// @ts-nocheck
import { fetchOrders } from "@/redux"
import { State } from "@/types"
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import styles from "./chart.module.css"

export const Chart = () => {
  const { userRol } = useSelector((state: State) => state)
  const navigate = useNavigate()

  const protectedRoute = () => {
    if (userRol !== "admin") {
      navigate("/")
    }
  }

  useEffect(() => {
    dispatch<any>(fetchOrders())
  }, [])

  useEffect(() => {
    // protectedRoute()
  }, [userRol])

  const dispatch = useDispatch()
  const { orders } = useSelector((state: any) => state)
  const filtered = useMemo(
    () =>
      orders.map((e) => {
        const eee = new Date(e.createdAt)
        const date = eee.getDate()
        const month = eee.getMonth()
        const year = eee.getFullYear()

        // console.log(date, month, year)

        return {
          date,
          month,
          year,
          earn: e.totalPrice,
        }
      }),
    [orders]
  )

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ganancias</h1>
      <div className={styles.con}>
        <div>
          <h5>Ultimo mes</h5>
          <LineChart
            className={styles.stat}
            width={800}
            height={300}
            data={filtered.reduce((prev, curr) => {
              // if (prev.includes(e => e.name === curr.name)) console.log('includes')
              const exists = prev.findIndex((e) => e.name === curr.date)
              if (exists >= 0)
                return prev.map((e, i) => {
                  if (i === exists)
                    return { name: e.name, uv: e.uv + curr.earn }
                  return e
                })

              console.log(prev)

              return [...prev, { name: curr.date, uv: 300 }]
            }, [])}
          >
            <Line type="monotone" dataKey="uv" stroke="#fc0" />
            <CartesianGrid stroke="white" />
            <XAxis dataKey="name" />
            <YAxis />
          </LineChart>
        </div>
        <div>
          <h5>Ultimos 6 meses</h5>

          <LineChart
            className={styles.stat}
            width={800}
            height={300}
            data={filtered.reduce((prev, curr) => {
              // if (prev.includes(e => e.name === curr.name)) console.log('includes')
              const exists = prev.findIndex((e) => e.name === curr.month)
              if (exists >= 0)
                return prev.map((e, i) => {
                  if (i === exists)
                    return { name: e.name, uv: e.uv + curr.earn }
                  return e
                })

              return [
                ...prev,
                { name: curr.month - 5, uv: 0 },
                { name: curr.month - 4, uv: 0 },
                { name: curr.month - 3, uv: 0 },
                { name: curr.month - 2, uv: 0 },
                { name: curr.month - 1, uv: 0 },
                { name: curr.month, uv: 300 },
              ]
            }, [])}
          >
            <Line type="monotone" dataKey="uv" stroke="#fc0" />
            <CartesianGrid stroke="white" />
            <XAxis dataKey="name" />
            <YAxis />
          </LineChart>
        </div>
      </div>
    </div>
  )
}
