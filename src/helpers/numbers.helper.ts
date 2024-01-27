import {get} from 'lodash';

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

export function indexHelper(...args) {
    const context = args[args.length - 1];
    const page = get(context, 'page', 1);
    const limit = get(context, 'limit', 10);
    const skip = (page - 1) * limit;
    return skip + this.index + 1
}

export function indexPage(index, currentPage, limitPages) {
    console.log("index:", index);
    console.log("currentPage:", currentPage);
    console.log("limitPages:", limitPages);

    let createIndex = (currentPage - 1) * limitPages + index + 1;
    console.log(createIndex);
    return createIndex;
}
