import { ButtonProps } from "@/types"
import styles from "./Button.module.css"

export const Button = ({ children, action }: ButtonProps) => {

  const handleAction = () => action()

  return (
    <button
      className={styles.button} 
      onClick={handleAction}>
      {children}
    </button>
  )
}
