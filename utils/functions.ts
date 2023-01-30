export function orderArray(array:Array<any>, field:string) {
    return array.sort((a, b) => {
        if (a[field] < b[field]) {
            return -1
        }
        if (a[field] > b[field]) {
            return 1
        }
        return 0;
    })
}


export function dmy(date:Date){
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}


