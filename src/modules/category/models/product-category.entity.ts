import { Entity, Column, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "src/infrastructure/models/base.entity";
import { Product } from "src/modules/product/models/product.entity";
import { Category } from "./category.entity";

@Entity({ name: 'product-category' })
export class ProductCategory extends BaseEntity {
  @Column({ default: true, name: 'is_available' })
  isAvailable?: boolean;

  @Column({ type: 'uuid', name: 'product_id', nullable: true })
  productId: string;

  @Column({ type: 'uuid', name: 'category_id', nullable: true })
  categoryId: string;

  @ManyToOne(() => Product, product => product.categories)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}