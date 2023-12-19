import { ISimfly } from '../interface/pagination-inteface';
export class Pagination {
  public limit: number;
  public currentPage: number;
  public pageCount: number;
  public offset: number;
  public total: number;

  constructor(limit: number = 10, currentPage: number = 1, total: number) {
    this.limit = limit;
    this.total = total;
    this.currentPage = currentPage;
    this.pageCount = Math.ceil(this.total / this.limit);
    this.offset = (this.currentPage - 1) * this.limit;
  }

  simplify(): ISimfly {
    const { currentPage, pageCount, limit } = this;
    return { currentPage, pageCount, limit };
  }
}
