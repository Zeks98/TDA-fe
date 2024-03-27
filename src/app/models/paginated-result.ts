export class PaginatedResult<T> {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    data: T;

    constructor(currentPage: number, pageSize: number, totalPages: number, totalItems: number, data: T) {
        this.currentPage = currentPage;
        this.pageSize = pageSize;
        this.totalPages = totalPages;
        this.totalItems = totalItems;
        this.data = data;
    }
}