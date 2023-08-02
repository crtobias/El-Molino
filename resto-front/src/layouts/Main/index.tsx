import { Outlet, useParams, useLocation } from "react-router-dom"
import { Nav } from "@/components"
import { setTable, fetchMenus } from "@/redux"
import { useDispatch } from "react-redux"
import { useEffect } from "react"

export const Main = () => {
  const dispatch = useDispatch()
  const { tableId } = useParams()
  const location = useLocation()

  useEffect(() => {
    dispatch<any>(fetchMenus())
    if (!tableId) return
    // @ts-ignore
    dispatch(setTable(tableId))
  }, [])

  const shouldShowNav = location.pathname !== "/"

  return (
    <>
      <main>
        <Outlet/>
        
      </main>
      {shouldShowNav && <Nav />}
    </>
  )
}
