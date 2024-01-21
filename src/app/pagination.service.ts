// pagination.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  paginate<T>(items: T[], page: number, pageSize: number): T[] {
    // Your existing pagination logic
    const startIndex = (page - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  }

  generatePageNumbers(totalItems: number, pageSize: number): number[] {
    // Your existing logic for generating page numbers
    const pageCount = Math.ceil(totalItems / pageSize);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }
}
