import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "src/infrastructure/models/base.entity";
import { ProductCategory } from "./product-category";

@Entity({ name: 'category' })
export class Category extends BaseEntity {
  @Column('varchar', { length: 500, unique: true })
  name: string;

  @Column('varchar', { length: 500, nullable: true })
  type?: string;

  @Column('numeric', { unique: true })
  index: number;

  @Column({
    name: 'description',
    type: 'varchar',
    nullable: true,
  })
  description?: string;

  @Column({
    name: 'picture_url',
    type: 'varchar',
    nullable: true,
  })
  pictureUrl: string;

  @Column({
    name: 'icon_fa',
    type: 'varchar',
    nullable: true,
  })
  iconFa: string;

  @OneToMany(() => ProductCategory, productCate => productCate.category, { nullable: true, })
  products: ProductCategory[];
}