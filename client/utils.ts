export const UTILS = {
    PRODUCT: {
        CalculateSalePricePercent: (oldPrice, newPrice) => Math.round(100 -  ((Number(newPrice) * 100) / Number(oldPrice)))
    }
}
