export function logType(value: number) {
    const type = value;
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

    const createIndex = index + 1 + (currentPage - 1) * limit;
    return createIndex;
}
