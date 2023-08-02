export const calculateMedium = (prev: number, curr: number, i: number, arr: number[]) => {
    if (i === arr.length - 1) return Math.round((prev + curr) / (i + 1))
    return (prev + curr)
  }
