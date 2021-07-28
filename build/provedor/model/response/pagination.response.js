"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationResponse = void 0;
var PaginationResponse = /** @class */ (function () {
    function PaginationResponse(page, totalPages, totalResults, data) {
        this.page = page;
        this.totalPages = totalPages;
        this.totalResults = totalResults;
        this.data = data;
    }
    return PaginationResponse;
}());
exports.PaginationResponse = PaginationResponse;
