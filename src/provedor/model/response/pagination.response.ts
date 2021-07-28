export class PaginationResponse {
    constructor(
        public page: number,
        public totalPages: number,
        public totalResults: number,
        public data: any
    ) {}
}