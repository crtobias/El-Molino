
import { configureStore } from "@reduxjs/toolkit"
import restoReducer from "./restoSlice"

export const store = configureStore({
  reducer: restoReducer
})

