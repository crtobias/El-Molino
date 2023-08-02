import { LoginForm } from "@/components"
import { useSelector } from "react-redux"
import { State } from "../../types"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export const Login = () => {

  const { userRol } = useSelector((state: State) => state)
  const navigate = useNavigate()

  const protectedRoute = () => {
    if (userRol !== 'client') {
      navigate('/admin')
    }
  }

  useEffect(() => {
    protectedRoute()
  }, [userRol])


  return (
    <LoginForm></LoginForm>
  )
}