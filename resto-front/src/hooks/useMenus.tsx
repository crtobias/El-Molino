import { useMemo } from "react"
import { useSelector } from "react-redux"
import { calculateMedium, processMenu } from "@/utils"
import { IMenu, State } from "@/types"

export const useMenus = () => {
  const { 
    menus, 
    searchFilter,
    moreThanPriceFilter,
    lessThanPriceFilter,
    moreThanReviewFilter, 
    lessThanReviewFilter,
    categoryFilter,
  } = useSelector((state: State) => state)

  

  const regexString = searchFilter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/ /g, ".*")
  const regex = new RegExp(regexString, "i")

  const byPrice = (e: IMenu) => +e.price >= moreThanPriceFilter && +e.price <= lessThanPriceFilter
  const byReviews = (e: IMenu) => {
    const reviewMedium = e.reviews.reduce(calculateMedium, 0) 
    return reviewMedium >= moreThanReviewFilter && reviewMedium <= lessThanReviewFilter
  }
  const byTitle = (e: IMenu) => regex.test(e.title) ? true : false
  const byCategory = (e: IMenu) => categoryFilter === "" ? true : e.categories === categoryFilter
  
  const process = () => 
    processMenu(
      menus
        .filter(byPrice)
        .filter(byReviews)
        .filter(byTitle)
        .filter(byCategory)
    )

  const menu = useMemo(process, [
    menus, 
    searchFilter, 
    lessThanPriceFilter, 
    moreThanReviewFilter, 
    lessThanReviewFilter, 
    moreThanPriceFilter, 
    categoryFilter
  ])

  // console.log(menu)
  return menu
}
