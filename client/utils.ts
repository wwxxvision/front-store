
export function Empty(arr): Boolean {
    return  arr.length === 0;
}

export function  isLastIndex(index, arrLength): Boolean {
    return  arrLength - 1 === index;
}

export function removeHTML(str): String {
    return str.replace(/(<([^>]+)>)/gi, "")
}


export  function Count(arr) {
    if (arr instanceof Array) {
        return arr.length;
    }

    return  0;
}
