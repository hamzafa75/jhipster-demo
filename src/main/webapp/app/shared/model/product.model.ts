import { ICategory } from 'app/shared/model/category.model';

export interface IProduct {
  id?: number;
  designation?: string;
  description?: string;
  price?: number;
  category_product?: ICategory;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public designation?: string,
    public description?: string,
    public price?: number,
    public category_product?: ICategory
  ) {}
}
