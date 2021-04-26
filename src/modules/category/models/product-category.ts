import { Entity, Column, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "src/infrastructure/models/base.entity";
import { Product } from "src/modules/product/models/product.entity";
import { Category } from "./category.entity";

@Entity({ name: 'product-category'})
export class ProductCategory extends BaseEntity {
  @Column({ default: true, name: 'is_available' })
  isAvailable?: boolean;

  @ManyToOne(() => Product, product => product.productCategory)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Category, category => category.productCategory )
  @JoinColumn({ name: 'category_id' })
  category: Category;
}