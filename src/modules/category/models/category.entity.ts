import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "src/infrastructure/models/base.entity";
import { ProductCategory } from "./product-category";

@Entity({ name: 'category' })
export class Category extends BaseEntity {
  @Column('varchar', { length: 500, unique: true })
  name: string;

  @Column('varchar', { length: 500 })
  type?: string;

  @Column('numeric')
  index?: number;

  @Column({
    name: 'description',
    type: 'varchar',
    nullable: true,
  })
  description?: string;

  @OneToMany(() => ProductCategory, productCate => productCate.category)
  productCategory: ProductCategory[];
}