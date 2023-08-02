import { EditUser } from "@/components/EditUser"
import { DishForm } from "@/components/FormDish"
import { Table } from "@/components/FormTable"
import { ShowCreatedUser } from "@/components/ShowUser"
import { UserForm } from "@/components/UserFrom"
import { Main } from "@/layouts"

import {
  About,
  Cart,
  Chart,
  Dashboard,
  Home,
  Login,
  Menu,
  MenuDetail,
  NotFound,
  PanelAdmin,
  Rating,
} from "@/pages"

import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "menu",
        element: <Menu />,
        children: [
          {
            path: ":menuId",
            element: <MenuDetail />,
          },
        ],
      },
      {
        path: "/user",
        element: <UserForm />,
      },
      {
        path: "/list",
        element: <ShowCreatedUser />,
      },
      {
        path: "/editlist/:id",
        element: <EditUser />,
      },
      {
        path: "table/:tableId",
        element: <Menu />,
        children: [
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: ":menuId",
            element: <MenuDetail />,
          },
        ],
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/table",
        element: <Table />,
      },
      {
        path: "/dish",
        element: <DishForm />,
      },
      {
        path: "/admin",
        element: <PanelAdmin />,
      },
      {
        path: "/rating",
        element: <Rating />,
      },
      {
        path: "/chart",
        element: <Chart />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
])
