export function formatNumber(number: number): string {
    return number.toLocaleString('id-ID', {style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2});
}
