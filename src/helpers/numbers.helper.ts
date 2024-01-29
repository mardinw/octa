export function logType(value: number) {
    const type = typeof value;
    console.log(`Type of value: ${type}`);
    return '';
}

export function parseNumber(numberString) {
    return parseFloat(numberString);
}

export function formatNumber(number: number): string {
    return number.toLocaleString('id-ID', {style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2});
}

export function indexPage(index: number, currentPage : number, limit :number): number {
    console.log(typeof currentPage)
    console.log(typeof limit)

    const createIndex = (currentPage - 1) * limit + index + 1;
    return createIndex;
}
