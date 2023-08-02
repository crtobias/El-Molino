import { useEffect, useState } from "react"

export const useLocalStorage = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })
  
  // @ts-ignore
  const setValue = value => {
    try {
      setStoredValue(value)
      // window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(error)
    }
  }
  
  useEffect(() => {
    console.log(storedValue)
    window.localStorage.setItem(key, JSON.stringify(storedValue))
  }, [storedValue])

  return [storedValue, setValue]
}
