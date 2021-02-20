export const UTILS = {
    PRODUCT: {
        CalculateSalePricePercent: (oldPrice, newPrice) => Math.round(100 -  ((Number(newPrice) * 100) / Number(oldPrice)))
    },
    // ARRAY: {
    //     Empty: (arr) => arr.length  === 0
    // }
}


export function Empty(arr): Boolean {
    return  arr.length === 0;
}

export function  isLastIndex(index, arrLength): Boolean {
    return  arrLength - 1 === index;
}
