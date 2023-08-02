import { IMenu } from "@/types"

export const processMenu = (e: IMenu[]) => e.reduce((prev, curr) => {
    let { categories, ...rest } = curr
    
    categories = categories.toUpperCase()

    return {
      ...prev,
      [categories]: [
        // @ts-ignore
        ...(prev[categories] ? prev[categories] : []),
        rest
      ]
    }
  }, {})
