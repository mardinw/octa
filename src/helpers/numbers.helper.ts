export function logType(value) {
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
